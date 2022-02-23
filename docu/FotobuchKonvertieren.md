# Fotobuch konvertieren
Zuerst brauchen wir die Datei, die mit Hilfe von Cewe-Fotobuch erstellt wurde. Da jeder seine eigenen Ideen zum Speicherort hat, gibt es hier keine allgemeine Regel.
Im Normalfall suchen wir nach einer Datei und einem Ordner. Die Datei hat die Erweiterung mcf, also z.B. MeinSuperFotobuch.mcf. Der dazu passende Ordner beinhaltet die Fotos, die später im fertigen Buch zu sehen sind.
Und jetzt gehts los
- [Admin starten](#admin-starten)
- [Project erstellen](#project-erstellen)
- [Medien anpassen](#medien-anpassen)
- [Medien hochladen](#medien-hochladen)
- [Steurdaten erstellen](#steuerdaten-erstellen)
- [Der erste Test](#der-erste-test)

Nachdem das alles gut gelaufen ist, können wir uns mit dem beschäftigen, was JUMbook uns alles bietet. Wie Videos eingebunden werden, usw. usw. steht im [Adminbuch](https://www.github.com/jumjum123/JUMbook/docu/Adminbuch.md)
Auch der etwas komplexere Bereich der [Gesichtserkennung](https://www.github.com/JUMbook/docu/Gesichtserkennung.md) wird in einer eigenen Docu weiter erläutert.

## Admin starten
Das ist der einfachste Teil. Nach dem Kopieren der Dateien von Github finden wir im Ordner https://www.meinServer.de/JUMbook die Datei JUMbookAdmin.html. Die wird gestartet, und wir finden dort 3 farblich unterschiedene Blöcke.

## Project erstellen
Im zweiten der Blöcke finden wir das Project handling. Ganz links ist die Liste der schon vorhandenen Projekte. Diese Liste ist beim ersten Versuch logischerweise leer. Als nächstes finden wir Buttons, um ein schon vorhandenes JUMbook zu starten. Mehr dazu ist in einer anderen Docu zu finden.
Der letzte Block ganz rechts ist unser Ziel. Zuerst wird im Textfeld der Wunschname unseres neuen Projekts eingegeben. Dieser muss nicht mit dem Namen des ursprünglichen Fotobuchs übereinstimmen.
Als nächstes selektieren wir die .mcf Datei des zu übertragenden Fotobuches.
Jetzt noch den Button "Create New Book" betätigen, und es geht los. Am Ende dieser Aktion haben wir neue Ordner in /Multibook/Multibooks und in JUMbook/Multibooks.

## Medien anpassen
Bilder mit einem Fotoapparat haben meist eine sehr hohe Qualität. Diese kommt auf den üblichen Bildschirmen nicht zum tragen. Dafür erhöht sie die Menge an Daten, die gelesen werden, enorm. Deshalb empfehle ich, die Bilder mit Werkzeugen wie FastStone PhotoResizer zu bearbeiten. Durch Änderung der Qualität auf 70% kann man die Grösse enorm ändern. Achtung, nicht die Abmasse des Bildes ändern, ansonsten passen Steuerdaten und das Fotobuch nicht mehr zusammen.
Kommen wir jetzt zu anderen Medien. Gerne werden im Urlaub kleine Videos erstellt. Auch diese sind im Rohformat sehr gross. Ich benutze hier den Freemake Video Downloader, um auf kleinere Dateien zu kommen. Dafür habe ich mir auch eine Lizenz gekauft, war nicht teuer, und für gute Software kann man auch mal etwas zahlen.

## Medien hochladen
Jetzt gehts es weiter zum 3. Block. Er unterstützt das Hochladen der Mediendateien über den Browser. Natürlich kann man auch die Dateien über FTP oder WinSCP zum Server hochladen. Dazu finden sich im Ordner Multibook/MeinProjekt die Ordner Audios, Images und Videos.

## Steuerdaten erstellen
JUMbook nutzt eigene JSON-Dateien für die interne Verwaltung der Dateien. Diese werden im dritten Block mit dem Button Create All Lists erzeugt.
Daneben finden wir noch einen weiteren Button. Beim Bearbeiten der Bilder im letzten Schritt wird je nach benutztem Werkzeug der Dateityp der Bilder verändert. Und dieser Button sorgt dafür, dass die Steuerdaten dies übernehmen.
Im letzten Block finden wir auch noch einige Hilfen. Interessant im Moment ist Check missing Images. Damit werden Bilder angezeigt, die in den Steuerdaten, aber nicht in den Bildern gefunden werden.

## Der erste Test
Das ist relativ einfach. Wenn bisher alles gut gelaufen ist, betätigen wir im zweiten Block den Button Show. Es sollte jetzt ein neuer Tab erscheinen, in dem wir das Ergebnis bewundern können.
