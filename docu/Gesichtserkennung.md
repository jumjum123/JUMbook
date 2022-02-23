# Gesichtserkennung
Gesichter in einem Bild zu erkennen ist ein Schritt der dank KI inzwischen recht einfach implementiert werden kann. Diese Gesichter dann Personen zuzuordnen ist schon etwas interessanter. Aber auch das kann dank passender API realisiert werden. Man sollte jetzt aber nicht eine 100%ige Lösung erwarten. So weit sind wir noch lange nicht.
Und schnell ist das auch noch nicht, es wird doch eine Menge Rechenleistung verbraucht. Deshalb machen wir die Erkennung nur einmal, und merken uns die Koordinaten.
Auf jeden Fall ist dazu eine gewisse Vorarbeit notwendig, wie das bei JUMbook aussieht sehen wir hier:
- [Admin starten](#admin-starten)
- [Bekannte Gesichter](#bekannte-gesichter)
- [Basisdaten](Basisdaten)
- [Gesichter im Project](#gesichter-im-project)
- [Gesichter ersetzen](#gesichter-ersetzen)
- [Plugin](#plugin)

## Admin starten
Das ist der einfachste Teil. Wir starten im Ordner https://www.meinServer.de/JUMbook die Datei JUMbookAdmin.html.
Dort finden wir im ersten und im letzten Block einige Unterstützung.

## Bekannte Gesichter
Damit man Gesichter erkennen kann, muss man zuerst mal wissen wonach man sucht.
Dazu wird je Person ein Ordner eingerichtet. Im ersten Block links geht es los.
Also zuerst den Namen eingeben, und den Button Create new Person klicken. Danach sollte die neue Person auch in der Selectbox zu finden sein.

## Basisdaten
Ein leerer Ordner ist nicht sehr hilfreich. Deshalb füllen wir ihn mit Bildern der Person. Bitte darauf achten, dass man hier Bilder nimmt, die möglichst nur die Person zeigen. Ich habe mich an die Regel gehalten indem es in der Form von Passbildern aus anderen Bildern ausgeschnitten wurde.
Zuerst wird in der Selectbox (erster Block) die Person selektiert. Dann im zweiten Block das Bild auf dem Festspeicher gesucht, und zuletzt mit dem Button upload Face zum Server geschickt.
In der Liste sieht man die vorhandenen Dateien, die einfach mit Nummer benannt sind. Je mehr Bilder hochgeladen werden, desto besser sollte die Erkennung werden. Aber auch bei zwei Bildern klappt es schon recht gut.
Sobald genug Bilder hochgeladen sind, wird mit dem Button Create Person Description eine JSON-Datei erzeugt, die Basisdaten zur Erkennung speichert.
Hier sollte man die einzelnen Bilder auch mal prüfen. Der Button Show zeigt am Ende der Seite das gewählte Bild mit den gefundenen Umrissen.

## Gesichter im Project
Bisher war alles global, nun ab zum Project. Dazu wählt man im zweiten Block das Project aus. Und betätigt dann den Button Create Face Data for Project im letten Admin Block.
Danach werden alle vorhandenen Bilder nach Gesichtern durchsucht. Das kann, je nach CPU, einige Zeit dauern. Deshalb wird neben dem Button angezeigt, wieviel Bilder inzwischen untersucht wurden.

## Gesichter ersetzen
Dieser Teil ist noch in Entwicklung. Im Test klappte es ein Gesicht durch Obama zu ersetzen. Man sieht natürlich, dass da etwas gefakt wird, aber als Spass ist es recht nett. Es fehlt noch eine Adminfunktion, um zu speichern wer duch wen ersetzt werden soll.

## Plugin
Mit Faces gibt es ein Plugin, dass uns zeigt welche Personen auf welcher Seite gefunden wurden. Die meisten werden unbekannt sein.