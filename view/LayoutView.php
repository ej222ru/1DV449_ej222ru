<?php

/**
 *
 * @author Erland Jönsson
 */
class LayoutView {
  public function render($startUrl, UrlView $urlView, $scrapeResult, scrapeResultView $scrapeResultView) {
    echo '<!DOCTYPE html>
    <html>
        <head>
          <meta charset="utf-8">
          <title>Web Agent</title>
        </head>
        <body>
            <h1>Laboration 01, Web Agent</h1>

            <div class="container">
           
                ' . $urlView->response($startUrl) . '
                ' . $scrapeResultView->response($scrapeResult) . '
            </div>
        </body>
    </html>
    ';
  }
  

}
