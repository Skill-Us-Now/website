// Baut die öffentliche Seite skillusnow.de nach dist/ (Startseite, Anleitung, gemeinsame Gestaltung).
// Die Projektliste lädt die Startseite selbst von /api/projekte.json.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const teil of ["index.html", "anleitung", "impressum", "datenschutz", "assets"]) if (existsSync(join(ROOT, teil))) cpSync(join(ROOT, teil), join(DIST, teil), { recursive: true });
console.log("✅ Seite gebaut → dist/");
