# Admin im JUMbook
Nachdem wir das Fotobuch in JUMbook convertiert haben, siehe [Fotobuch konvertieren](https:www.github.com/jumjum123/JUMbook/FotobuchKovertieren.md) wollen wir natürlich die neuen Funktionen nutzen.
Dazu gehen wir wie folgt vor:
- [Admin starten](#admin-starten)
- [Project als Admin aufrufen](#project-aufrufen)
- [Attribute für Seite](#attribute-für-seite)
- [Attribute für Bilder](#attribute-für-bilder)
- [Plugins](#plugins)

Nachdem wir das alles gemacht haben, können wir zum nächsten Test kommen.
Was wir da alles haben finden wir im [Manual](https://(https://www.github.com/jumjum123/JUMbook/docu/Manual.md)

## Admin starten
Nehmen wir mal zuerst den einfachen Weg. Wir starten im Ordner https://www.meinServer.de/JUMbook die Datei JUMbookAdmin.html.
Dort wählen wir im zweiten Block unser bereits angelegtes Project. Dann ein Click auf den Button, und es sollte das entsprechende JUMbook in einem neuen Tab erscheinen.

## Project aufrufen
Ein anderer Weg ist die manuelle Eingabe des entsprechenden URL.
Dies ist https://www.meinServer.de/JUMbook/JUMbookViewer.html?fotobook=meinProject&adminmode=true

## Attribute für Seite
Wechseln wir also zum Tab mit dem JUMbook. Dort sehen wir die erste Seite.
Im oberen Teil stehen einige Zahlen, die zur entsprechenden Seite führen.
Ganz rechts sind noch zwei weitere Button, ganz rechts >>> wechselt zur nächsten Seite. Davor ist ein Schlüssel zu sehen. Der führt uns zur Admin Funktion.
Ein kleiner Tip, manchmal füllen Bilder das gesamte Fenster. Dann sind die Buttons möglicherweise nur schlecht zu erkennen. Da hilft es die Maus nach oben zu bewegen, beim Mouseover werden dann die Buttons mit Hintergrund versehen.
#### Header
Header ist der Titel der aktuellen Seite. Dieser wird beim Mousover der Seitennummer angezeigt. Ausserdem hilft diese Angabe bei verschiedenen Plugins. Aber dazu später.
#### Backnoise
Backnoise ist eine Audiodatei, die beim Anzeigen der Seite gestartet wird. Dies kann z.B. das Meeresrauschen am Strand sein. Im Internet gibt es einige Quellen für Sounds. Oder man blendet beim Wien-Buch den Radetzky Marsch ein, oder ...
#### Save und exit
Bei Save wird die gerade erfolgte Änderung zuerst im Browser gespeichert. Dann erfolgt die Frage, ob sie zum Server hochgeladen werden soll.
Exit bedeutet verlassen ohne speichern.
Zu [Plugins](#plugins) erfahren wir später mehr.

## Attribute für Bilder
Die Adminseite für Bilder erreichen wir im Adminmode über Click auf ein Bild.
Achtung, Hintergrundbilder unterstützen diese Funktion nicht.
#### Title
Wie für die Seite kann man für jedes Bild einen erklärenden Text eingeben. Dieser wird dann im normalen Modus (ohne Autorun) beim Click auf das Bild angezeigt und vorgelesen.
#### Videos
Wie in [Fotobuch konvertieren](https://www.github.com/jumjum123/JUMbook/docu/FotobuchKonvertieren.md) gesehen, können wir Videos hochladen. Diese werden in der Liste angezeigt. Jetzt zeigt sich übrigens, ob wir den Videos sprechende Namen gegebn haben :-)
Durch Click in der rechten Liste wird der Eintrag in die loinke Liste übernommen. Umgekehrt gilt das gleiche.
#### Weburls
Oft findet man im Internet viele Informationen zum Motiv. Dies kann der Wikipedia Eintrag sein, oder eine Webcam, oder...
Hier können wir einen oder mehrere URLS eintragen. Der Komfort dieser Eingabe ist (bisher) nicht sehr hoch. Zwischen den eckigen Klammern werden URL(s) in Hocchkommate, getrennt durch Komma, eingegeben. So wie wir es in einer JSON-Datei auch mahen würden.
#### Save und Exit
Für die Buttons gilt das gleiche wie bei der Seite. Bei Save wird lokal gespeichert, und danach gefragt, ob es im Server gespeichert werden soll. Bei Exit wird ohne Speicherung beendet

## Plugins
Plugins sind immer wieder in Entwicklung. Deshalb hier nur ein kurzer Überblick
#### Videos
Eine Tabelle, welches Bild in welcher Seite zu finden ist. Die Tabelle wird einfach auf der aktuellen Seite eingeblendet, egal ob die Seite Platz dafür hat oder nicht. Ja ich weiss, muss geändert werden.
Zusätzlich werden alle Videos angezeigt, die auf keiner Seite gefunden wurden.
#### addLink2Text
noch nicht genutzt
#### tellAndShow
noch nicht genutzt
#### qrVideos
Erzeugt eine Tabelle mit QR-Codes zu allen Videos. Hilft, wenn man sich die Videos zum Beispiel mit dem Handy ansehen will. Wir haben den Ausdruck davon oft in das Fotobuch eingeklebt. Cewe bietet zwar etwas änhliches an, aber dort werden Videos nach einiger Zeit gelöscht.
#### Faces
Liste aller Gesichter, die auf den Bildern gefunden und erkannt wurden. Mehr dazu in [Gesichtserkennung](https://www.github.com/JUMbook/docu/Gesichtserkennung.md)
