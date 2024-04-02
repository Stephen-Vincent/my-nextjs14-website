import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from './sanity/schemas';

const config = defineConfig({
    projectId: "a6981nyq",
    dataset: "production",
    title: "My NextJS Website",
    apiVersion: "2024-04-02",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: {
        types: schemas
    }
})

export default config;