---
title: "Sentiment analysis of Google News headlines"
summary: "Scraping news headlines and scoring their sentiment in Python."
year: 2023
kind: "NLP"
tags: ["Python", "Sentiment analysis", "Web scraping"]
order: 6
---

Why news headlines? One reason may be that news headlines are easier to analyse since they are often grammatically correct and….

## Fetch News Headlines

```python
import requests

# API key from newsapi.org
api_key = 'd962237586064b7ea7d8cfdfda47a164'

# URL Parameters
keyword = 'Donald Trump'
language = 'de'
sortBy = 'popularity'
# https://newsapi.org/docs/endpoints/everything

# Add Api to url with parameters
url = f'https://newsapi.org/v2/everything?q={keyword}&language={language}&sortBy={sortBy}&apiKey={api_key}'

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    articles = data["articles"]

    for article in articles:
        print(f"Title: {article['title']}")
        print(f"Description: {article['description']}")
        print(f"URL: {article['url']}")
        print("-" * 50)
else:
    print(f"Error: {response.status_code}")
```

```python
import germansentiment

#print(articles[1]['title'])

texts = []
for article in articles:
  texts.append(article['title'])

model = germansentiment.SentimentModel()
predictions = model.predict_sentiment(texts)

for text, prediction in zip(texts, predictions):
  print(text, "\n", prediction, "\n", "-"*50)
```

