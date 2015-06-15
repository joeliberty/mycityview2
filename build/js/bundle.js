!function(){var e=angular.module("mycity-directives",[]);e.directive("dayAstroQuote",function(){return{restrict:"E",templateUrl:"partials/day-astro-quote.html"}}),e.directive("header",function(){return{restrict:"E",templateUrl:"partials/header.html"}}),e.directive("forcast",function(){return{restrict:"E",templateUrl:"partials/forcast.html"}}),e.directive("news-movies",function(){return{restrict:"E",templateUrl:"partials/news-movies.html"}}),e.directive("yelp",function(){return{restrict:"E",templateUrl:"partials/yelp.html"}}),e.directive("faroo",function(){return{restrict:"E",templateUrl:"partials/faroo.html"}}),e.directive("movies",function(){return{restrict:"E",templateUrl:"partials/movies.html"}}),e.directive("map",function(){return{restrict:"E",templateUrl:"partials/map.html"}}),e.directive("events",function(){return{restrict:"E",templateUrl:"partials/events.html"}}),e.directive("headerImage",function(){return{restrict:"E",templateUrl:"partials/header-image.html"}}),e.directive("places",function(){return{restrict:"E",templateUrl:"partials/places.html"}}),e.directive("credits",function(){return{restrict:"E",templateUrl:"partials/credits.html"}}),e.directive("twitter",function(){return{restrict:"E",templateUrl:"partials/twitter.html"}}),e.directive("meetup",function(){return{restrict:"E",templateUrl:"partials/meetup.html"}}),e.directive("rates",function(){return{restrict:"E",templateUrl:"partials/rates.html"}}),e.directive("nearby",function(){return{restrict:"E",templateUrl:"partials/nearby.html"}}),e.directive("navbar",function(){return{restrict:"E",templateUrl:"partials/navbar.html"}}),e.directive("imageonload",function(){return{restrict:"A",link:function(e,t,r){t.bind("load",function(){$("#image_spinner, #image_spinner i").css("display","none"),$("#header_image img").css({display:"block","margin-top":"53px"})})}}})}(),function(){"use strict";var e=angular.module("events_app",[]);e.factory("formatDate",function(){return{yyyy_mm_dd:function(e){var t=e.getDate(e);10>t&&(t="0"+t);var r=e.getMonth(e)+1;10>r&&(r="0"+r);var n=e.getFullYear(e);return n+"-"+r+"-"+t}}}),e.controller("EventsCtrl",["$scope","$rootScope","$http","formatDate",function(e,t,r,n){t.slidesdone=!1,e.num_of_categories=0,e.cats_returned=0,e.loading_events=!0,e.is_search=!1,e.query="",e.totalItems=0,e.is_search=!1,e.find_events=function(a,o,s){var i=o;e.is_search=!1,e[o+"_spinner"]=!0;var l=this;e.events={events:{title:"Retreiving events for "+t.city+"."}};var c={};c.page_number=a,c.count_only=s;var u="search"==o?e.query:"";u&&(c.keywords=u,c.sort_order="date"),o="search"==o?"":o,o&&(c.category=o,c.sort_order="popularity");var p;if(o){var m=new Date;m=n.yyyy_mm_dd(m),m=m.replace(/-/g,"")+"00",p=m+"-"+m}else p="Future";c.date=p,c.page_size="10";var f=t.city,g="";g=t.state?f+","+t.state+","+t.country:f+","+t.country,c.location=g;var d="php/get_event.php";r({url:d,dataType:"json",method:"GET",cache:!0,params:c,config:{category:i}}).success(function(t,r,n,a){e.cats_returned+=1,e.cats_returned>=e.num_of_categories&&(e.loading_events=!1);var o=[],s=String(a.config.category);if(t.events){var c;c=t.events.event.length?e.events=t.events.event:t.events,c.length>1&&"search"==i&&(e.is_search=!0),$.each(c,function(e,t){var r={};r.image=null!==t.image?t.image.medium.url:"",r.title=null!==t.title?t.title:!1,r.url=null!==t.url?t.url:!1,r.venue_name=null!==t.venue_name?t.venue_name:!1,r.start_time=null!==t.start_time?t.start_time:!1;var n=l.clean_stop_time(r.start_time,t.stop_time);r.stop_time=null!==n?n:!1,r.description=null!==t.description?l.cleanIt(t.description):!1,r.venue_address=null!==t.venue_address?t.venue_address:!1,r.geocode_type=null!==t.geocode_type?l.checkGeocode(t.geocode_type):!1,r.latitude=null!==t.latitude?t.latitude:!1,r.longitude=null!==t.longitude?t.longitude:!1,o.push(r)}),$(".newspanel").scrollTop(0,0)}else"search"==i&&(s=String(a.config.category),e[s+"_spinner"]=!1,alert("There were no results for your search"));if("0"!==t.total_items){t.total_items>100&&(t.total_items=100),s=String(a.config.category);var u="cat"+s;e[u]=s,e[s+"totalItems"]=t.total_items,e[s+"currentPage"]=t.page_number,e[s+"numOfPages"]=t.page_count,e[s+"itemsPerPage"]=t.page_size;var p=parseInt(e[s+"totalItems"])<=parseInt(e[s+"itemsPerPage"])?"none":"block";$("#"+u).css("display",p),o.length&&(e[s]=o,e[s+"_spinner"]=!1)}}),this.cleanIt=function(e){return e.replace(/(<([^>]+)>)/gi," ")},this.clean_stop_time=function(e,t){if(e&&t){var r=e.indexOf(" "),n=e.slice(0,r);r=t.indexOf(" ");var a=t.slice(0,r),o=t.slice(r);return o=n==a?o:t}},this.checkGeocode=function(e){return"EVDB Geocoder"==e?!1:!0}},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.find_categories()},500)}),e.find_categories=function(){var t=["attractions","art","business","clubs_associations","comedy","community","family_fun_kids","festivals_parades","fundraisers","learning_education","movies_film","music","outdoors_recreation","performing_arts","politics_activism","sales","singles_social","sports","support","technology"];e.num_of_categories=t.length;for(var r=0;r<t.length;r++)e.find_events(1,t[r],1)},e.submit=function(){return""===this.query?void alert("Please type in a search term."):(e.query=this.query.replace(/ /g,"%20"),void e.find_events(1,"search",0))},e.get_event=function(t){e.find_events(1,t,0)},e.setPage=function(t,r){e.find_events(t,r)}}]),e.directive("hmtext",function(){return{restrict:"EA",scope:{hmtext:"=hmtext",hmlimit:"=",hmfulltext:"="},templateUrl:"partials/moreless.html",controller:["$scope",function(e){e.toggleValue=function(){e.hmfulltext=e.hmfulltext===!0?!1:e.hmfulltext===!1?!0:!0}}]}}),e.directive("eventa",function(){return{restrict:"EA",scope:{url:"=",image:"=",title:"=",venuename:"=",start:"=",stop:"=",address:"="},templateUrl:"partials/eventsa.html"}}),e.directive("eventb",function(){return{restrict:"EA",scope:{geocode:"=",latitude:"=",longitude:"=",url:"="},templateUrl:"partials/eventsb.html"}}),e.filter("cleanTime",function(){return function(e){if(e){if(e.indexOf(" ")){var t=e.split(" "),r="00:00:00"!=t[1]?e:t[0];return r}return e}}}),e.filter("capitalize_fist_char",function(){return function(e){if(e){var t=e.charAt(0).toUpperCase()+e.slice(1);return t=t.replace(/_/g," ")}}})}(),function(){"use strict";var e=angular.module("faroo_app",[]);e.controller("FarooCtrl",["$scope","$rootScope","$http","formatDate","$q",function(e,t,r,n,a){e.totalItems=0,e.currentPage=0,$(".tabs_container").css("visibility","visible"),e.is_search=!1,e.query="",e.find_news=function(t,n){$(".newspanel").scrollTop(0,0),e[n+"_spinner"]=!0,e.is_search=!1;var o=this,s="search"==n?e.query:n,i="php/get_faroo.php";r({url:i,dataType:"json",method:"GET",cache:!0,params:{start:10*(t-1)+1,query:s},config:{term:n,page:t}}).success(function(t,r,n,a){if(t){var s=String(a.config.term);e[s+"_spinner"]=!1;var i=String(a.config.page);t.currentPage=i,o.isImage(t,s);var l=parseInt(t.count/10),c=1>=l?"false":"true";e["is_"+s]=c}}),this.isImage=function(t,r){$.each(t.results,function(e,t){var r=a.defer(),n=new Image;n.onerror=function(){r.resolve(!1)},n.onload=function(){r.resolve(!0)},n.src=t.iurl,r.promise.then(function(e){e||(t.iurl="")})}),e[r]=t}},e.setPage=function(t,r){e.find_news(t,r)},e.pageChanged=function(){},e.get_article=function(t){e.find_news(1,t)},e.submit=function(){return""===this.query?void alert("Please type in a search term."):(e.query=this.query.replace(/ /g,"%20"),void e.find_news(1,"search"))}}]),e.directive("farootopic",function(){return{restrict:"EA",scope:{article:"=article",spinner:"="},templateUrl:"partials/farootopic.html"}})}(),function(){"use strict";var e=angular.module("astro_app",[]);e.controller("AstroCtrl",["$scope","$http","$rootScope",function(e,t,r){e.signs=[{name:"Aries",link:"images/astro/aries.png"},{name:"Taurus",link:"images/astro/taurus.png"},{name:"Gemini",link:"images/astro/gemini.png"},{name:"Cancer",link:"images/astro/cancer.png"},{name:"Leo",link:"images/astro/leo.png"},{name:"Virgo",link:"images/astro/virgo.png"},{name:"Libra",link:"images/astro/libra.png"},{name:"Scorpio",link:"images/astro/scorpio.png"},{name:"Sagittarius",link:"images/astro/sagittarius.png"},{name:"Capricorn",link:"images/astro/capricorn.png"},{name:"Aquarius",link:"images/astro/aquarius.png"},{name:"Pisces",link:"images/astro/pisces.png"}],e.horoscope="Choose your sign",e.call=function(r){e.horoscope="",$("#astro_horoscope i").css("display","inline-block"),t({url:"https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176",method:"POST",cache:!0,dataType:"json",data:JSON.stringify({sign:r})}).success(function(t){$("#astro_horoscope i").css("display","none"),e.horoscope=t.horoscope})}}])}(),function(){"use strict";var e=angular.module("map_app",[]);e.controller("GetMapCtrl",["$scope","$rootScope",function(e,t){{var r=t.city_id,n=t.locs;t.city_state_country}t.lat_lng=new google.maps.LatLng(n[r].lat,n[r].lon),t.zoom=13;var a={zoom:13,center:t.lat_lng},o=new google.maps.Map(document.getElementById("map-canvas"),a);t.map=o;var s=[];t.markers=s;var i="";e.$watch("lat_lng",function(){var e=null,r=!1;if("object"==typeof t.lat_lng)e=t.lat_lng;else{for(var n=0;n<s.length;n++)s[n].setMap(null);var a=t.lat_lng.split(","),l=a[0],c=a[1];e=new google.maps.LatLng(l,c),r=!0}if(i=new google.maps.Marker({position:e,map:o}),o.setZoom(t.zoom),o.setCenter(i.getPosition()),s.push(i),r){var u,p=$("#map_container"),m=p.offset().top,f=p.height(),g=$(window).height();u=g>f?m-(g/2-f/2):m;var d=700;$("html, body").animate({scrollTop:u},d)}}),$("#copyright").css("display","inline-block")}]),e.controller("SetLatLng",["$scope","$rootScope",function(e,t){e.isCollapsed=!1,e.set_marker=function(e,r){var n,a;if("object"==typeof e){n=null,a=null;for(var o in e)if(e.hasOwnProperty(o))switch(o){case"F":a=e[o];break;case"lng":a=e[o];break;case"lon":a=e[o];break;case"longitude":a=e[o];break;case"A":n=e[o];break;case"lat":n=e[o];break;case"latitude":n=e[o];break;case"k":n=e[o];break;case"D":a=e[o]}}else n=e,a=r;t.lat_lng=n+", "+a,t.zoom=18}}])}(),function(){"use strict";var e=angular.module("meetup_app",[]);e.controller("meetupCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_meetup=function(){e.details_spinner=!0,e.ismobile=screen.width<=400?!0:!1;var n=(new Date,new Date),a=new Date(n);a=a.setDate(n.getDate()+5),a=new Date(a);var o=t.city,s=t.locs,i=t.city_id,l=s[i].lat,c=s[i].lon,u="php/get_meetup.php";r({url:u,dataType:"json",method:"GET",cache:!0,params:{lat:l,lon:c}}).success(function(t,r,n){if("false"!==t){var s=[],i=[];s.push(jQuery.parseJSON(t)),s=jQuery.parseJSON(s),$.each(s.results,function(e,t){if(t.time<=a){var r={};r.city=o,r.name=t.name,r.group_name=t.group.name,r.description=t.description,r.join_mode=t.group.join_mode,r.who=t.group.who,r.why=t.why,r.how_to_find_us=t.how_to_find_us,"undefined"!=typeof t.venue&&(r.venue_name=t.venue.name,r.venue_address=t.venue.address,r.venue_city=t.venue.city,r.venue_phone=t.venue.phone);var n=new Date(t.time).toString();if(r.time=n.slice(0,21),"undefined"!=typeof t.fee&&(r.fee_amount=t.fee.amount,r.fee_currency=t.fee.currency,r.fee_description=t.fee.description),"undefined"!=typeof t.venue){var s=t.venue.lat,l=t.venue.lon;t.venue.lat&&t.venue.lon&&(r.point={lat:s,lon:l})}i.push(r)}}),e.meetup_unavailable=0===i.length?!0:!1,e.events=i,e.details_spinner=!1}else e.meetup_unavailable=!0,e.details_spinner=!1}),e.select=function(t){e.selected=t===e.selected?null:t,e.reset_scroll(t,1)},e.isActive=function(t){return e.selected===t}},e.get_meetup=function(){e.load_meetup()},e.reset_scroll=function(t,r){var n=t.name;n=n.replace(/\W/g,"");for(var a=0;a<e.events.length;a++){var o=e.events[a].name;if(o==t.name){e.detail_index=a;var s=$("#"+n).css("line-height");s=s.replace("px","");var i=e.detail_index,l=s*i,c=$(".meetup_container");$("html, body").find(c).animate({scrollTop:l},"slow");break}}}}]),e.filter("formatId",function(){return function(e){var t=e;return t?-1==e.indexOf(" ")?e:e=e.replace(/\W/g,""):void 0}}),e.filter("shortentext",function(){return function(e){var t=e;if(t){if(e.length>=30&&screen.width<=400){var r=e.substring(0,30);return r+="..."}return e}}})}(),function(){"use strict";var e=angular.module("movie_app",["ui.bootstrap"]);e.controller("MovieCtrl",["$scope","$rootScope","$http",function(e,t,r){var n=t.city.replace(" ",",")+","+t.state;e.good_data=!0,e.theaters={events:{name:"Unavailable"}},r({url:"php/get_movies.php",dataType:"json",method:"GET",params:{city:n}}).success(function(t){t.length>0&&(e.theaters=t)})}]),e.filter("movie_times",function(){return function(e){return e.replace(/(&nbsp)*/g,"")}}),e.filter("theater_name",function(){return function(e,t){return null===e||-1!=e.indexOf(";&#")?(t.good_data=!1,"Unavailable"):(e.replace(/(&nbsp)*/g,""),e)}})}(),function(){"use strict";var e=angular.module("nearby_app",[]);e.controller("NearbyCtrl",["$scope","$rootScope",function(e,t){function r(t){var r;r=t?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation.",e.set_message(r)}e.message="Select a place to find.",e.getCoordinates=function(n){e.what=n,e.set_message("Finding nearby "+n+"..."),navigator.geolocation?navigator.geolocation.getCurrentPosition(function(r){t.user_lat=r.coords.latitude,t.user_lng=r.coords.longitude,e.find_nearby(t.user_lat,t.user_lng,n)},function(){r(!0)}):r(!1)},e.set_message=function(t){e.message=t},e.find_nearby=function(r,n,a){function o(r,n){if(r.length){var o=r.length>1?"locations":"location";if(e.set_message("Found "+r.length+" "+o+" for "+e.what+"."),n==google.maps.places.PlacesServiceStatus.OK){for(var s=0;s<r.length;s++)e.createMarker(r[s],f);t.map.fitBounds(l)}}else e.set_message("Sorry there were no "+a+"'s found in 500 meters of your area.")}function s(){for(var e=0;e<t.markers.length;e++)t.markers[e].setMap(null)}s();var i=new google.maps.LatLng(r,n),l=new google.maps.LatLngBounds,c=new google.maps.LatLng(r,n),u=new google.maps.Marker({position:c,map:t.map});l.extend(u.getPosition()),t.map.setCenter(u.getPosition()),t.markers.push(u);var p={location:i,rankBy:google.maps.places.RankBy.DISTANCE,types:[a]},m=new google.maps.InfoWindow,f=new google.maps.places.PlacesService($("#for_places").get(0));f.nearbySearch(p,o),e.getDetails=function(e,t){var r={placeId:e.place_id};t.getDetails(r,function(e,t){if(t==google.maps.places.PlacesServiceStatus.OK){if("undefined"!=typeof e.formatted_phone_number){var r=e.formatted_phone_number;r=r.replace(/ /g,""),r=r.replace("(",""),r=r.replace(")",""),e.formatted_phone_number&&$("#info_win_phone_detail").html("<a href=tel:"+r+">ph: "+e.formatted_phone_number+"</a>"),e.website&&$("#info_win_website").html('<a href="'+e.website+'"  target="blank">website</a>')}}else console.log("got error")})},e.createMarker=function(r,n){var a="009933",o=new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+a,new google.maps.Size(21,34),new google.maps.Point(0,0),new google.maps.Point(10,34)),s=(r.geometry.location,new google.maps.Marker({map:t.map,position:r.geometry.location,icon:o}));l.extend(s.getPosition()),t.markers.push(s),google.maps.event.addListener(s,"click",function(){e.getDetails(r,n);var a="";if(a+="<div><strong>"+r.name+"</strong><br/>",r.rating&&(a+="Rating: "+r.rating+"<br/>"),r.price_level&&(a+="Price Level: "+r.price_level+"<br/>"),r.opening_hours){var o=r.opening_hours.open_now?"Yes":"No";a+="Open: "+o+"<br/>"}r.vicinity&&(a+=r.vicinity+"<br/>"),a+="<p><span id='info_win_phone_detail'></span>",a+="<span style='padding-left:12px;' id='info_win_website'></span></p>",m.setContent(a),m.open(t.map,this)})}},e.places=["airport","aquarium","art_gallery","atm","bakery","bank","bar","beauty_salon","bicycle_store","book_store","bowling_alley","bus_station","cafe","campground","car_dealer","car_rental","car_repair","car_wash","casino","church","clothing_store","convenience_store","dentist","department_store","doctor","electrician","electronics_store","fire_station","florist","food","furniture_store","gas_station","grocery_or_supermarket","gym","hair_care","hardware_store","hindu_temple","home_goods_store","hospital","jewelry_store","laundry","library","liquor_store","locksmith","lodging","meal_delivery","meal_takeaway","mosque","movie_rental","movie_theater","museum","night_club","park","parking","pet_store","pharmacy","place_of_worship","police","post_office","restaurant","rv_park","school","shoe_store","shopping_mall","spa","store","subway_station","synagogue","taxi_stand","train_station","university","veterinary_care","zoo"],e.status={isopen:!1},e.toggled=function(e){},e.toggleDropdown=function(t){t.preventDefault(),t.stopPropagation(),e.status.isopen=!e.status.isopen}}]),e.filter("remove_underscore",function(){return function(e){return-1==e.indexOf("_")?e:e.replace(/_/g," ")}})}(),function(){"use strict";var e=angular.module("places_app",[]);e.controller("PlacesCtrl",["$scope","$http","$rootScope",function(e,t,r){function n(){for(var e=0;e<r.markers.length;e++)r.markers[e].setMap(null)}e.load_places=function(t){function a(n,a,o){if(e[t]||(e[t]=[]),a!=google.maps.places.PlacesServiceStatus.OK)return e[t].push({status:a}),e.loading_places=0,void $("#"+t).css("display","none");e.loading_places=0;for(var s=e[t],i=0;i<n.length;i++)s.push(n[i]);if(e.$apply(function(){e[t]=s,r.cur_places=e[t]}),$("#"+t).css("display","block"),$("#"+t).text("More results"),o.hasNextPage){var l=document.getElementById(t);l.disabled=!1,google.maps.event.addDomListenerOnce(l,"click",function(){$("#"+t).text("Loading ..."),l.disabled=!0,o.nextPage()})}else $("#"+t).css("display","none")}if(l=["art_gallery","cafe","restaurant","bar","establishment","museum","night_club","store","other_places"],r.cur_type=l.indexOf(t),!e[t]){e.loading_places=!0,n();var o=r.city_id,s=r.locs,i=new google.maps.LatLng(s[o].lat,s[o].lon);e.bounds=new google.maps.LatLngBounds;var l;l="other_places"==t?["amusement_park","aquarium","bakery","book_store","bowling_alley","gym","park","zoo"]:[t];var c={location:i,radius:1e3,types:l},u=new google.maps.places.PlacesService($("#for_places").get(0));u.nearbySearch(c,a)}}}]),e.controller("DetailsCtrl",["$scope","$http","$rootScope","$q",function(e,t,r,n){e.get_details=function(t){e.has_details=!0,e.details=0;var r={placeId:t.place_id},n=new google.maps.places.PlacesService($("#for_places").get(0));n.getDetails(r,function(t,r){if(r==google.maps.places.PlacesServiceStatus.OK){var n="undefined"!=typeof t.photos?t.photos[0].getUrl({maxWidth:200,maxHeight:150}):null;n?a(n,t):(t.url=!1,e.details=t,e.has_details=!0),e.reset_scroll(t,2)}else console.log("got error")})},e.createMarker=function(t,n){var a="009933",o=new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+a,new google.maps.Size(21,34),new google.maps.Point(0,0),new google.maps.Point(10,34)),s=(t.geometry.location,new google.maps.Marker({map:r.map,position:t.geometry.location,icon:o}));e.bounds.extend(s.getPosition()),r.markers.push(s)},e.select=function(t){e.reset_scroll(t,1),e.get_details(t),e.selected=t===e.selected?null:t},e.reset_scroll=function(t,n){var a=t.name;if(a=a.replace(/\W/g,""),e.scroll_ready=!1,2===n&&(e.scroll_ready=!0),e.scroll_ready){for(var o=0;o<r.cur_places.length;o++){var s=r.cur_places[o].name;if(s==t.name){e.detail_index=o;break}}var i=$("#"+a).css("line-height");i=i.replace("px","");var l=2*e.detail_index,c=i*l,u=$(".placespanel:eq("+r.cur_type+")");$("html, body").find(u).animate({scrollTop:c},"slow")}},e.isActive=function(t){return e.selected===t};var a=function(t,r){var a=n.defer(),o=new Image;o.onerror=function(){console.log("image error"),a.resolve(!1)},o.onload=function(){a.resolve(!0)},o.src=t,a.promise.then(function(n){n?(r.url=t,e.details=r,e.has_details=!0):(r.url=!1,e.details=r,e.has_details=!0)})}}]),e.directive("placesa",function(){return{restrict:"EA",scope:{places:"=places",spinner:"=",btntxt:"@btntxt"},templateUrl:"partials/placesa.html"}}),e.filter("formatId",function(){return function(e){var t=e;return t?-1==e.indexOf(" ")?e:e=e.replace(/\W/g,""):void 0}}),e.filter("formatPhone",function(){return function(e){if("undefined"!=typeof e){var t=e;return t=t.replace(/ /g,""),t=t.replace("(",""),t=t.replace(")","")}}}),e.filter("formatType",function(){return function(e){var t=e;if(t){if(-1==e.indexOf("_"))return e=e.charAt(0).toUpperCase()+e.slice(1);for(var r=e.split("_"),n="",a=0;a<r.length;a++){var o=r[a];o=o.charAt(0).toUpperCase()+o.slice(1),n+=o+" "}return n}}})}(),function(){"use strict";var e=angular.module("quote_app",[]);e.controller("QuoteCtrl",["$scope","$http",function(e,t){var r=this,n=300,a=[];t.get("js/quotes.json").success(function(t){$.each(t,function(){var e={};e.quote=this.quote,e.author=this.author,a.push(e)});var o=Math.floor(Math.random()*a.length),s=a[o];e.fullquote=s.quote,e.author="--"+s.author,e.toggle_quote=!0,e.fullquote.length<=n?e.quote=e.fullquote:r.get_less_n_more("less")}),this.get_less_n_more=function(t){e.quote="less"==t?e.fullquote.substring(0,n)+"<span class=more>... more</span>":e.fullquote.substring(0,e.fullquote.length)+"<span class=less> less</span>"},e.toggle_more_less=function(){e.toggle_quote?(e.toggle_quote=!1,r.get_less_n_more("more")):(e.toggle_quote=!0,r.get_less_n_more("less"))}}])}(),function(){"use strict";var e=angular.module("rates_app",["ui.bootstrap"]);e.controller("RatesCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_rates=function(){e.details_spinner=!0;var t=this;e.amount=1,e.currencies=[],e.base_rates=["USD","AUD","EUR"],e.sel_grp=["USD","EUR","GBP","INR","AUD","CAD","CNY","NZD","JPY","RUB"],r.get("js/currencies.json").success(function(n){e.all_currencies=n;for(var a=0;a<e.base_rates.length;a++){for(var o="",s=0;s<e.sel_grp.length;s++)o+="'"+e.base_rates[a]+e.sel_grp[s]+"',";o=o.substring(0,o.length-1);var i="https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("+o+")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=";r({url:i,dataType:"json",method:"GET",cache:!0}).success(function(r,n,a){if(r){var o={};$.each(r.query.results.rate,function(r,n){var a=n.id;e.base=a.slice(0,3),o.sortid=e.base_rates.indexOf(e.base),n.country=a.slice(3),n.fullname=t.get_full_names(a.slice(3),e.all_currencies)}),o.base=e.base,o.fullname=t.get_full_names(e.base,e.all_currencies),o.rates=r.query.results.rate,e.currencies.push(o),e.currencies.length==e.base_rates.length&&e.currencies.sort(t.compare),e.details_spinner=!1}})}}),this.compare=function(e,t){return e.sortid<t.sortid?-1:e.sortid>t.sortid?1:0},this.get_full_names=function(e,t){for(var r in t)if(t.hasOwnProperty(r)&&r===e)return t[r]}},e.get_rates=function(){e.load_rates()}}])}(),function(){"use strict";var e=angular.module("time_app",[]);e.controller("GetTimeCtrl",["$scope","$rootScope","$http",function(e,t,r){var n=t.city_id,a=t.locs,o="jliberty";r({url:"http://api.geonames.org/timezoneJSON",dataType:"jsonp",cache:!0,method:"GET",params:{lat:a[n].lat,lng:a[n].lon,username:o}}).success(function(e){t.times.fulltime=e.time;var r=e.time.split(" ");t.times.current=r[1];var n=e.sunrise.split(" ");t.times.sunrise=n[1];var a=e.sunset.split(" ");t.times.sunset=a[1]})}])}(),function(){"use strict";var e=angular.module("twitter_app",[]);e.factory("formatText",function(){return{add_links:function(e,t){for(var r=!1,n=e,a=0;!r;){var o=n.indexOf(t);if(-1==o||a>100)return r=!0,e;var s=n.substring(o),i=s.indexOf(" "),l="";switch(-1==i&&(i=n.length),s=s.substring(0,i),t){case"http":l="<a href="+s+' target="blank">'+s.substring(7)+"</a>";break;case"#":l="<a href=https://twitter.com/hashtag/"+s.substring(1)+'?src=hash target="blank">'+s.substring(0)+"</a>";break;case"@":l="<a href=https://twitter.com/"+s.substring(1)+' target="blank">'+s.substring(0)+"</a>"}var c=parseInt(o+i);n=n.substring(c),e=e.replace(s,l),a+=1}}}}),e.controller("TwitterCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_twitter=function(){e.details_spinner=!0;var n="",a=t.city.replace(" ","%20");n=t.state?"%23"+a+"%20"+t.state:"%23"+a+"%20"+t.country,r({url:"php/get_twitter.php",dataType:"json",cache:!0,params:{q:n},method:"GET"}).success(function(t){e.details_spinner=!1,e.tweets=t})},e.get_twitter=function(){e.load_twitter()}}]),e.filter("addUrls",["$sce","formatText",function(e,t){return function(r){return r?(r=t.add_links(r,"http"),r=t.add_links(r,"#"),r=t.add_links(r,"@"),e.trustAsHtml(r)):void 0}}])}(),function(){"use strict";var e=angular.module("weather_app",[]);e.controller("CurWeatherCtrl",["$scope","$rootScope","$http",function(e,t,r){r({url:"http://api.openweathermap.org/data/2.5/weather",dataType:"json",method:"GET",params:{q:t.city_state_country,appid:"4e5600686359104d6dd1ad18d82bd70b"}}).success(function(t){e.cur_temp=t.main.temp,e.temp_max=t.main.temp_max,e.imagepath="http://openweathermap.org/img/w/"+t.weather[0].icon+".png",e.description=t.weather[0].description})}]),e.controller("DayForcastCtrl",["$scope","$rootScope","$http",function(e,t,r){var n="http://api.openweathermap.org/data/2.5/forecast";r({url:n,dataType:"json",method:"GET",params:{q:t.city_state_country,appid:"4e5600686359104d6dd1ad18d82bd70b"}}).success(function(r){var n="";n=t.times.fulltime?new Date(t.times.fulltime):new Date;var a=[],o=0,s=!1,i=r.list;for(var l in i)if(i.hasOwnProperty(l)){if(s)break;var c={},u=i[l];if("undefined"==u.dt)continue;var p=new Date(1e3*u.dt);if(n>p)continue;c.temps=u.main.temp;var m=p.toString(),f=m.slice(16,21);c.times=f;var g=u.weather[0].icon,d="http://openweathermap.org/img/w/"+g+".png";c.icons=String(d),c.descripts=String(u.weather[0].description),o+=1,o>11&&(s=!0),a.push(c)}e.daycast=a})}]),e.filter("temp",["$filter","$rootScope",function(e,t){return function(t,r){if(t){t-=273.15;var n=r[0],a=r[1];n=1;var o=e("number"),s="C"==a?"°C":"°F";return t&&"F"==a&&(t=(9*t/5+32).toFixed(2)),o(t,n)+s}return""}}])}(),function(){"use strict";var e=angular.module("yelp_app",[]);e.controller("YelpCtrl",["$scope","$rootScope","$http","$q",function(e,t,r,n){e.totalItems=0,e.currentPage=0,e.yelp={},e.filters=[{type:"Best matched",value:0},{type:"Closest",value:1},{type:"Highest Rated",value:2}],e.yelp.selectedItem=e.filters[1],e.find_yelp=function(n,a){$(".newspanel").scrollTop(0,0);var o=e.yelp;e[a+"_spinner"]=!0,e.is_search=!1;var s="search"==a?o.query:a,i=o.selectedItem.value,l="php/yelp_sample.php";r({url:l,dataType:"json",method:"GET",cache:!0,params:{term:s,sort:i,offset:10*(n-1)+1,location:t.city_state_country},config:{term:a,page:n}}).success(function(t,r,n,a){if(t){var o=[];o.push(jQuery.parseJSON(t)),o=jQuery.parseJSON(o);var s=String(a.config.term);e[s+"_spinner"]=!1;var i=String(a.config.page);o.businesses.currentPage=i,e[s]=o.businesses,e[s].count=o.total<=100?o.total:100;var l=parseInt(o.total/10)<=10?parseInt(o.total/10):10,c=1>=l?"false":"true";e["is_"+s]=c}})},e.load_yelp=function(t){e.find_yelp(1,t)},e.select=function(t){t===e.selected?!0:!1;e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t},e.setPage=function(t,r){e.find_yelp(t,r)},e.submit=function(){return""===this.query?void alert("Please type in a search term."):(e.query=this.query,void e.find_yelp(1,"search"))}}]),e.directive("yelpa",function(){return{restrict:"EA",scope:{things:"=things",spinner:"="},templateUrl:"partials/yelpa.html"}}),e.filter("formatPhone",function(){return function(e){if("undefined"!=typeof e){var t=e;return t=t.replace(/ /g,""),t=t.replace("(",""),t=t.replace(")","")}}}),e.filter("toString",function(){return function(e){return e.toString()}})}(),function(){"use strict";var e=angular.module("Site",["ngRoute","ui.bootstrap","ngSanitize","weather_app","yelp_app","astro_app","movie_app","faroo_app","quote_app","time_app","mycity-directives","events_app","map_app","places_app","twitter_app","ngTouch","meetup_app","rates_app","nearby_app"]);e.controller("ShowHomeController",["$scope","$rootScope","$location","$http","MyService",function(e,t,r,n,a){t.locs=a.get_json_data(),t.nameLength=20,t.cur_type=0,t.cur_places=[],t.times={fulltime:0,current:0,sunrise:0,sunset:0};var o=r.hash();t.city=o?o.replace(/_/g," "):"Melbourne",t.city_id=o?o:"Melbourne",t.state=o?t.locs[o].state:"",t.country=o?t.locs[o].country:"au",t.map=null,t.city_state_country="",t.city_state_country=t.state?t.city+", "+t.state+", "+t.country:t.city+", "+t.country;var s=t.locs;e.actions=[];for(var i in s)if(s.hasOwnProperty(i)){var l={};l.id=i;var c=s[i].state?i.replace(/_/g," ")+", "+s[i].state.toUpperCase():i.replace(/_/g," ");l.name=c,e.actions.push(l)}e.setAction=function(t){e.selectedAction=t,r.hash(e.selectedAction.id)}}]),e.controller("GetHeaderImage",["$scope","$rootScope","$http",function(e,t,r){var n,a=t.city_id.toLowerCase();t.state&&(n=t.state.toLowerCase());var o=t.country.toLowerCase(),s="../images/"+a;n&&(s+="_"+n),s+="_"+o,e.myInterval=7e3,r({url:"php/get_image_files.php",dataType:"json",cache:!0,method:"GET",params:{filename:s}}).success(function(r){e.slides=r,t.slidesdone=!0,$(".glyphicon-chevron-right").css("display","inline-block")})}]),e.service("MyService",["$http",function(e){var t=null,r=e.get("js/city_data.json").success(function(e){t=e});return{promise:r,get_json_data:function(){return t}}}]),e.config(["$routeProvider",function(e){e.when("/ShowHome",{templateUrl:"partials/home.html",controller:"ShowHomeController",resolve:{MyServiceData:["MyService",function(e){return e.promise}]}}).otherwise({redirectTo:"/ShowHome"})}]),e.directive("tooltip",function(){return{restrict:"A",link:function(e,t,r){$(t).hover(function(){$(t).tooltip("show"),setTimeout(function(){$(t).tooltip("hide")},3e3)},function(){$(t).tooltip("hide")})}}})}();