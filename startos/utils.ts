import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

// multi-scrobbler's web port is whatever we pass as PORT; it is not fixed by the image.
export const uiPort = 9078

// Exported so dependent packages can resolve our bridge address without hardcoding it.
export const uiHostId = 'ui'

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
