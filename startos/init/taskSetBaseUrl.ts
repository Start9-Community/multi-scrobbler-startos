import { setBaseUrl } from '../actions/setBaseUrl'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../addresses'

export const taskSetBaseUrl = sdk.setupOnInit(async (effects) => {
  const available = await getNonLocalUrls(effects)
  const baseUrl = await storeJson.read((s) => s.baseUrl).const(effects)

  if (!baseUrl) {
    await storeJson.merge(
      effects,
      { baseUrl: available.find((u) => u.includes('.local')) ?? available[0] },
      { allowWriteAfterConst: true },
    )
  } else if (!available.includes(baseUrl)) {
    await sdk.action.createOwnTask(effects, setBaseUrl, 'important', {
      reason: i18n(
        'The address authorization flows are sent back to is no longer enabled. Choose another.',
      ),
    })
  }
})
