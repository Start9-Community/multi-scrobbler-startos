// multi-scrobbler's web port is whatever we pass as PORT; it is not fixed by the image.
export const uiPort = 9078

// Exported so dependent packages can resolve our bridge address without hardcoding it.
// Keep this module free of value imports: navidrome-startos imports from it, and anything
// reachable from here lands in that package's bundle.
export const uiHostId = 'ui'

// Username for the optional web UI basic-auth gate (see actions/setWebUiPassword.ts). Fixed
// rather than user-chosen: the gate gets set up once per package, not once per person.
export const uiUsername = 'admin'
