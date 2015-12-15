# Reflektionsfrågor
### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
Sveriges Radio har en rad en rad om användarvillkor väldigt generellt hållen anmodan om att inte skada Sveriges Radios oberoende eller trovärdighet medans Google har sedvanligt amerikanskt utformat avtal för att klara alla tänkbara och ännu inte möjliga skäl för stämningar. De har många sidor och dessutom länkar till additional terms och andra dokument som exempelvis "privacy policy". Generellt får man inte använda Google maps affärsmässigt utan licens och du får inte på olika sätt använda det så att det kan skada Google.Båda stöder ett antal vanlig format. Sveriges Radio har inga begränsningar på antal anrop. För att använda Google Maps måste man registrera sig och få ut en nyckel.

### Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?
Det är ingen affärskritisk applikation eller data som ska cachas så jag valde den enkla lösningen med "local storage". Den medför inga extra anrop till servern om man hade valt en sådan lösning. Nu har jag satt cachningen till en minut för att det matchar förväntad uppdateringsfrekvens någorlunda, eller i alla fall at tman inte missar ny information med onödigt lång tid. En minut kommer heller aldrig innebära ett massivt frågande mot SR.
### Vad finns det för risker kring säkerhet och stabilitet i din applikation?
### Hur har du tänkt kring säkerheten i din applikation?
### Hur har du tänkt kring optimeringen i din applikation?

