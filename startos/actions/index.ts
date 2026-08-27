import { sdk } from '../sdk'
import { editConfig } from './editConfig'
import { malojaConnectionInfo } from './malojaConnectionInfo'
import { setBaseUrl } from './setBaseUrl'

export const actions = sdk.Actions.of()
  .addAction(setBaseUrl)
  .addAction(editConfig)
  .addAction(malojaConnectionInfo)
