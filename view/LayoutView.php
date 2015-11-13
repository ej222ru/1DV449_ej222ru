<?php

/**
 * Description of LayoutView
 *
 * @author User
 */
class LayoutView {
  public function render($startUrl, UrlView $urlView, $scrap) {
    echo ("scrap:" . $scrap);  
    echo '<!DOCTYPE html>
    <html>
        <head>
          <meta charset="utf-8">
          <title>Web Agent</title>
        </head>
        <body>
            <h1>Laboration 01, Web Agent</h1>

            <div class="container">
           
              ' . $urlView->response($startUrl, $scrap) . '

            </div>
        </body>
    </html>
    ';
  }
  

}
