import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../addresses'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getNonLocalUrls(effects)

    return {
      name: i18n('URL'),
      values: urls.reduce(
        (obj, url) => ({ ...obj, [url]: url }),
        {} as Record<string, string>,
      ),
      default: '',
    }
  }),
})

export const setBaseUrl = sdk.Action.withInput(
  'set-base-url',

  async () => ({
    name: i18n('Set Callback Address'),
    description: i18n(
      'Choose which of this service’s addresses Spotify, Last.fm, and other authorization flows should send your browser back to.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    url: (await storeJson.read((s) => s.baseUrl).once()) || undefined,
  }),

  async ({ effects, input }) =>
    storeJson.merge(effects, { baseUrl: input.url }),
)
