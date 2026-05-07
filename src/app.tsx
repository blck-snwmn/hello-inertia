import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "./style.css";

createInertiaApp({
  id: "app",
  title: (title) => (title ? `${title} - Hono + Inertia` : "Hono + Inertia"),
  resolve: async (name) => {
    const pages = import.meta.glob("./pages/**/*.tsx");
    const page = pages[`./pages/${name}.tsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return page();
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  }
});
