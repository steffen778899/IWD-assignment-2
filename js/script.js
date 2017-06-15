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
  else if (surname.length < 8 || surname.search(/^[a-zA-Z]+$/))
  {
    isValid = false;
    alert("Surname must be at least 8 letters.");
  }
  //Users must agree with the term of service
  else if (isChecked == false)
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

var addressOfJsonFile = 'https://raw.githubusercontent.com/steffen778899/IWD-assignment-2/master/json_items/items.json';

function InitializeHomePage()
{
    // get all the div elements under featured items
    var featuredItemList = document.getElementsByClassName("featuredItems")[0].getElementsByTagName("div");
    // get all the div elements under deal of day
    var dealOfDayList = document.getElementsByClassName("dealOfDay")[0].getElementsByTagName("div");

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', addressOfJsonFile);

    httpRequest.onload = function ()
    {
      // get all the products defined in json file
      var allProducts = JSON.parse(httpRequest.responseText);
      // define the count of items displayed, as we only display 5 items on the page
      var countOfFeaturedItem = 0;
      var countOfDealOfDay = 0;
      // hide all the li elements first
      for(var i = 0; i < featuredItemList.length; i++)
      {
        featuredItemList[i].style.display = "none";
      }
      for(var i = 0; i < dealOfDayList.length; i++)
      {
        dealOfDayList[i].style.display = "none";
      }
      // display the li elements
      for(var i = 0; i < allProducts.length; i++)
      {
        // display the popular items
        if(allProducts[i].popularity == "high" && countOfFeaturedItem < 4)
        {
          // display the image
          featuredItemList[countOfFeaturedItem].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
          // display the title
          featuredItemList[countOfFeaturedItem].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
          // display
          featuredItemList[countOfFeaturedItem].style.display = "inline-block";
          countOfFeaturedItem++;
        }

        // display the deal of the day
        if(allProducts[i].onsale == "yes" && countOfDealOfDay < 4)
        {
          // display the image
          dealOfDayList[countOfDealOfDay].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
          // display the title
          dealOfDayList[countOfDealOfDay].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
          // display
          dealOfDayList[countOfDealOfDay].style.display = "inline-block";
          countOfDealOfDay++;
        }
      }
    }
    httpRequest.send();
}

function InitializeProductPage()
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', addressOfJsonFile);

    httpRequest.onload = function ()
    {
      // get all the products defined in json file
      var allProducts = JSON.parse(httpRequest.responseText);
      // initialize the category
      InitializeCategory(allProducts);

      // display all the products
      DisplaySelectedCategory("all", allProducts);
    }

    httpRequest.send();

}

function InitializeCategory(allProducts)
{
    // define an array to store the category items
    var categories = [];
    // define an array to store the count of items in each category
    var categoryCounts = [];
    // define whether the category item already exists in the array
    var bIsAlreadyExist = false;
    for (var i = 0; i < allProducts.length; i++)
    {
        bIsAlreadyExist = false;
        // check whether the category item already exists in the array
        for (var j = 0; j < categories.length; j++)
        {
            if (categories[j] == allProducts[i].category)
            {
                bIsAlreadyExist = true;
                // add one to the count
                categoryCounts[j]++;
                break;
            }
        }
        // add to the array if not exists
        if (!bIsAlreadyExist)
        {
          categories.push(allProducts[i].category);
          categoryCounts.push(1);
        }
    }
    var ulNode = document.getElementsByClassName("category")[0].getElementsByTagName("ul")[0];
    var newAllLiElement = document.createElement("li");       // Create a <li> element
    //add all category
    newAllLiElement.innerHTML = "<button type='button' class='btn'>" + "All" + " " + "<span class='badge'>" + allProducts.length +"</span>" + "</button>";
    //li class="list-group-item"
    newAllLiElement.setAttribute("class","list-group-item");
    var methodAllAttr = document.createAttribute("onclick");  // Create a onclick event
    methodAllAttr.value = "DisplaySelectedCategory('"  + 'all' + "')";
    newAllLiElement.setAttributeNode(methodAllAttr);             // Append the attribute to the <li> element
    ulNode.appendChild(newAllLiElement);                      // Append the <li> to category <ul> node

    for (var i = 0; i < categories.length; i++)
    {
        var newLiElement = document.createElement("li");       // Create a <li> element
        // add text to the <li> element add badge in li element
        newLiElement.innerHTML = "<button type='button' class='btn'>" + categories[i] + " " + "<span class='badge'>" + categoryCounts[i] +"</span>" + "</button>";
        //li class="list-group-item"
        newLiElement.setAttribute("class","list-group-item");




        //newLiElement.onclick = function (){
        //    DisplaySelectedCategory(categories[i], allProducts)
        //}
        var methodAttr = document.createAttribute("onclick");  // Create a onclick event
        methodAttr.value = "DisplaySelectedCategory('"  + categories[i] + "')";
        newLiElement.setAttributeNode(methodAttr);             // Append the attribute to the <li> element
        ulNode.appendChild(newLiElement);                      // Append the <li> to category <ul> node
    }
}

