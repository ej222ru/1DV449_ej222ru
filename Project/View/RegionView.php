<?php

namespace view;

class RegionView {
    
    public function createSelectionForm(){
        
        echo '
            <div id="formSelection">
                <select id="RegionId" name="Region[]" size="3" multiple>
                    <option value="Botkyrka">Botkyrka</option>
                    <option value="Danderyd">Danderyd</option>
                    <option value="Ekerö">Ekerö</option>
                    <option value="Haninge">Haninge</option>
                    <option value="Huddinge">Huddinge</option>
                    <option value="Järfälla">Järfälla</option>
                    <option value="Nacka">Nacka</option>
                    <option value="Sollentuna">Sollentuna</option>
                    <option value="Solna">Solna</option>
                    <option value="Stockholm">Stockholm</option>
                    <option value="Sundbyberg">Sundbyberg</option>
                    <option value="Tyresö">Tyresö</option>
                    <option value="Täby">Täby</option>
                    <option value="Upplands Väsby">Upplands Väsby</option>
                    <option value="Vallentuna">Vallentuna</option>
                    <option value="Värmdö">Värmdö</option>
                    <option value="Österåker">Österåker</option>
                </select>
            </div>
            
            <div id="formSelection">
                <select id="CriteriaId" name="Criteria[]" size="3" multiple>
                  <option value="Inkomst rel riket">Inkomst hushåll</option>
                  <option value="Kommunal skattesats">Kommunal skattesats</option>
                  <option value="Ohälsotal dagar">Ohälsotal</option>
                  <option value="Egna hem">Egna hem</option>
                  <option value="Egna hem,utlandsfödda exkl EU">Egna hem utlandsfödda exkl EU</option>
                  <option value="Röstdeltagande">Röstdeltagande</option>
                  <option value="Medelålder">Medelålder</option>
                </select>
            </div>
           <button type="button" id="getSCB" class="btn btn-info">Visa</button>  
           <button type="button" id="displayInfo" class="btn btn-info">Info</button>
           <button type="button" id="refreshLocalStorage" class="btn btn-info">Hämta</button>
           
           <form action="#" method="post" class="crimeForm" id="crimeForm">
               <fieldset>
                   <div id="policeReports">Visa inrapporterade brott senaste dygnet:
                       <label><input id="policeReportsCheckBox" type="checkbox" name="policeReports"/></label>
                   </div>
               </fieldset>
           </form>    



            <div id="Info" class="Hide">   
                Välj mellan en till fyra kommuner i drop down menyn. Har du redan valt fyra 
                och vill välja om måste du först avmarkera någon av de du redan valt. 
                <br>Välj jämförelsetal i den andra drop down menyn. Du kan som mest jämföra 
                fyra egenskaper samtidigt.
                <br> Klicka på knappen < <b>Visa</b> > för att visa vald information
                <br> Klicka på < <b>Hämta</b> > för att rensa lokalt sparad data och istället hämta data från 
                informationskällan.
                <br> Hovra över staplarna för att se vad de representerar.
            </div>  
        
       <div id="error" class="Hide"> </div>
        <div id="chartContainer" class="Hide">   
            <canvas id="myChart1"></canvas>
            <canvas id="myChart2"></canvas>
        </div>';
   }
}