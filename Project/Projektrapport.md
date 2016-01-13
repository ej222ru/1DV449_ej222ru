
# Projektrapport 1DV449, Erland Jönsson ej222ru


## Inledning

Jag har gjort en applikation som hämtar olika typer av data för kommuner i Stockholm. Dessa används för att göra jämförelser mellan olika kommuner. Vilka kommuner som ska jämföras och med avseende på vilka kriterier väljer användaren i drop down menyer. Jämförelserna presenteras sedan i stapeldiagram. De valda kommunerna markeras på en karta. 
Användaren kan också välja att få se senaste dygnets polisrapporter inplacerade på kartan. Information om dessa visas när användaren klickar på dem.



## Design


* [Server design](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/serverDesign.PNG)
* [Client design](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/clientDesign.PNG)
* [Start sequence](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/StartSequence.PNG)
* [Hämta SCB data sequence](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/getSCBData.PNG)
* [Hämta Brottsplats data sequence](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/brottsplatssequence.PNG)
* [Filträd](https://github.com/ej222ru/1DV449_ej222ru/blob/master/Project/Doc/DirStructure.PNG)
 


### Cache 
Filen log.txt innehåller loggar från vad som redan finns cachat och vad som hämtas från källan samt resultatet av cUrl-operationer.
Övriga filer är resultatet av hämtningar från SCB rörande kommuner och jämförelsekriterie. Filerna heter ”Kommun”+”Kriterie” ex vis ”NackaEgna Hem.txt” och innehåller endast ett värde. 
En förfrågan från klienten om exempelvis data för Danderyd, Nacka och Haninge rörande inkomst kan alltså resultera i att Inkomst för Danderyd redan finns i  kleintens
localStorage och hämtas därifrån, Inkomst för  Nacka finns i cachen på servern och hämtas där medans slutligen Inkomst för Haninge hämtas från SCB.
Efter hela operationen kommer dessa finnas i såväl localStorage på klienten som i cacdhen för servern (då Inkomst för Danderyd även redan fanns i servercachen eftersom den fanns i klientens localStorage)






##	Säkerhet och prestandaoptimering
På server finns en cache implementerad. Om efterfrågad kombination av region (kommun) och jämförelsekriterie har efterfrågats senaste dygnet fins den lagrad på en fil och värdet hämtas då därifrån. Finns den inte eller är äldre än en dag så hämtas informationen från källan. De data som kan efterfrågas i applikationen är inte av föränderlig karaktär och skulle egentligen inte behöva uppdateras så ofta.
Alla css-filer är minifierade. Alla egna script har placerats i en bulkScripts.js som därefter minifierats.
Användarna har inga möjligehter att skriva in egen info i några input fält. De som finns är drop down menyer och en check box, därigenom är vägen in för olika former av angrepp/injections begränsade.



##	Offline-first
*	Den information som redan hämtats från servern finns också sparad i en cache i webbläsaren (local storage). Denna uppdateras när användaren klickar på en knapp på sidan.
*	Om användaren begär jämförelsedata om Danderyd och Nacka för andelen egna hem och hushållsinkomst så läses de först från local storage om de finns där. Den eller de kombinationer av region/kriterie som inte finns där hämtas från servern. Den eller de av dessa som inte finns i servercachen hämtas från källan (SCB). Det betyder alltså om klienten kört programmet ett tag och redan gjort selekteringar så finns dessa lokalt att hämta och visa även om internetkopplingen går ner.

## Risker med applikationen
*	Denna applikation presenterar information om olika generella sociala data om olika kommuner. Den typen av information kan leda till ökad segregation om användare använder den som beslutsunderlag för bostadsort. Även i största allmännhet kan den fungera stigmatiserande och förstärka fördomar och trender. Det får ställas mot att det faktiskt handlar om statistik och data, dessa innehåller i sig inte någon värdering och i ett demokratiskt samhälle ska denna typ av information vara transparent och tillgänglig utan borde snarare tjäna som en väckarklocka för de som kan och vill dra slutsatser och dessutom har verktyg för att genomföra eventuella åtgärder mot oönskade förhållanden. 
*	All inmatning är styrd av menyer och inmatning och är på det sättet stängd för de vanligaste formerna av attacker. Applikationen innehåller heller ingen information som är värd att stjäla.  


## Reflektioner
Det är i största allmänhet en rolig typ av projekt att samla data från olika källor, sammanställa och presentera och på det sättet skapa ett mervärde eller tom helt ny typ av information, dvs det som brukar beskrivas som att 1+1=3.
Utmaningen ligger just i det kreativa att hitta dessa kombinationer av redan befintlig data för att skapa ny information. Min applikation är kanske inte banbrytande i det avseendet men har i alla fall varit rolig att göra. Det handlar ju till stor del om träna sig i själva tekniken. 

####	Jag har fått lägga väldigt mycket tid på problem som jag inte förväntat mig skulle ta mycket tid
*	En arbetsdag på att kunna ställa frågor och tolka svar från SCB. Bland annat att inse att svaren inleddes med BOM-mark som måste filtreras bort
*	En arbetsdag att få till ajax med multichoice
*	En dag på att tweaka bootstrap multiselect
*	Fastnade en dag på felsökning av automatisk reload av sidan i Chrome. Probelemt visade sig finnas i min IDE (NetBeans)
*	En dag på att överföra json request felsvar från php till Javascript. Jag har allmänt lite svårt med json och arrayer.
*	Hade inte designat för offline first. Ytterligare en dag för att primärt implementera detta när det mesta redan var klart
*	Kom fram till att den lösningen/arkitekturen med hur man ställer frågor och hämtar data i kedjan webbläsarcache-server cache-API  i och med införandet av cache i webbläsaren nu var så dålig att jag fick skriva om stora delar. Ytterligare en dag.
*	Få applikationen fungera på webbhotellet. Först fick jag problem med att filer och foldrar är case sensitive vilket inte min miljö på windows är. Felloggningarna antydde helt andra problem. Stal 6 timmar för mig. Sedan visade det sig att det gratiskonto jag hade inte hade öppnat för cUrl, ytterligare några timmar innan jag loggat mig fram till det. Att få reda på vad som går fel i servern är inte så lätt när den ligger på ett webbhotell, jag fick lägga ut loggningar från php till en loggfil för att förstå vad som antagligen var problemet vilket också hade kunnat inses om jag tagit mig tiden att istället läsa FAQ hos webbhotellet. 

* Mycket av tidstjuvarna ovan har sin grund i osäkerhet kring designen när jag startade och jag borde lagt mer tid på det innan jag implementerat för mycket. Sammantaget har jag lagt mer tid på ovanstående typ av problem än själva imlpementation av logik och programflöden. Fokuserade för mycket på att hitta och förstå API:erna istället för att designa vad, när, var och hur data skulle cachas då det styr designen en del. 

## Buggar
I Firefox visar inte hovringen någon info för staplarna i första charten när man har två charts.
Med ”Inspektera element” och med begärd ”visa” en gång till fungerar det. I Chrome och IE fungerar det.

## Vidareutveckling av applikationen 
Det som står på tur är att 
*	Utöka antalet jämförelsekriterier och då hämta data från fler källor. 
*	Implementera att söka på årsserier av vissa kriterier för att se förändringar över tid.
*	Fler typer av chart, exempelvis segment i cirklar (Pie-chart)
*	Fler samtida kriterier som presenteras i flera chart. 
*	Möjlighet att välja bort visning av kartan och därmed ge mer utrymme åt diagram

## Vad jag inte gjorde
Jag hade ursprungligen  tänkt ta in ytterligare en källa med brottsstatistik som historiskt jämförande data mellan kommuner pss som för data från SCB men den källan med ett bra API (http://www.mashup.se/api/brottsstatistik-api-fran-svt-pejl ) har slutat vara tillgänglig och alternativet från BRÅ hade inget vettigt API. Jag har letat efter fler källor med övergripande statistik för kommuner men tyvärr inte hittat någon. Det jag gjorde då istället var att ta in information från brottsplatskartan.se och placerar ut senaste dygnets inrapporterade brott på kartan. Nu verkar det dock som om den infon dom presenterar är ganska ofullständig. Jag vet inte om det beror på brottsplatskartan eller den källa hos polisen som dom hämtar ifrån, men givet senaste veckans mediala diskussion om polisens informationshantering verkar det som att det bara är en del av alla inkomna rappporter som publiceras på polisens web.

