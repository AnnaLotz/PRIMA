# PRIMA

Repository für das Modul "Prototyping interaktiver Medien-Apps und Games"


## Abschlussaufgabe
[Link zum Spiel EscapeTheEdge](https://annalotz.github.io/PRIMA/EscapeTheEdge/Main.html)

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Escape The Edge
|    | Name                  | Anna Lotz
|    | Matrikelnummer        | 257449
|  1 | Nutzerinteraktion     |Der Nutzer kann zuerst in einem Menü durch verschiedene Seiten wechseln, dort Informationen über das Spiel lesen oder Musik und Sound ein oder aus schalten. Nun kann er das Spiel starten. Während dem Spiel hat der Nutzer die Möglichkeit die Figur "Bobo" zu steuern. Die Grundsätzliche Bewegung geschieht über die Tasten "A","D" und Leertaste. Damit kann die Figur nach links und rechts bewegt werden und gesprungen werden. So muss er versuchen,  die Spielfigur über verschiedene Platformen hinweg nach oben zu bringen, bis er an der Ziellinie ankommt.
Auf manchen Plattformen laufen Gegner hin und her. Berührt Bobo einen Gegner, so verliert er Leben. Um sich gegen Gegner zu wehren kann der Spieler die linke und rechte Pfeiltaste auf der Tastatur drücken, damit schießt die Spielfigur ein Geschoss nach links oder rechts. Trifft diese einen Gegner, stirbt und verschwindet dieser.
Außerdem kann der Spieler die Größe der Spielfigur und damit seine Sprunghöhe oder -weite ändern. Während er "Pfeiltaste Runter" drückt, wird die Figur klein und kann weiter springen. Während "Pfeiltaste Hoch" gedrückt wird, ist die Figur größer und kann höher springen. Auch dies Kostet Mana, uns zwar immer so lange, wie der Zustand der Größenänderung aktiv ist.
Hat der Spieler sein Mana aufgebraucht, sind diese Aktionen nicht mehr möglich. Um sein Mana wieder zu füllen, kann er Mana-Punkte sammeln, welche auf manchen Platformen liegen.                                                                                                                                               |
|  2 | Objektinteraktion     | Die wohl wichtigste Kollision ist die zwischen Figuren (sowohl Bobo als auch die Gegner) und den Platformen. Die Figuren werden dauerhaft auf eine Kollision mit den Platformen geprüft. Kollidieren diese, wird die Figur auf die Oberseite der Plattform gesetzt. Wenn keine Kollision nach unten zu finden ist, so fällt die Figur herunter, bis sie auf einer Plattform landet. So ist es möglich, dass die Figuren immer auf der Oberseite laufen.
Alle anderen Kollisionen werden über die Entfernung zweier Punkte berechnet. Ist die Entfernung zwischen zwei Objekten geringer als ein bestimmter Wert, so findet hier ein hit statt. So werden Treffer der Kugeln mit den Gegnern, eine Berührung zwischen Bobo und Gegner und das Sammeln von Mana-Punkten berechnet.
Eine unsichtbare Kollision sorgt dafür, dass die Gegner nicht von den Plattformen laufen. Auf der Plattform ist eine unsichtabre Box mit der gleichen Breite. Wenn eine Kollision mit dem Gegner vorhanden ist, läuft dieser normal weiter. Sobald er sich nicht mehr in der Box befindet, dreht er sich um und läuft wieder in die unsichtbare Box hinein und läuft weiter, bis er an der anderen Seite ankommt, usw.                                                                                                                                                                                 |
|  3 | Objektanzahl variabel | Jedes mal, wenn die Figur schießt, wird eine Instanz der Kugel erzeugt und dem Spiel angehangen.                                                                                                                                                      |
|  4 | Szenenhierarchie      | Auf der obersten Ebene ist das "rootNode". An diesem sind 4 Nodes angehangen, welche die Spiel-Elemente beinhalten. "Level" beinhaltet alle floor-Instanzen (Plattformen) und den Boden und die Wände an der Seite. Somit ist es einfach, mit Schleifen durch alle Elemente im gesamten Level zu iterieren um z.B. Kollisionen zu prüfen. Das "Character" Node ist Parent zu der Spielfigur Bobo und allen Gegnern. Im "Items" Node befinden sich die Kugeln, die man schießen kann. Hier ist es gut denkbar, weitere Items wie Gegnerische Kugeln oder Health- oder Mana-Punkte unterzuordnen. Das letzte Kind zum RootNode ist das "mover" Node. Hier dran sind die Camera und das Licht befestigt. So kann bei einer Bewegung des Spielers das "mover"Node in entspechende Richtung bewegt werden und Kamera und Licht folgen diesem. So muss man nicht jedes Element einzeln ansprechen.                                                                                                                                                          |
|  5 | Sound                 | Die meisten Aktionen von Bobo werden durch Sound unterstützt. Dies sind: springen, schießen, kleiner und größer werden. Außerdem gibt es ein auditives Feedback wenn ein Gegner stirbt. Gewinnt oder Verliert man das Spiel werden auch entsprechende Sounds abgespielt. Während des Spiels kann man auch Musik im Hintergrund laufen lassen, diese muss man im Hauptmenü zunächst aktivieren. Diese unterstützt die Atmosphäre eines klassischen 2D-Plattformers.                                                            |
|  6 | GUI                   | Im Startmenü hat der Spieler die Möglichkeit, sich die Steuerung oder die Credits anzeigen zu lassen. Von dort aus kann er wieder zurück ins Hauptmenü. Hier hat er die Möglichkeit, getrennt Sound oder Musik für das nächste Spiel ein oder aus zu schalten. Als wichtigstes ist hier der Start-Button, der das Menü schließt und das Spiel beginnt.
Während dem Spiel zeigen zwei Balken am unteren Canvas-Rand die Gesundheit und den Manastand des Charakters an. Diese aktualisieren sich dauerhaft beim Spielen und geben dem Spieler Rückmeldung, 
Wenn das Spiel gewonnen oder verloren wurde, kann er über einen Button wieder zurück ins Hauptmenü und von vorne beginnen.                                                                                   |
|  7 | Externe Daten         | In der externen Datei "data.json" sind verschiedene Werte gespeichert, welche die Attribute des Spiels festlegen. Man kann die Geschwindigkeit und den Schaden der Gegner anpassen und festlegen, wie schnell die Geschosse von Bobo sind und wie groß die Mana-Kosten fürs schießen und Größe ändern sind.                                                                                   |
|  8 | Verhaltensklassen     | In den Klassen für Bobo und die Gegner sind Methoden, um die Sprite-Animation zu initiieren und anzuzeigen. Außerdem haben beide Methoden, um Kollisionen fest zu stellen. Bobo hat weitergehend Methoden zum schießen und zum Größe wechseln. Um weitere wichtige Methoden zu nennen: BoboBullet hat eine Methode, um einen getroffenen Gegner zu entfernen. Die Klasse Level erstellt in einer Methode das gesamte Level, indem es Instanzen der Klasse Floor erstellt. In dieser werden Gegner erstellt, die immer einer bestimmten Plattform zugeordnet sind. In der Klasse Sound werden in mehreren Methoden die Musik und Soundeffekte gesteuert.                                                                                             |
|  9 | Subklassen            | In den Klassen für Bobo und die Gegner sind Methoden, um die Sprite-Animation zu initiieren und anzuzeigen. Außerdem haben beide Methoden, um Kollisionen fest zu stellen. Bobo hat weitergehend Methoden zum schießen und zum Größe wechseln. Um weitere wichtige Methoden zu nennen: BoboBullet hat eine Methode, um einen getroffenen Gegner zu entfernen. Die Klasse Level erstellt in einer Methode das gesamte Level, indem es Instanzen der Klasse Floor erstellt. In dieser werden Gegner erstellt, die immer einer bestimmten Plattform zugeordnet sind. In der Klasse Sound werden in mehreren Methoden die Musik und Soundeffekte gesteuert. |
| 10 | Maße & Positionen     | Der Koordinatenursprung sitzt am untersten Boden in der Mitte. Der Schacht, den es zu erklimmen heißt, ist in positiver y-Richtung ausgerichtet. Auf der x-Achse sind ca. 3 Einheiten Platz in jede Richtung, somit ist das Spielfeld etwa 6 Einheiten breit. Durch die Wahl dieser Größen sind alle Werte einfach umgänglich, da man sich in einem Bereich zwischen zweistelligen Kommazahlen und zweistelligen Zahlen bewegt.                                                                |
| 11 | Event-System          | Auf Tastendruck der Spielrelevanten Interaktionen werden Events befeuert. Für die Bewegungen für Bobo werden seine Methoden aufgerufen, welche die Geschwindigkeit entsprechend der Interaktion verändert. Wird eine der Pfeiltasten gedrückt, werden Bobos Methoden zu Größenwechsel oder zum schießen aufgerufen. Die update-Funktion und die update-Methoden der Klassen werden bei jedem Loopframe aufgerufen.                                                                                                                                                                                  |

## Alte Aufgaben
[L01_HelloWorld](https://annalotz.github.io/PRIMA/L01_HelloWorld/test.html)

[L02_FirstFudge](https://annalotz.github.io/PRIMA/L02_FirstFudge/Main.html)

[L03_PongPaddles](https://annalotz.github.io/PRIMA/L03_PongPaddles/Main.html)

[L04_MovingBall](https://annalotz.github.io/PRIMA/L04_MovingBall/Main.html)

[L05_PongReflection](https://annalotz.github.io/PRIMA/L05_PongReflection/Main.html)

[L07_FudgeCraftFundament](https://annalotz.github.io/PRIMA/L07_FudgeCraft/Main.html)

[L08_FudgeCraftStart](https://annalotz.github.io/PRIMA/L08_FudgeCraftMyStart/Main.html)

[L08_FudgeCraftNewCollision](https://annalotz.github.io/PRIMA/L08_FudgeCraft_Collision/Main.html)

[L09_FudgeCraft_Camera](https://annalotz.github.io/PRIMA/L09_FudgeCraft_Camera/Main.html)