function DisplaySelectedCategory(categoryType, allProducts)
{
    // save the category type
    document.getElementById("categoryType").innerHTML = categoryType;

    if (allProducts != null)
    {
        Display(categoryType, allProducts);
    }
    else
    {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', addressOfJsonFile);
        httpRequest.onload = function ()
        {
          // get all the products defined in json file
          allProducts = JSON.parse(httpRequest.responseText);
          // display the products
          Display(categoryType, allProducts)
        }
        httpRequest.send();
    }
}

function Display(categoryType, allProducts)
{
    // clear page links
    ClearPageLinks();
    // create page links for quick access
    CreatePageLinks(categoryType, allProducts);
    // display the books' info on the page
    DisplayBooksOnPage(1, categoryType);
}

function ClearPruductsInfo()
{
    var ulNode = document.getElementsByClassName("productsInfo")[0].getElementsByTagName("ul")[0];
    ulNode.innerHTML = "";
}



function AddOneProductInfo(ulNode, productInfo)
{
    // define the count of all products displayed
    var totalListNodesCount = ulNode.getElementsByTagName("li").length;

    // Create a <div> element
    var newDivElement = document.createElement("div");
    newDivElement.setAttribute("class","col-sm-4 col-lg-4 col-md-4")
    var newThumbnail = document.createElement("div");
    newThumbnail.className = "thumbnail";
    newDivElement.appendChild(newThumbnail);


    var newProductImage = document.createElement('img');
    newProductImage.src = "images/" + productInfo.id + ".jpg";
    newProductImage.className = "productImage";
    newThumbnail.appendChild(newProductImage);


    var newText = document.createElement('div');
    newText.className = "caption";
    newText.innerHTML = "Title: " + productInfo.title + "<br/><br/>Category :" + productInfo.category +
                        "<br/><br/>Description:" + productInfo.description +
                          "<br/><br/>Price :" + parseFloat(productInfo.price).toFixed(2);

    var newCart = document.createElement('div');
    newCart.innerHTML = "<button type='button' class='btn btn-default btn-sm' onclick='AddCart(" + productInfo.id + ")''>" +
          "<span class='glyphicon glyphicon-shopping-cart'></span> Add Cart</button>";

    newThumbnail.appendChild(newText);
    newThumbnail.appendChild(newCart);
    ulNode.appendChild(newDivElement);                      // Append the <div> to category <ul> node


}

function CreatePageLinks(categoryType, allProducts)
{
    var booksPerPage = parseInt(document.getElementById("booksPerPageValue").value);
    var totalPages = 0;

    if (categoryType == "all")
    {
        totalPages = Math.ceil(allProducts.length / booksPerPage);
    }
    else
    {
        var count = 0;
        for (var i = 0; i < allProducts.length; i++)
        {
            // display the specified category
            if (allProducts[i].category == categoryType)
            {
                count++;
            }
        }
        totalPages = Math.ceil(count / booksPerPage);
    }
    // save total page
    document.getElementById("totalPagesValue").innerHTML = totalPages;

    var totalPagesNode = document.getElementsByClassName("totalPages")[0];
    // create page links
    for (var i = 0; i < totalPages; i++)
    {
        var newLiElement = document.createElement("li");
        // set onclick event for the li element
        var methodAttr = document.createAttribute("onclick");
        methodAttr.value = "DisplayBooksOnPage('"  + (i + 1) + "','" + categoryType + "')";
        newLiElement.setAttributeNode(methodAttr);

        newLiElement.innerHTML = (i + 1);
        totalPagesNode.insertBefore(newLiElement, totalPagesNode.lastElementChild);
    }
}

