import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.19.2:1',
  releaseNotes: {
    en_US: `- A new install asks you to choose the callback address instead of picking one for you
- While the chosen callback address is unavailable, Multi-Scrobbler uses another of its addresses, and goes back to your choice when it returns
- Open UI prefers the callback address when your connection can reach it
- Set Web UI Password warns before it replaces an existing password, and Clear Web UI Password asks for confirmation
- Maloja is only listed as a dependency while a Maloja client or source is configured`,
    es_ES: `- Una instalación nueva te pide que elijas la dirección de retorno en lugar de elegir una por ti
- Mientras la dirección de retorno elegida no está disponible, Multi-Scrobbler usa otra de sus direcciones y vuelve a tu elección cuando regresa
- Abrir interfaz prefiere la dirección de retorno cuando tu conexión puede alcanzarla
- Establecer contraseña de la interfaz web avisa antes de sustituir una contraseña existente, y Borrar contraseña de la interfaz web pide confirmación
- Maloja solo figura como dependencia mientras haya un cliente o una fuente de Maloja configurados`,
    de_DE: `- Eine Neuinstallation fordert dich auf, die Rücksprungadresse zu wählen, statt eine für dich festzulegen
- Solange die gewählte Rücksprungadresse nicht verfügbar ist, verwendet Multi-Scrobbler eine andere seiner Adressen und kehrt zu deiner Wahl zurück, sobald sie wieder da ist
- Oberfläche öffnen bevorzugt die Rücksprungadresse, wenn deine Verbindung sie erreichen kann
- Weboberflächen-Passwort festlegen warnt, bevor es ein bestehendes Passwort ersetzt, und Weboberflächen-Passwort löschen fragt nach einer Bestätigung
- Maloja wird nur als Abhängigkeit geführt, solange ein Maloja-Client oder eine Maloja-Quelle konfiguriert ist`,
    pl_PL: `- Nowa instalacja prosi o wybranie adresu powrotnego zamiast wybierać go za ciebie
- Gdy wybrany adres powrotny jest niedostępny, Multi-Scrobbler używa innego ze swoich adresów i wraca do twojego wyboru, gdy ten znów jest dostępny
- Otwórz interfejs preferuje adres powrotny, gdy twoje połączenie może do niego dotrzeć
- Ustaw hasło interfejsu webowego ostrzega przed zastąpieniem istniejącego hasła, a Usuń hasło interfejsu webowego prosi o potwierdzenie
- Maloja jest wymieniana jako zależność tylko wtedy, gdy skonfigurowano klienta lub źródło Maloja`,
    fr_FR: `- Une nouvelle installation vous demande de choisir l’adresse de retour au lieu d’en choisir une pour vous
- Tant que l’adresse de retour choisie est indisponible, Multi-Scrobbler utilise une autre de ses adresses et revient à votre choix dès qu’elle est de retour
- Ouvrir l’interface privilégie l’adresse de retour lorsque votre connexion peut l’atteindre
- Définir le mot de passe de l’interface web avertit avant de remplacer un mot de passe existant, et Effacer le mot de passe de l’interface web demande une confirmation
- Maloja n’apparaît comme dépendance que lorsqu’un client ou une source Maloja est configuré`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
