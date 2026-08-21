import {defineCliConfig} from 'sanity/cli'
import {studioEnvironment} from './studioEnvironment'

export default defineCliConfig({
  api: {
    projectId: studioEnvironment.projectId,
    dataset: studioEnvironment.dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  },
})
