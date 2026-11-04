# Bausteine für Inhaltsseiten

Alle Bausteine stehen in jeder MDX-Datei ohne Import zur Verfügung. Andere Komponenten oder HTML gibt es nicht. Props in Anführungszeichen, Zahlen in `{}`.

| Baustein | Props | Inhalt (Kinder) | Beispiel |
|---|---|---|---|
| `Infobox` | `variant?`: `info` (Standard) \| `tip` \| `warning`; `title?` | Markdown | `<Infobox variant="tip" title="Gut zu wissen">Text</Infobox>` |
| `LegalNotice` | `variant?`: `page` (Standard) \| `templates`; `reviewedBy?`; `reviewedAt?` (Datum `2026-11-30`) | keine | `<LegalNotice reviewedBy="Kanzlei X" reviewedAt="2026-11-30" />` |
| `Checklist` | `title` | eine Markdown-Liste mit `- [ ]`, mit Leerzeilen davor und danach | siehe unten |
| `Cite` | `id` (aus `sources.yaml`) | keine, steht direkt hinter dem Satz | `Satz.<Cite id="bmvi-2018" />` |
| `Download` | `id` (aus `downloads.yaml`) | keine | `<Download id="nutzungsvereinbarung" />` |
| `KeyFigures` | – | `KeyFigure`-Bausteine | siehe unten |
| `KeyFigure` | `value` (Text), `source` (Quellen-ID, Pflicht) | kurzer Text | `<KeyFigure value="80 %" source="bmvi-2018">aller Wege beginnen oder enden zu Hause</KeyFigure>` |
| `Steps` | – | `Step`-Bausteine | siehe unten |
| `Step` | `title`, `who?`, `output?` | optional Markdown | `<Step title="Fläche prüfen" who="Liegenschaften" output="Flächenliste" />` |
| `ScreenshotStep` | `step` (Zahl), `image` (Pfad unter `src/assets/`), `alt` (Pflicht) | Bildunterschrift | `<ScreenshotStep step={1} image="screenshots/suche.png" alt="Suchfeld des Flächen-Finders">Adresse eingeben</ScreenshotStep>` |
| `ButtonLink` | `href`, `variant?`: `primary` \| `secondary`, `icon?`: `download` \| `external` \| `arrow` | Beschriftung | `<ButtonLink href="/werkzeuge-und-praxis/flaechen-finden" icon="arrow">Zum Flächen-Finder</ButtonLink>` |
| `Button` | `variant?`, `type?`: `button` \| `submit` | Beschriftung | selten nötig |
| `ButtonGroup` | – | mehrere `ButtonLink` | siehe unten |
| `GlossaryTerm` | `id` (aus `glossary.yaml`) | optional: sichtbarer Text, sonst der Begriff | `<GlossaryTerm id="verkehrssicherungspflicht" />` |
| `Literature` | `topic?`, `ids?` | keine; listet Quellen mit `type: literature` | `<Literature topic="bike-parking" />` |
| `StakeholderCards` | – | `StakeholderCard`-Bausteine | siehe unten |
| `StakeholderCard` | `name`, `type`, `interest`, `influence`: `high` \| `medium` \| `low` | Tipp für die Ansprache | siehe unten |
| `FundingProgram` | `id` (Dateiname in `funding-programs/`) | keine | `<FundingProgram id="stadt-und-land" />` |
| `FundingPrograms` | `level?`: `federal` \| `state` \| `eu` | keine; listet alle passenden | `<FundingPrograms level="federal" />` |
| `ExampleMap` | `example` (ID eines Beispielgebiets) | keine | `<ExampleMap example="muenchen-nord" />` |
| `ChapterTiles` | – | keine; nur Startseite | `<ChapterTiles />` |

## Mehrzeilige Beispiele

```mdx
<Checklist title="Befragung vorbereiten">

- [ ] Umfang mit der Unternehmenskommunikation klären
- [ ] Datenschutz klären

</Checklist>

<KeyFigures>
  <KeyFigure value="80 %" source="bmvi-2018">aller Wege beginnen oder enden zu Hause</KeyFigure>
</KeyFigures>

<Steps>
  <Step title="Fläche identifizieren" who="Liegenschaften" output="Flächenliste" />
  <Step title="Bedarf mit der Kommune abgleichen" />
</Steps>

<StakeholderCards>
  <StakeholderCard name="Straßenverkehrsbehörde" type="Verwaltung" interest="Verkehrssicherheit" influence="high">
    Früh einbinden, wenn Flächen öffentlich genutzt werden.
  </StakeholderCard>
</StakeholderCards>

<ButtonGroup>
  <ButtonLink href="/downloads" icon="download">Alle Vorlagen</ButtonLink>
</ButtonGroup>
```

Die Beispiel-IDs oben (`bmvi-2018`, `nutzungsvereinbarung` …) gibt es erst, wenn sie in den Datendateien angelegt sind.
