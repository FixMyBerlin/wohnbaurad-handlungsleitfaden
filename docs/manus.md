# Inhalte mit Manus bearbeiten

Leitfaden für die Arbeit an den Inhalten des Handlungsleitfadens mit Manus. Stand: 23.11.2026.

## Worum es geht

Manus schreibt und ändert die Inhalte für das Repo [FixMyBerlin/wohnbaurad-handlungsleitfaden](https://github.com/FixMyBerlin/wohnbaurad-handlungsleitfaden). Manus hat keine Rechte in der Organisation FixMyBerlin. Es hat ein **eigenes GitHub-Konto**, arbeitet dort in einem **Fork** des Repos und öffnet von dort jeweils einen Pull Request. Dieser Ablauf ist mit Manus bereits erprobt. `main` des Original-Repos kann Manus nicht ändern. Gemergt wird von Menschen: Sine, Johanna oder Henri.

**Voraussetzung:** Das Repo ist öffentlich, sobald Sine mit Manus arbeitet (siehe unten „Vorher im Repo einstellen“). Wie das geht, steht im Skill **`edit-content`** (`.agents/skills/edit-content/`). Manus liest ihn und hält sich an die Regeln darin.

**Welche Bausteine es gibt:** Die interne Seite [https://wohnbaurad.netlify.app/intern/bausteine](https://wohnbaurad.netlify.app/intern/bausteine) zeigt jeden Baustein mit Beispiel und dem MDX-Code zum Kopieren. Sie ist nur in der Vorschau erreichbar, nicht auf der fertigen Website.

**Manus darf:** Seiten schreiben, Platzhalter durch echte Inhalte ersetzen, Quellen, Glossarbegriffe, Downloads, Förderprogramme und Akteur:innen ergänzen.

**Manus darf nicht:** Code oder Gestaltung ändern, Inhalte erfinden, Rechtstexte ohne Freigabe der Kanzlei ändern oder direkt auf `main` arbeiten.

## Vorher im Repo einstellen (Johanna)

Bevor Sine startet:

1. **Repo öffentlich machen.** Vorher die Lizenz der Inhalte klären (Plan A1) und das Repo auf interne Daten prüfen (Plan A7).
2. **GitHub Actions für Fork-PRs:** In den Repo-Einstellungen festlegen, ob CI-Läufe aus Forks freigegeben werden müssen. Für das Manus-Konto entweder einmal freigeben oder es als Collaborator ohne Schreibrechte eintragen.
3. **Sine Merge-Rechte geben:** Sines GitHub-Konto bekommt Schreibrechte im Repo, damit sie PRs mergen kann.
4. **`main` schützen:** Branch-Schutz für `main`, Änderungen nur per Pull Request mit grüner CI, kein direkter Push. Mit Schreibrechten könnte Sine sonst auch direkt auf `main` pushen.
5. **Netlify Deploy-Previews für Forks:** In den Netlify-Site-Einstellungen Deploy-Previews auch für PRs aus Forks erlauben, sonst gibt es für Manus-PRs keine Vorschau.

## Einmal einrichten: ein Manus-Projekt (Sine)

Sine legt in ihrem Manus ein eigenes **Projekt** an. Skills und Anweisung darin gelten nur für Aufgaben in diesem Projekt, nicht für Sines übrige Arbeit in Manus ([Manus-Doku zu Projekten](https://manus.im/docs/features/projects)).

1. **GitHub-Verbindung:** Manus nutzt sein eigenes GitHub-Konto. Das ist bereits eingerichtet.
2. **Projekt anlegen:** „WohnBauRad Handlungsleitfaden“.
3. **Projekt-Skill hinzufügen:** In der Skill-Bibliothek *des Projekts* (nicht in der allgemeinen) den Skill aus dem Repo importieren, Ordner `.agents/skills/edit-content`. Er heißt danach `edit-content` und lässt sich per `/edit-content` aufrufen.
4. **Projekt-Anweisung setzen** (Text unten). Sie enthält bewusst keine eigenen Regeln, sondern verweist auf `AGENTS.md` und den Skill im Repo. So werden Regeln nur an einer Stelle gepflegt.

### Text für die Projekt-Anweisung

> Du arbeitest an den Inhalten des Handlungsleitfadens WohnBauRad im GitHub-Repo FixMyBerlin/wohnbaurad-handlungsleitfaden.
> Lies vor jeder Aufgabe die Datei `AGENTS.md` im Repo-Root und nutze den Skill `edit-content`. Die Regeln dort gelten; bei Widersprüchen gilt das Repo, nicht diese Anweisung.
> Du hast keine Schreibrechte im Repo: Arbeite im Fork in deinem GitHub-Konto, bring ihn vor jeder Aufgabe auf den Stand von `main` des Original-Repos, lege einen Branch an, führe `bun run check` aus und öffne einen Pull Request ins Original-Repo. Schick mir danach den Link zum PR und zur Netlify-Vorschau mit den geänderten Seiten. Ändere keinen Code und keine Gestaltung. Erfinde keine Inhalte, Lücken bleiben `PLATZHALTER:`.

### Den Skill aktuell halten

- **Maßgeblich ist der Skill im Repo.** Wenn sich Bausteine oder Felder ändern, wird er dort angepasst. Danach in Manus den Projekt-Skill neu importieren, sonst arbeitet Manus mit dem alten Stand.
- **Vorschläge von Manus:** Manus kann nach einer Aufgabe vorschlagen, Anweisung, Dateien oder Skills des Projekts zu ändern, übernimmt sie aber nur mit Freigabe. Solche Vorschläge nicht in Manus freigeben, sondern an Johanna geben. Sie kommen ins Repo, dann wird neu importiert. Sonst laufen Repo und Manus auseinander.

*Beim ersten Durchlauf prüfen:* Liest Manus die `AGENTS.md` wirklich? Test: Manus fragen, was die Regel zu Code-Kommentaren sagt. Die steht nur in der `AGENTS.md`.

## Ablauf pro Aufgabe

1. **Eine Aufgabe = eine Seite oder ein Thema = ein Pull Request.** Kleine PRs lassen sich schneller prüfen.
2. **Quellmaterial mitgeben:** Abschnitt aus dem Arbeitspapier, Studie, Notizen als Datei oder Text. Was nicht im Material steht, bleibt `PLATZHALTER:`.
3. **Prompt schicken** (Vorlagen unten).
4. **Manus arbeitet:** Fork aktualisieren, Branch anlegen, Dateien ändern, `bun run check` ausführen, Commit, Pull Request aus dem Fork ins Original-Repo. Zum Schluss schickt Manus den Link zum PR und zur **Netlify-Vorschau** (`https://deploy-preview-<PR-Nummer>--wohnbaurad.netlify.app`), dazu die direkten Links auf die geänderten Seiten.
5. **Prüfen:**
   - Im Pull Request muss der grüne CI-Haken stehen. Bei PRs aus Forks startet die CI eventuell erst nach einer Freigabe durch jemanden mit Rechten im Repo. Ist sie rot, Manus die Fehlermeldung beheben lassen.
   - Netlify baut zu jedem PR eine **Vorschau** (Link im PR, nicht öffentlich auffindbar). Dort die Seite ansehen.
6. **Review und Merge:** Sine prüft Vorschau und CI und mergt den PR selbst. Ändert ein PR doch Code, Gestaltung oder Rechtstexte, mergt sie ihn nicht, sondern gibt ihn an Johanna oder Henri. Nach dem Merge steht der Inhalt auf https://wohnbaurad.netlify.app/.

## Prompt-Vorlagen

**Seite schreiben**

> Nutze den Skill `edit-content`.
> Schreibe die Seite „Rechtliche Grundlagen“ (`src/content/pages/recht/grundlagen.mdx`) auf Basis des angehängten Materials. Behalte die vorhandenen Zwischenüberschriften und ersetze die `PLATZHALTER:`-Texte. Was im Material nicht steht, bleibt `PLATZHALTER:`. Jede Zahl und jede rechtliche Aussage bekommt eine Quelle mit `<Cite>`, neue Quellen trägst du in `sources.yaml` ein.
> Lege im Fork einen Branch `inhalt/recht-grundlagen` an, führe `bun run check` aus und öffne einen Pull Request ins Original-Repo. Liste im PR alle verbleibenden Platzhalter dieser Seite auf. Schick mir danach den Link zum PR und zur Netlify-Vorschau der Seite.

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
