import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.2:0',
  releaseNotes: {
    en_US: 'Bump to upstream 0.17.2, which corrects a 0.17.0 overcorrection requiring a ListenBrainz contact User-Agent (now optional again for regular users), improves Source play processing, and restructures Play Timeline events. Plays scrobbled before this update will not show Timeline events, but no scrobble data is lost.',
    es_ES: 'Actualiza a la versión 0.17.2 de origen, que corrige una sobrecorrección de la 0.17.0 que exigía un User-Agent de contacto para ListenBrainz (ahora vuelve a ser opcional para usuarios habituales), mejora el procesamiento de reproducciones de las fuentes y reestructura los eventos de la línea de tiempo. Las reproducciones registradas antes de esta actualización no mostrarán eventos en la línea de tiempo, pero no se pierde ningún dato de scrobbling.',
    de_DE: 'Aktualisiert auf Upstream-Version 0.17.2, die eine Überkorrektur aus 0.17.0 behebt, welche einen Kontakt-User-Agent für ListenBrainz verlangte (für reguläre Nutzer wieder optional), die Play-Verarbeitung der Quellen verbessert und die Timeline-Ereignisse für Plays neu strukturiert. Plays, die vor diesem Update gescrobbelt wurden, zeigen keine Timeline-Ereignisse, es gehen aber keine Scrobbling-Daten verloren.',
    pl_PL: 'Aktualizacja do wersji źródłowej 0.17.2, która koryguje nadgorliwą zmianę z 0.17.0 wymagającą kontaktowego User-Agenta dla ListenBrainz (znów opcjonalny dla zwykłych użytkowników), usprawnia przetwarzanie odtworzeń ze źródeł oraz przebudowuje zdarzenia osi czasu odtworzeń. Odtworzenia zarejestrowane przed tą aktualizacją nie będą pokazywać zdarzeń na osi czasu, ale żadne dane scrobblowania nie zostaną utracone.',
    fr_FR: 'Passe à la version amont 0.17.2, qui corrige une surcorrection de la 0.17.0 exigeant un User-Agent de contact pour ListenBrainz (de nouveau facultatif pour les utilisateurs habituels), améliore le traitement des lectures des sources et restructure les événements de la chronologie des lectures. Les lectures scrobblées avant cette mise à jour n’afficheront pas d’événements de chronologie, mais aucune donnée de scrobbling n’est perdue.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
