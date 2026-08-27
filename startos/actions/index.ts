import { sdk } from '../sdk'
import { editConfig } from './editConfig'
import { malojaConnectionInfo } from './malojaConnectionInfo'
import { setBaseUrl } from './setBaseUrl'
import { clearWebUiPassword, setWebUiPassword } from './setWebUiPassword'

export const actions = sdk.Actions.of()
  .addAction(setBaseUrl)
  .addAction(editConfig)
  .addAction(malojaConnectionInfo)
  .addAction(setWebUiPassword)
  .addAction(clearWebUiPassword)
