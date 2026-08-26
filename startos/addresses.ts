import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { uiHostId, uiPort } from './utils'

export function getNonLocalUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(
      effects,
      uiHostId,
      (host) =>
        host?.bindings[uiPort]?.interfaces[
          'ui'
        ]?.addressInfo.nonLocal.format() ?? [],
    )
    .const()
}
