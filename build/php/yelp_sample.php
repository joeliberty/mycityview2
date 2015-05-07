<?php
 // foreach ($_GET as $k => $v) {
 //   echo "$k = $v<br />";
 // }

require_once('lib/OAuth.php');
$CONSUMER_KEY = 'N-vPXMSQJMdY7KYmEGq8kQ';
$CONSUMER_SECRET = 'RK-tCS0hK1c6YE9L44kPTC4LhD4';
$TOKEN = 'c7Ghj5t3GfO6QIta1XnKLMplNNzafEqV';
$TOKEN_SECRET = 'wj1kyy0HYqsZctpOL5w3k3Neo64';
$API_HOST = 'api.yelp.com';
$DEFAULT_TERM = isset($_GET['term']) ? $_GET['term'] : 'dinner';
$DEFAULT_LOCATION = isset($_GET['location']) ? $_GET['location'] : 'Melbourne, vic';
$SEARCH_LIMIT = 10;
$SEARCH_PATH = '/v2/search/';
$BUSINESS_PATH = '/v2/business/';

function request($host, $path) {
    $unsigned_url = "http://" . $host . $path;
    // Token object built using the OAuth library
    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);
    // Consumer object built using the OAuth library
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);
    // Yelp uses HMAC SHA1 encoding
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer, 
        $token, 
        'GET', 
        $unsigned_url
    );
    
    // Sign the request
    $oauthrequest->sign_request($signature_method, $consumer, $token);
    
    // Get the signed URL
    $signed_url = $oauthrequest->to_url();
    
    // Send Yelp API Call
    $ch = curl_init($signed_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    
    return $data;
}


function search($term, $location) {
    $url_params = array();

    // $url_params['term'] = $term ?: $GLOBALS['DEFAULT_TERM'];
    $url_params['term'] = $term ? $term : $GLOBALS['DEFAULT_TERM'];
    // $url_params['location'] = $location?: $GLOBALS['DEFAULT_LOCATION'];
    $url_params['location'] = $location ? $location : $GLOBALS['DEFAULT_LOCATION'];
    $url_params['limit'] = $GLOBALS['SEARCH_LIMIT'];
    $search_path = $GLOBALS['SEARCH_PATH'] . "?" . http_build_query($url_params);
    return request($GLOBALS['API_HOST'], $search_path);
}

function get_business($business_id) {
    $business_path = $GLOBALS['BUSINESS_PATH'] . $business_id;
    
    return request($GLOBALS['API_HOST'], $business_path);
}

function query_api($term, $location) {
      
    $response = json_encode(search($term, $location));
    // $response = (search($term, $location));
    return $response;
}
/**
 * User input is handled here 
 */
$longopts  = array(
    "term::",
    "location::",
);
    
$options = getopt("", $longopts);
$term = $options['term'] ? $options['term'] : '';
$location = $options['location'] ? $options['location'] : '';
$result = query_api($term, $location);
echo $result;
?>