# Multi-Scrobbler

## Documentation

- [Multi-Scrobbler documentation](https://docs.multi-scrobbler.app) — the full configuration reference for every source (Spotify, Jellyfin, Plex, Subsonic, YouTube Music, and more) and every client (Last.fm, ListenBrainz, Maloja, and more).

## What you get on StartOS

A dashboard showing what is playing and where it is being scrobbled to, plus the REST API
sources can post to. Your configuration, play history, and saved authorizations all live on
your server's storage and are included in StartOS backups.

Sources and clients are added through an action rather than by editing a file over SSH, and
the address that music services send you back to after authorization is one you pick from a
list.

Multi-Scrobbler has no password of its own, and there is no setting to add one. Anyone who
can open the address can do everything you can — read its logs, pause your scrobbling, and
start an authorization flow. Your account credentials are not on show, but the controls are,
so enable only the addresses you would hand those controls to.

## Getting set up

1. Start the service and open the **Web Interface** to confirm it is running.
2. If you will authorize a source through Spotify, Last.fm, Deezer, or YouTube Music, run
   **Set Callback Address** first and pick the address you will be browsing from. This is
   where those services send your browser back to once you approve access, so it has to be
   an address that browser can reach. The `.local` name chosen for you works from a device on
   the same network; over a VPN, over Tor, or from a domain name, pick that address instead.
3. Run **Edit config.json** to add the sources you want to track from and the clients you
   want to scrobble to. It is a plain text box holding the same `config.json` that
   multi-scrobbler uses everywhere else — see the configuration reference above for the
   fields each source and client type needs. The action checks that what you submit is valid
   JSON but not that individual fields are right, so check them against the documentation
   before saving.
   - **Adding a Maloja instance running on this same server?** Do not use `localhost` or its
     LAN address. Run **Get Maloja Connection Info** and paste the URL it gives you into that
     client's `url` field.
4. Submitting the action restarts the service to apply the new configuration — you do not
   need to restart it yourself.
5. For sources that use OAuth, open the dashboard: it shows an authorization link for each
   one still waiting. Complete each from a browser at the address you chose in step 2.
6. Once a source is authorized and a client configured, plays appear on the dashboard and
   scrobble automatically.

## Using Multi-Scrobbler

### Web interface

The dashboard lists every configured source and client with its current state, the
authorization links for anything not yet approved, and the recent plays it has processed.

### Actions

- **Set Callback Address** — pick which of this service's addresses music services send your
  browser back to after you approve access. Run it whenever you start authorizing from
  somewhere new. It changes where the *next* authorization goes; sources already authorized
  keep working.
- **Edit config.json** — add or change sources and clients. Submitting restarts the service.
  Re-running replaces the file with exactly what you submit, so it is also how you undo a
  change.
- **Get Maloja Connection Info** — gives you the URL a Maloja client entry needs when Maloja
  is running on this same server.

## Limitations

If you have already authorized a source and later change the callback address, that source
stays authorized — but a service that needs different addresses for different providers can
be handled by setting `redirectUri` on that individual source or client in **Edit
config.json**.
