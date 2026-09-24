import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.18.1:0',
  releaseNotes: {
    en_US: `Bump to upstream 0.18.1.

**Features**
- Brand-new web UI, replacing the old one entirely.
- MusicBrainz transformer no longer requires a contact User-Agent (like ListenBrainz before it).
- MusicBrainz rate limiting is now configurable and load-balances requests across multiple servers.

**Fixes**
- Restored a missing Plex artwork API route.
- Minor play-state fix for duplicate detection in the UI.

[Full upstream release notes](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.1)`,
    es_ES: `Actualiza a la versión 0.18.1 de origen.

**Novedades**
- Nueva interfaz web, que reemplaza por completo a la anterior.
- El transformador de MusicBrainz ya no requiere un User-Agent de contacto (igual que antes ocurrió con ListenBrainz).
- La limitación de tasa de MusicBrainz ahora es configurable y balancea la carga entre varios servidores.

**Correcciones**
- Se restauró una ruta de la API de artwork de Plex que faltaba.
- Corrección menor del estado de reproducción para la detección de duplicados en la interfaz.

[Notas de la versión completas (en inglés)](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.1)`,
    de_DE: `Aktualisiert auf Upstream-Version 0.18.1.

**Neuerungen**
- Komplett neue Web-Oberfläche, die die alte vollständig ersetzt.
- Der MusicBrainz-Transformer benötigt keinen Kontakt-User-Agent mehr (wie zuvor bei ListenBrainz).
- Die MusicBrainz-Ratenbegrenzung ist nun konfigurierbar und verteilt Anfragen auf mehrere Server.

**Fehlerbehebungen**
- Eine fehlende Plex-Artwork-API-Route wurde wiederhergestellt.
- Kleinere Korrektur des Play-Status für die Duplikaterkennung in der Oberfläche.

[Vollständige Release Notes (Englisch)](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.1)`,
    pl_PL: `Aktualizacja do wersji źródłowej 0.18.1.

**Nowości**
- Zupełnie nowy interfejs webowy, zastępujący dotychczasowy w całości.
- Transformator MusicBrainz nie wymaga już kontaktowego User-Agenta (podobnie jak wcześniej ListenBrainz).
- Ograniczanie liczby żądań MusicBrainz jest teraz konfigurowalne i równoważy obciążenie między wieloma serwerami.

**Poprawki**
- Przywrócono brakującą trasę API grafik Plex.
- Drobna poprawka stanu odtwarzania dla wykrywania duplikatów w interfejsie.

[Pełne informacje o wydaniu (po angielsku)](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.1)`,
    fr_FR: `Passe à la version amont 0.18.1.

**Nouveautés**
- Toute nouvelle interface web, qui remplace entièrement l'ancienne.
- Le transformateur MusicBrainz ne nécessite plus de User-Agent de contact (comme précédemment pour ListenBrainz).
- La limitation de débit MusicBrainz est désormais configurable et répartit la charge entre plusieurs serveurs.

**Corrections**
- Restauration d'une route API d'illustrations Plex manquante.
- Correction mineure de l'état de lecture pour la détection des doublons dans l'interface.

[Notes de version complètes (en anglais)](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.1)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
