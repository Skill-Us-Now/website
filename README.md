# Skill Us Now

**Das Community-Projekt von Skill Me Now – live unter [skillusnow.de](https://skillusnow.de).**

Teilnehmende und das Team von Skill Me Now bauen mit ihrer eigenen KI echte Web-Projekte. Jedes Projekt bekommt
eine eigene Adresse wie `gewichttracker.skillusnow.de`. Projekte werden unter [skillusnow.de/start](https://skillusnow.de/start)
mit dem Skill-Me-Now-Konto angelegt – die [Anleitung](https://skillusnow.de/anleitung/) erklärt jeden Schritt für Mac und Windows.

## Was liegt in diesem Repository?

Nur die **gemeinsame Hauptseite** – die Projekte selbst liegen auf dem Server.

```
index.html          ← Startseite, lädt die Projektliste von /api/projekte.json
anleitung/          ← Schritt-für-Schritt-Anleitung
assets/             ← Gestaltung
scripts/bauen.mjs   ← baut dist/
scripts/pruefen.mjs ← prüft Dateitypen und versehentlich eingefügte Geheimnisse
```

## An der Hauptseite mitarbeiten

Für Fortgeschrittene, die Teamarbeit mit Git lernen wollen: Fork → Branch → Pull Request.
Vorher `node scripts/pruefen.mjs` ausführen. Jeder Pull Request braucht eine Freigabe aus dem Team und ist
danach innerhalb einer Minute live. Sag deiner KI zuerst: **„Lies AGENTS.md und halte dich an die Regeln.“**
