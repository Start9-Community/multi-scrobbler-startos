import { configJson } from './fileModels/config.json'
import { malojaJson } from './fileModels/maloja.json'
import { depMalojaDescription } from './manifest/i18n'
import { sdk } from './sdk'

const parse = (raw: string | null): unknown => {
  try {
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const isEnabledEntry = (e: unknown) =>
  !!e && typeof e === 'object' && (e as { enable?: unknown }).enable !== false

const isMaloja = (e: unknown) =>
  isEnabledEntry(e) && (e as { type?: unknown }).type === 'maloja'

export const dependencies = sdk.Dependencies.of().addDependency(
  sdk.Dependency.optional('maloja', {
    description: depMalojaDescription,
    metadata: {
      title: 'Maloja',
      icon: 'https://raw.githubusercontent.com/Start9-Community/maloja-startos/refs/heads/master/icon.svg',
    },
    versionRange: '>=3.2.4:0',
    kind: 'running',
    healthChecks: ['maloja'],
    enabled: async ({ effects }) => {
      const config = parse(await configJson.read().const(effects)) as {
        clients?: unknown
        sources?: unknown
      } | null
      const perType = parse(await malojaJson.read().const(effects))
      return (
        [config?.clients, config?.sources].some(
          (xs) => Array.isArray(xs) && xs.some(isMaloja),
        ) || (Array.isArray(perType) ? perType : [perType]).some(isEnabledEntry)
      )
    },
  }),
)
