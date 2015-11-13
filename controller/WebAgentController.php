<?php



/**
 * Description of WebAgentController
 *
 * @author User
 */
class WebAgentController {
    
    private $layoutView;
    private $urlView;
    private $webAgentModel;
    
    public function __construct($startUrl, $layoutViewObject, $urlViewObject) {
        $this->layoutView       = $layoutViewObject;
        $this->urlView        = $urlViewObject;
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
        if ($dom->loadHTML($data)){
            $xpath = new DOMXPath($dom);
            $items = $xpath->query($expression);
        }
        else {
            die("fel vid inläsning");
        }
        return $items;
    }     
    
    private function getCommonAvailableDays($arr){
        $available = array();
        $fridayCommon = true;
        $saturdayCommon = true;
        $sundayCommon = true;
        
        for ($i=0;$i<count($arr);$i++){
            if (!in_array("Friday", $arr[$i])){
                $fridayCommon = false;
            }
            if (!in_array("Saturday", $arr[$i])){
                $saturdayCommon = false;
            }
            if (!in_array("Sunday", $arr[$i])){
                $sundayCommon = false;
            }
        }
        if ($fridayCommon) $available[] = "Friday";
        if ($saturdayCommon) $available[] = "Saturday";
        if ($sundayCommon) $available[] = "Sunday";
        
        return $available;
    }
    private function getAvaiableDays($url, $item){
        $avaiableDays = array();
        $arrayOfFree = array();

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
            $avaiableDays[$arrayOfDays[$i]] = strtoupper($arrayOfFree[$i]);
        }
  /*      
        for ($i=0; $i<count($arrayOfDays); $i++){
            $str = $arrayOfFree[$i];
            if ((strcmp(strtoupper($str), "OK") === 0)){
                $avaiableDays[] = $arrayOfDays[$i]; 
            }
        }
   * 
   */
        return $avaiableDays;
    }
    
    private function scrapeCalendar($url){

        // expect paul.html, peter.html and mary.html
        $data = $this->curl_get_request($url);      
        $items = $this->curl_get_items($data,'//a');
        
        // this is a bit risky not checking the url:s are as expected
        // What if suddenly replaced with some really bad link
        $avaiableDaysForAll = array();
        // For each person, get avaialble days and put in the array $avaiableDaysForAll
        foreach($items as $item){
            $avaiableDaysForAll[] = $this->getAvaiableDays($url, $item);
        }
        // Keep only the days that are OK for alla of them in $avaiableDaysForAll
        $avaiableDaysForAll = array_intersect_assoc($avaiableDaysForAll[0], $avaiableDaysForAll[1], $avaiableDaysForAll[2]);
        return $avaiableDaysForAll ;
    }
    
    private function getMovies($url, $item){

    }
    
    private function scrapeCinema($url, $avaiableDaysForAll){

        // expect paul.html, peter.html and mary.html
        $data = $this->curl_get_request($url);      
        $items = $this->curl_get_items($data,'//select[@id = "movie"]/option[@value]');
        
        // this is a bit risky not checking the url:s are as expected
        // What if suddenly replaced with some really bad link
        $availableMovies = array();
        $movies = array();
        foreach($items as $item){
            $movies[] = $item->nodeValue;
        }
        
        // For each movie check if free seatings avalable days
//        for ($i=0; $i<count($avaiableDaysForAll); $i++){
        foreach ($avaiableDaysForAll as $key => $value) {
            
            if ($key === "Friday"){
                $d = 1;
            }
            if ($key === "Saturday"){
                $d = 2;
            }
            if ($key === "Sunday"){
                $d = 3;
            }
            
            for ($j=1; $j<=count($movies); $j++){
                

                if ($d+1 < 10) {
                    $day = "0" . strval($d);
                }
                else {
                    $day = strval($d);
                }                

                    
                if ($j < 10) {
                    $movie = "0" . strval($j);
                }
                else {
                    $movie = strval($j);
                }
                $specUrl = $url . "check?day=" . $day . "&movie=" . $movie;

                $data = $this->curl_get_request($specUrl);
                $arr = array();
                $arr = json_decode($data, true);
                // $items = $this->curl_get_items($data,'//select[@id = "movie"]/option[@value]');
                for ($i=0; $i<count($arr); $i++){
                    if ($arr[$i]["status"] == 1){
                        $availableMovies[$movies[$j-1]][] = array($key, $arr[$i]["time"]);
                    }
                }
            }
        }
        echo "Avaialble movies:";
        var_dump($availableMovies);
        var_dump($movies);
        
        
        
        
        
        
        
        
        return $movies;
    }
    
    
    public function startWebAgentApplikation() {

        
        if ($this->urlView->isUserPost()){
            $this->webAgentModel->setUrl($this->urlView->getPostedUrl());
            $this->layoutView->render($this->webAgentModel->getUrl(), $this->urlView, true);

            // Get first page, expect Calendar, Cionema, Dinner
            $data = $this->curl_get_request($this->webAgentModel->getUrl());
            $items = $this->curl_get_items($data,'//li/a');

            foreach ($items as $item){
                $url = $this->webAgentModel->getUrl() . $item->getAttribute("href") . "/";
                
                if ($item->nodeValue == "Kalendrar") {
                    $avaiableDaysForAll = $this->scrapeCalendar($url);
                }
                if ($item->nodeValue == "Stadens biograf!") {
                    $movies = $this->scrapeCinema($url, $avaiableDaysForAll);
                }
                
            }
        }
        else {
            $this->layoutView->render($this->webAgentModel->getUrl(), $this->urlView, false);
            
        }
        
    }            
    
}
