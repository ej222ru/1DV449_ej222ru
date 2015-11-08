<?php



/**
 * Description of WebAgentController
 *
 * @author User
 */
class WebAgentController {
    
    private $layoutView;
    private $urlView;
    
    public function __construct($startUrl, $layoutViewObject, $urlViewObject) {
  //      $this->user = new model\User();
        $this->layoutView       = $layoutViewObject;
        $this->urlView        = $urlViewObject;
        if (!$this->urlView->getUrl())
            $this->urlView->setUrl($startUrl);
    }    
    
    public function startWebAgentApplikation() {
        if ($this->urlView->isUserPost())
            $this->layoutView->render($this->urlView->getUrl(), $this->urlView, true);
        else
            $this->layoutView->render($this->urlView->getUrl(), $this->urlView, false);
            
       
         
        
    }            
}
