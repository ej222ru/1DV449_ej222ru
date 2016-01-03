# Lab2 - messy labbage, Erland Jönsson ej222ru

# Säkerhetsproblem

## SQL-injection

#### Problembeskrivning
Öppen för sql-injektions. Det gick att logga in med password ' OR '1'='1 som alltid evaluerar true oavsett användarnamn bara det ser ut som en emailadress.
Man blir då även inloggad som admin.
Man skickar in sql-queryn tillsammans med username och password från browsern. Ingen klientvalidering av inmatade värden sker.
Man får även reda på att tabellnamnet är ”user” direkt genom att läsa koden.

#### Konsekvenser
Databasen kan manipuleras och även i extremfall att hela servern tas över. Kopierad eller ändrad data kan leda till i stort sett obegränsad skada för ägaren.
#### Åtgärd
Separarer osäker data från kommandon och databasfrågor. Ett säkert API är att föredra och om man inte har det se till att ta bort specialtecken från inmatad data. 
Parametriserade frågor och Stored Procedures använda på rätt sätt, alltså med en sriös validering. [1]

## Autentisering och session management

#### Problembeskrivning
Sessionen finns kvar och om någon annan kommer över datorn, ex vis om man använt en dator på ett webb cafe, så kan dom genom historiken direkt plocka upp sidan igen.
#### Konsekvenser
Beror ju helt på applikationen. Förlust av känslig information eller att någon i största allmänhet utger sig för att vara en annan person.
#### Åtgärd
Förstöra sessionen vid utloggning.[2]

## Cross-Site scripting (XSS)

#### Problembeskrivning
Inskickad HTML kod och javascriptkod i formuläret tolkades som det. 
#### Konsekvenser
Användares sessioner kan stjälas och därigenom kunna logga in som den personen. 
#### Åtgärd
Förstöra sessionen vid utloggning.[3]

#### Problembeskrivning
HttpOnly är false. Därigenom kan cookie kommas åt med javascript. 
#### Konsekvenser
Om man hittar en sida som är öppen för XSS så kan då cookie kommas åt och öppnas för hijacking av konto eller session.
#### Åtgärd
Sätt HttpOnly = true.[4]

## Känslig data

#### Problembeskrivning
Känslig data skyddas inte på erforderligt vis. I detta fall handlar det om att password inte är hashat när man tittar i 
databasfilen. 
#### Konsekvenser
Efersom siten är öppen för sql-injection kan denna data kommas åt. Dels så kan användaren senare logga in med denna info, dessutom med kännedom 
om hur vanligt det är att användare har samma lösenord på många siter så blir problemet extra stort.
#### Åtgärd
Lösenord som sparas i databaser ska hashas.[5]

#### Problembeskrivning
Data skickas okrypterat, bl a password vid inloggning.
#### Konsekvenser
Allt är läsbart för de som har möjlighet att lyssna av kommunikationen. 
#### Åtgärd
Använd SSL (HTTPS).[7]


## Cross-Site Request Forgery (CSRF)

#### Problembeskrivning
Genom en säkerhetsbrist så kan man med HTML eller js kan posta data som en annan användare. Det bygger på att en webbapplikation har
autentiserat en användares webbläsare men den är sedan hijackad och postningarna sker från en annan site men genom den. Vanligt är att gömma länkar i bildtaggar då de laddas automatiskt.
#### Konsekvenser
Genom att komma över en annan inloggning kan man göra allt det som ursprungliga användaren kan göra.
#### Åtgärd
Använd en session token i form för validering som ligger gömd i själva sidan. Denna ändras vid varje sidladdning och är inte åtkomlig av kaparen.[6]

# Prestandaproblem 

## Cache

#### Problembeskrivning
Ingenting cachas
#### Konsekvenser
Onödig trafik vid varje postning 
#### Åtgärd
Använd lokal cache i klienten[8]

## Felaktig laddning

#### Problembeskrivning
* Inläsning av meddelanden redan vid inloggningssidan
* Buggar, ”Uncaught TypeError”
* Inläsning av länkar fungerar som inte
* http://localhost:3000/assets/js/ie10-viewport-bug-workaround.js
* http://localhost:3000/static/css/materialize.min.css
* http://localhost:3000/static/js/materialize.js

