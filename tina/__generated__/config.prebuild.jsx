// tina/config.js
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "ec8d5515-703a-4f28-98fe-e24d7c1e6fb9",
  token: "5d2f3ca5781a7ae50abe26ea9b489da2026109e5",
  build: {
    outputFolder: "tinacms",
    publicFolder: "_site"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "src"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Notas",
        path: "src/posts",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || ""
          }
        },
        defaultItem: () => ({
          layout: "layouts/post.njk",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          featured: false
        }),
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            ui: { component: "hidden" }
          },
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false
            }
          },
          {
            type: "string",
            name: "category",
            label: "Categor\xEDa",
            required: true,
            options: [
              "Selecci\xF3n",
              "Divisi\xF3n Profesional",
              "Copa Sim\xF3n Bol\xEDvar",
              "ACF Primera A",
              "ACF Primera B",
              "ACF Ascensos",
              "Internacional",
              "Automovilismo",
              "Otros Deportes"
            ]
          },
          {
            type: "image",
            name: "cover",
            label: "Imagen de portada"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Resumen / Bajada",
            ui: { component: "textarea" }
          },
          {
            type: "boolean",
            name: "featured",
            label: "Destacada en portada"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
