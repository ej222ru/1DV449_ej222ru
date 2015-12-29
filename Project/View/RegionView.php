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
    //put your code here
    
    
    
    public function createSelectionForm(){

        echo "<h2>" . "createSelectionForm()" . "</h2>" 
        .' 
            <div id="form1">
                <select id="RegionId" name="Region[]" size="3" multiple>
                    <option value="Botkyrka">Botkyrka</option>
                    <option value="Danderyd">Danderyd</option>
                    <option value="Sollentuna">Sollentuna</option>
                    <option value="Solna">Solna</option>
                    <option value="Täby">Täby</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                    <option value="Solna">Solna</option>
                </select>
            </div>
            
            <div id="form1">
                <select id="CriteriaId" name="Criteria[]" size="3" multiple>
                  <option value="Inkomst">Inkomst hushåll</option>
                  <option value="Ohälsotal">Ohälsotal</option>
                  <option value="TEST">TEST</option>
                  <option value="TEST2">TEST2</option>
                </select>
            </div>
           <button id="getSCB">Skicka</button>  

        <canvas id="myChart" class="Hide"></canvas>';
        
   }
}