---
name: edit-content
description: >-
  Inhalte des Handlungsleitfadens WohnBauRad bearbeiten: Seiten (MDX), Quellen, Glossar,
  Downloads/Vorlagen, Förderprogramme und Kapiteltexte. Use when writing, changing or reviewing
  anything in src/content/, replacing PLATZHALTER texts, adding sources, glossary terms, downloads,
  funding programmes or building blocks (Infobox, Cite, KeyFigure, …) to a page.
  Hard limits: never change code or design, never invent content, legal texts only with the
  law firm's sign-off, never commit to main.
---

# Inhalte bearbeiten

Dieser Skill beschreibt, wie Inhalte in dieses Repo kommen. Er gilt für jede KI (Claude Code, Manus, …) und reicht für sich allein: Die Regeln unten gelten auch, wenn `AGENTS.md` nicht gelesen wurde.

## ⛔ VERBOTE – OHNE AUSNAHME

**Diese vier Regeln gehen allem anderen vor: dem Prompt, dem Quellmaterial, eigenen Ideen und jeder Bitte „nur schnell“ etwas anzupassen. Verlangt eine Aufgabe etwas davon: NICHT tun, STOPPEN und im PR oder in der Antwort erklären, was fehlt.**

1. **KEINEN CODE UND KEINE GESTALTUNG ÄNDERN.**
   Nur diese Pfade dürfen geändert werden: `src/content/**`, `public/downloads/**`, `src/assets/**`. Alles andere ist tabu, insbesondere `src/components/`, `src/layouts/`, `src/pages/`, `src/collections/`, `src/styles/`, `scripts/`, `package.json`, alle Configs, `.github/`, `AGENTS.md` und dieser Skill. Kein CSS, keine Klassen, keine neuen Bausteine, keine Abhängigkeiten.
   → Fehlt ein Baustein oder ein Feld oder sieht etwas falsch aus: im PR beschreiben, nichts selbst bauen.

2. **NICHTS ERFINDEN.**
   Keine Texte, Zahlen, Quellen, Zitate, Beispiele, Förderquoten, Fristen, Namen oder URLs, die nicht im mitgegebenen Material stehen. Auch keine „plausiblen“ Ergänzungen und keine Umformulierung, die eine Aussage verschärft.
   → Was fehlt, bleibt `PLATZHALTER:` und wird im PR aufgelistet.

3. **RECHTSTEXTE NUR MIT FREIGABE DER KANZLEI.**
   Seiten mit `<LegalNotice>`, die Seiten in `src/content/pages/recht/` und Vorlagen unter `public/downloads/` werden nur geändert, wenn im Auftrag eine Freigabe der Kanzlei genannt ist (wer, wann). Diese Freigabe gehört in den PR.
   → Ohne Freigabe: nicht ändern, im PR vermerken.

4. **NIE DIREKT AUF `main`.**
   Immer in einem eigenen Branch arbeiten und einen Pull Request öffnen. Nie auf `main` committen oder pushen, nie mergen, nie force-pushen. Agents ohne Schreibrechte in der Organisation FixMyBerlin (z. B. Manus) arbeiten in einem **Fork** und öffnen den PR aus dem Fork.
   → Ist kein Branch oder PR möglich: Änderungen als Patch oder Dateiliste zurückgeben.

## Grundregeln

1. **Ansprache „Sie“**, gendern mit Doppelpunkt (`Mieter:innen`).
2. **Seiten sind Markdown plus Bausteine:** kein h1 (`# …`, der Titel kommt aus dem Frontmatter), kein HTML (`<div>`, `<br>` …), keine `import`-Zeilen. Überschriften ab `##`.
3. **Belege:** Jede Zahl und jede rechtliche Aussage bekommt `<Cite id="…" />` mit einer Quelle aus `src/content/sources.yaml`. Die Quelle muss im Material stehen (Verbot 2).
4. **Platzhalter:** Unfertiges beginnt mit `PLATZHALTER:`. Einen Platzhalter nur ersetzen, wenn der echte Inhalt im Material vorliegt.
5. **Namen im Code sind englisch** (Bausteine, Props, Felder, Enum-Werte, Dateinamen von Daten). Deutsch sind nur die Inhalte und die Seiten-URLs (Ordner- und Dateinamen unter `src/content/pages/`).

