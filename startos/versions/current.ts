import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.18.1:0',
  releaseNotes: {
    en_US: `Updated Multi-Scrobbler to 0.18.1.

**Features**

- New web interface, replacing the previous dashboard
- The MusicBrainz transformer's \`contact\` field is now optional
- MusicBrainz rate limits can be set per server, and requests are spread across your servers

**Fixes**

- Plex artwork displays again
- Duplicate plays can be filtered in a source's play list

The first start after updating recalculates an identifier for every stored play, so it takes longer with a large play history.

[Full upstream release notes](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.0)`,
    es_ES: `Multi-Scrobbler actualizado a 0.18.1.

**Novedades**

- Nueva interfaz web, que sustituye al panel anterior
- El campo \`contact\` del transformador de MusicBrainz ahora es opcional
- Los límites de tasa de MusicBrainz se pueden fijar por servidor, y las solicitudes se reparten entre tus servidores

**Correcciones**

- Las carátulas de Plex vuelven a mostrarse
- Las reproducciones duplicadas se pueden filtrar en la lista de reproducciones de una fuente

El primer inicio tras la actualización recalcula un identificador para cada reproducción guardada, por lo que tarda más con un historial grande.

[Notas completas de la versión de origen](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.0)`,
    de_DE: `Multi-Scrobbler auf 0.18.1 aktualisiert.

**Neuerungen**

- Neue Weboberfläche, die das bisherige Dashboard ersetzt
- Das Feld \`contact\` des MusicBrainz-Transformers ist jetzt optional
- MusicBrainz-Ratenlimits lassen sich pro Server festlegen, und Anfragen werden auf deine Server verteilt

**Fehlerbehebungen**

- Plex-Cover werden wieder angezeigt
- Doppelte Plays lassen sich in der Play-Liste einer Quelle filtern

Der erste Start nach dem Update berechnet für jeden gespeicherten Play eine Kennung neu und dauert bei einem großen Verlauf daher länger.

[Vollständige Upstream-Versionshinweise](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.0)`,
    pl_PL: `Zaktualizowano Multi-Scrobbler do 0.18.1.

**Nowości**

- Nowy interfejs webowy, zastępujący dotychczasowy panel
- Pole \`contact\` transformatora MusicBrainz jest teraz opcjonalne
- Limity żądań MusicBrainz można ustawić dla każdego serwera, a żądania są rozdzielane między twoje serwery

**Poprawki**

- Okładki z Plex znów się wyświetlają
- Zduplikowane odtworzenia można filtrować na liście odtworzeń źródła

Pierwsze uruchomienie po aktualizacji przelicza identyfikator każdego zapisanego odtworzenia, więc przy dużej historii trwa dłużej.

[Pełne informacje o wydaniu źródłowym](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.0)`,
    fr_FR: `Multi-Scrobbler mis à jour vers 0.18.1.

**Nouveautés**

- Nouvelle interface web, qui remplace l’ancien tableau de bord
- Le champ \`contact\` du transformateur MusicBrainz est désormais facultatif
- Les limites de débit MusicBrainz peuvent être définies par serveur, et les requêtes sont réparties entre vos serveurs

**Corrections**

- Les pochettes Plex s’affichent de nouveau
- Les lectures en double peuvent être filtrées dans la liste des lectures d’une source

Le premier démarrage après la mise à jour recalcule un identifiant pour chaque lecture enregistrée ; il est donc plus long avec un historique volumineux.

[Notes de version amont complètes](https://github.com/FoxxMD/multi-scrobbler/releases/tag/0.18.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
