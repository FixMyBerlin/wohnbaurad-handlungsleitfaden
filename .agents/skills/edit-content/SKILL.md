---
name: edit-content
description: >-
  Inhalte des Handlungsleitfadens WohnBauRad bearbeiten: Seiten (MDX), Quellen, Glossar,
  Downloads/Vorlagen, Förderprogramme und Kapiteltexte. Use when writing, changing or reviewing
  anything in src/content/, replacing PLATZHALTER texts, adding sources, glossary terms, downloads,
  funding programmes or building blocks (Infobox, Cite, KeyFigure, …) to a page.
---

# Inhalte bearbeiten

Dieser Skill beschreibt, wie Inhalte in dieses Repo kommen. Er gilt für jede KI (Claude Code, Manus, …) und reicht für sich allein: Die Regeln unten gelten auch, wenn `AGENTS.md` nicht gelesen wurde.

## Grundregeln (immer)

1. **Nur Inhaltsdateien ändern:** `src/content/**`, `public/downloads/**`, `src/assets/**`. Nie Code (`src/components`, `src/layouts`, `src/pages`, `src/collections`, Configs). Fehlt ein Baustein oder Feld, das Problem beschreiben statt Code zu ändern.
2. **Ansprache „Sie“**, gendern mit Doppelpunkt (`Mieter:innen`).
3. **Seiten sind Markdown plus Bausteine:** kein h1 (`# …`, der Titel kommt aus dem Frontmatter), kein HTML (`<div>`, `<br>` …), keine `import`-Zeilen. Überschriften ab `##`.
4. **Belege:** Jede Zahl und jede rechtliche Aussage bekommt `<Cite id="…" />` mit einer Quelle aus `src/content/sources.yaml`. Keine Belege erfinden.
5. **Platzhalter:** Unfertiges beginnt mit `PLATZHALTER:`. Einen Platzhalter nur ersetzen, wenn der echte Inhalt vorliegt (aus dem Arbeitspapier, von Sine oder von Projektpartnern). Nie mit selbst ausgedachtem Text füllen.
6. **Rechtstexte** (Seiten mit `<LegalNotice>`, Vorlagen unter `public/downloads/`) nur ändern, wenn die Kanzlei sie freigegeben hat. Im PR vermerken, wer freigegeben hat.
7. **Namen im Code sind englisch** (Bausteine, Props, Felder, Enum-Werte, Dateinamen von Daten). Deutsch sind nur die Inhalte und die Seiten-URLs (Ordner- und Dateinamen unter `src/content/pages/`).

## Ablauf

1. Neuen Branch anlegen, z. B. `inhalt/recht-grundlagen`. Nie direkt auf `main` arbeiten.
2. Änderungen machen (siehe Aufgaben unten).
3. Prüfen:
   - `bun install` (einmalig), dann `bun run check`. Das prüft Typen und Schemas aller Inhaltsdateien, den Content-Check (kein h1, kein HTML), Formatierung und ungenutzte Dateien. Es muss grün sein.
   - `bun run placeholder-check` listet alle offenen `PLATZHALTER:`.
   - Scheitert `bun run check` an der Umgebung (z. B. `node` oder `bun` fehlt, Netzwerk gesperrt) und nicht an den Inhalten: das im PR vermerken. Die CI prüft im PR dasselbe, ihr Ergebnis abwarten und Fehler beheben.
4. Commit, Format: `Content: <was sich ändert>` und darunter Stichpunkte, was Leser:innen jetzt sehen.
5. Pull Request öffnen. Netlify baut eine Vorschau (nur intern, nicht indexiert). Den Link aus dem PR zum Review weitergeben.
6. Darf der Agent keinen Branch oder PR anlegen: Änderungen als Patch oder Dateiliste zurückgeben und nicht auf `main` committen.

## Schreibweise in MDX

- Bausteine mit Markdown-Inhalt (`Infobox`, `Checklist`, `Step`): Steht im Inhalt mehr als ein Satz oder eine Liste, eine Leerzeile nach dem öffnenden und vor dem schließenden Tag lassen.
- `<Cite id="…" />` direkt hinter das Satzzeichen, ohne Leerzeichen: `… am Wohnort.<Cite id="bmvi-2018" />`
- IDs (Quellen, Glossar, Downloads, Förderprogramme, Akteur:innen) klein, mit Bindestrichen, sprechend: `wuppertal-institut-2015`, `verkehrssicherungspflicht`. Platzhalter-Einträge beginnen mit `placeholder-`.
- `order` legt die Reihenfolge im Kapitel fest. Jede Zahl nur einmal pro Kapitel, Lücken sind erlaubt.

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
- `no h1 in content` / `no HTML in content`: Zeile umschreiben, siehe Grundregel 3.
- `… not found in src/content/…`: Die `id` eines Bausteins gibt es in der Datendatei nicht.
- Schema-Fehler (`Expected …`, `Invalid …`): Ein Pflichtfeld fehlt, ein Typ stimmt nicht (z. B. `year` als Text statt Zahl) oder ein Enum-Wert ist falsch, siehe [references/content-model.md](references/content-model.md).
- `format`: Die Formatierung wurde automatisch korrigiert. Geänderte Dateien mit committen.
- `knip`: Es gibt eine ungenutzte Datei. Meist betrifft das Code und nicht die Inhalte, dann im PR vermerken.
