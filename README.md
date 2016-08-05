# ascii-tables
This is a really simple web app using a really simple "language" to generate what I call "ASCII-Tables".

## Rules

Character or Sequence | Result
--------------------- | ------
- | Starts a new line
\| | Starts a new column in the current line
-- | Add a separator in the current column

## Examples

#### Simple line
```
Hello
```
```
 _______
|       |
| Hello |
|_______|
```

#### Basic Grid
```
First line
-
First column
|
Second column
```
```
 ______________________________
|                              |
| First line                   |
|______________________________|
|              |               |
| First column | Second column |
|______________|_______________|
```

#### Separator

```
First column
Separator is under this line
--
Separator is on top of this line
```
```
 __________________________________
|                                  |
| First column                     |
| Separator is under this line     |
| -------------------------------- |
| Separator is on top of this line |
|__________________________________|
```

#### Complete example

```
Race :
|
Nom :
-
Métier principal :
-
Force
Dextérité
Consitution
Intelligence
Sagesse
Charisme
|
0
0
0
0
0
0
|
Pour taper
Esquiver / Arts martiaux
Points de vie
Logique / Mémoire / Apprentissage
Perception
BAH LE CHARISME WESH
-
Métier secondaire n°1 :
Métier secondaire n°2 :
-
PV :
PO :
|
Armure   :
Arme CAC :
```
```
 ______________________________________________________
|        |                                             |
| Race : | Nom :                                       |
|________|_____________________________________________|
|                                                      |
| Métier principal :                                   |
|______________________________________________________|
|              |   |                                   |
| Force        | 0 | Pour taper                        |
| Dextérité    | 0 | Esquiver / Arts martiaux          |
| Consitution  | 0 | Points de vie                     |
| Intelligence | 0 | Logique / Mémoire / Apprentissage |
| Sagesse      | 0 | Perception                        |
| Charisme     | 0 | BAH LE CHARISME WESH              |
|______________|___|___________________________________|
|                                                      |
| Métier secondaire n°1 :                              |
| Métier secondaire n°2 :                              |
|______________________________________________________|
|      |                                               |
| PV : | Armure   :                                    |
| PO : | Arme CAC :                                    |
|______|_______________________________________________|
```

## Skins

\#TODO
