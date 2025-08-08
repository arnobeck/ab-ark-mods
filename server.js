// server.js
import { serve } from "bun";
import { join } from "path";

const PORT = process.env.PORT || 3000;
const BUILD_DIR = process.env.BUILD_DIR || "./build";

// Types MIME pour les différents fichiers
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json"
};

function getMimeType(path) {
  const ext = path.match(/\.[^.]+$/)?.[0];
  return mimeTypes[ext] || "application/octet-stream";
}

// Déterminer si c'est un asset statique (pour le cache)
function isStaticAsset(path) {
  return path.includes("/_app/") || 
         path.includes("/assets/") || 
         path.includes("/fonts/") ||
         path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)$/);
}

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Log des requêtes (optionnel, commentez en production)
    console.log(`[${new Date().toISOString()}] ${req.method} ${path}`);

    // Rediriger / vers /index.html
    if (path === "/") {
      path = "/index.html";
    }

    try {
      // Construire le chemin complet du fichier
      const filePath = join(BUILD_DIR, path);
      const file = Bun.file(filePath);

      // Vérifier si le fichier existe
      if (await file.exists()) {
        const headers = {
          "Content-Type": getMimeType(path),
        };

        // Ajouter les headers de cache pour les assets statiques
        if (isStaticAsset(path)) {
          headers["Cache-Control"] = "public, max-age=31536000, immutable";
        } else {
          headers["Cache-Control"] = "public, max-age=0, must-revalidate";
        }

        // Headers de sécurité
        headers["X-Content-Type-Options"] = "nosniff";
        headers["X-Frame-Options"] = "SAMEORIGIN";

        return new Response(file, { headers });
      }

      // Pour les routes SPA, retourner index.html
      // Sauf pour les vraies 404 (fichiers avec extensions)
      if (!path.includes(".")) {
        const indexFile = Bun.file(join(BUILD_DIR, "index.html"));
        if (await indexFile.exists()) {
          return new Response(indexFile, {
            headers: {
              "Content-Type": "text/html",
              "Cache-Control": "public, max-age=0, must-revalidate"
            }
          });
        }
      }

      // 404 pour les fichiers non trouvés
      return new Response("404 - Not Found", { 
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });

    } catch (error) {
      console.error("Error serving file:", error);
      return new Response("500 - Internal Server Error", { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  },
});

console.log(`🚀 Bun server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from: ${BUILD_DIR}`);
