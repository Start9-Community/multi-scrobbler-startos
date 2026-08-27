<p align="center">
  <img src="icon.svg" alt="Multi-Scrobbler Logo" width="21%">
</p>

# Multi-Scrobbler on StartOS

> Everything not listed in this document should behave the same as upstream
> Multi-Scrobbler. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Multi-Scrobbler](https://github.com/FoxxMD/multi-scrobbler) tracks what you play across
sources such as Spotify, Jellyfin, Plex, and Subsonic, and scrobbles it to one or more
clients such as Last.fm, ListenBrainz, and Maloja.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The upstream `foxxmd/multi-scrobbler` image is used unmodified, for `x86_64` and `aarch64`.

It is built on linuxserver.io's `baseimage-debian`, whose s6-overlay `/init` entrypoint must
run as PID 1, so the daemon execs the image's own entrypoint rather than node directly. The
single subcontainer is named `multi-scrobbler-sub`.

One file is added at runtime. The application handles `SIGINT` and nothing else, so s6's
default `SIGTERM` on stop kills it before it flushes its database. `assets/svc-node-down-signal`
is mounted over `/etc/s6-overlay/s6-rc.d/svc-node/down-signal`, which s6-rc reads out of its
source tree when it compiles the service database at boot, so a platform stop asks s6 to send
`SIGINT` instead. The upstream image ships no such file; the mount creates it.

## Volume and Data Layout

Two volumes: the application's data directory, and StartOS's own.

| Volume   | Mount point | Contents                                                                |
| -------- | ----------- | ----------------------------------------------------------------------- |
| `config` | `/config`   | `config.json`, the play-history database, and per-source credential caches |
| `startos`| not mounted | `store.json` — see [File Models](#file-models)                          |

Both `CONFIG_DIR` and `DATA_DIR` point at `/config`, matching the upstream image's own
layout, so configuration and state share one directory. Within it, each authorized OAuth
source or client keeps its tokens in its own `currentCreds-<type>-<name>.json`, not in a
single shared cache — a detail worth knowing when diagnosing why one source lost its
authorization and the others did not.

The `startos` volume is never mounted into the container: it holds StartOS-side state the
application has no business reading.

## File Models

Two models, and they are owned by opposite parties.

`config.json`, at `/config/config.json`, is the whole of multi-scrobbler's own
configuration — every source and every client. It is modeled as raw text rather than a
typed schema, because upstream's shape spans more than thirty source types and eight client
types and mirroring it would go stale on the first upstream release. Nothing seeds it: no
file exists until **Edit config.json** is run for the first time. From then on it is
entirely the user's — nothing StartOS-managed rewrites it, and an edit made over SSH or
through a file manager survives untouched until the next time that action is submitted.
The daemon reads it only at startup, so the package watches the file and restarts the daemon
whenever it changes.

`store.json`, on the `startos` volume, holds two keys: `baseUrl`, the address chosen by
**Set Callback Address**, and `uiPassword`, set (and cleared) by **Set Web UI Password** /
**Clear Web UI Password**. Init seeds `baseUrl` on first boot with the service's mDNS
(`.local`) address, or the first non-local address if mDNS is off, and the action overwrites
it thereafter; `uiPassword` is unset by default and only `setInterfaces` reads it — nothing
seeds it. `baseUrl` is delivered to the container as the `BASE_URL` environment variable, which
multi-scrobbler consumes on every launch — so a change takes effect on the restart the
action triggers, and never mid-run.

## Dependencies

One, and the service runs perfectly well without it.

- **Maloja** (`maloja`) — optional, `kind: 'running'`, gated on its `maloja` health check.
  Relevant only if you add a Maloja client to `config.json`; multi-scrobbler is equally
  happy with any other client, or none. No volume is mounted from it — the two talk over
  the network, at the address **Get Maloja Connection Info** resolves.

## Network Access and Interfaces

One interface, serving the dashboard and the REST API from the same port.

| Interface     | Id   | Type | Port | Protocol | Purpose                                              |
| ------------- | ---- | ---- | ---- | -------- | ---------------------------------------------------- |
| Web Interface | `ui` | ui   | 9078 | HTTP     | dashboard, OAuth authorization links, and the REST API |

**Upstream ships no login layer of its own**, so without further action, whichever addresses
are enabled for this interface are the entire access control. Its `auth` module handles only
outbound OAuth to Spotify, Last.fm, Deezer and YouTube Music, and the session middleware exists
to carry those callbacks rather than to identify a user.

Treat that as wider than a read-only page, because the REST API is a control surface. Without
credentials a caller can read the full application log (`/api/logs`, and a live stream of it),
stop and restart scrobbling for any source or client (`/api/client/listen`, `/api/source/init`),
clear caches, manipulate the dead-scrobble queue, and start an OAuth authorization flow
(`/api/source/auth`). Source and client secrets are not exposed — `/api/status` and
`/api/components` report state without credentials in it — but everything above is reachable by
anyone who can open the address.

**Set Web UI Password** (see [Actions](#actions)) closes that gap by turning on StartOS's
reverse-proxy HTTP basic auth (`addSsl.auth`) for this binding: unauthenticated requests get
`401` before they reach the container. It's opt-in and off by default because `addSsl.auth`
gates the whole port with no path scoping, and this interface serves the dashboard, the control
API, *and* scrobble ingest together. Turning it on also 401s the endpoints push-based sources
post to without a browser — the WebScrobbler browser extension, ListenBrainz-compatible clients
(`/api/listenbrainz*`, `/1/submit-listens`), Last.fm-compatible clients (`endpointlfm`), and
Plex/Tautulli/Jellyfin webhooks — since none of them authenticate with HTTP basic. Pull-based
sources (Spotify, Subsonic, Last.fm, YouTube Music) are unaffected; multi-scrobbler dials out to
those rather than being called into. **Clear Web UI Password** turns the gate back off.

## Installation and First-Run Flow

Nothing is skipped and no credentials are generated; multi-scrobbler has no setup wizard and
no login.

The one thing init does is pick a callback address. `BASE_URL` is what multi-scrobbler builds
its OAuth redirect URIs from, and it must be an address the browser completing that
provider's authorization can actually reach — so on first boot the package seeds
`store.json` with the mDNS (`.local`) address, and **Set Callback Address** lets the user
change it. Everything else is upstream-managed: `PORT`, `CONFIG_DIR`, `DATA_DIR`, `PUID`,
`PGID`, `TZ`, and `BASE_URL` come from StartOS; sources, clients, retention, and caching all
come from `config.json` or additional environment variables.

On first boot the application creates its database on its own. Sources that use OAuth are
authorized afterwards, from a link the dashboard shows for each one.

## Actions

Five actions: one address choice, one configuration editor, one lookup, and a pair that
toggle the web UI password gate.

- **Set Callback Address** (`set-base-url`) — run it when the address OAuth providers should
  redirect back to is wrong for where you browse from: over a tunnel, over Tor, or on a
  clearnet domain, where the seeded `.local` name does not resolve. Writes `baseUrl` in
  `store.json` and nothing else; the daemon restarts to pick it up, which takes seconds and
  interrupts scrobbling briefly. Safe to re-run. Choosing an address does not retroactively
  fix an already-authorized source — it changes where the *next* authorization sends the
  browser.

- **Edit config.json** (`edit-config`) — the only way to add or change sources and clients
  from inside StartOS. A single text field holding the file verbatim, prefilled from disk or
  with a `{ "sources": [], "clients": [] }` skeleton on first run. Validation is deliberately
  shallow: valid JSON, and `sources`/`clients` array-typed if present. A wrong field inside a
  source entry saves without complaint and surfaces later as an application error in the logs
  and on the dashboard. Available in any state; submitting restarts the daemon. Safe to
  re-run — it overwrites with exactly what was submitted, so it is also how you revert.

- **Get Maloja Connection Info** (`maloja-connection-info`) — run it before adding a Maloja
  client, to get the URL that entry's `url` field needs. Reads nothing and changes nothing,
  so it is safe at any time. `localhost` names this container, not Maloja's, and the LAN
  address arrives over a certificate multi-scrobbler will not trust; the address this returns
  is the internal one that avoids both. Returns an informational result rather than an error
  when Maloja is absent or stopped.

- **Set Web UI Password** (`set-web-ui-password`) — generates a random password, writes it to
  `store.json` as `uiPassword`, and returns the username (`admin`, fixed) and password as a
  one-time-viewable credential pair. `setInterfaces` (`interfaces.ts`) reads `uiPassword`
  reactively via `.const(effects)` and passes it as StartOS reverse-proxy basic auth
  (`addSsl.auth`) on the web interface binding, so the gate takes effect without a restart.
  Re-running it rotates the password. Its warning names the push-based source types that stop
  working while it's on — see [Network Access and Interfaces](#network-access-and-interfaces).

- **Clear Web UI Password** (`clear-web-ui-password`) — merges `uiPassword` back to `undefined`
  in `store.json`, which drops `addSsl.auth` on the next `setInterfaces` pass and returns the
  interface to no authentication.

## Tasks

One task, and only after a working setup breaks.

- **Set Callback Address** — `important`, so it is surfaced prominently but never blocks the
  service. Raised at init when the address stored in `store.json` is no longer among the
  interface's enabled addresses — typically because a gateway or domain was turned off.
  Running the action clears it. It can return, and does, any time the stored address stops
  being available. It is never raised on a fresh install, because init seeds an address
  before anything can be missing.

## Health Checks

One check, on the daemon.

- **`multi-scrobbler`** — succeeds once port 9078 accepts a connection. It deliberately does
  not use the application's own `/api/health` endpoint, which reports per-source and
  per-client connectivity and legitimately returns a non-200 while sources are still being
  configured or authorized; treating that as the readiness signal would report a correctly
  running service as crashed. A failure here therefore means the web server never bound its
  port at all — read the subcontainer's logs for a startup error. It says nothing about
  whether any source or client is connected; the dashboard is where that lives.

## Backups and Restore

Both volumes are copied wholesale — `sdk.Backups.ofVolumes`, no dump step — so
`config.json`, the play-history database, every `currentCreds-*.json`, and `store.json`
travel together.

Nothing is deliberately excluded. Because the credential files are captured as-is, a restored
instance comes back with its OAuth sources still authorized and needs no re-authorization;
because `store.json` comes with it, the callback address is the one that was chosen. That
address usually stops resolving, though: the interface is assigned a fresh external port on
reinstall, so the restored value names a port nothing is listening on and the **Set Callback
Address** task is raised. Picking the address again is the one step a restore normally needs.

## Limitations and Differences

Three things behave differently here than they would running the image yourself.

1. `BASE_URL` is a single address chosen through **Set Callback Address**, not a per-source
   setting. The browser completing an OAuth flow has to be able to reach whatever is chosen,
   which the default mDNS address does not satisfy off the LAN. Choosing a reachable address
   is the general fix; overriding `redirectUri` on the individual source or client in
   `config.json` handles the case where different providers need different addresses.
2. `PUID`/`PGID` are fixed at `1000:1000` rather than user-configurable.
3. **Edit config.json** validates only the outer JSON shape, not the fields of individual
   source and client entries, so a configuration that is well-formed but wrong is accepted
   and fails later at the application level.

---

## Quick Reference for AI Consumers

```yaml
package_id: multi-scrobbler
image: foxxmd/multi-scrobbler
architectures: [x86_64, aarch64]
subcontainers: [multi-scrobbler-sub]
volumes:
  config: /config
  startos: null
file_models:
  - config.json
  - store.json
startos_managed_env_vars:
  - PORT
  - CONFIG_DIR
  - DATA_DIR
  - PUID
  - PGID
  - TZ
  - BASE_URL
dependencies:
  - maloja (optional)
interfaces:
  ui: { type: ui, port: 9078 }
actions:
  - set-base-url
  - edit-config
  - maloja-connection-info
tasks:
  - { action: set-base-url, severity: important }
health_checks:
  - multi-scrobbler
```