function ClearPageLinks()
{
    var totalPagesNodes = document.getElementsByClassName("totalPages")[0];

    var btnPrevious = document.getElementById("previousButton");
    var btnNext = document.getElementById("nextButton");

    while(totalPagesNodes.firstChild)
    {
        totalPagesNodes.removeChild(totalPagesNodes.firstChild);
    }
    totalPagesNodes.appendChild(btnPrevious);
    totalPagesNodes.appendChild(btnNext);
}
function DisplayBooksOnPage(currentPage, categoryType)
{
    // clear products info for redisplay
    ClearPruductsInfo();
    // set status of previous and next buttons
    SetPreviousNextButton(currentPage);

    //highlight currentpage link
    HighlightCurrentPageLink(currentPage);
    // save the current page
    document.getElementById("currentPage").innerHTML = currentPage;

    var booksPerPage = parseInt(document.getElementById("booksPerPageValue").value);

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', addressOfJsonFile);
    httpRequest.onload = function ()
    {
        // get all the products defined in json file
        var allProducts = JSON.parse(httpRequest.responseText);

        // define the count of books that have already been displayed on previous pages
        var alreadyDisplayedCount = booksPerPage * (currentPage - 1);
        var countSoFar = 0;
        var ulNode = document.getElementsByClassName("productsInfo")[0].getElementsByTagName("ul")[0];
        if (categoryType == "all")
        {
            // display books on current page(skip the books that have already been displayed on previous pages)
            for (var i = alreadyDisplayedCount, countSoFar = 0; (i < allProducts.length) && (countSoFar < booksPerPage); i++)
            {
                countSoFar++;
                AddOneProductInfo(ulNode, allProducts[i]);
            }
        }
        else
        {
            var startPosition = 0;
            if (alreadyDisplayedCount == 0)
            {
                startPosition = 0;
            }
            else
            {
                countSoFar = 0;
                // skip the books that have already been displayed on previous pages
                for (startPosition = 0; startPosition < allProducts.length; startPosition++)
                {
                    if (allProducts[startPosition].category == categoryType)
                    {
                        countSoFar++;
                        if (countSoFar == alreadyDisplayedCount)
                        {
                            break;
                        }
                    }
                }
                startPosition += 1;
            }

            countSoFar = 0;
            for (var i = startPosition; (i < allProducts.length) && (countSoFar < booksPerPage); i++)
            {
                // display the specified category
                if (allProducts[i].category == categoryType)
                {
                    countSoFar++;
                    AddOneProductInfo(ulNode, allProducts[i]);
                }
            }
        }
    }
    httpRequest.send();
}

function SetPreviousNextButton(currentPage)
{
    var btnPrevious = document.getElementById("previousButton");
    var btnNext = document.getElementById("nextButton");
    // get the count of total pages
    totalPages = parseInt(document.getElementById("totalPagesValue").innerHTML);
    // if there is only one page, then disable both buttons
    if (totalPages == 1)
    {
        btnPrevious.disabled = true;
        btnNext.disabled = true;
    }
    else
    {
        // if current page is the first page, then disable previous button, enable next button
        if (currentPage == 1)
        {
            btnPrevious.disabled = true;
            btnNext.disabled = false;
        }
        // if current page is the last page, then disabled next button, enable previous button
        else if (currentPage == totalPages)
        {
            btnPrevious.disabled = false;
            btnNext.disabled = true;
        }
        // enable both buttons
        else
        {
            btnPrevious.disabled = false;
            btnNext.disabled = false;
        }
    }
}

function ShowPrevious()
{
    var currentPage = parseInt(document.getElementById("currentPage").innerHTML);
    var categoryType = document.getElementById("categoryType").innerHTML;
    // set it to previous page
    currentPage -= 1;
    // display the page
    DisplayBooksOnPage(currentPage, categoryType);
}

function ShowNext()
{
    var currentPage = parseInt(document.getElementById("currentPage").innerHTML);
    var categoryType = document.getElementById("categoryType").innerHTML;
    // set it to next page
    currentPage += 1;
    // display the page
    DisplayBooksOnPage(currentPage, categoryType);
}

function UpdateBooksPerPage()
{
    // get category type
    var categoryType = document.getElementById("categoryType").innerHTML;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', addressOfJsonFile);
    httpRequest.onload = function ()
    {
        // get all the products defined in json file
        var allProducts = JSON.parse(httpRequest.responseText);
        // display
        Display(categoryType, allProducts);
    }
    httpRequest.send();
}

function HighlightCurrentPageLink(currentPage)
{
    var totalListNodes = document.getElementsByClassName("totalPages")[0].getElementsByTagName("li");

    // remove all background color
    for (var i = 0; i < totalListNodes.length; i++)
    {
        totalListNodes[i].style.backgroundColor = "white";
    }
    // locate the currentPage link
    for (var i = 0; i < totalListNodes.length; i++)
    {
        if (totalListNodes[i].innerHTML == currentPage)
        {
            totalListNodes[i].style.backgroundColor = "rgb(221, 221, 221)";
            break;
        }
    }
}

var cartBackgroundColor1 = "DarkSeaGreen";
var cartBackgroundColor2 = "rgb(191, 64, 128)";
function AddCart(productId)
{
    // Todo check whether added

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', addressOfJsonFile);
    httpRequest.onload = function ()
    {
        // get all the products defined in json file
        var allProducts = JSON.parse(httpRequest.responseText);
        // get the product info
        var productInfo = GetProductInfo(productId, allProducts);

        // update row if the product is already added
        if (IsAlreadyAddedToCart(productInfo))
        {
            UpdateCartRow(productInfo.title, 1)
        }
        // create a new row if the product is not added
        else
        {
            CreateNewCartRow(productInfo);
        }
    }
    httpRequest.send();
}

