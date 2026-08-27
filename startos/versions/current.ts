import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.16.4:1',
  releaseNotes: {
    en_US: 'Add an opt-in Set Web UI Password action to gate the web interface behind HTTP basic auth.',
    es_ES: 'Añade una acción opcional "Establecer contraseña de la interfaz web" para protegerla con autenticación básica HTTP.',
    de_DE: 'Fügt eine optionale Aktion "Weboberflächen-Passwort festlegen" hinzu, die die Weboberfläche mit HTTP-Basic-Auth schützt.',
    pl_PL: 'Dodaje opcjonalną akcję "Ustaw hasło interfejsu webowego", zabezpieczającą interfejs webowy uwierzytelnianiem HTTP Basic.',
    fr_FR: 'Ajoute une action facultative « Définir le mot de passe de l’interface web » pour protéger l’interface par authentification HTTP basique.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