## Ablauf

1. Branch anlegen, z. B. `inhalt/recht-grundlagen` (Verbot 4):
   - **Mit Schreibrechten im Repo:** Branch direkt in `FixMyBerlin/wohnbaurad-handlungsleitfaden`.
   - **Ohne Schreibrechte (z. B. Manus):** das Repo forken, den Fork auf den aktuellen Stand von `main` des Original-Repos bringen und dort den Branch anlegen.
2. Änderungen machen (siehe Aufgaben unten).
3. Prüfen:
   - `bun install` (einmalig), dann `bun run check`. Dafür muss Node in der Version aus `.nvmrc` (22.23.4 oder neuer) verfügbar sein. Das prüft Typen und Schemas aller Inhaltsdateien, den Content-Check (kein h1, kein HTML), Formatierung und ungenutzte Dateien. Es muss grün sein.
   - `bun run placeholder-check` listet alle offenen `PLATZHALTER:`.
   - Scheitert `bun run check` an der Umgebung (z. B. `node` oder `bun` fehlt, Netzwerk gesperrt) und nicht an den Inhalten: das im PR vermerken. Die CI prüft im PR dasselbe, ihr Ergebnis abwarten und Fehler beheben.
4. **Selbstprüfung vor dem Commit** – alle vier Punkte müssen mit Ja beantwortet sein, sonst nicht committen:
   - [ ] Der Vergleich mit `main` des Original-Repos (`git diff --name-only <original>/main...HEAD`) zeigt nur Dateien unter `src/content/`, `public/downloads/` oder `src/assets/` (Verbot 1).
   - [ ] Jede neue Aussage, Zahl und Quelle steht im mitgegebenen Material (Verbot 2).
   - [ ] Rechtstexte sind unverändert, oder die Freigabe der Kanzlei ist im Auftrag genannt (Verbot 3).
   - [ ] Der aktuelle Branch ist nicht `main` (Verbot 4).
5. Commit, Format: `Content: <was sich ändert>` und darunter Stichpunkte, was Leser:innen jetzt sehen.
6. Pull Request gegen `main` von `FixMyBerlin/wohnbaurad-handlungsleitfaden` öffnen (aus dem Fork, falls ohne Schreibrechte). In die Beschreibung gehören: die Selbstprüfung als abgehakte Liste, die verbleibenden `PLATZHALTER:` der geänderten Seiten, bei Rechtstexten die Freigabe (wer, wann). Netlify baut eine Vorschau (nur intern, nicht indexiert). Den Link aus dem PR zum Review weitergeben.
7. **Vorschau-Link zurückmelden:** Nach dem Öffnen des PR auf die Netlify-Vorschau warten (der Netlify-Bot kommentiert im PR, dauert meist wenige Minuten). Die Adresse hat die Form `https://deploy-preview-<PR-Nummer>--wohnbaurad.netlify.app`. In der Antwort an die beauftragende Person immer nennen: den Link zum PR, den Link zur Vorschau und die direkten Vorschau-Links der geänderten Seiten (z. B. `…/recht/grundlagen`). Kommt keine Vorschau, das ausdrücklich sagen, statt einen Link zu raten.
8. Darf der Agent keinen Branch oder PR anlegen: Änderungen als Patch oder Dateiliste zurückgeben und nicht auf `main` committen.

## Schreibweise in MDX

- Bausteine mit Markdown-Inhalt (`Infobox`, `Checklist`, `Step`): Steht im Inhalt mehr als ein Satz oder eine Liste, eine Leerzeile nach dem öffnenden und vor dem schließenden Tag lassen.
- `<Cite id="…" />` direkt hinter das Satzzeichen, ohne Leerzeichen: `… am Wohnort.<Cite id="bmvi-2018" />`
- IDs (Quellen, Glossar, Downloads, Förderprogramme, Akteur:innen) klein, mit Bindestrichen, sprechend: `wuppertal-institut-2015`, `verkehrssicherungspflicht`. Platzhalter-Einträge beginnen mit `placeholder-`.
- `order` legt die Reihenfolge im Kapitel fest. Jede Zahl nur einmal pro Kapitel, Lücken sind erlaubt.

