// Code and printed output shown when a project row opens on the home and projects pages.
// Copied verbatim from the project pages (content/projects/*.md).

export type Snippet = { lang: 'R' | 'Python'; file: string; code: string; output: string; note?: string; figure?: string };

export const snippets: Record<string, Snippet> = {
  'simpsons-paradox': {
    lang: 'R',
    file: 'simpsons-paradox.qmd',
    code: `penguins %>%
  select(species, sex, body_mass_g) %>%
  group_by(species, sex) %>%
  summarize(mean = mean(body_mass_g))`,
    output: `# A tibble: 8 × 3
# Groups:   species [3]
  species   sex     mean
  <fct>     <fct>  <dbl>
1 Adelie    female 3369.
2 Adelie    male   4043.
3 Adelie    <NA>     NA
4 Chinstrap female 3527.
5 Chinstrap male   3939.
6 Gentoo    female 4680.
7 Gentoo    male   5485.
8 Gentoo    <NA>     NA`,
    figure: '/media/projects/simpsons-paradox/unnamed-chunk-3-1.png',
    note: 'The box plots suggest a sex difference in body mass for gentoo penguins, which may not hold for Adélie and chinstrap.',
  },
  'headline-sentiment': {
    lang: 'Python',
    file: 'headline-sentiment.ipynb',
    code: `model = germansentiment.SentimentModel()
predictions = model.predict_sentiment(texts)

for text, prediction in zip(texts, predictions):
  print(text, "\\n", prediction)`,
    output: `Meta-Chef Zuckerberg trifft Donald Trump in Mar-a-Lago
 neutral
Dienstag: Intel-CEO muss unerwartet gehen, Apple soll Mitarbeiter ausspionieren
 negative
Bitcoin überwindet die Schwelle von 100.000 US-Dollar
 neutral`,
  },
};
