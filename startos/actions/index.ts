import { sdk } from '../sdk'
import { primaryUrl } from '../primaryUrl'
import { editConfig } from './editConfig'
import { malojaConnectionInfo } from './malojaConnectionInfo'
import { clearWebUiPassword, setWebUiPassword } from './setWebUiPassword'

export const actions = sdk.Actions.of()
  .addAction(primaryUrl.action)
  .addAction(editConfig)
  .addAction(malojaConnectionInfo)
  .addAction(setWebUiPassword)
  .addAction(clearWebUiPassword)
