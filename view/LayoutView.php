<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LayoutView
 *
 * @author User
 */
class LayoutView {
  public function render($startUrl, UrlView $urlView, $scrap) {
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
