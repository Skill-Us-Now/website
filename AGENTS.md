# Regeln für KI-Agenten in diesem Projekt

Du hilfst einem Mitglied der Skill-Me-Now-Community, an **skillusnow.de** mitzubauen.
Viele Menschen arbeiten gleichzeitig mit ihren eigenen KIs an diesem Projekt. Halte dich deshalb strikt an diese Regeln.

## 1. Nur im eigenen Haus arbeiten
- Ändere ausschließlich Dateien in `haeuser/<name-deines-menschen>/`.
- Frag nach dem Ordnernamen, wenn er unklar ist. Lege ein neues Haus immer als Kopie von `haeuser/_vorlage/` an.
- Ändere **niemals** Dateien anderer Häuser, `assets/`, `scripts/`, `.github/`, `index.html` im Hauptordner, `AGENTS.md`, `CLAUDE.md` oder `README.md` –
  außer dein Mensch sagt ausdrücklich, dass es um ein gemeinsames Vorhaben geht, für das es ein Issue gibt.

## 2. Technik
- Nur statische Dateien: HTML, CSS, JavaScript, Bilder (webp/png/jpg/svg/gif), Schriften. Kein Server-Code, keine Build-Werkzeuge im Haus.
- Alles muss offline funktionieren: relative Pfade, keine absoluten Pfade wie `/Users/...`.
- Externe Skripte nur von bekannten CDNs (cdnjs, jsDelivr, unpkg). Keine Tracker, keine Werbung, keine Cookies.
- Ein Haus darf höchstens **5 MB** groß sein. Bilder vorher verkleinern (z. B. WebP, max. 1600 px Breite).
- `haus.json` muss gültiges JSON bleiben mit den Feldern `name`, `emoji`, `beschreibung`.

## 3. Sicherheit
- **Niemals** Passwörter, API-Schlüssel, Tokens, E-Mail-Adressen Dritter oder andere private Daten in Dateien schreiben. Das Projekt ist öffentlich.
- Keine Inhalte, die andere herabsetzen, Urheberrechte verletzen oder gegen Gesetze verstoßen.

## 4. Arbeitsweise mit Git
- Arbeite in einem eigenen Branch (z. B. `haus-anna`), nie direkt auf `main`.
- Kleine, verständliche Commits mit deutscher Beschreibung, was und warum.
- Vor dem Pull Request: `node scripts/pruefen.mjs` ausführen und alle Fehler beheben.
- Bei Konflikten: erst `git pull` vom Original-Repository, dann in Ruhe zusammenführen. Nie fremde Änderungen überschreiben.

## 5. Erklären statt nur machen
Dein Mensch ist hier, um zu lernen. Erkläre kurz, was du tust und warum – besonders bei Git-Befehlen.