#### Konsekvenser
Onödig trafik 
#### Åtgärd
Behöver inte läsa upp meddelande vid login sidan.
Fel rättas

#### Problembeskrivning
* CSS styling direkt i html filer (admin.html, index.html)
* Javascript direkt i html filer (default.html)
* Javascript laddas inte konsekvant i slutet utan finns i <head>

#### Konsekvenser
Onödig trafik när inte CSS och Javascript inte samlas i filer som laddas.
Sidan ser ut att laddas onödigt långsamt när scripten inte laddas sist.
#### Åtgärd
Samla all Javascript i js-filer och styling i CSS-filer

#### Problembeskrivning
Filer som laddas är onödigt stora
#### Konsekvenser
Mer åtgång av bandbredd
#### Åtgärd
Minifiera javascriptfiler och CSS-filer.[8]

#### Problembeskrivning
Onödigt många filer som laddas 
#### Konsekvenser
Fler anrop
#### Åtgärd
Slå ihop flera javascript-filer i en och samma sak med CSS-filer.[8]

# Egna övergripande reflektioner
Här har det brutits mot det mesta. Jag tror det är väldigt lätt att det också blir så om man är alltför fokuserad på att lösa funktionella uppgifter, och det är ju också det som brukar vara det primära kravet från beställare.
Ska man jobba professionellt med webbutveckling kan man naturligtvis inte leverera något som liknar detta. Säkerhet kommer alltmer i fokus i takt med att viktiga sidor hackas. Kostnaden för miljontals förlorade kortuppgifter eller användaruppgifter är oerhörda. Det är då viktigt att kunskap om säkerhet också når beställarna och att dom accepterar att betala för det vid utvecklingen. Som utvecklare får man hålla det i minnet och dels kunna förklara varför det behövs och måste kosta i utvecklingsskedet. Det gäller också att fortsätta följa utvecklingen inom området. Själv tror jag att en del av problematiken med autentisering kommer försvinna i och med intåget av biometrisk identifiering som jag tror kommer kraftfullt de närmsta åren. Bra automatiserade verktyg för att testa webbsidor/applikationer borde kunna hitta en marknad. 


# Referenser
* [1] ”OWASP Top 10 2013-A1-Injection", OWASP, 23 Juni 2013 [Online] Tillgänglig:https://www.owasp.org/index.php/Top_10_2013-A1-Injection [Hämtad: 3 januari, 2016].
* [2] “OWASP Top 10 2013-A2-Broken Authentication and Session Management", OWASP 3 February 2015 [Online] Tillgänglig: https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management  [Hämtad: 3 januari, 2016].
* [3] “OWASP Top 10 2013-A3-Cross-Site Scripting", OWASP, 3 February 2014 [Online] Tillgänglig:https://www.owasp.org/index.php/Top_10_2013-A3-Cross-Site_Scripting_(XSS) [Hämtad: 3 januari, 2016].
* [4] “OWASP HttpOnly", OWASP, 12 November 2014 [Online] Tillgänglig: https://www.owasp.org/index.php/HttpOnly  [Hämtad: 3 januari, 2016].
* [5] “OWASP Password Storage Cheat Sheet", OWASP, 16 November 2015, [Online] Tillgänglig: https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet [Hämtad: 3 januari, 2016].
* [6] “OWASP Top 10 2013-A8-Cross-Site Request Forgery (CSRF)", OWASP, 18 September 2013 [Online]https://www.owasp.org/index.php/Top_10_2013-A8-Cross-Site_Request_Forgery_(CSRF) [Hämtad: 3 januari, 2016].
* [7] “OWASP Top 10 2013-A6- Sensitive_Data_Exposure ", 23 Juni 2013 [Online] Tillgänglig:https://www.owasp.org/index.php/Top_10_2013-A6-Sensitive_Data_Exposure  [Hämtad:3 december, 2015]
* [8] Steve Souders, High Performance Web Sites: Combined Scripts and Stylesheets, O'Reilly, 2007. [Online] Tillgänglig:http://www.it.iitb.ac.in/frg/wiki/images/4/44/Oreilly.Seve.Suoders.High.Performance.Web.Sites.Sep.2007.pdf [Hämtad: 3 januari, 2016].


