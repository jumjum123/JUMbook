# JUMbook
# Vom Fotobuch zum Medienbuch
Es ist bei uns zur Regel geworden, nach jedem Urlaub wird ein Fotobuch erstellt. Meist haben sich Unmengen an Fotos angesammelt, daraus wird dann eine dickes Buch, in dem man gerne mal blättert. Für uns hat sich das Cewe Fotobuch bewährt, auch wenn es hier und da verbessert werden könnte.
Im Urlaub sind aber auch noch andere Erinnerungen entstanden, wie Videos, das rauschende Meer, aber auch einfache Kommentare.
Ein Fotobuch kann teuer werden, 100 € sind schnell erreicht. Sobald man es anderen zeigen will, muss man sich treffen, die alten, nicht wirklich beliebten, Dia-Vorträge lassen grüssen.
So kam schnell die Frage, ob man das Fotobuch ins Internet bringen könnte. Und wenn man schon dabei ist, könnte man ja auch die anderen Quellen irgendwie einbinden. Wie wäre es damit, wir
- [nehmen uns das Fotobuch](#nehmen-uns-das-fotobuch)
- [übersetzen es für den Browser](#übersetzen-es-für-den-browser)
- [ergänzen Seiten und Bilder mit Zusatzinfos](#ergänzen-seiten-und-bilder-mit-zusatzinfos)
- [hängen Videos, Sounds, Links rein](#hängen-videos,-sounds,-links-rein)
- [schaffen eine Übersetzung mit Sprachausgabe](#schaffen-eine-übersetzung-mit-sprachausgabe)
- [bieten Plugins an, z.B. Listen für einfache Suchen](#bieten-plugins-an)
- [spielen zur Personenerkennung etwas mit KI rum](#spielen-etwas-mit-ki-zur-gesichtserkennung-rum)
- [bauen natürlich ein paar Admin Seiten](#bauen-natürlich-ein-paar-admin-seiten)
- [unterstützen einen Autorun Modus](#unterstützen-einen-autorun-modus)
- [und schwupp haben wir das JUMbook](#und-schwupp-haben-wir-das-jumbook)
- [mit all seinen Macken](#mit-all-seinen-macken)

## nehmen uns das Fotobuch
Bei der Erstellung des CEWE-Fotobuches ensteht eine Datei mit der Extension mcf. Dahinter steckt eine XML formatierte Datei. Diese wird in JSON übersetzt, ist halt mehr Javascript like als XML.

## übersetzen es für den Browser
Dies wird dann an einen in Javascript geschriebenen Interpreter übergeben, der daraus HTML Seiten baut. Zusätzliche Buttons werden eingeblendet, wie z.B. Blättern.
Und das ganze soll möglichst auch von CD oder USB-Stick laufen.
Gleich ein Hinweis, es werden nicht alle Optionen auch im Browser unterstützt, dazu sind sie zu vielfältig.

## ergänzen Seiten und Bilder mit Zusatzinfos
Die Seiten haben üblicherweise einen Zusammenhang, der sich als Titel nutzen lässt. Später bei den Plugins finden wir dann eine Funktion, die bei der Suche helfen.
Dies gilt erst recht für die einzelnen Bilder. Oft hängen kleine Geschichten dahinter. Die Bilder selber zeigen auch schon mal nur Ausschnitte, und dann wäre es schön, das ganze zu sehen. Und darin kann man dann auch scrollen und zoomen.
## hängen Videos, Sounds, Links rein
Videos, also eigentlich nur Buttons zum Aufruf werden an Bilder angehängt. Das gleiche gilt für Links, zum Beispiel zu Webcams im Internet.
Bei der Anzeige der Seiten kann auch eine Audiodatei abgespielt werden. Ist z.B. doch nett, wenn bei den Bildern aus Wien der passende Marsch ertönt.
## schaffen eine Übersetzung mit Sprachausgabe
Beim Aufruf der Bilder wird der hinterlegte Text auch gesprochen. Dafür könnte man sich selbst aufnehmen, einfacher ist die Google Sprachausgabe.
Bei uns hat es sich eingebürgert schon während des Urlaubs Kurzberichte an die Familie zu schicken. Diese Mails werden dann ans Ende des Fotobuchs gesetzt.
Immer wieder teilen wir die Bücher im Internet mit Freunden in anderen Ländern. Da sind die deutschen Mails nur bedingt hilfreich. Deshalb kommt die nächste Unterstützung von Google. Grössere Texte können in viele andere Sprachen übersetzt, und dann auch in dieser Sprache vorgelesen werden. Laut Freunden ist die Übersetzung z.B. in Japanisch, erstaunlich gut.
## bieten Plugins an
Mit Hilfe von Plugins können Listen eingeblendet werden, die z.B. Videos mit den entsprechenden Seiten anzeigen.
Oder auch eine Tabelle, die alle Videos über QR-Code zugänglich macht.
## spielen etwas mit KI zur Gesichtserkennung rum
Mit Hilfe von TensorFlow im Browser kann man inzwischen auch erstaunlich viel erkennen. Online brauchen diese Funktionen eine Menge an CPU. Deshalb ist die Erkennung in Admin Funktionen ausgelagert. Die Ergebnisse, wo ist wer zu sehen, werden einmalig erstellt, und bei Mouseover eingeblendet.
Eine rudimentäre Ersetzung von Gesichtern ist auch möglich, wenn man also Tante Gerda durch Marlene Dietrich ersetzen will, dann mal los.
Direkt eine Warnung, wer hier 100%ige Ergebnisse erwartet, liegt schief. Da sind verschiedene Apps auf dem Handy besser.
## bauen natürlich ein paar Admin Seiten
JUMbook versucht, auch ohne tiefere Kenntnisse der unterlegten JSON-Dateien auszukommen. Für den totalen Newbie wird es wohl trotzdem schwer zu verstehen sein, was man z.B. für die Gesichtserkennung machen muss.
## unterstützen einen Autorun Modus
Auch diese Funktion ist eher rudimentär: Es werden die Seiten der Reihe nach aufgerufen. Auf den Seiten werden zufällig einzelne Bilder geöffnet um die hinterlegten Texte zu zeigen. Mein Bedarf ist da bisher nicht entstanden, aber vielleicht in der Zukunft, ....
## und schwupp haben wir das JUMbook
Sorry, aber der Name gefällt mir halt. Enstanden ist er aus der Kombination jun JUM und book. Book erklärt sich von alleine, ist halt dás Buch auf Englisch.
JUM hingegen ist beim Spielen in meiner Jugend entstanden. Zusammen mit einem Freund wurde damals ein Detektivbüro gegründet. Wir gingen, bewaffnet mit Erbsenpistolen auf die Jagd nach Verbrechern. Mein Name war damals JUMJUM. Der andere war Siegfried, wir haben uns aus den Augen verloren. Wenn der geneigte Leser vielleicht dieser Siegfried ist, ....
## mit all seinen Macken
JUMbook ist ein gewachsenes Werkzeug, und erfüllt seinen Zweck für mich. Gewachsen bedeutet üblicherweise, dass man dabei immer wieder etwas dazu gelernt hat. Und erfüllt seinen Zweck heisst, dass ich damit klar komme.
In Summe, vermutlich sind einige Ungereimtheiten und holpriges Interface drin. Vielleicht sogar noch ein paar dieser kleinen Käfer, auch Bugs genannt. Naja, wenn jemand da was findet, immer her damit. Wenn das mit einer Idee kommt, wie man es besser machen kann, umso besser.