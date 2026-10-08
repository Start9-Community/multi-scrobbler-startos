import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// multi-scrobbler's per-type file for Maloja clients and sources, read beside config.json.
export const malojaJson = FileHelper.string({
  base: sdk.volumes.config,
  subpath: 'maloja.json',
})
