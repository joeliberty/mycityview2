<?php
  $jsonurl = 'http://api.eventful.com/json/events/search?app_key=Gk9VfDFK2CG4R3P4';
  $location = isset($_GET['location']) ? $_GET['location'] : 'melbourne,au';
  $jsonurl .= '&location=' . rawurlencode($location);
  $date = isset($_GET['date']) ? $_GET['date'] : 'today';
  $jsonurl .= '&date=' . $date;
  $category = isset($_GET['category']) ? $_GET['category'] : null;
  if($category) { $jsonurl .= '&category=' . $category; }
  $page_size = isset($_GET['page_size']) ? $_GET['page_size'] : '10';
  $jsonurl .= '&page_size=' . $page_size;
  $sort_order = isset($_GET['sort_order']) ? $_GET['sort_order'] : 'popularity';
  $jsonurl .= '&sort_order=' . $sort_order;
  $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : 2;
  $jsonurl .= '&page_number=' . $page_number;
  $count_only = isset($_GET['count_only']) ? $_GET['count_only'] : 0;
  $jsonurl .= '&count_only=' . $count_only;
  $keywords = isset($_GET['keywords']) ? $_GET['keywords'] : '';
  if($keywords) { $jsonurl .= '&keywords=' . $keywords; }


  $json = file_get_contents($jsonurl);
  echo $json;
?>