<?php
  $location = isset($_GET['location']) ? $_GET['location'] : 'melbourne,au';
  $date = isset($_GET['date']) ? $_GET['date'] : 'today';
  $category = isset($_GET['category']) ? $_GET['category'] : 'other';
  $page_size = isset($_GET['page_size']) ? $_GET['page_size'] : '50';
  $sort_order = isset($_GET['sort_order']) ? $_GET['sort_order'] : 'popularity';
  $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : 2;
  $count_only = isset($_GET['count_only']) ? $_GET['count_only'] : false;

  $jsonurl = 'http://api.eventful.com/json/events/search?app_key=Gk9VfDFK2CG4R3P4&location=' . rawurlencode($location) . '&date=' . $date . '&category=' . $category . '&page_size=' . $page_size . '&sort_order=' . $sort_order . '&page_number=' . $page_number . '&count_only=' . $count_only;
  $json = file_get_contents($jsonurl);
  echo $json;
?>
