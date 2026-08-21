import type {StructureResolver} from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], schemaType: string, title: string) =>
  S.listItem()
    .id(schemaType)
    .schemaType(schemaType)
    .title(title)
    .child(S.document().id(schemaType).schemaType(schemaType).documentId(schemaType))

export const portfolioStructure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio content')
    .items([
      singleton(S, 'siteSettings', 'Site settings'),
      singleton(S, 'profile', 'Profile'),
      S.divider(),
      S.documentTypeListItem('project').title('Project directions'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('credential').title('Credentials'),
      S.documentTypeListItem('mediaItem').title('Media & evidence library'),
    ])
