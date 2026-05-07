import { serializePage, type PageObject, type RootView } from "@hono/inertia";

type ManifestEntry = {
  file: string;
  css?: string[];
};

type ViteManifest = Record<string, ManifestEntry>;

const appName = "Hono + Inertia";
const isProduction = process.env.NODE_ENV === "production";
const manifest = isProduction
  ? ((await Bun.file("dist/client/.vite/manifest.json").json()) as ViteManifest)
  : null;

function assetTags() {
  if (!isProduction) {
    return `
      <script type="module">
        import RefreshRuntime from "http://127.0.0.1:5173/@react-refresh";
        RefreshRuntime.injectIntoGlobalHook(window);
        window.$RefreshReg$ = () => {};
        window.$RefreshSig$ = () => (type) => type;
        window.__vite_plugin_react_preamble_installed__ = true;
      </script>
      <script type="module" src="http://127.0.0.1:5173/@vite/client"></script>
      <script type="module" src="http://127.0.0.1:5173/src/app.tsx"></script>
    `;
  }

  const entry = manifest?.["src/app.tsx"];

  if (!entry) {
    throw new Error("Vite manifest entry not found: src/app.tsx");
  }

  return [
    ...(entry.css ?? []).map((href) => `<link rel="stylesheet" href="/${href}" />`),
    `<script type="module" src="/${entry.file}"></script>`
  ].join("\n");
}

export const rootView: RootView = (page: PageObject) => `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title inertia>${appName}</title>
    ${assetTags()}
  </head>
  <body>
    <script data-page="app" type="application/json">${serializePage(page)}</script>
    <div id="app"></div>
  </body>
</html>`;
