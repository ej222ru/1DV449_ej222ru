<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RegionView
 *
 * @author User
 */

namespace view;

class RegionView {
    
    public function createSelectionForm(){

        echo '
            <div id="form1">
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
            
            <div id="form1">
                <select id="CriteriaId" name="Criteria[]" size="3" multiple>
                  <option value="Inkomst rel riket">Inkomst hushåll</option>
                  <option value="Ohälsotal dagar">Ohälsotal</option>
                  <option value="Andel egna hem">Egna hem</option>
                  <option value="Röstdeltagande">Röstdeltagande</option>
                </select>
            </div>
           <button type="button" id="getSCB" class="btn btn-info">Skicka</button>  
           <button type="button" id="displayInfo" class="btn btn-info">Info</button>

        <div id="Info" class="Hide">   
        Välj mellan en till tre kommuner i drop down menyn. Har du redan valt tre 
        och vill välja om måste du först avmarkera någon av de du redan valt. 
        Välj jämförelsetal i den andra drop down menyn. Du kan som mest jämföra 
        två egenskaper samtidigt \br Hovra över staplarna för attse vad de reprenterar.
        </div>
        <div id="error" class="Hide">   
        </div>
        
        <div id="chartContainer" class="Hide">   
            <canvas id="myChart"></canvas>
        </div>';
        
   }
}