// Prüft das Projekt vor dem Live-Gang: Häuser gültig, nicht zu groß, keine Geheimnisse, keine verbotenen Dateien.
// Aufruf: node scripts/pruefen.mjs            → prüft alles
//         node scripts/pruefen.mjs datei1 …   → prüft nur diese geänderten Dateien (GitHub-Prüfung)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const MAX_HAUS = 5 * 1024 * 1024;
const ERLAUBT = new Set([".html", ".css", ".js", ".json", ".md", ".txt", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".ico", ".woff", ".woff2", ".mp3", ".mp4", ".webm"]);
const GEHEIM = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "privater Schlüssel"],
  [/\b(sk|pk|rk)_(live|test)_[A-Za-z0-9]{16,}/, "Zahlungs-API-Schlüssel"],
  [/\bsk-[A-Za-z0-9_-]{20,}/, "KI-API-Schlüssel"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS-Schlüssel"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, "GitHub-Token"],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, "Google-API-Schlüssel"],
  [/xox[abpr]-[A-Za-z0-9-]{10,}/, "Slack-Token"],
  [/(password|passwort|api[_-]?key|secret)\s*[:=]\s*["'][^"']{8,}["']/i, "Passwort oder Schlüssel im Klartext"],
];

const fehler = [];
const dateienIn = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = join(dir, e.name);
  return e.isDirectory() ? dateienIn(p) : [p];
});

const argDateien = process.argv.slice(2).map((d) => join(ROOT, d)).filter((d) => existsSync(d));
const zuPruefen = argDateien.length ? argDateien : ["index.html", "anleitung", "assets"].flatMap((t) => { const p = join(ROOT, t); return existsSync(p) ? (statSync(p).isDirectory() ? dateienIn(p) : [p]) : []; });

// 1. Jede Datei: erlaubter Typ, keine Geheimnisse
for (const f of zuPruefen) {
  const rel = relative(ROOT, f);
  if (!ERLAUBT.has(extname(f).toLowerCase())) fehler.push(`${rel}: Dateityp ${extname(f) || "(ohne Endung)"} ist nicht erlaubt`);
  if (statSync(f).size < 2 * 1024 * 1024 && /\.(html|css|js|json|md|txt|svg)$/i.test(f)) {
    const text = readFileSync(f, "utf8");
    for (const [muster, was] of GEHEIM) if (muster.test(text)) fehler.push(`${rel}: sieht nach ${was} aus – bitte entfernen (das Projekt ist öffentlich)`);
    if (/\/Users\/|C:\\Users\\/.test(text)) fehler.push(`${rel}: enthält einen Pfad von deinem Rechner – bitte relative Pfade nutzen`);
  }
}

if (fehler.length) {
  console.error(`❌ ${fehler.length} Problem(e) gefunden:\n` + fehler.map((f) => "  • " + f).join("\n"));
  process.exit(1);
}
console.log("✅ Alles in Ordnung – bereit für den Pull Request.");
