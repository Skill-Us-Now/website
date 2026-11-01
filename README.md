# Skill Us Now 🏙️

**Die Community-Website von Skill Me Now – live unter [skillusnow.de](https://skillusnow.de).**

Hier bauen alle zusammen an einer Website. Jede und jeder bekommt ein eigenes **Haus** in der Community-Stadt
und gestaltet es mit der eigenen KI (Claude Code, Cursor, ChatGPT …). Gemeinsame Bereiche entstehen im Team.

## So machst du mit – in 5 Schritten

1. **Einladung annehmen** – du bekommst eine Einladung in die GitHub-Organisation *Skill-Us-Now*.
2. **Projekt holen** – öffne dieses Repository und klicke auf **Fork**. Dann holst du deine Kopie auf deinen Rechner:
   ```bash
   git clone https://github.com/DEIN-NAME/website.git
   cd website
   ```
3. **Dein Haus anlegen** – kopiere den Ordner `haeuser/_vorlage` nach `haeuser/dein-name` (nur Kleinbuchstaben, Zahlen, Bindestrich).
   Trage in `haus.json` deinen Namen, ein Emoji und einen Satz über dich ein. Gestalte `index.html` – am besten zusammen mit deiner KI.
4. **Vorschau ansehen** – öffne `index.html` einfach im Browser, oder starte `node scripts/bauen.mjs` und öffne `dist/index.html`.
5. **Vorschlag einreichen** – `git add`, `git commit`, `git push` und auf GitHub einen **Pull Request** öffnen.
   Die automatische Prüfung läuft, das Team schaut drüber, und nach der Freigabe ist dein Haus wenige Minuten später live.

## Arbeiten mit deiner KI

Sag deiner KI zuerst: **„Lies AGENTS.md und halte dich an die Regeln.“**
Claude Code liest `CLAUDE.md` sogar automatisch. Die Regeln sorgen dafür, dass niemand aus Versehen das Haus eines anderen kaputt macht.

## Wie die Stadt aufgebaut ist

```
haeuser/            ← hier wohnen alle
  _vorlage/         ← Vorlage für dein neues Haus
  simon/            ← ein Haus = ein Ordner
    haus.json       ← Name, Emoji, Kurzbeschreibung
    index.html      ← deine Seite
assets/             ← gemeinsame Gestaltung (nur nach Absprache ändern)
index.html          ← Startseite (Stadtplan) – wird automatisch erzeugt
scripts/bauen.mjs   ← baut die Stadt aus allen Häusern
```

## Spielregeln

- Du änderst nur **dein eigenes Haus**. Gemeinsame Dateien nur nach Absprache (Issue öffnen).
- **Keine Passwörter, Schlüssel oder privaten Daten** ins Projekt – alles hier ist öffentlich.
- Keine fremden Bilder, Musik oder Texte ohne Erlaubnis. Selbst gemacht oder KI-generiert ist super.
- Freundlich bleiben. Wir lernen alle.

Fragen? Öffne ein **Issue** oder frag im Campus-Chat.
