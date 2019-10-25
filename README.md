# hinata 🏐🤖
*(Work in progress)*

Hinata is a bot designed to keep a volleyball team updated about their league with no effort at all.

### Why?

Madrid's Volleyball Federation page is a bit clunky and getting to the desired information can be a pain sometimes.
Also they are not that consistent when it comes to updating the past week results and current standings, so people tend to go to the website often and check if something has been updated.

Well, not anymore. Hinata will do it for you and will let you know as soon as they have updated the site.

I am building this for my gf's volleyball team which I like, but as soon as it is finished I will make it customizable so other teams could use it too!

Also I'm trying to keep brushing up my Javascript skills, and this is a nice way to do so.

### How?

Hinata will download the useful data, serialize it and store it.
It will check the website once in a while to see if something has changed comparing against what it has stored.
If something has changed, it will update the stored data and notify via Telegram to anyone subscribed to it.
User will receive a nice formatted text, targetted for IM apps, that he/she can easily share with anyone, like the one below.

```
Temporada:2019-20
Actividad:3ª DIVISIÓN AUTONÓMICA FEMENINA 3ª DIVISIÓN AUTONÓMICA Liga Regular Grupo A
Jornada:2
Fecha jornada:20-10-2019

=======================

PLAZA CASTILLA vs. SANFER VOLEIBOL
Resultado: 0 - 3
(11 - 25 | 11 - 25 | 12 - 25)

CV MOSTOLES TECNOCASA vs. ABV BOADILLA
Resultado: 1 - 3
(13 - 25 | 25 - 16 | 24 - 26 | 19 - 25)

SALESIANOS SAN MIGUEL SUB 23 vs. CV NUEVA CASTILLA
Resultado: 0 - 3
(13 - 25 | 20 - 25 | 18 - 25)

NEWMAN VERDE vs. CLUB VOLEIBOL TORREJON
Resultado: 2 - 3
(25 - 23 | 25 - 22 | 20 - 25 | 23 - 25 | 11 - 15)

VP MADRID vs. GSD LAS SUERTES
Resultado: 0 - 3
(18 - 25 | 16 - 25 | 13 - 25)

=======================

1 | SANFER VOLEIBOL | 6 Pts | 2 de 2 ganados | Dif. Puntos: 150 - 72
2 | GSD LAS SUERTES | 6 Pts | 2 de 2 ganados | Dif. Puntos: 150 - 104
3 | ABV BOADILLA | 6 Pts | 2 de 2 ganados | Dif. Puntos: 167 - 140
4 | CV NUEVA CASTILLA | 6 Pts | 2 de 2 ganados | Dif. Puntos: 166 - 146
5 | CLUB VOLEIBOL TORREJON | 5 Pts | 2 de 2 ganados | Dif. Puntos: 185 - 165
6 | NEWMAN VERDE | 1 Pts | 0 de 2 ganados | Dif. Puntos: 199 - 201
7 | CV MOSTOLES TECNOCASA | 0 Pts | 0 de 2 ganados | Dif. Puntos: 119 - 167
8 | SALESIANOS SAN MIGUEL SUB 23 | 0 Pts | 0 de 2 ganados | Dif. Puntos: 110 - 150
9 | VP MADRID | 0 Pts | 0 de 2 ganados | Dif. Puntos: 108 - 150
10 | PLAZA CASTILLA | 0 Pts | 0 de 2 ganados | Dif. Puntos: 91 - 150
```

### Hey, that line looks awful, you really should use X instead of Y...

I'm starting simple, then going big.
This is not yet finished and things can be done in a better way, for sure. I'm still catching up.
Anyway, if you really think I'm doing something terribly wrong, feel free to open up an issue! (Please, be kind)

### What's the motive behind the repo's name?

[🏐This kid's fault](https://haikyuu.fandom.com/wiki/Sh%C5%8Dy%C5%8D_Hinata)

