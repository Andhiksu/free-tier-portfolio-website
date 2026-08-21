import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {studioEnvironment} from './studioEnvironment'
import {portfolioStructure} from './structure'

const singletonTypes = new Set(['profile', 'siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'free-tier-portfolio-website',

  projectId: studioEnvironment.projectId,
  dataset: studioEnvironment.dataset,

  plugins: [structureTool({structure: portfolioStructure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter((action) => action.action && singletonActions.has(action.action))
        : actions,
    newDocumentOptions: (options) =>
      options.filter((option) => !singletonTypes.has(option.templateId)),
  },
})
