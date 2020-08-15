<?php


$url=$_GET['url'];
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-7.597471,110.95052&radius=2000&type=makanan&keyword=bakso&key=AIzaSyANlGFBRSJtayKemhLJAcnSuwrD_wOG2Sk

$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);

echo $result;

