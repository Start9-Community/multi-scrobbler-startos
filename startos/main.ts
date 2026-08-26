import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'
import { configJson } from './fileModels/config.json'
import { storeJson } from './fileModels/store.json'

export const main = sdk.setupMain(async ({ effects }) => {
  // multi-scrobbler only reads config.json at startup, so restart the daemon
  // whenever the edit-config action writes a new one.
  await configJson.read().const(effects)

  const baseUrl = await storeJson.read((s) => s.baseUrl).const(effects)

  return sdk.Daemons.of(effects).addDaemon('multi-scrobbler', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'multi-scrobbler' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'config',
          subpath: null,
          mountpoint: '/config',
          readonly: false,
        })
        // multi-scrobbler's node process only flushes its DB connection on
        // SIGINT, and s6's default stop signal is SIGTERM.
        .mountAssets({
          subpath: 'svc-node-down-signal',
          mountpoint: '/etc/s6-overlay/s6-rc.d/svc-node/down-signal',
          type: 'file',
        }),
      'multi-scrobbler-sub',
    ),
    exec: {
      // The image is built on linuxserver's s6-overlay base, which must run
      // as PID 1.
      command: sdk.useEntrypoint(),
      runAsInit: true,
      env: {
        PORT: `${uiPort}`,
        CONFIG_DIR: '/config',
        DATA_DIR: '/config',
        PUID: '1000',
        PGID: '1000',
        TZ: 'Etc/UTC',
        ...(baseUrl ? { BASE_URL: baseUrl } : {}),
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