```output
Meta-Chef Zuckerberg trifft Donald Trump in Mar-a-Lago
 neutral
 --------------------------------------------------
Donald T. hat ein Herz für Tiktok
 neutral
 --------------------------------------------------
Internetunternehmer Sriram Krishnan wird Trumps Top-Berater für KI
 neutral
 --------------------------------------------------
Akkus für E-Audis: Montagewerk entsteht in Mexiko
 neutral
 --------------------------------------------------
Trump will Musk-Berater mit KI und Kryptowährungen betrauen
 neutral
 --------------------------------------------------
US-Berufungsgericht lehnt TikTok-Antrag auf Aufschub des Verbots ab
 neutral
 --------------------------------------------------
Urteil: Verbot von TikTok in den USA kommt näher – Trump könnte intervenieren
 neutral
 --------------------------------------------------
Dienstag: Intel-CEO muss unerwartet gehen, Apple soll Mitarbeiter ausspionieren
 negative
 --------------------------------------------------
Huawei setzt weiter auf Android-Derivat EMUI 15 für seine Smartphones
 neutral
 --------------------------------------------------
Bitcoin überwindet die Schwelle von 100.000 US-Dollar
 neutral
 --------------------------------------------------
Weißes Haus: Keine Auffälligkeiten bei Drohnensichtungen
 neutral
 --------------------------------------------------
Tiktok-Verbot auf Überholspur zum US Supreme Court
 neutral
 --------------------------------------------------
China leitet Kartelluntersuchung gegen Nvidia ein
 neutral
 --------------------------------------------------
Bitkom-Umfrage: Unternehmen sorgen sich wegen Abhängigkeiten von den USA
 neutral
 --------------------------------------------------
heise+ | Gehaltsreport 2024: Das verdienen IT-Fachkräfte in Deutschland
 neutral
 --------------------------------------------------
Missing Link: Grenzsicherung USA made in Germany
 negative
 --------------------------------------------------
Threads: 35 Millionen Neuanmeldungen in diesem Monat
 positive
 --------------------------------------------------
Nobelpreisträger: Große Technologiesprünge wie KI begünstigen einige Wenige
 neutral
 --------------------------------------------------
Marktmacht "problematisch": FTC leitet Untersuchung gegen Microsoft ein
 neutral
 --------------------------------------------------
SpaceX will texanische Starbase offiziell zu einer Stadt erklären lassen
 neutral
 --------------------------------------------------
Nur noch jede zehnte Desktop-Grafikkarte stammt von AMD
 neutral
 --------------------------------------------------
Groß wie Autos, in Formation: Mysteriöse Drohnen über New Jersey lassen rätseln
 neutral
 --------------------------------------------------
Auf in den Weltraum – Globale Pläne für Reisen ins All
 neutral
 --------------------------------------------------
Donnerstag: Cyberversicherung ohne Mail-Spoofing, Platzprobleme in Amazon-Büros
 negative
 --------------------------------------------------
Die Top 5 Security-Ereignisse 2024 und was sie bedeuten
 neutral
 --------------------------------------------------
IT-Recht und Regulierung: Was 2025 zu erwarten ist
 neutral
 --------------------------------------------------
Treffen mit Donald Trump: Zuckerberg soll "nationale Erneuerung Amerikas" unterstützen
 neutral
 --------------------------------------------------
KI und Kryptowährungen: Trump will David Sacks zum Regierungsbeauftragten machen
 neutral
 --------------------------------------------------
Weltraumpolitik: Eine unabhängige Space Force - Trumps unerledigte Aufgabe
 neutral
 --------------------------------------------------
Amazon und Blue Origin: Bezos findet Trump gar nicht mehr so schlecht
 negative
 --------------------------------------------------
USA: Trump mischt sich in Drohnen-Spekulationen ein
 neutral
 --------------------------------------------------
Raumfahrt: Ein Milliardär könnte der nächste Nasa-Chef werden
 neutral
 --------------------------------------------------
US-Wahlkampf: Musk unterstützte Trump mit mindestens 260 Millionen Dollar
 neutral
 --------------------------------------------------
Donald Trump: Kapitalverbrechen
 neutral
 --------------------------------------------------
Außenpolitik von Donald Trump: Die Welt verhält sich nicht, wie es Donald Trump gefällt
 neutral
 --------------------------------------------------
Donald Trump: Wie gefährlich ist Trump für Europa?
 neutral
 --------------------------------------------------
Donald Trump: Der Don und seine Gang
 neutral
 --------------------------------------------------
Kabinett von Donald Trump: Wer sind die umstrittensten Köpfe an Donald Trumps Seite?
 neutral
 --------------------------------------------------
Donald Trump und Javier Milei: Kampfbrüder gegen den Sozialismus
 neutral
 --------------------------------------------------
Nordamerika: Justin Trudeau trifft Donald Trump in Florida
 neutral
 --------------------------------------------------
Panama-Kanal: Demonstrationen gegen Donald Trump in Panama
 neutral
 --------------------------------------------------
Präsidentschaft von Donald Trump: Wer zynisch wird, schadet sich selbst
 neutral
 --------------------------------------------------
USA: Donald Trump und die "Fake-News-Medien"
 negative
 --------------------------------------------------
Donald Trump: US-Hochschulen raten ausländischen Studenten zu rascher Rückkehr
 neutral
 --------------------------------------------------
USA: Truth-Social-Chef soll Donald Trump zu Geheimdiensten beraten
 neutral
 --------------------------------------------------
USA: Donald Trump dementiert übermäßigen Einfluss von Elon Musk
 neutral
 --------------------------------------------------
Schweigegeld-Prozess: Donald Trumps Anwälte fordern Aufhebung von Schuldspruch
 neutral
 --------------------------------------------------
Verurteilung wegen Betrug: Trump beantragt Annullierung von Millionen-Geldstrafe
 neutral
 --------------------------------------------------
USA: Donald Trump droht erneut mit US-Austritt aus der Nato
 neutral
 --------------------------------------------------
Royale Diplomatie: Prinz William trifft Donald Trump vor Notre-Dame-Eröffnung
 neutral
 --------------------------------------------------
Dänische Insel: Donald Trump fordert "Besitz und Kontrolle" von Grönland durch die USA
 neutral
 --------------------------------------------------
Scott Bessent: Nicht nur Irre
 neutral
 --------------------------------------------------
USA: Mexikos Präsidentin Sheinbaum widerspricht Trump bei "Migrationsstopp"
 neutral
 --------------------------------------------------
Krieg in der Ukraine: Donald Trump sieht in Syrien die Schwäche Wladimir Putins
 neutral
 --------------------------------------------------
Begnadigung von Hunter Biden: Donald Trump wirft Joe Biden "Missbrauch der Justiz" vor
 neutral
 --------------------------------------------------
Georgia: Gericht zieht Chefanklägerin von Wahlbetrug-Prozess um Donald Trump ab
 neutral
 --------------------------------------------------
USA: Trump ernennt Keith Kellog zum Ukraine-Sondergesandten
 neutral
 --------------------------------------------------
Medien: "Time"-Magazin will Trump zur Person des Jahres küren
 neutral
 --------------------------------------------------
USA: Trump ernennt TV-Produzenten zum Sondergesandten für Großbritannien
 neutral
 --------------------------------------------------
Daniel Ziblatt: "Trump wird so weit gehen wie möglich"
 neutral
 --------------------------------------------------
US-Außenpolitik: Donald Trumps Politik kann gut für Europa sein
 neutral
 --------------------------------------------------
US-Präsident: Joe Biden begnadigt seinen Sohn Hunter – Trump spricht von "Missbrauch der Justiz"
 neutral
 --------------------------------------------------
Notre-Dame: Halleluja!
 negative
 --------------------------------------------------
Frankreich: Macron, Trump und Selenskyj treffen sich zu Gespräch in Paris
 neutral
 --------------------------------------------------
Jared Isaacman: Vom Weltraumtouristen zum Nasa-Chef
 neutral
 --------------------------------------------------
Kryptowährungen: Siegeszug der Krypto-Brüder
 neutral
 --------------------------------------------------
US-Zollpläne: Wie Fentanyl aus China in die USA gelangt
 neutral
 --------------------------------------------------
Grönland: Dänemark investiert nach Trumps Anspruch in Grönlands Sicherheit
 neutral
 --------------------------------------------------
Leben in Kalifornien: Die Sonne scheint jedenfalls vorerst weiter
 neutral
 --------------------------------------------------
David Sacks: Trump ernennt Vertrauten von Musk zum Beauftragten für KI und Krypto
 neutral
 --------------------------------------------------
Börse: Dax steigt erstmals auf mehr als 20.000 Punkte
 neutral
 --------------------------------------------------
USA: Trump will Amateur-Astronaut Jared Isaacman zum Nasa-Chef machen
 negative
 --------------------------------------------------
Superreiche in den USA: "Die Macht der Oligarchen ist enorm"
 positive
 --------------------------------------------------
Drohender Shutdown in den USA: Trump und Musk fordern Abgeordnete auf, gegen Übergangsfinanzierung zu stimmen
 neutral
 --------------------------------------------------
Elon Musk: Die Welt ist nicht genug
 negative
 --------------------------------------------------
US-Haushaltsstreit: Eine riskante Machtdemonstration
 neutral
 --------------------------------------------------
Wiedereröffnung von Notre-Dame: Ein Heide in Paris
 neutral
 --------------------------------------------------
Kryptowährungen: Was hinter Trumps Krypto-Deal mit möglichem Islamisten-Helfer steckt
 neutral
 --------------------------------------------------
Russische Wirtschaft: Wie lange hält Russland das durch?
 neutral
 --------------------------------------------------
Bürokratieabbau-Beauftragter : Elon Musk will Verbraucherschutz im US-Finanzsektor abschaffen
 neutral
 --------------------------------------------------
Großbritannien: Elon Musk will britische Rechtspopulisten unterstützen
 neutral
 --------------------------------------------------
Sozialpolitik in den USA: Wie die Demokraten die Arbeitnehmer im Stich ließen
 neutral
 --------------------------------------------------
US-Wahl: Mindestens 250 Millionen Dollar von Musk für Trump-Wahlkampf
 neutral
 --------------------------------------------------
Technologiekonzern: Trump kündigt milliardenschwere Softbank-Investitionen an
 neutral
 --------------------------------------------------
USA: Elon Musk ist größter Einzelspender in der Geschichte der US-Politik
 neutral
 --------------------------------------------------
Wirtschaftspodscast: "Ist das eine Blase?": So schlimm haben es nicht mal die Meerschweinchen erwartet
 negative
 --------------------------------------------------
Elon Musk: Elon Musk beschimpft Bundeskanzler Olaf Scholz
 negative
 --------------------------------------------------
Emmanuel Macron in Polen: Ohne Plan in die Trump-Zeit
 neutral
 --------------------------------------------------
Personalien: Trump will Geschäftsmann zum US-Botschafter in London machen
 neutral
 --------------------------------------------------
Besuch in Frankreich: Trump trifft Prinz William in Paris
 neutral
 --------------------------------------------------
Auslandsreise: Trump reist zur Wiedereröffnung von Notre- Dame nach Paris
 neutral
 --------------------------------------------------
US-Präsident: Joe Biden wandelt 37 Todesstrafen in lebenslange Haft um
 neutral
 --------------------------------------------------
Einwanderung: Mexikos Staatschefin erörtert Migrationspolitik mit Trump
 neutral
 --------------------------------------------------
Geschlechtsidentität: Trump will "Transgender-Irrsinn" stoppen
 neutral
 --------------------------------------------------
Besuch in Frankreich: Trump, Macron und Selenskyj treffen sich zu dritt in Paris
 neutral
 --------------------------------------------------
Künftiger US-Präsident: Trump und Macron planen bilaterales Treffen in Paris
 neutral
 --------------------------------------------------
Vereidigung des US-Präsidenten: Trump hat Xi zu Amtseinführung im Januar eingeladen
 neutral
 --------------------------------------------------
Höhere Zölle: Volkswirte sehen Deutschland nicht vorbereitet auf Trump
 neutral
 --------------------------------------------------
US-Politik: "Time"-Magazin kürt Trump zur "Person des Jahres"
 neutral
 --------------------------------------------------
Bundestagswahl: Scholz fühlt sich bei Taurus-Nein von Trump bestärkt
 neutral
 --------------------------------------------------
```

Back to top
