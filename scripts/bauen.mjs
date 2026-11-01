// Baut die Stadt: liest alle Häuser aus haeuser/*/haus.json und erzeugt dist/ mit Startseite (Stadtplan).
// Aufruf: node scripts/bauen.mjs   → Ergebnis in dist/, im Browser dist/index.html öffnen
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const haeuser = readdirSync(join(ROOT, "haeuser"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => {
    try {
      const h = JSON.parse(readFileSync(join(ROOT, "haeuser", d.name, "haus.json"), "utf8"));
      return { ordner: d.name, name: h.name || d.name, emoji: h.emoji || "🏠", beschreibung: h.beschreibung || "" };
    } catch {
      console.warn(`⚠️  ${d.name}: haus.json fehlt oder ist kaputt – übersprungen`);
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name, "de"));

const kacheln = haeuser.map((h) => `
      <a class="haus-kachel" href="haeuser/${esc(h.ordner)}/">
        <span class="emoji">${esc(h.emoji)}</span>
        <strong>${esc(h.name)}</strong>
        <small>${esc(h.beschreibung)}</small>
      </a>`).join("");

const vorlage = readFileSync(join(ROOT, "index.html"), "utf8");
const seite = vorlage
  .replace("<!-- HAEUSER -->", kacheln)
  .replace("<!-- ANZAHL -->", haeuser.length === 1 ? "<b>1</b> Haus steht schon" : `<b>${haeuser.length}</b> Häuser stehen schon`);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const teil of ["assets", "haeuser"]) if (existsSync(join(ROOT, teil))) cpSync(join(ROOT, teil), join(DIST, teil), { recursive: true });
rmSync(join(DIST, "haeuser", "_vorlage"), { recursive: true, force: true });
writeFileSync(join(DIST, "index.html"), seite);
console.log(`✅ Stadt gebaut: ${haeuser.length} Häuser → dist/`);
