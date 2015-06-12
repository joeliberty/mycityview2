<?php
  $city = isset($_GET['city']) ? $_GET['city'] : 'melbourne';
  $state = isset($_GET['state']) ? $_GET['state'] : 'vic';
  $country = isset($_GET['country']) ? $_GET['country'] : 'au';
  $lat = isset($_GET['lat']) ? $_GET['lat'] : '-37.8131869';
  $lon = isset($_GET['lon']) ? $_GET['lon'] : '144.9629796';

  $jsonurl = "https://api.meetup.com/2/open_events?key=5579136d5823c8054341258e452f&lat=" . $lat . "&lon=" . $lon . "&country=" . $country . "&city=" . $city . "&state=" . $state . "&text=travel";

  $json = file_get_contents($jsonurl);
  echo json_encode($json);
?>
