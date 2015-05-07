<?php
 // foreach ($_GET as $k => $v) {
 //   echo "$k = $v<br />";
 // }
  // date
  // searchterm
  //section
  $now = date('Y-m-d');
  $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : $now;
  $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : $now;
  $section = isset($_GET['grp']) ? $_GET['grp'] : false;
  $page = isset($_GET['page']) ? $_GET['page'] : 1;
  $query = isset($_GET['query']) ? $_GET['query'] : false;

  $jsonurl = "http://content.guardianapis.com/search?from-date=" . $start_date . "&to-date=" . $end_date . "&page=" . $page . "&show-elements=all&api-key=933vwbedch8tdrmza937yfqs";
  if($section) {
    $jsonurl .= "&section=" . $section;
  }
  $jsonurl .= ($section) ? "&section=" . $section : '';
  $jsonurl .= ($query) ? "&q=" . $query : '';

  // $jsonurl = "http://content.guardianapis.com/search?section=" . $section . "&from-date=" . $start_date . "&to-date=" . $end_date . "&page=" . $page . "&show-elements=all&api-key=933vwbedch8tdrmza937yfqs";
  $json = file_get_contents($jsonurl);
  echo $json;
  // echo json_encode($json);
?>
