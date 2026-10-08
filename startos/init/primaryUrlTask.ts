import { i18n } from '../i18n'
import { primaryUrl } from '../primaryUrl'

export const primaryUrlTask = primaryUrl.setupTask('important', {
  reason: i18n(
    'Choose the address Spotify, Last.fm, and other authorization flows send your browser back to.',
  ),
})
