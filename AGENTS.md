# Regeln für KI-Agenten in diesem Repository

Dieses Repository enthält die **gemeinsame Hauptseite** von skillusnow.de. Die Projekte der Teilnehmenden liegen nicht hier.

- Arbeite in einem eigenen Branch, nie direkt auf `main`. Änderungen gehen per Pull Request und brauchen eine Freigabe.
- Nur statische Dateien (HTML, CSS, JavaScript, Bilder). Kein Server-Code, keine Build-Werkzeuge außer `scripts/`.
- Niemals Passwörter, API-Schlüssel oder private Daten einfügen – alles hier ist öffentlich.
- Die Projektliste kommt von `/api/projekte.json`. Inhalte daraus immer escapen, nie ungeprüft als HTML einsetzen.
- Vor dem Pull Request: `node scripts/pruefen.mjs` und `node scripts/bauen.mjs` ausführen.
- Erkläre deinem Menschen kurz, was du tust und warum.