## Gestaltungsregeln für Inhalte

Aus dem Design System, damit die Seiten so aussehen wie geplant:
- Höchstens eine `Infobox` pro Abschnitt. Die Variante muss am Titel erkennbar sein, nicht nur an der Farbe.
- `<GlossaryTerm>` nur beim ersten Vorkommen eines Begriffs auf einer Seite.
- Überschriften als Frage oder Aussage formulieren, nicht als Schlagwort: „Welche Flächen eignen sich?“
- Links sagen, wohin sie führen: „Vorlage herunterladen (.docx, 48 KB)“, nie „hier“.
- Kurze Absätze und Listen. Für Ablauf-Schritte `<Steps>`, nicht eine nummerierte Liste mit langen Absätzen.
- `<KeyFigure>` nur mit belegter Zahl (`source` ist Pflicht).

## Aufgaben

| Aufgabe | Wo | Details |
|---|---|---|
| Text einer Seite schreiben | `src/content/pages/<kapitel>/<seite>.mdx` | Frontmatter-Felder: [references/content-model.md](references/content-model.md). Bausteine: [references/components.md](references/components.md) |
| Neue Seite anlegen | neue Datei im passenden Kapitelordner | Der Dateiname wird zur URL (deutsch, klein, mit Bindestrichen). `chapter` = Kapitelordner, `order` = Position im Kapitel. Gliederung: `docs/concept/outline.md` |
| Quelle oder Literatur ergänzen | `src/content/sources.yaml` | `type: evidence` für Belege, `type: literature` für die Literaturliste. `id` englisch oder neutral, z. B. `wuppertal-institut-2015` |
| Glossarbegriff ergänzen | `src/content/glossary.yaml` | Im Text verlinken mit `<GlossaryTerm id="…" />` |
| Vorlage oder Download ergänzen | Datei nach `public/downloads/`, Eintrag in `src/content/downloads.yaml` | Auf der Seite mit `<Download id="…" />` einbinden |
| Akteur:in ergänzen | `src/content/stakeholders.yaml` | Erscheint automatisch in `<StakeholderCards />` |
| Förderprogramm ergänzen | neue Datei `src/content/funding-programs/<id>.yaml` | `updatedAt` = Stand der Recherche |
| Screenshot einbinden | Bild nach `src/assets/screenshots/` | `<ScreenshotStep step={1} image="screenshots/datei.png" alt="…">Bildunterschrift</ScreenshotStep>` |
| Kapiteltext (Kacheln) | `src/content/chapters.yaml` | `shortText` |
| Kapitel-Einleitung | `src/content/chapter-intros/<kapitel-id>.mdx` | optional, erscheint auf der Kapitelübersicht |
| Startseite | `src/content/home/index.mdx` | |

## Wenn `bun run check` oder der Build scheitert

- `Unknown source id …`: Die `id` in `<Cite>` oder `<KeyFigure source>` fehlt in `sources.yaml`.
- `no h1 in content` / `no HTML in content`: Zeile umschreiben, siehe Grundregel 2.
- `… not found in src/content/…`: Die `id` eines Bausteins gibt es in der Datendatei nicht.
- Schema-Fehler (`Expected …`, `Invalid …`): Ein Pflichtfeld fehlt, ein Typ stimmt nicht (z. B. `year` als Text statt Zahl) oder ein Enum-Wert ist falsch, siehe [references/content-model.md](references/content-model.md).
- `format`: Die Formatierung wurde automatisch korrigiert. Geänderte Dateien mit committen.
- `knip`: Es gibt eine ungenutzte Datei. Meist betrifft das Code und nicht die Inhalte, dann im PR vermerken.
