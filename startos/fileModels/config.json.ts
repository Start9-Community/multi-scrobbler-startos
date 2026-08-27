import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Upstream's schema spans 30+ source types and 8 client types, so this stays raw text.
export const defaultConfig = JSON.stringify(
  { sources: [], clients: [] },
  null,
  2,
)

export const configJson = FileHelper.string({
  base: sdk.volumes.config,
  subpath: 'config.json',
})
