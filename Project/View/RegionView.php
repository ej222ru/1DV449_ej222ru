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

        echo "<h2>" . "createSelectionForm()" . "</h2>" 
        .' 
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
           <button id="getSCB">Skicka</button>  
        
        <div id="chartContainer" class="Hide">   
            <canvas id="myChart"></canvas>
        </div>';
        
   }
}