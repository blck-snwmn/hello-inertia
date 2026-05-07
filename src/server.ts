import { inertia } from "@hono/inertia";
import { Hono } from "hono";
import { rootView } from "./root-view";

const port = Number(process.env.PORT ?? 3000);
const app = new Hono();

app.use(inertia({ version: "1", rootView }));

app.get("/assets/*", async (c) => {
  const assetPath = c.req.path.replace(/^\/assets\//, "");
  const file = Bun.file(`dist/client/assets/${assetPath}`);

  if (!(await file.exists())) {
    return c.notFound();
  }

  return new Response(file);
});

const routes = app
  .get(
    "/",
    (c) =>
      c.render("Home", {
        title: "Hono + Inertia",
        message: "Bun で動く Hono サーバから Inertia ページを返す最小サンプルです。"
      })
  )
  .get(
    "/about",
    (c) =>
      c.render("About", {
        title: "About",
        stack: ["Bun", "Hono", "Inertia.js", "React", "Vite"]
      })
  );

Bun.serve({
  fetch: app.fetch,
  port
});

console.log(`Server running at http://127.0.0.1:${port}`);

export default routes;
