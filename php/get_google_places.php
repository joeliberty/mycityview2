<?php
  $types = isset($_GET['types']) ? $_GET['types'] : 'food';
  $location = isset($_GET['location']) ? $_GET['location'] : '-37.8131869,144.9629796';
  $radius = isset($_GET['radius']) ? $_GET['radius'] : '20000';
  $pagetoken = isset($_GET['pagetoken']) ? $_GET['pagetoken'] : '';
  $jsonurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBqsFuBBdp3MvRrrFAY4i5AlXNe_OjiTpM&radius=" . $radius . "&location=" . $location . "&types=" . $types . "&pagetoken=" . $pagetoken;
  $json = file_get_contents($jsonurl);
  echo $json;
?>