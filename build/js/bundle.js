!function(){var e=angular.module("mycity-directives",[]);e.directive("dayAstroQuote",function(){return{restrict:"E",templateUrl:"partials/day-astro-quote.html"}}),e.directive("header",function(){return{restrict:"E",templateUrl:"partials/header.html"}}),e.directive("forcast",function(){return{restrict:"E",templateUrl:"partials/forcast.html"}}),e.directive("news-movies",function(){return{restrict:"E",templateUrl:"partials/news-movies.html"}}),e.directive("yelp",function(){return{restrict:"E",templateUrl:"partials/yelp.html"}}),e.directive("faroo",function(){return{restrict:"E",templateUrl:"partials/faroo.html"}}),e.directive("movies",function(){return{restrict:"E",templateUrl:"partials/movies.html"}}),e.directive("map",function(){return{restrict:"E",templateUrl:"partials/map.html"}}),e.directive("events",function(){return{restrict:"E",templateUrl:"partials/events.html"}}),e.directive("headerImage",function(){return{restrict:"E",templateUrl:"partials/header-image.html"}}),e.directive("places",function(){return{restrict:"E",templateUrl:"partials/places.html"}}),e.directive("credits",function(){return{restrict:"E",templateUrl:"partials/credits.html"}}),e.directive("twitter",function(){return{restrict:"E",templateUrl:"partials/twitter.html"}}),e.directive("meetup",function(){return{restrict:"E",templateUrl:"partials/meetup.html"}}),e.directive("rates",function(){return{restrict:"E",templateUrl:"partials/rates.html"}}),e.directive("nearby",function(){return{restrict:"E",templateUrl:"partials/nearby.html"}}),e.directive("navbar",function(){return{restrict:"E",templateUrl:"partials/navbar.html"}}),e.directive("imageonload",function(){return{restrict:"A",link:function(e,t,r){t.bind("load",function(){$("#image_spinner, #image_spinner i").css("display","none"),$("#header_image img").css({display:"block","margin-top":"53px"})})}}})}(),function(){"use strict";var e=angular.module("events_app",[]);e.factory("formatDate",function(){return{yyyy_mm_dd:function(e){var t=e.getDate(e);10>t&&(t="0"+t);var r=e.getMonth(e)+1;10>r&&(r="0"+r);var n=e.getFullYear(e);return n+"-"+r+"-"+t}}}),e.controller("EventsCtrl",["$scope","$rootScope","$http","formatDate",function(e,t,r,n){t.slidesdone=!1,e.num_of_categories=0,e.cats_returned=0,e.loading_events=!0,e.is_search=!1,e.query="",e.find_events=function(o,a,s){var i=a;e[a+"_spinner"]=!0;var l=this;e.events={events:{title:"Retreiving events for "+t.city+"."}};var c={};c.page_number=o,c.count_only=s;var u="search"==a?e.query:"";u&&(c.keywords=u,c.sort_order="date"),a="search"==a?"":a,a&&(c.category=a,c.sort_order="popularity");var p;if(a){var m=new Date;m=n.yyyy_mm_dd(m),m=m.replace(/-/g,"")+"00",p=m+"-"+m}else p="Future";c.date=p,c.page_size="10";var f=t.city,d="";d=t.state?f+","+t.state+","+t.country:f+","+t.country,c.location=d;var g="php/get_event.php";r({url:g,dataType:"json",method:"GET",cache:!0,params:c,config:{category:i}}).success(function(t,r,n,o){e.cats_returned+=1,e.cats_returned>=e.num_of_categories&&(e.loading_events=!1);var a=[];if(t.events){var s;s=t.events.event.length?e.events=t.events.event:t.events,$.each(s,function(e,t){var r={};r.image=null!==t.image?t.image.medium.url:"",r.title=null!==t.title?t.title:!1,r.url=null!==t.url?t.url:!1,r.venue_name=null!==t.venue_name?t.venue_name:!1,r.start_time=null!==t.start_time?t.start_time:!1;var n=l.clean_stop_time(r.start_time,t.stop_time);r.stop_time=null!==n?n:!1,r.description=null!==t.description?l.cleanIt(t.description):!1,r.venue_address=null!==t.venue_address?t.venue_address:!1,r.geocode_type=null!==t.geocode_type?l.checkGeocode(t.geocode_type):!1,r.latitude=null!==t.latitude?t.latitude:!1,r.longitude=null!==t.longitude?t.longitude:!1,a.push(r)}),$(".newspanel").scrollTop(0,0)}if(0!=t.total_items){var i=String(o.config.category),c="cat"+i;e[c]=i,e[i+"totalItems"]=t.total_items,e[i+"currentPage"]=t.page_number,e[i+"numOfPages"]=t.page_count,e[i+"itemsPerPage"]=t.page_size;var u=parseInt(e[i+"totalItems"])<=parseInt(e[i+"itemsPerPage"])?"none":"block";$("#"+c).css("display",u),a.length&&(e[i]=a,e[i+"_spinner"]=!1)}}),this.cleanIt=function(e){return e.replace(/(<([^>]+)>)/gi," ")},this.clean_stop_time=function(e,t){if(e&&t){var r=e.indexOf(" "),n=e.slice(0,r);r=t.indexOf(" ");var o=t.slice(0,r),a=t.slice(r);return a=n==o?a:t}},this.checkGeocode=function(e){return"EVDB Geocoder"==e?!1:!0}},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.find_categories()},500)}),e.find_categories=function(){var t=["attractions","art","business","clubs_associations","comedy","community","family_fun_kids","festivals_parades","fundraisers","learning_education","movies_film","music","outdoors_recreation","performing_arts","politics_activism","sales","singles_social","sports","support","technology"];e.num_of_categories=t.length;for(var r=0;r<t.length;r++)e.find_events(1,t[r],1)},e.submit=function(){return""===this.query?void alert("Please type in a search term."):(e.query=this.query.replace(/ /g,"%20"),void e.find_events(1,"search",0))},e.get_event=function(t){e.find_events(1,t,0)},e.setPage=function(t,r){e.find_events(t,r)}}]),e.directive("hmtext",function(){return{restrict:"EA",scope:{hmtext:"=hmtext",hmlimit:"=",hmfulltext:"="},templateUrl:"partials/moreless.html",controller:["$scope",function(e){e.toggleValue=function(){e.hmfulltext=e.hmfulltext===!0?!1:e.hmfulltext===!1?!0:!0}}]}}),e.directive("eventa",function(){return{restrict:"EA",scope:{url:"=",image:"=",title:"=",venuename:"=",start:"=",stop:"=",address:"="},templateUrl:"partials/eventsa.html"}}),e.directive("eventb",function(){return{restrict:"EA",scope:{geocode:"=",latitude:"=",longitude:"=",url:"="},templateUrl:"partials/eventsb.html"}}),e.filter("cleanTime",function(){return function(e){if(e){if(e.indexOf(" ")){var t=e.split(" "),r="00:00:00"!=t[1]?e:t[0];return r}return e}}}),e.filter("capitalize_fist_char",function(){return function(e){if(e){var t=e.charAt(0).toUpperCase()+e.slice(1);return t=t.replace(/_/g," ")}}})}(),function(){"use strict";var e=angular.module("faroo_app",[]);e.controller("FarooCtrl",["$scope","$rootScope","$http","formatDate","$q",function(e,t,r,n,o){$(".tabs_container").css("visibility","visible"),e.is_search=!1,e.query="",e.find_news=function(t,n){e[n+"_spinner"]=!0,e.is_search=!1;var a=this,s="search"==n?e.query:n,i="php/get_faroo.php";r({url:i,dataType:"json",method:"GET",cache:!0,params:{start:10*(t-1)+1,query:s},config:{term:n,page:t}}).success(function(t,r,n,o){if(t){$(".newspanel").scrollTop(0,0);var s=String(o.config.term);e[s+"_spinner"]=!1;var i=String(o.config.page);t.currentPage=i,a.isImage(t,s);var l=parseInt(t.count/10);$(".newspanel").css("display","block");var c=1>=l?"false":"true";e["is_"+s]=c}}),this.isImage=function(t,r){$.each(t.results,function(e,t){var r=o.defer(),n=new Image;n.onerror=function(){r.resolve(!1)},n.onload=function(){r.resolve(!0)},n.src=t.iurl,r.promise.then(function(e){e||(t.iurl="")})}),e[r]=t}},e.setPage=function(t,r){e.find_news(t,r)},e.get_article=function(t){e.find_news(1,t)},e.submit=function(){return""===this.query?void alert("Please type in a search term."):(e.query=this.query.replace(/ /g,"%20"),void e.find_news(1,"search"))}}]),e.directive("farootopic",function(){return{restrict:"EA",scope:{article:"=article",spinner:"="},templateUrl:"partials/farootopic.html"}})}(),function(){"use strict";var e=angular.module("astro_app",[]);e.controller("AstroCtrl",["$scope","$http","$rootScope",function(e,t,r){e.signs=[{name:"Aries",link:"images/astro/aries.png"},{name:"Taurus",link:"images/astro/taurus.png"},{name:"Gemini",link:"images/astro/gemini.png"},{name:"Cancer",link:"images/astro/cancer.png"},{name:"Leo",link:"images/astro/leo.png"},{name:"Virgo",link:"images/astro/virgo.png"},{name:"Libra",link:"images/astro/libra.png"},{name:"Scorpio",link:"images/astro/scorpio.png"},{name:"Sagittarius",link:"images/astro/sagittarius.png"},{name:"Capricorn",link:"images/astro/capricorn.png"},{name:"Aquarius",link:"images/astro/aquarius.png"},{name:"Pisces",link:"images/astro/pisces.png"}],e.horoscope="Choose your sign",e.call=function(r){e.horoscope="",$("#astro_horoscope i").css("display","inline-block"),t({url:"https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176",method:"POST",dataType:"json",data:JSON.stringify({sign:r})}).success(function(t){$("#astro_horoscope i").css("display","none"),e.horoscope=t.horoscope})}}])}(),function(){"use strict";var e=angular.module("map_app",[]);e.controller("GetMapCtrl",["$scope","$rootScope",function(e,t){{var r=t.city_id,n=t.locs;t.city_state_country}t.lat_lng=new google.maps.LatLng(n[r].lat,n[r].lon),t.zoom=13;var o={zoom:13,center:t.lat_lng},a=new google.maps.Map(document.getElementById("map-canvas"),o);t.map=a;var s=[];t.markers=s;var i="";e.$watch("lat_lng",function(){var e=null,r=!1;if("object"==typeof t.lat_lng)e=t.lat_lng;else{for(var n=0;n<s.length;n++)s[n].setMap(null);var o=t.lat_lng.split(","),l=o[0],c=o[1];e=new google.maps.LatLng(l,c),r=!0}if(i=new google.maps.Marker({position:e,map:a}),a.setZoom(t.zoom),a.setCenter(i.getPosition()),s.push(i),r){var u,p=$("#map_container"),m=p.offset().top,f=p.height(),d=$(window).height();u=d>f?m-(d/2-f/2):m;var g=700;$("html, body").animate({scrollTop:u},g)}}),$("#copyright").css("display","inline-block")}]),e.controller("SetLatLng",["$scope","$rootScope",function(e,t){e.isCollapsed=!1,e.set_marker=function(e,r){var n,o;if("object"==typeof e){n=null,o=null;for(var a in e)if(e.hasOwnProperty(a))switch(a){case"F":o=e[a];break;case"lng":o=e[a];break;case"lon":o=e[a];break;case"longitude":o=e[a];break;case"A":n=e[a];break;case"lat":n=e[a];break;case"latitude":n=e[a];break;case"k":n=e[a];break;case"D":o=e[a]}}else n=e,o=r;t.lat_lng=n+", "+o,t.zoom=18}}])}(),function(){"use strict";var e=angular.module("meetup_app",[]);e.controller("meetupCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_meetup=function(){var r=(new Date,new Date),n=new Date(r);n=n.setDate(r.getDate()+5),n=new Date(n);var o=t.city,a=t.state,s=t.country,i=t.locs,l=t.city_id,c=i[l].lat,u=i[l].lon,p="https://api.meetup.com/2/open_events?callback=?&lat="+c+"&country="+s+"&city="+o+"&state="+a+"&text=travel&lon="+u+"&key=5579136d5823c8054341258e452f",m=[];$("#meetup_spinner i").css("display","inline-block"),$.getJSON(p,function(t){$("#meetup_spinner i").css("display","none"),$.each(t.results,function(e,t){if(t.time<=n){var r={};r.city=o,r.name=t.name,r.group_name=t.group.name,r.description=t.description,r.join_mode=t.group.join_mode,r.who=t.group.who,r.why=t.why,r.how_to_find_us=t.how_to_find_us,"undefined"!=typeof t.venue&&(r.venue_name=t.venue.name,r.venue_address=t.venue.address,r.venue_city=t.venue.city,r.venue_phone=t.venue.phone);var a=new Date(t.time).toString();if(r.time=a.slice(0,21),"undefined"!=typeof t.fee&&(r.fee_amount=t.fee.amount,r.fee_currency=t.fee.currency,r.fee_description=t.fee.description),"undefined"!=typeof t.venue){var s=t.venue.lat,i=t.venue.lon;t.venue.lat&&t.venue.lon&&(r.point={lat:s,lon:i})}m.push(r)}}),e.meetup_unavailable=0===m.length?!0:!1,e.events=m}),e.select=function(t){e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t}},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_meetup()},500)})}])}(),function(){"use strict";var e=angular.module("movie_app",["ui.bootstrap"]);e.controller("MovieCtrl",["$scope","$rootScope","$http",function(e,t,r){var n=t.city.replace(" ",",")+","+t.state;e.good_data=!0,e.theaters={events:{name:"Unavailable"}},r({url:"php/get_movies.php",dataType:"json",method:"GET",params:{city:n}}).success(function(t){t.length>0&&(e.theaters=t)})}]),e.filter("movie_times",function(){return function(e){return e.replace(/(&nbsp)*/g,"")}}),e.filter("theater_name",function(){return function(e,t){return null===e||-1!=e.indexOf(";&#")?(t.good_data=!1,"Unavailable"):(e.replace(/(&nbsp)*/g,""),e)}})}(),function(){"use strict";var e=angular.module("nearby_app",[]);e.controller("NearbyCtrl",["$scope","$rootScope",function(e,t){function r(t){var r;r=t?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation.",e.set_message(r)}e.message="Select a place to find.",e.getCoordinates=function(n){e.what=n,e.set_message("Finding nearby "+n+"..."),navigator.geolocation?navigator.geolocation.getCurrentPosition(function(r){t.user_lat=r.coords.latitude,t.user_lng=r.coords.longitude,e.find_nearby(t.user_lat,t.user_lng,n)},function(){r(!0)}):r(!1)},e.set_message=function(t){e.message=t},e.find_nearby=function(r,n,o){function a(r,n){if(r.length){var a=r.length>1?"locations":"location";if(e.set_message("Found "+r.length+" "+a+" for "+e.what+"."),n==google.maps.places.PlacesServiceStatus.OK){for(var s=0;s<r.length;s++)e.createMarker(r[s],f);t.map.fitBounds(l)}}else e.set_message("Sorry there were no "+o+"'s found in 500 meters of your area.")}function s(){for(var e=0;e<t.markers.length;e++)t.markers[e].setMap(null)}s();var i=new google.maps.LatLng(r,n),l=new google.maps.LatLngBounds,c=new google.maps.LatLng(r,n),u=new google.maps.Marker({position:c,map:t.map});l.extend(u.getPosition()),t.map.setCenter(u.getPosition()),t.markers.push(u);var p={location:i,rankBy:google.maps.places.RankBy.DISTANCE,types:[o]},m=new google.maps.InfoWindow,f=new google.maps.places.PlacesService($("#for_places").get(0));f.nearbySearch(p,a),e.getDetails=function(e,t){var r={placeId:e.place_id};t.getDetails(r,function(e,t){if(t==google.maps.places.PlacesServiceStatus.OK){if("undefined"!=typeof e.formatted_phone_number){var r=e.formatted_phone_number;r=r.replace(/ /g,""),r=r.replace("(",""),r=r.replace(")",""),e.formatted_phone_number&&$("#info_win_phone_detail").html("<a href=tel:"+r+">ph: "+e.formatted_phone_number+"</a>"),e.website&&$("#info_win_website").html('<a href="'+e.website+'"  target="blank">website</a>')}}else console.log("got error")})},e.createMarker=function(r,n){var o="009933",a=new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+o,new google.maps.Size(21,34),new google.maps.Point(0,0),new google.maps.Point(10,34)),s=(r.geometry.location,new google.maps.Marker({map:t.map,position:r.geometry.location,icon:a}));l.extend(s.getPosition()),t.markers.push(s),google.maps.event.addListener(s,"click",function(){e.getDetails(r,n);var o="";if(o+="<div><strong>"+r.name+"</strong><br/>",r.rating&&(o+="Rating: "+r.rating+"<br/>"),r.price_level&&(o+="Price Level: "+r.price_level+"<br/>"),r.opening_hours){var a=r.opening_hours.open_now?"Yes":"No";o+="Open: "+a+"<br/>"}r.vicinity&&(o+=r.vicinity+"<br/>"),o+="<p><span id='info_win_phone_detail'></span>",o+="<span style='padding-left:12px;' id='info_win_website'></span></p>",m.setContent(o),m.open(t.map,this)})}},e.places=["airport","aquarium","art_gallery","atm","bakery","bank","bar","beauty_salon","bicycle_store","book_store","bowling_alley","bus_station","cafe","campground","car_dealer","car_rental","car_repair","car_wash","casino","church","clothing_store","convenience_store","dentist","department_store","doctor","electrician","electronics_store","fire_station","florist","food","furniture_store","gas_station","grocery_or_supermarket","gym","hair_care","hardware_store","hindu_temple","home_goods_store","hospital","jewelry_store","laundry","library","liquor_store","locksmith","lodging","meal_delivery","meal_takeaway","mosque","movie_rental","movie_theater","museum","night_club","park","parking","pet_store","pharmacy","place_of_worship","police","post_office","restaurant","rv_park","school","shoe_store","shopping_mall","spa","store","subway_station","synagogue","taxi_stand","train_station","university","veterinary_care","zoo"],e.status={isopen:!1},e.toggled=function(e){$log.log("Dropdown is now: ",e)},e.toggleDropdown=function(t){t.preventDefault(),t.stopPropagation(),e.status.isopen=!e.status.isopen}}]),e.filter("remove_underscore",function(){return function(e){return-1==e.indexOf("_")?e:e.replace(/_/g," ")}})}(),function(){"use strict";var e=angular.module("places_app",[]);e.controller("PlacesCtrl",["$scope","$http","$rootScope","$q",function(e,t,r,n){e.load_places=function(){function t(t,r,n){if(r==google.maps.places.PlacesServiceStatus.OK){var a=new google.maps.places.PlacesService($("#for_places").get(0));e.places=[];for(var s=0;s<t.length;s++)o(s,t,a)}}var n=r.city_id,a=r.locs,s=new google.maps.LatLng(a[n].lat,a[n].lon),i={location:s,radius:500,types:["amusement_park","aquarium","art_gallery","casino","gym","library","movie_theater","museum","night_club","park","shopping_mall","spa","stadium","train_station","zoo"]},l=new google.maps.places.PlacesService($("#for_places").get(0));l.nearbySearch(i,t)},r.$watch("slidesdone",function(){r.slidesdone&&setTimeout(function(){e.load_places()},500)});var o=function(e,t,r){!function(e){setTimeout(function(){var n={placeId:t[e].place_id};r.getDetails(n,function(e,t){if(t==google.maps.places.PlacesServiceStatus.OK){var r="undefined"!=typeof e.photos?e.photos[0].getUrl({maxWidth:200,maxHeight:200}):null;if(!r)return;a(r,e)}else console.log("got error")})},1e3+1e3*e)}(e)},a=function(t,r){var o=n.defer(),a=new Image;a.onerror=function(){o.resolve(!1)},a.onload=function(){o.resolve(!0)},a.src=t,o.promise.then(function(n){n?(r.url=t,e.places.push(r)):(r.url=!1,e.places.push(r))})}}]),e.filter("formatType",function(){return function(e){if(-1==e.indexOf("_"))return e;for(var t=e.split("_"),r="",n=0;n<t.length;n++){var o=t[n];o=o.charAt(0).toUpperCase()+o.slice(1),r+=o+" "}return r}})}(),function(){"use strict";var e=angular.module("quote_app",[]);e.controller("QuoteCtrl",["$scope","$http",function(e,t){var r=this,n=300,o=[];t.get("js/quotes.json").success(function(t){$.each(t,function(){var e={};e.quote=this.quote,e.author=this.author,o.push(e)});var a=Math.floor(Math.random()*o.length),s=o[a];e.fullquote=s.quote,e.author="--"+s.author,e.toggle_quote=!0,e.fullquote.length<=n?e.quote=e.fullquote:r.get_less_n_more("less")}),this.get_less_n_more=function(t){e.quote="less"==t?e.fullquote.substring(0,n)+"<span class=more>... more</span>":e.fullquote.substring(0,e.fullquote.length)+"<span class=less> less</span>"},e.toggle_more_less=function(){e.toggle_quote?(e.toggle_quote=!1,r.get_less_n_more("more")):(e.toggle_quote=!0,r.get_less_n_more("less"))}}])}(),function(){"use strict";var e=angular.module("rates_app",["ui.bootstrap"]);e.controller("RatesCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_rates=function(){var t=this;e.amount=1,e.currencies=[],e.base_rates=["USD","AUD","EUR"],e.sel_grp=["USD","EUR","GBP","INR","AUD","CAD","CNY","NZD","JPY","RUB"],r.get("js/currencies.json").success(function(r){e.all_currencies=r;for(var n=0;n<e.base_rates.length;n++){for(var o="",a=0;a<e.sel_grp.length;a++)o+="'"+e.base_rates[n]+e.sel_grp[a]+"',";o=o.substring(0,o.length-1);var s="https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("+o+")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=";$.getJSON(s,function(r){var n={};$.each(r.query.results.rate,function(r,o){var a=o.id;e.base=a.slice(0,3),n.sortid=e.base_rates.indexOf(e.base),o.country=a.slice(3),o.fullname=t.get_full_names(a.slice(3),e.all_currencies)}),n.base=e.base,n.fullname=t.get_full_names(e.base,e.all_currencies),n.rates=r.query.results.rate,e.currencies.push(n),e.currencies.length==e.base_rates.length&&e.currencies.sort(t.compare)})}}),this.compare=function(e,t){return e.sortid<t.sortid?-1:e.sortid>t.sortid?1:0},this.get_full_names=function(e,t){for(var r in t)if(t.hasOwnProperty(r)&&r===e)return t[r]}},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_rates()},500)})}])}(),function(){"use strict";var e=angular.module("time_app",[]);e.controller("GetTimeCtrl",["$scope","$rootScope","$http",function(e,t,r){var n=t.city_id,o=t.locs,a="jliberty";r({url:"http://api.geonames.org/timezoneJSON",dataType:"jsonp",method:"GET",params:{lat:o[n].lat,lng:o[n].lon,username:a}}).success(function(e){t.times.fulltime=e.time;var r=e.time.split(" ");t.times.current=r[1];var n=e.sunrise.split(" ");t.times.sunrise=n[1];var o=e.sunset.split(" ");t.times.sunset=o[1]})}])}(),function(){"use strict";var e=angular.module("twitter_app",[]);e.factory("formatText",function(){return{add_links:function(e,t){for(var r=!1,n=e,o=0;!r;){var a=n.indexOf(t);if(-1==a||o>100)return r=!0,e;var s=n.substring(a),i=s.indexOf(" "),l="";switch(-1==i&&(i=n.length),s=s.substring(0,i),t){case"http":l="<a href="+s+' target="blank">'+s.substring(7)+"</a>";break;case"#":l="<a href=https://twitter.com/hashtag/"+s.substring(1)+'?src=hash target="blank">'+s.substring(0)+"</a>";break;case"@":l="<a href=https://twitter.com/"+s.substring(1)+' target="blank">'+s.substring(0)+"</a>"}var c=parseInt(a+i);n=n.substring(c),e=e.replace(s,l),o+=1}}}}),e.controller("TwitterCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_twitter=function(){var n="",o=t.city.replace(" ","%20");n=t.state?"%23"+o+"%20"+t.state:"%23"+o+"%20"+t.country,$("#twitter_spinner i").css("display","inline-block"),r({url:"php/get_twitter.php",dataType:"json",params:{q:n},method:"GET"}).success(function(t){$("#twitter_spinner i").css("display","none"),e.tweets=t})},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_twitter()},500)})}]),e.filter("addUrls",["$sce","formatText",function(e,t){return function(r){return r?(r=t.add_links(r,"http"),r=t.add_links(r,"#"),r=t.add_links(r,"@"),e.trustAsHtml(r)):void 0}}])}(),function(){"use strict";var e=angular.module("weather_app",[]);e.controller("CurWeatherCtrl",["$scope","$rootScope","$http",function(e,t,r){r({url:"http://api.openweathermap.org/data/2.5/weather",dataType:"json",method:"GET",params:{q:t.city_state_country,appid:"4e5600686359104d6dd1ad18d82bd70b"}}).success(function(t){e.cur_temp=t.main.temp,e.temp_max=t.main.temp_max,e.imagepath="http://openweathermap.org/img/w/"+t.weather[0].icon+".png",e.description=t.weather[0].description})}]),e.controller("DayForcastCtrl",["$scope","$rootScope","$http",function(e,t,r){var n="http://api.openweathermap.org/data/2.5/forecast";r({url:n,dataType:"json",method:"GET",params:{q:t.city_state_country,appid:"4e5600686359104d6dd1ad18d82bd70b"}}).success(function(r){var n="";n=t.times.fulltime?new Date(t.times.fulltime):new Date;var o=[],a=0,s=!1,i=r.list;for(var l in i)if(i.hasOwnProperty(l)){if(s)break;var c={},u=i[l];if("undefined"==u.dt)continue;var p=new Date(1e3*u.dt);if(n>p)continue;c.temps=u.main.temp;var m=p.toString(),f=m.slice(16,21);c.times=f;var d=u.weather[0].icon,g="http://openweathermap.org/img/w/"+d+".png";c.icons=String(g),c.descripts=String(u.weather[0].description),a+=1,a>11&&(s=!0),o.push(c)}e.daycast=o})}]),e.filter("temp",["$filter","$rootScope",function(e,t){return function(t,r){if(t){t-=273.15;var n=r[0],o=r[1];n=1;var a=e("number"),s="C"==o?"°C":"°F";return t&&"F"==o&&(t=(9*t/5+32).toFixed(2)),a(t,n)+s}return""}}])}(),function(){"use strict";var e=angular.module("yelp_app",[]);e.controller("MusicVenueCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_yelp=function(){r({url:"php/yelp_sample.php",method:"GET",params:{term:"hotels",location:t.city_state_country}}).success(function(t){var r=[];r.push(jQuery.parseJSON(t)),r=jQuery.parseJSON(r),e.yelp_unavailable=!1,r.error&&(e.yelp_unavailable=!0),e.musicvenues=r.businesses})},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_yelp()},500)}),e.select=function(t){t===e.selected?!0:!1;e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t}}]),e.controller("RestaurantCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_yelp=function(){r({url:"php/yelp_sample.php",method:"GET",params:{term:"restaurant",location:t.city_state_country}}).success(function(t){var r=[];r.push(jQuery.parseJSON(t)),r=jQuery.parseJSON(r),e.yelp_unavailable=!1,r.error&&(e.yelp_unavailable=!0),e.restaurants=r.businesses})},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_yelp()},500)}),e.select=function(t){t===e.selected?!0:!1;e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t}}]),e.controller("ClubCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_yelp=function(){r({url:"php/yelp_sample.php",method:"GET",params:{term:"happy hour",location:t.city_state_country}}).success(function(t){var r=[];r.push(jQuery.parseJSON(t)),r=jQuery.parseJSON(r);Object.prototype.toString.call(r);e.yelp_unavailable=!1,r.error&&(e.yelp_unavailable=!0),e.clubs=r.businesses})},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_yelp()},500)}),e.select=function(t){t===e.selected?!0:!1;e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t}}]),e.controller("GallaryCtrl",["$scope","$rootScope","$http",function(e,t,r){e.load_yelp=function(){r({url:"php/yelp_sample.php",method:"GET",params:{term:"show",location:t.city_state_country}}).success(function(t){var r=[];r.push(jQuery.parseJSON(t)),r=jQuery.parseJSON(r),e.yelp_unavailable=!1,r.error&&(e.yelp_unavailable=!0),e.galleries=r.businesses})},t.$watch("slidesdone",function(){t.slidesdone&&setTimeout(function(){e.load_yelp()},500)}),e.select=function(t){e.selected=t===e.selected?null:t},e.isActive=function(t){return e.selected===t}}]),e.filter("toString",function(){return function(e){return e.toString()}})}(),function(){"use strict";var e=angular.module("Site",["ngRoute","ui.bootstrap","ngSanitize","weather_app","yelp_app","astro_app","movie_app","faroo_app","quote_app","time_app","mycity-directives","events_app","map_app","places_app","twitter_app","ngTouch","meetup_app","rates_app","nearby_app"]);e.controller("ShowHomeController",["$scope","$rootScope","$location","$http","MyService",function(e,t,r,n,o){t.locs=o.get_json_data(),t.nameLength=20,t.times={fulltime:0,current:0,sunrise:0,sunset:0};var a=r.hash();t.city=a?a.replace(/_/g," "):"Melbourne",t.city_id=a?a:"Melbourne",t.state=a?t.locs[a].state:"",t.country=a?t.locs[a].country:"au",t.map=null,t.city_state_country="",t.city_state_country=t.state?t.city+", "+t.state+", "+t.country:t.city+", "+t.country;var s=t.locs;e.actions=[];for(var i in s)if(s.hasOwnProperty(i)){var l={};l.id=i;var c=s[i].state?i.replace(/_/g," ")+", "+s[i].state.toUpperCase():i.replace(/_/g," ");l.name=c,e.actions.push(l)}e.setAction=function(t){e.selectedAction=t,r.hash(e.selectedAction.id)}}]),e.controller("GetHeaderImage",["$scope","$rootScope","$http",function(e,t,r){var n,o=t.city_id.toLowerCase();t.state&&(n=t.state.toLowerCase());var a=t.country.toLowerCase(),s="../images/"+o;n&&(s+="_"+n),s+="_"+a,e.myInterval=7e3,r({url:"php/get_image_files.php",dataType:"json",method:"GET",params:{filename:s}}).success(function(r){e.slides=r,t.slidesdone=!0})}]),e.service("MyService",["$http",function(e){var t=null,r=e.get("js/city_data.json").success(function(e){t=e});return{promise:r,get_json_data:function(){return t}}}]),e.config(["$routeProvider",function(e){e.when("/ShowHome",{templateUrl:"partials/home.html",controller:"ShowHomeController",resolve:{MyServiceData:["MyService",function(e){return e.promise}]}}).otherwise({redirectTo:"/ShowHome"})}]),e.directive("tooltip",function(){return{restrict:"A",link:function(e,t,r){$(t).hover(function(){$(t).tooltip("show"),setTimeout(function(){$(t).tooltip("hide")},3e3)},function(){$(t).tooltip("hide")})}}})}(),function(){"use strict";var e=angular.module("Site",["ngRoute","ui.bootstrap","ngSanitize","weather_app","yelp_app","astro_app","movie_app","faroo_app","quote_app","time_app","mycity-directives","events_app","map_app","places_app","twitter_app","ngTouch","meetup_app","rates_app","nearby_app"]);e.controller("ShowHomeController",["$scope","$rootScope","$location","$http","MyService",function(e,t,r,n,o){t.locs=o.get_json_data(),t.nameLength=20,t.times={fulltime:0,current:0,sunrise:0,sunset:0};var a=r.hash();t.city=a?a.replace(/_/g," "):"Melbourne",t.city_id=a?a:"Melbourne",t.state=a?t.locs[a].state:"",t.country=a?t.locs[a].country:"au",t.map=null,t.city_state_country="",t.city_state_country=t.state?t.city+", "+t.state+", "+t.country:t.city+", "+t.country;var s=t.locs;e.actions=[];for(var i in s)if(s.hasOwnProperty(i)){var l={};l.id=i;var c=s[i].state?i.replace(/_/g," ")+", "+s[i].state.toUpperCase():i.replace(/_/g," ");l.name=c,e.actions.push(l)}e.setAction=function(t){e.selectedAction=t,r.hash(e.selectedAction.id)}}]),e.controller("GetHeaderImage",["$scope","$rootScope","$http",function(e,t,r){var n,o=t.city_id.toLowerCase();t.state&&(n=t.state.toLowerCase());var a=t.country.toLowerCase(),s="../images/"+o;n&&(s+="_"+n),s+="_"+a,e.myInterval=7e3,r({url:"php/get_image_files.php",dataType:"json",method:"GET",params:{filename:s}}).success(function(r){e.slides=r,t.slidesdone=!0})}]),e.service("MyService",["$http",function(e){var t=null,r=e.get("js/city_data.json").success(function(e){t=e});return{promise:r,get_json_data:function(){return t}}}]),e.config(["$routeProvider",function(e){e.when("/ShowHome",{templateUrl:"partials/home.html",controller:"ShowHomeController",resolve:{MyServiceData:["MyService",function(e){return e.promise}]}}).otherwise({redirectTo:"/ShowHome"})}]),e.directive("tooltip",function(){return{restrict:"A",link:function(e,t,r){$(t).hover(function(){$(t).tooltip("show"),setTimeout(function(){$(t).tooltip("hide")},3e3)},function(){$(t).tooltip("hide")})}}})}();