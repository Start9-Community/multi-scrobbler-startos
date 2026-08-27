import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  maloja: {
    kind: 'running',
    versionRange: '>=3.2.4:0',
    healthChecks: ['maloja'],
  },
}))
