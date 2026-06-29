import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const require = createRequire(import.meta.url);
const express = require("express");


const app = express();

const PORT = Number(process.env.PORT) || 3000;

function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    colares: "Colares",
    aneis: "Anéis",
    brincos: "Brincos",
    pulseiras: "Pulseiras",
    relogios: "Relógios",
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function titleize(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

app.get("/api/products", (req, res) => {
  try {
    const baseDir = path.join(process.cwd(), "public", "produtos");

    if (!fs.existsSync(baseDir)) {
      return res.json([]);
    }

    const productsList: object[] = [];

    const categories = fs.readdirSync(baseDir).filter((f) => {
      try {
        return fs.statSync(path.join(baseDir, f)).isDirectory();
      } catch {
        return false;
      }
    });

    for (const cat of categories) {
      const catDir = path.join(baseDir, cat);
      const categoryLabel = getCategoryLabel(cat);

      const prodFolders = fs.readdirSync(catDir).filter((f) => {
        try {
          return fs.statSync(path.join(catDir, f)).isDirectory();
        } catch {
          return false;
        }
      });

      for (const prod of prodFolders) {
        const prodDir = path.join(catDir, prod);

        const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
        const files = fs
          .readdirSync(prodDir)
          .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
          .sort();

        let name = titleize(prod);
        let description =
          "Uma joia exclusiva da coleção Amanhecer Store, projetada para revelar sofisticação inigualável.";
        let price = "Sob Consulta";
        let details = [
          "Acabamento artesanal premium",
          "Metal nobre selecionado",
          "Garantia vitalícia de autenticidade",
        ];

        const metaPath = path.join(prodDir, "metadata.json");
        if (fs.existsSync(metaPath)) {
          try {
            const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
            if (meta.name) name = meta.name;
            if (meta.description) description = meta.description;
            if (meta.price) price = meta.price;
            if (Array.isArray(meta.details)) details = meta.details;
          } catch {}
        }

        productsList.push({
          id: prod,
          name,
          category: cat,
          categoryLabel,
          images: files.map((file) => `/produtos/${cat}/${prod}/${file}`),
          description,
          price,
          details,
        });
      }
    }

    res.json(productsList);
  } catch (err) {
    console.error("Error building products list:", err);
    res.status(500).json({ error: "Failed to catalog products" });
  }
});

app.get("/api/produtos", (_req, res) => {
  res.redirect("/api/products");
});

const publicPath = path.join(process.cwd(), "public");


async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 
    "dist");
    app.use(express.static(publicPath));
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupServer();
