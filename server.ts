import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Category titles translation helper
function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    aneis: "Anéis",
    colares: "Colares",
    brincos: "Brincos",
    pulseiras: "Pulseiras",
    relogios: "Relógios"
  };
  return map[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1));
}

// Titleize utility
function titleize(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Beautiful Gold-on-Black Geometric Luxury SVG generator as visual fallback
function getLuxurySVG(productName: string, category: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0a" />
      <stop offset="50%" stop-color="#141414" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2D27A" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#gold)" />
  <rect x="25" y="25" width="750" height="950" fill="none" stroke="url(#accent)" stroke-width="1.5" opacity="0.3" />
  
  <!-- Minimalist Geometric Jewelry Line Drawing -->
  <g transform="translate(400, 430)" opacity="0.85">
    <!-- Outer starry circle -->
    <circle r="180" fill="none" stroke="url(#accent)" stroke-width="1" stroke-dasharray="2, 6" />
    <circle r="160" fill="none" stroke="url(#accent)" stroke-width="1" />
    <circle r="130" fill="none" stroke="url(#accent)" stroke-width="1.5" stroke-dasharray="10, 5" />
    
    <!-- Central Ring or Necklace Emblem based on Category -->
    ${category === 'aneis' ? `
      <!-- Ring design -->
      <ellipse cx="0" cy="50" rx="90" ry="70" fill="none" stroke="url(#accent)" stroke-width="3.5" />
      <ellipse cx="0" cy="50" rx="85" ry="65" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.5" />
      <!-- Top Diamond setting -->
      <path d="M0,-50 L40,-10 L0,30 L-40,-10 Z" fill="url(#accent)" />
      <polygon points="0,-60 15,-45 0,-30 -15,-45" fill="#FFFFFF" opacity="0.9" />
    ` : category === 'colares' ? `
      <!-- Necklace design -->
      <path d="M -110,-60 Q 0,140 110,-60" fill="none" stroke="url(#accent)" stroke-width="3" />
      <!-- Central Gem -->
      <path d="M 0,40 L 25,75 L 0,110 L -25,75 Z" fill="url(#accent)" />
      <circle cx="0" cy="75" r="8" fill="#FFFFFF" opacity="0.9" />
    ` : category === 'brincos' ? `
      <!-- Earrings design -->
      <!-- Left Hook -->
      <path d="M-60,-80 Q-40,-50 -60,0" fill="none" stroke="url(#accent)" stroke-width="2" />
      <path d="M-60,0 L-45,25 L-60,50 L-75,25 Z" fill="url(#accent)" />
      <!-- Right Hook -->
      <path d="M60,-80 Q80,-50 60,0" fill="none" stroke="url(#accent)" stroke-width="2" />
      <path d="M60,0 L75,25 L60,50 L45,25 Z" fill="url(#accent)" />
    ` : category === 'pulseiras' ? `
      <!-- Bracelet lock design -->
      <circle r="85" fill="none" stroke="url(#accent)" stroke-width="4" />
      <circle r="75" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" />
      <rect x="-15" y="-15" width="30" height="30" fill="url(#accent)" transform="rotate(45)" />
    ` : `
      <!-- Watch design -->
      <rect x="-35" y="-120" width="70" height="240" fill="none" stroke="url(#accent)" stroke-width="2.5" stroke-dasharray="15,5" />
      <circle r="70" fill="none" stroke="url(#accent)" stroke-width="3.5" />
      <line x1="0" y1="0" x2="0" y2="-45" stroke="url(#accent)" stroke-width="2.5" />
      <line x1="0" y1="0" x2="30" y2="10" stroke="url(#accent)" stroke-width="1.5" />
      <circle r="5" fill="#FFFFFF" />
    `}
  </g>
  
  <!-- Text branding -->
  <text x="400" y="780" text-anchor="middle" fill="#D4AF37" font-family="'Playfair Display', Georgia, serif" font-size="24" letter-spacing="10" font-weight="600">AMANHECER</text>
  <text x="400" y="810" text-anchor="middle" fill="#FFFFFF" font-family="'Poppins', sans-serif" font-size="11" letter-spacing="6" opacity="0.4">HAUTE JOAILLERIE</text>
  
  <text x="400" y="875" text-anchor="middle" fill="#FFFFFF" font-family="'Playfair Display', Georgia, serif" font-size="18" font-style="italic" letter-spacing="2" opacity="0.95">${productName}</text>
  <text x="400" y="905" text-anchor="middle" fill="#D4AF37" font-family="'Poppins', sans-serif" font-size="11" letter-spacing="4" font-weight="500">PEÇA EXCLUSIVA</text>
</svg>`;
}

const SEED_DATA = [
  {
    category: "aneis",
    categoryLabel: "Anéis",
    product: "anel-aurora-ouro",
    name: "Anel Aurora Ouro 18k",
    description: "Anel de ouro amarelo 18k com acabamento polido, esculpido à mão para refletir o esplendor do amanhecer.",
    price: "R$ 4.800",
    details: ["Ouro Amarelo 18k", "Largura: 4mm", "Acabamento Alto Brilho", "Design Anatômico"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "aneis",
    categoryLabel: "Anéis",
    product: "anel-solitaire-diamante",
    name: "Anel Solitaire Diamante Celeste",
    description: "O brilho lendário de um diamante central de 0.8 quilates, cravado em uma delicada coroa de ouro branco.",
    price: "R$ 14.200",
    details: ["Ouro Branco 18k", "Diamante Central 0.8ct", "Pureza VVS1", "Lapidação Brilhante"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "colares",
    categoryLabel: "Colares",
    product: "gargantilha-amanhecer",
    name: "Gargantilha Amanhecer Dourada",
    description: "Um colar em ouro 18k com elos lapidados e um pingente de topázio imperial que capta os primeiros raios de sol.",
    price: "R$ 8.500",
    details: ["Ouro Amarelo 18k", "Topázio Imperial Natural", "Fecho de Alta Segurança", "Corrente de 45cm ajustável"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "colares",
    categoryLabel: "Colares",
    product: "colar-noblesse-perolas",
    name: "Colar Noblesse de Pérolas",
    description: "Clássico atemporal unindo pérolas de água salgada perfeitamente selecionadas e fecho em filigrana de ouro.",
    price: "R$ 11.900",
    details: ["Pérolas Akoya 7.5mm", "Fecho em Ouro Amarelo 18k", "Comprimento: 50cm", "Enfiamento com Nós de Proteção"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "brincos",
    categoryLabel: "Brincos",
    product: "brincos-gota-esmeralda",
    name: "Brincos Gota Esmeralda Imperial",
    description: "Brincos pendentes em ouro branco com impressionantes esmeraldas colombianas lapidadas em gota e halos de brilhantes.",
    price: "R$ 18.500",
    details: ["Ouro Branco 18k", "Duas Esmeraldas Colombianas de 1.2ct cada", "Halos de Microdiamantes", "Trava de Pressão Confortável"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1630012414462-ff14e9783582?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "pulseiras",
    categoryLabel: "Pulseiras",
    product: "bracelete-orvalho-ouro",
    name: "Bracelete Orvalho do Amanhecer",
    description: "Design rígido e elegante em ouro amarelo, adornado com detalhes gravados à mão que imitam o frescor do orvalho.",
    price: "R$ 7.200",
    details: ["Ouro Amarelo 18k", "Formato Oval Anatômico", "Fecho Invisível Lateral", "Largura: 6mm"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    category: "relogios",
    categoryLabel: "Relógios",
    product: "relogio-cronografo-lumian",
    name: "Chronos Lumian Gold",
    description: "Obra de arte da relojoaria fina. Movimento automático suíço, caixa em aço de alto impacto com detalhes banhados a ouro 18k.",
    price: "R$ 24.000",
    details: ["Movimento Automático Suíço", "Caixa de 40mm banhada a Ouro 18k", "Vidro Cristal Safira Antirreflexo", "Resistência 10 ATM"],
    unsplashImages: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

// Asynchronous folder/file seeding function
async function ensureProductsSeeded() {
  const publicDir = path.join(process.cwd(), "public");
  const baseDir = path.join(publicDir, "produtos");
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  for (const item of SEED_DATA) {
    const catDir = path.join(baseDir, item.category);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    
    const prodDir = path.join(catDir, item.product);
    if (!fs.existsSync(prodDir)) {
      fs.mkdirSync(prodDir, { recursive: true });
    }
    
    // Write product metadata.json
    const metaPath = path.join(prodDir, "metadata.json");
    if (!fs.existsSync(metaPath)) {
      fs.writeFileSync(
        metaPath,
        JSON.stringify({
          name: item.name,
          description: item.description,
          price: item.price,
          details: item.details
        }, null, 2),
        "utf8"
      );
    }
    
    // Create images
    for (let i = 0; i < item.unsplashImages.length; i++) {
      const fileName = `foto${i + 1}.svg`; // We use dynamic SVG placeholders because they're perfect, 100% stable, and super sharp vector designs
      const filePath = path.join(prodDir, fileName);
      if (!fs.existsSync(filePath)) {
        const svgContent = getLuxurySVG(item.name, item.category);
        fs.writeFileSync(filePath, svgContent, "utf8");
      }
    }
  }
  console.log("Amanhecer Store catalogs folders successfully seeded with luxury assets.");
}

// REST endpoints for static catalogs listing
async function setupServer() {
  // Ensure seeds exist
  await ensureProductsSeeded();

  // API Route to fetch products list
  app.get("/api/products", (req, res) => {
    try {
      const baseDir = path.join(process.cwd(), "public", "produtos");
      
      if (!fs.existsSync(baseDir)) {
        return res.json([]);
      }
      
      const categories = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
      const productsList = [];
      
      for (const cat of categories) {
        const catDir = path.join(baseDir, cat);
        const prodFolders = fs.readdirSync(catDir).filter(f => fs.statSync(path.join(catDir, f)).isDirectory());
        
        const categoryLabel = getCategoryLabel(cat);
        
        for (const prod of prodFolders) {
          const prodDir = path.join(catDir, prod);
          const files = fs.readdirSync(prodDir).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return [".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext);
          });
          
          files.sort();
          
          let name = titleize(prod);
          let description = "Uma joia exclusiva da coleção Amanhecer Store, projetada para revelar sofisticação inigualável.";
          let price = "Sob Consulta";
          let details = ["Acabamento artesanal premium", "Metal nobre selecionado", "Garantia vitalícia de autenticidade"];
          
          const metaPath = path.join(prodDir, "metadata.json");
          if (fs.existsSync(metaPath)) {
            try {
              const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
              if (meta.name) name = meta.name;
              if (meta.description) description = meta.description;
              if (meta.price) price = meta.price;
              if (meta.details) details = meta.details;
            } catch (e) {
              // Ignore parse error
            }
          }
          
          productsList.push({
            id: prod,
            name,
            category: cat,
            categoryLabel,
            images: files.map(file => `/produtos/${cat}/${prod}/${file}`),
            description,
            price,
            details
          });
        }
      }
      
      res.json(productsList);
    } catch (err) {
      console.error("Error building items database:", err);
      res.status(500).json({ error: "Failed to catalog products dynamic folder" });
    }
  });

  // Alias for ease of integration
  app.get("/api/produtos", (req, res) => {
    res.redirect("/api/products");
  });

  // Integrate Vite dynamically for development running, or express static assets for production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Port Ingress running on port ${PORT}`);
  });
}

setupServer();
