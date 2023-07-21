import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
  projectId: "loh8nmql",
  dataset: "production",
  title: "The Kapda Project",
  apiVersion: "2023-06-05",
  basePath: "/admin",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});

export default config;
