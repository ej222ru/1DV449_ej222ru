# 1DV449_ej222ru

Webbserver> http://ej.3space.info/Lab1_WT2/index.php

####Finns det några etiska aspekter vid webbskrapning. Kan du hitta något rättsfall?
* Kan ta information som är upprättshovsskyddad och om inte det så i alla fall information som någon kanske betalat pengar för att få ha på sin sida. 
* Kan användas för att spionera på konkurrenter map pris och utbud på så sätt lägga sig bättre och då få genomslag på publika prisjämförelsesiter
* Om man skrapar ex vis LinkedIn på info om personer för att sedan använda det i sin affärsverksamhet, något som LinnkedIn annars tar betalt för
* Craiglist vs 3taps Inc, Paddmapper Inc  and iscover Home Network Inc hävdade brott mot
 * Copyright
 * Trespass to goods
 * Breach of contract 
* Feist Publications v. Rural Telephone Service
 * Duplication of facts is allowed
  
  
####Finns det några riktlinjer för utvecklare att tänka på om man vill vara "en god skrapare" mot serverägarna?
*	Inte överbelasta med frågor
*	Läs igenom terms of use
*	acceptera det som står i Robot.txt
*	identifiera dig genom user agent
*	Ge cred till upphovssiten för att man tagit info därifrån
*	Informera serverägaren att man scrapar

####Begränsningar i din lösning- vad är generellt och vad är inte generellt i din kod?
*	Plockar in länkar som används utan validering att det är förväntade länkar
*	Hårdkodade namn Friday, Saturday, Sunday som matchas mot andra hårdkodade namn fre, lor och son
*	Förutsätter vissa format ex vis ”sat1618” att de tre första tecknen är en kod för veckodag och att position 3-5 är starten på filmen
*	Day  index och movie index är hårdkodade när man hämtar filmer
*	Koden är mycket svårbegriplig utan kommentarer, egenskaper som bollas och jämförs med olika arrayer 

####Vad kan robots.txt spela för roll?
*	Meningen är att webbrobotar ska leta efter denna fil och ta hänsyn till vad som står i den
*	Kan hjälpa till att hålla trafik borta från sidor man inte vill ha icke auktoriserad trafik till
*	Om den inte finns kan det påverka presetanda på webbplatsen
*	Kan också uppmuntra sökningar på dessa sidor av hackare etc då man tydliggör vad man vill skydda
*	Kan göra att man får lägre rating av sökmotorer ... eller högre
