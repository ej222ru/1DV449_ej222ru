# 1DV449_ej222ru

Webbserver> http://ej.3space.info/Lab1_WT2/index.php

####Finns det några etiska aspekter vid webbskrapning. Kan du hitta något rättsfall?
* Kan ta information som är upprättshovsskyddad och om inte det så i alla fall information som någon kanske betalat pengar för att få ha på sin sida. 
* Kan användas för att spionera på konkurrenter map pris och på så sätt lägga sig bättre och då få genomslag på publika prisjämförelsesiter
* Om man skrapar ex vis LinkedIn på info om personer för att sedan använda det i sin affärsverksamhet
* Craiglist vs 3taps Inc, Paddmapper Inc  and iscover Home Network Inc
 * Hävdade brott mot
 * Copyright
 * Trespass to goods
 *Breach of contract 

####Finns det några riktlinjer för utvecklare att tänka på om man vill vara "en god skrapare" mot serverägarna?
*	Inte överbelasta med frågor
*	Ge cred till upphovssiten för att man tagit info därifrån
*	Informera serverägaren att man scrapar

####Begränsningar i din lösning- vad är generellt och vad är inte generellt i din kod?
o	Plockar in länkar som används utan validering att det är förväntade länkar
o	Hårdkodade namn Friday, Saturday, Sunday som matchas mot andra hårdkodade namn fre, lor och son
o	Förutsätter vissa format ex vis ”sat1618” att de tre första tecknen är en kod för veckodag och att position 3-5 är starten på filmen
o	Day  index och movie index är hårdkodade när man hämtar filmer
o	Koden är mycket svårbegriplig utan kommentarer, egenskaper som bollas och jämförs med olika arrayer 

####Vad kan robots.txt spela för roll?
o	Meningen är att webbrobotar ska leta efter denna fil och ta hänsyn till vad som står i den
o	Kan hjälpa till att hålla trafik borta från sidor man inte vill ha icke auktoriserad trafik till
o	Om den inte finns kan det påverka presetanda på webbplatsen
o	Kan också uppmuntra sökningar på dessa sidor av hackare etc då man tydliggör vad man vill skydda
o	Kan kanske göra att man får lägre rating av sökmotorer
