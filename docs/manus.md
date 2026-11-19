# Inhalte mit Manus bearbeiten

Leitfaden für die Arbeit an den Inhalten des Handlungsleitfadens mit Manus. Stand: 19.11.2026.

## Worum es geht

Manus schreibt und ändert die Inhalte direkt im Repo [FixMyBerlin/wohnbaurad-handlungsleitfaden](https://github.com/FixMyBerlin/wohnbaurad-handlungsleitfaden) und öffnet dafür jeweils einen Pull Request. Wie das geht, steht im Skill **`edit-content`** (`.agents/skills/edit-content/`). Manus liest ihn und hält sich an die Regeln darin.

**Manus darf:** Seiten schreiben, Platzhalter durch echte Inhalte ersetzen, Quellen, Glossarbegriffe, Downloads, Förderprogramme und Akteur:innen ergänzen.

**Manus darf nicht:** Code oder Gestaltung ändern, Inhalte erfinden, Rechtstexte ohne Freigabe der Kanzlei ändern oder direkt auf `main` arbeiten.

## Einmal einrichten

1. **GitHub-Verbindung:** In Manus ist das Konto mit Zugriff auf das private Repo verbunden. Das ist bereits erledigt.
2. **Skill importieren:** In Manus unter *Skills* den Skill aus GitHub importieren. Quelle ist das Repo, Ordner `.agents/skills/edit-content`. Der Skill heißt danach `edit-content` und lässt sich per `/edit-content` aufrufen.
3. **Nach Änderungen am Skill neu importieren:** Wenn sich Bausteine oder Felder ändern, wird der Skill im Repo angepasst. Dann in Manus neu importieren, sonst arbeitet Manus mit dem alten Stand.

*Noch zu prüfen beim ersten Durchlauf:* wie der Import in Manus genau heißt, und ob Manus auch die `AGENTS.md` des Repos liest (offene Frage A2 im technischen Plan). Der Skill ist so geschrieben, dass er auch ohne `AGENTS.md` reicht.

## Ablauf pro Aufgabe

1. **Eine Aufgabe = eine Seite oder ein Thema = ein Pull Request.** Kleine PRs lassen sich schneller prüfen.
2. **Quellmaterial mitgeben:** Abschnitt aus dem Arbeitspapier, Studie, Notizen als Datei oder Text. Was nicht im Material steht, bleibt `PLATZHALTER:`.
3. **Prompt schicken** (Vorlagen unten).
4. **Manus arbeitet:** Branch anlegen, Dateien ändern, `bun run check` ausführen, Commit, Pull Request.
5. **Prüfen:**
   - Im Pull Request muss der grüne CI-Haken stehen. Ist er rot, Manus die Fehlermeldung beheben lassen.
   - Netlify baut zu jedem PR eine **Vorschau** (Link im PR, nicht öffentlich auffindbar). Dort die Seite ansehen.
6. **Review und Merge:** Johanna oder Henri sehen sich den PR an und mergen ihn. Danach steht der Inhalt auf https://wohnbaurad.netlify.app/.

## Prompt-Vorlagen

**Seite schreiben**

> Nutze den Skill `edit-content` im Repo FixMyBerlin/wohnbaurad-handlungsleitfaden.
> Schreibe die Seite „Rechtliche Grundlagen“ (`src/content/pages/recht/grundlagen.mdx`) auf Basis des angehängten Materials. Behalte die vorhandenen Zwischenüberschriften und ersetze die `PLATZHALTER:`-Texte. Was im Material nicht steht, bleibt `PLATZHALTER:`. Jede Zahl und jede rechtliche Aussage bekommt eine Quelle mit `<Cite>`, neue Quellen trägst du in `sources.yaml` ein.
> Lege einen Branch `inhalt/recht-grundlagen` an, führe `bun run check` aus und öffne einen Pull Request. Liste im PR alle verbleibenden Platzhalter dieser Seite auf.

**Quellen und Literatur ergänzen**

> Nutze den Skill `edit-content`. Trage die angehängten Veröffentlichungen in `src/content/sources.yaml` ein: Belege als `type: evidence`, Leseempfehlungen als `type: literature` mit `topics`. Branch `inhalt/quellen`, `bun run check`, Pull Request.

**Förderprogramme**

> Nutze den Skill `edit-content`. Lege für jedes Programm aus der angehängten Liste eine Datei unter `src/content/funding-programs/` an. Setze `updatedAt` auf das Datum der Recherche. Erfinde keine Förderquoten oder Fristen: Was nicht in der Liste steht, lässt du weg. Branch `inhalt/foerderprogramme`, `bun run check`, Pull Request.

**Glossar**

> Nutze den Skill `edit-content`. Ergänze die angehängten Begriffe in `src/content/glossary.yaml` und verlinke jeden Begriff beim ersten Vorkommen auf den Seiten in Kapitel 4 mit `<GlossaryTerm>`. Branch `inhalt/glossar`, `bun run check`, Pull Request.

**Überblick, was noch offen ist**

> Nutze den Skill `edit-content`. Führe `bun run placeholder-check` aus und fasse zusammen, welche Seiten noch wie viele Platzhalter haben. Ändere nichts.

## Gute Praxis

- **Konkret beauftragen:** welche Datei, welches Material, was bleibt Platzhalter.
- **Nichts erfinden lassen:** Manus soll Lücken als `PLATZHALTER:` stehen lassen und im PR auflisten, statt sie zu füllen.
- **Rechtstexte:** Seiten mit `<LegalNotice>` und Vorlagen unter `public/downloads/` nur ändern lassen, wenn die Freigabe der Kanzlei vorliegt. Im PR vermerken, wer freigegeben hat.
- **Ton:** Ansprache „Sie“, gendern mit Doppelpunkt (Mieter:innen). Das steht im Skill, bei Abweichungen trotzdem darauf hinweisen.
- **Bausteine:** Wenn Manus einen Baustein braucht, den es nicht gibt, soll es das im PR beschreiben und keinen Code ändern. Neue Bausteine baut das Entwicklungsteam.

## Wenn etwas schiefgeht

| Problem | Was tun |
|---|---|
| CI im PR ist rot | Fehlermeldung an Manus geben und beheben lassen. Die häufigsten Fehler und ihre Lösung stehen im Skill unter „Wenn `bun run check` scheitert“. |
| Manus kann `bun run check` nicht ausführen (Node oder Bun fehlt) | Kein Problem, die CI prüft im PR dasselbe. Manus soll es im PR vermerken. |
| Manus hat Code oder Gestaltung geändert | PR nicht mergen, Manus die Änderung zurücknehmen lassen. |
| Ein Baustein fehlt oder sieht falsch aus | An Johanna melden. |
| Die Vorschau zeigt alte Inhalte | Ein paar Minuten warten, Netlify baut nach jedem Push neu. |
