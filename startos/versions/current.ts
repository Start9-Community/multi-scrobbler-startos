import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.16.5:0',
  releaseNotes: {
    en_US: 'Bump to upstream 0.16.5, which adds a proper User-Agent header to ListenBrainz requests — required after a botnet attack forced ListenBrainz to reject traffic without one, which was breaking ListenBrainz scrobbling.',
    es_ES: 'Actualiza a la versión 0.16.5 de origen, que añade una cabecera User-Agent adecuada en las peticiones a ListenBrainz — necesaria después de que un ataque de botnet obligara a ListenBrainz a rechazar el tráfico sin ella, lo que rompía el scrobbling a ListenBrainz.',
    de_DE: 'Aktualisiert auf Upstream-Version 0.16.5, die einen ordentlichen User-Agent-Header für ListenBrainz-Anfragen hinzufügt — erforderlich, nachdem ein Botnetz-Angriff ListenBrainz dazu zwang, Traffic ohne diesen Header abzulehnen, was das Scrobbeln zu ListenBrainz unterbrach.',
    pl_PL: 'Aktualizacja do wersji źródłowej 0.16.5, która dodaje właściwy nagłówek User-Agent do żądań ListenBrainz — wymagany po tym, jak atak botnetu zmusił ListenBrainz do odrzucania ruchu bez tego nagłówka, co przerywało scrobblowanie do ListenBrainz.',
    fr_FR: 'Passe à la version amont 0.16.5, qui ajoute un en-tête User-Agent correct aux requêtes ListenBrainz — nécessaire depuis qu’une attaque par botnet a contraint ListenBrainz à rejeter le trafic qui en est dépourvu, ce qui interrompait le scrobbling vers ListenBrainz.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
