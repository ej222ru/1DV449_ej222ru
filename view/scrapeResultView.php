<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of scrapeResultView
 *
 * @author User
 */
class scrapeResultView {
    public function response($scrapeResult) {
        $response = "";
        if ($scrapeResult){
            $response = $this->scrapeHTML($scrapeResult);
        }
        return $response;
    }
    
    private function translateWeekday($englishDay){
        if (strcmp($englishDay, "Friday") == 0){
            return "Fredag";
        }
        if (strcmp($englishDay, "Saturday") == 0){
            return "Lördag";
        }
        if (strcmp($englishDay, "Sunday") == 0){
            return "Söndag";
        }
    }
    
    private function scrapeHTML($scrapeResult) {
        // create an array like $movieTitleArray[0] = "Söderkåkar"
        $movieTitleArray = array_keys($scrapeResult);
        // create an array with index for each movie with day and time for each oppurtunity
        for ($i=0; $i<count($movieTitleArray); $i++){
            $movieTime[] = $scrapeResult[$movieTitleArray[$i]];
        }

        $ret = '<h2>Följande filmer är bokningsbara med efterföljande restaurangbesök</h2>';

        $ret .= '<ul>';
        for ($i=0; $i<count($movieTitleArray); $i++) {
            for ($j=0; $j<count($movieTime[$i]); $j++){
                $ret .= "<li> Filmen {$movieTitleArray[$i]}   klockan   {$movieTime[$i][$j][1]}   på   {$movieTime[$i][$j][0]}
                <a href=''>Välj denna och boka bord</a></li>";
            }
        }
        $ret .= '</ul>';
        return $ret;
    }      
}
