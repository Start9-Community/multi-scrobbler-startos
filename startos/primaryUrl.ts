import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiHostId } from './utils'

export const primaryUrl = sdk.setupPrimaryUrl({
  id: 'set-base-url',
  hostId: uiHostId,
  interfaceId: 'ui',
  metadata: {
    name: i18n('Set Callback Address'),
    description: i18n(
      'Choose which of this service’s addresses Spotify, Last.fm, and other authorization flows should send your browser back to.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  field: { name: i18n('URL'), description: null },
  get: storeJson.read((s) => s.baseUrl),
  set: (effects, url) => storeJson.merge(effects, { baseUrl: url }),
})
