import { config } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'linkto2026/divisionfutbol',
  },
  collections: {
    posts: {
      label: 'Notas',
      slugField: 'slug',
      path: 'src/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: { label: 'Título', validation: { isRequired: true }, kind: 'text' },
        slug: { label: 'Slug', kind: 'slug', slugField: 'title' },
        date: { label: 'Fecha', kind: 'datetime', validation: { isRequired: true } },
        category: {
          label: 'Categoría',
          kind: 'select',
          options: [
            { label: 'Selección', value: 'Selección' },
            { label: 'División Profesional', value: 'División Profesional' },
            { label: 'Copa Simón Bolívar', value: 'Copa Simón Bolívar' },
            { label: 'ACF Primera A', value: 'ACF Primera A' },
            { label: 'ACF Primera B', value: 'ACF Primera B' },
            { label: 'ACF Ascensos', value: 'ACF Ascensos' },
            { label: 'Internacional', value: 'Internacional' },
            { label: 'Automovilismo', value: 'Automovilismo' },
            { label: 'Otros Deportes', value: 'Otros Deportes' },
          ],
          validation: { isRequired: true },
        },
        cover: { label: 'Imagen de portada', kind: 'assets', validation: { isRequired: false } },
        excerpt: { label: 'Resumen / Bajada', kind: 'text', validation: { isRequired: false } },
        featured: { label: 'Destacada en portada', kind: 'checkbox', defaultValue: false },
        content: { label: 'Contenido', kind: 'markdown' },
      },
    },
  },
});