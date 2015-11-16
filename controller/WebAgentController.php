<?php

/**
 *
 * @author Erland Jönsson
 */

class WebAgentController {
    
    private $layoutView;
    private $urlView;
    private $scrapeResultView;
    private $webAgentModel;
    
    public function __construct($startUrl, $layoutViewObject, $urlViewObject, $scrapeResultView) {
        $this->layoutView        = $layoutViewObject;
        $this->urlView           = $urlViewObject;
        $this->scrapeResultView = $scrapeResultView;
        $this->webAgentModel = new WebAgentModel();
        if (!$this->webAgentModel->getUrl())
            $this->webAgentModel->setUrl($startUrl);
    }    
    
    
    public function curl_get_request($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }   
    
    public function curl_get_items($data, $expression){

        $dom = new DomDocument();
        // disable warnings   http://stackoverflow.com/questions/1148928/disable-warnings-when-loading-non-well-formed-html-by-domdocument-php
        
        // modify state
        $libxml_previous_state = libxml_use_internal_errors(true);
        if ($dom->loadHTML($data)){
            $xpath = new DOMXPath($dom);
            $items = $xpath->query($expression);
        }
        else {
            die("fel vid inläsning");
        }
        // handle errors
        libxml_clear_errors();
        // restore
        libxml_use_internal_errors($libxml_previous_state);  
        
        return $items;
    }     
    
    private function getAvaiableDays($url, $item){
        // array with available days for one person
        $avaiableDays = array();   // e.g. $avaiableDays["Friday"] = "OK"

        $data2 = $this->curl_get_request($url . $item->getAttribute("href"));
        $days = $this->curl_get_items($data2, '//th');
        $freeDays = $this->curl_get_items($data2, '//td');
        
        foreach($freeDays as $free){
            $arrayOfFree[] = $free->nodeValue;
        }
        foreach($days as $day){
            $arrayOfDays[] = $day->nodeValue;
        }
        for ($i=0; $i<count($arrayOfDays); $i++){
            if (strcmp(strtoupper($arrayOfFree[$i]), "OK") == 0){
                $avaiableDays[$arrayOfDays[$i]] = strtoupper($arrayOfFree[$i]);
            }
        }
        return $avaiableDays;
    }
    
    private function scrapeCalendar($url){

        // expect paul.html, peter.html and mary.html
        $data = $this->curl_get_request($url);      
        $items = $this->curl_get_items($data,'//a');
        
        // this is a bit risky not checking the url:s are as expected
        // What if suddenly replaced with some really bad link
        // For each person, get avaialble days and put in the array $avaiableDaysForAll
        foreach($items as $item){
            $avaiableDaysForAll[] = $this->getAvaiableDays($url, $item);
        }
        // Keep only the days that are OK for all of them in $avaiableDaysForAll
        $avaiableDaysForAll = array_intersect_assoc($avaiableDaysForAll[0], $avaiableDaysForAll[1], $avaiableDaysForAll[2]);
        return $avaiableDaysForAll ;
    }
    
    private function scrapeCinema($url, $avaiableDaysForAll){
        // Creates and return an array $availableMovies with movie 
        // titel as index and day and time when all persons are available
   
        // expect paul.html, peter.html and mary.html
        $data = $this->curl_get_request($url);      
        $items = $this->curl_get_items($data,'//select[@id = "movie"]/option[@value]');
        
        foreach($items as $item){
            $movies[] = $item->nodeValue; // e.g. $movies[0] = "Söderkåkar"
        }

        // For each movie check if free seatings avalable days
        foreach ($avaiableDaysForAll as $day => $value) {
            
            if ($day === "Friday"){
                $dayIndex = 1;
            }
            if ($day === "Saturday"){
                $dayIndex = 2;
            }
            if ($day === "Sunday"){
                $dayIndex = 3;
            }
            
            for ($j=1; $j<=count($movies); $j++){
                if ($dayIndex+1 < 10) {
                    $dayIndexTxt = "0" . strval($dayIndex);
                }
                else {
                    $dayIndexTxt = strval($dayIndex);
                }                
                if ($j < 10) {
                    $movieIndex = "0" . strval($j);
                }
                else {
                    $movieIndex = strval($j);
                }
                $specUrl = $url . "check?day=" . $dayIndexTxt . "&movie=" . $movieIndex;
                $data = $this->curl_get_request($specUrl);  // returns a json object; status "1", time "18:00", movie "01"
                $arr = json_decode($data, true);

                for ($i=0; $i<count($arr); $i++){
                    // Status == 1 means free seatings
                    if ($arr[$i]["status"] == 1){   
                        $availableMovies[$movies[$j-1]][] = array($day, $arr[$i]["time"]);
                    }
                }
            }
        }
        return $availableMovies;
    }
    
    
    private function translateDay($dayEnglish){
        // Adapting to formats and representations provided from applications
        if (strcmp($dayEnglish, "Friday") == 0)
                return "fre";
        if (strcmp($dayEnglish, "Saturday") == 0)
                return "lor";
        if (strcmp($dayEnglish, "Sunday") == 0)
                return "son";
    }
    

