function validateForm()
{
  var isValid = true;
  var firstName = document.forms["signUpForm"]["firstName"].value;
  var surname = document.forms["signUpForm"]["surname"].value;
  var isChecked = document.forms["signUpForm"]["checkAgree"].checked;

  // Name must be at least 5 letters
  if (firstName.length < 5 || firstName.search(/^[a-zA-Z]+$/))
  {
    isValid = false;
    alert("First name must be at least 5 letters.");
  }
  // Surname must be at least 8 letters
  if (surname.length < 8 || surname.search(/^[a-zA-Z]+$/))
  {
    isValid = false;
    alert("Surname must be at least 8 letters.");
  }
  //Users must agree with the term of service
  if (isChecked == false)
  {
    isValid = false;
    alert("You must agree with the terms and conditions to proceed.");
  }

  return isValid;
}

function ShowStorePosition()
{
  // set the store position in the map
  var myCenter = new google.maps.LatLng(-36.882723, 174.709197);
  var mapOptions = {
      center: myCenter,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID
  }
  var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
  // add a marker to the store
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

  // Zoom to 20 when clicking on marker
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(20);
    map.setCenter(marker.getPosition());
  });
}

function InitializeHomePage()
{
  // get all the li elements under featured items
  var featuredItemList = document.getElementsByClassName("featuredItems")[0].getElementsByTagName("li");
  // get all the li elements under deal of day
  var dealOfDayList = document.getElementsByClassName("dealOfDay")[0].getElementsByTagName("li");

  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET','https://raw.githubusercontent.com/steffen778899/IWD-assignment-2/master/json_items/items.json');

  httpRequest.onload = function ()
  {
    // get all the products defined in json file
    var allProducts = JSON.parse(httpRequest.responseText);
    // define the count of items displayed, as we only display 5 items on the page
    var countOfFeaturedItem = 0;
    var countOfDealOfDay = 0;
    for(var i = 0; i < allProducts.length; i++)
    {
      // display the popular items
      if(allProducts[i].popularity == "high" && countOfFeaturedItem < 5)
      {
        // display the image
        featuredItemList[countOfFeaturedItem].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
        // display the title
        featuredItemList[countOfFeaturedItem].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
        countOfFeaturedItem++;
      }

      // display the deal of the day
      if(allProducts[i].onsale == "yes" && countOfDealOfDay < 5)
      {
        // display the image
        dealOfDayList[countOfDealOfDay].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
        // display the title
        dealOfDayList[countOfDealOfDay].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
        countOfDealOfDay++;
      }
    }
  }
  httpRequest.send();
}
