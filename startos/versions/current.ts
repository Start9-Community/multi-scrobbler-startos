import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.16.4:2',
  releaseNotes: {
    en_US: 'Add an opt-in Set Web UI Password action to gate the web interface behind HTTP basic auth. Clarify in the docs and the action itself that the gate only covers browser/off-box access — packages on the same server reach this one over the internal bridge unaffected.',
    es_ES: 'Añade una acción opcional "Establecer contraseña de la interfaz web" para protegerla con autenticación básica HTTP. Aclara en la documentación y en la propia acción que la protección solo cubre el acceso desde el navegador o fuera del servidor — otros paquetes del mismo servidor acceden por la red interna sin verse afectados.',
    de_DE: 'Fügt eine optionale Aktion "Weboberflächen-Passwort festlegen" hinzu, die die Weboberfläche mit HTTP-Basic-Auth schützt. Stellt in der Dokumentation und in der Aktion selbst klar, dass die Sperre nur Browser-/serverfremden Zugriff betrifft — Pakete auf demselben Server erreichen diesen Dienst unbeeinflusst über die interne Bridge.',
    pl_PL: 'Dodaje opcjonalną akcję "Ustaw hasło interfejsu webowego", zabezpieczającą interfejs webowy uwierzytelnianiem HTTP Basic. Doprecyzowuje w dokumentacji i w samej akcji, że blokada dotyczy tylko dostępu z przeglądarki/spoza serwera — pakiety na tym samym serwerze łączą się przez wewnętrzny mostek bez żadnego wpływu.',
    fr_FR: 'Ajoute une action facultative « Définir le mot de passe de l’interface web » pour protéger l’interface par authentification HTTP basique. Précise dans la documentation et dans l’action elle-même que le verrou ne couvre que l’accès navigateur/hors serveur — les autres paquets du même serveur atteignent ce service via le pont interne sans être affectés.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
