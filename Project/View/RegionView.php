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
       
                
        .' <form method="post" name="RegionForm">
            
            <div id="form1">
                <label for="RegionForm">Välj två kommuner du vill jämföra:</label><br>
                <select name="Region[]" size="3" multiple>
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
            
            <div id="form2">
                <label for="CriteriaForm">Välj två kriterier att jämföra:</label><br>
                <select name="Criteria[]" size="3" multiple>
                  <option value="Income">Inkomst hushåll</option>
                  <option value="IllHealth">Ohälsotal</option>
                </select>
            </div>
        
        

            <input type="submit" name="submit" value="Submit" />    
        </form>';
        
   }
}