function GetProductInfo(productId, allProducts)
{
    for (var i = 0; i < allProducts.length; i++)
    {
        if (allProducts[i].id == productId)
        {
            return allProducts[i];
        }
    }
}

function IsAlreadyAddedToCart(productInfo)
{
    var isAlreadyAddedToCart = false;
    var bookNames = document.getElementsByClassName("bookName");

    for (var i = 0; i < bookNames.length; i++)
    {
        if (bookNames[i].innerHTML == productInfo.title)
        {
            isAlreadyAddedToCart = true;
            break;
        }
    }
    return isAlreadyAddedToCart;
}

function UpdateCartRow(productName, counts)
{
    var totalPrice = document.getElementById("totalPrice");
    var bookNames = document.getElementsByClassName("bookName");
    var bookQuantities = document.getElementsByClassName("bookQuantity");
    var bookPrices = document.getElementsByClassName("bookPrice");

    var locationOfBook = 0;
    // locate the book
    for (i = 0; i < bookNames.length; i++)
    {
        if (bookNames[i].innerHTML == productName)
        {
            locationOfBook = i;
            break;
        }
    }
    // calculate the single price of the book
    var singlePrice = parseFloat(bookPrices[locationOfBook].innerHTML / bookQuantities[locationOfBook].innerHTML).toFixed(2);
    // new quantity of the book
    var newQuantity = parseInt(bookQuantities[locationOfBook].innerHTML) + counts;
    // if new quantity equal to zero, ask user for confirmation to delete the book
    if (newQuantity == 0)
    {
        // user choose to delete
        if (confirm("Are you sure you want to delete this book from cart?") == true)
        {
            // update total price
            totalPrice.innerHTML = parseFloat(parseFloat(totalPrice.innerHTML) + (counts * singlePrice)).toFixed(2);

            var tbody = document.getElementsByClassName("shoppingCart")[0].getElementsByTagName("table")[0].tBodies[0];
            // "locationOfBook + 1" because there is a table header row
            tbody.deleteRow(locationOfBook + 1);
        }
        return;
    }
    // update quantity
    bookQuantities[locationOfBook].innerHTML = newQuantity;
    // update price
    bookPrices[locationOfBook].innerHTML = parseFloat(parseFloat(bookPrices[locationOfBook].innerHTML) + (counts * singlePrice)).toFixed(2);
    // update total price
    totalPrice.innerHTML = parseFloat(parseFloat(totalPrice.innerHTML) + (counts * singlePrice)).toFixed(2);
}

function CreateNewCartRow(productInfo)
{
    // cart table
    var cartTable = document.getElementsByClassName("shoppingCart")[0].getElementsByTagName("table")[0];
    //var cartTable = document.getElementById("cartTable");
    var tbody = cartTable.tBodies[0];

    var totalPrice = document.getElementById("totalPrice");

    var newTableRow = document.createElement('tr');
    // set background color
    if (cartTable.rows.length % 2)
    {
      newTableRow.style.backgroundColor = "rgb(221, 221, 221)";
    }
    else
    {
      newTableRow.style.backgroundColor = "rgb(221, 221, 221)";
    }
    var newTdName = document.createElement('td');
    newTdName.className = "bookName";
    newTdName.innerHTML = productInfo.title;

    var newTdQuantity = document.createElement('td');
    var quantityTxt = document.createElement('p');
    quantityTxt.className = "bookQuantity";
    quantityTxt.innerHTML = 1;
    var removeIcon = document.createElement('img');
    removeIcon.src = "images/remove.png";
    // set onclick event
    removeIcon.onclick = function () {UpdateCartRow(productInfo.title, -1)}
    var addIcon = document.createElement('img');
    addIcon.src = "images/add.png";
    // set onclick event
    addIcon.onclick = function () {UpdateCartRow(productInfo.title, 1)}
    newTdQuantity.appendChild(removeIcon);
    newTdQuantity.appendChild(quantityTxt);
    newTdQuantity.appendChild(addIcon);

    var newTdPrice = document.createElement('td');
    newTdPrice.className = "bookPrice";
    newTdPrice.innerHTML = parseFloat(productInfo.price).toFixed(2);

    newTableRow.appendChild(newTdName);
    newTableRow.appendChild(newTdQuantity);
    newTableRow.appendChild(newTdPrice);

    // insert the new row before the total price row
    tbody.insertBefore(newTableRow, cartTable.rows[cartTable.rows.length - 1]);

    // update total price
    totalPrice.innerHTML = parseFloat(parseFloat(totalPrice.innerHTML) + productInfo.price).toFixed(2);
}

function CheckOut()
{
    var totalPrice = document.getElementById("totalPrice");
    alert("Congratulations! Total price $" + parseFloat(totalPrice.innerHTML).toFixed(2));
}