    private function scrapeRestaurant($url, $availableMovies){

        // Returns an array $tablesForMoviesStartTime with free tables at 
        // restaurant for certain movie start times  e.g. "Saturday" "16:00"
        
        $data = $this->curl_get_request($url);   
        $items = $this->curl_get_items($data,"//input[@type='radio']");
        // $items in format "lor1820" representing day and time for free table
        foreach ($availableMovies as $movie) {
            for ($i=0; $i<count($movie); $i++){
                $movieDay = $this->translateDay($movie[$i][0]);
                $movieEnd = substr($movie[$i][1], 0, 2) + 2;   // Movie ends 2 hours after starttime, hence the + 2
                    
                foreach($items as $item){
                    $dayTime = $item->getAttribute('value');
                    if ((substr($dayTime, 0, 3) == $movieDay) && (substr($dayTime, 3, 2) >= $movieEnd )){
                        $tablesForMoviesStartTime[] = array($movie[$i][0], $movie[$i][1]);
                    }
                }
            }
        }   
        $tablesForMoviesStartTime = array_unique($tablesForMoviesStartTime, SORT_REGULAR);
        return $tablesForMoviesStartTime;
   }
    
   
    private function getDaShitTogether($availableMovies, $tablesForMoviesStartTime) {
        
        // Return the combined array $availableMoviesAndRestaurants with movies and 
        // available table at restaurant afterwards i.e. the final result
       
        // Create an array with index for each movie titel e.g. $newMovieTitleArray[0] = "Söderkåkar"
        $keyMovie=0;
        $newMovieTitleArray = array_keys($availableMovies);
        
        foreach ($availableMovies as $movie){
            for ($i=0; $i<count($movie);$i++){
                foreach ($tablesForMoviesStartTime as $table){
                    if ((strcmp($movie[$i][0],$table[0]) === 0 ) && (strcmp($movie[$i][1],$table[1]) === 0 )){
                        $availableMoviesAndRestaurants[$newMovieTitleArray[$keyMovie]][] = $movie[$i];
                    }
                }
            }
            $keyMovie++;
        }        
        return $availableMoviesAndRestaurants;
    }
   
    public function startWebAgentApplikation() {
   
        if ($this->urlView->isUserPost()){
            $this->webAgentModel->setUrl($this->urlView->getPostedUrl());

            // Get first page, expect Calendar, Cionema, Dinner
            $data = $this->curl_get_request($this->webAgentModel->getUrl());
            $items = $this->curl_get_items($data,'//li/a');

            foreach ($items as $item){
                $url = $this->webAgentModel->getUrl() . $item->getAttribute("href") . "/";
                
                if ($item->nodeValue == "Kalendrar") {
                    $avaiableDaysForAll = $this->scrapeCalendar($url);
                }
                if ($item->nodeValue == "Stadens biograf!") {
                    $availableMovies = $this->scrapeCinema($url, $avaiableDaysForAll);
                }
                if ($item->nodeValue == "Zekes restaurang!") {
                    $avaiableTablesAfterMovie= $this->scrapeRestaurant($url, $availableMovies);
                }
                
            }
            $availableMoviesAndRestaurants = $this->getDaShitTogether($availableMovies, $avaiableTablesAfterMovie);
//            var_dump($availableMoviesAndRestaurants);    
            $this->layoutView->render($this->webAgentModel->getUrl(), $this->urlView, $availableMoviesAndRestaurants, $this->scrapeResultView);

        }
        else {
            $this->layoutView->render($this->webAgentModel->getUrl(), $this->urlView, null, $this->scrapeResultView);
        }
    }            
}
