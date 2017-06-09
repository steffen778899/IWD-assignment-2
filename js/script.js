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

var addressOfJsonFile = 'https://raw.githubusercontent.com/steffen778899/IWD-assignment-2/master/json_items/items.json';

// function InitializeHomePage()
// {
//   // get all the li elements under featured items
//   var featuredItemList = document.getElementsByClassName("featuredItems")[0].getElementsByTagName("li");
//   // get all the li elements under deal of day
//   var dealOfDayList = document.getElementsByClassName("dealOfDay")[0].getElementsByTagName("li");
//
//   var httpRequest = new XMLHttpRequest();
//   httpRequest.open('GET', addressOfJsonFile);
//
//   httpRequest.onload = function ()
//   {
//     // get all the products defined in json file
//     var allProducts = JSON.parse(httpRequest.responseText);
//     // define the count of items displayed, as we only display 5 items on the page
//     var countOfFeaturedItem = 0;
//     var countOfDealOfDay = 0;
//     // hide all the li elements first
//     for(var i = 0; i < featuredItemList.length; i++)
//     {
//       featuredItemList[i].style.display = "none";
//     }
//     for(var i = 0; i < dealOfDayList.length; i++)
//     {
//       dealOfDayList[i].style.display = "none";
//     }
//     // display the li elements
//     for(var i = 0; i < allProducts.length; i++)
//     {
//       // display the popular items
//       if(allProducts[i].popularity == "high" && countOfFeaturedItem < 5)
//       {
//         // display the image
//         featuredItemList[countOfFeaturedItem].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
//         // display the title
//         featuredItemList[countOfFeaturedItem].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
//         // display
//         featuredItemList[countOfFeaturedItem].style.display = "inline-block";
//         countOfFeaturedItem++;
//       }
//
//       // display the deal of the day
//       if(allProducts[i].onsale == "yes" && countOfDealOfDay < 5)
//       {
//         // display the image
//         dealOfDayList[countOfDealOfDay].getElementsByTagName("img")[0].src = "images/" + allProducts[i].id + ".jpg";
//         // display the title
//         dealOfDayList[countOfDealOfDay].getElementsByTagName("p")[0].innerHTML = allProducts[i].title;
//         // display
//         dealOfDayList[countOfDealOfDay].style.display = "inline-block";
//         countOfDealOfDay++;
//       }
//     }
//   }
//   httpRequest.send();
// }

function InitializeHomePage()
{
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', addressOfJsonFile);
  httpRequest.onload = function ()
  {
    // get all the products defined in json file
    var allProducts = JSON.parse(httpRequest.responseText);
    var booksPerPage = 2;
    //setInterval(SlideShowOnHomePage, 5);
    SlideShowOnHomePage(allProducts, booksPerPage);
  }
  httpRequest.send();
}

// function GetCountOfSpecificBooks(allProducts, fieldName, fieldFilter)
// {
//     var totalCount = 0;
//     if (fieldName == "popularity")
//     {
//         for (var i = 0; i < allProducts.length; i++)
//         {
//             if(allProducts[i].popularity == fieldFilter)
//             {
//                 totalCount++;
//             }
//         }
//     }
//     else if(fieldName == "onsale")
//     {
//         for (var i = 0; i < allProducts.length; i++)
//         {
//             if(allProducts[i].onsale == fieldFilter)
//             {
//                 totalCount++;
//             }
//         }
//     }
//     return totalCount;
// }

function SlideShowOnHomePage(allProducts, booksPerPage)
{
  // get all the li elements under featured items
  var featuredItemList = document.getElementsByClassName("featuredItems")[0].getElementsByTagName("li");
  // get all the li elements under deal of day
  var dealOfDayList = document.getElementsByClassName("dealOfDay")[0].getElementsByTagName("li");
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
    if(allProducts[i].popularity == "high" && countOfFeaturedItem < booksPerPage)
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
    if(allProducts[i].onsale == "yes" && countOfDealOfDay < booksPerPage)
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
    for (var i = 0; i < categories.length; i++)
    {
        var newLiElement = document.createElement("li");       // Create a <li> element
        // add text to the <li> element
        newLiElement.innerHTML = "<u>" + categories[i] + "(" + categoryCounts[i] + ")</u>";

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

var productInfoBgColor1 = "rgb(153, 255, 153)";
var productInfoBgColor2  = "MediumPurple";

function AddOneProductInfo(ulNode, productInfo)
{
    // define the count of all products displayed
    var totalListNodesCount = ulNode.getElementsByTagName("li").length;

    // Create a <li> element
    var newLiElement = document.createElement("li");
    // set background color
    if (totalListNodesCount % 2)
    {
      newLiElement.style.backgroundColor = productInfoBgColor1;
    }
    else
    {
      newLiElement.style.backgroundColor = productInfoBgColor2;
    }

    var newTableElement = document.createElement('table');
    var newTableRow = document.createElement('tr');

    var newTdImage = document.createElement('td');
    var newProductImage = document.createElement('img');
    newProductImage.src = "images/" + productInfo.id + ".jpg";
    newProductImage.className = "productImage";
    newTdImage.appendChild(newProductImage);

    var newTdText = document.createElement('td');
    newTdText.innerHTML = "Title:" + productInfo.title + "<br/><br/>Category:" + productInfo.category +
                          "<br/><br/>Description:" + productInfo.description + "<br/><br/>On Sale:" + productInfo.onsale +
                          "<br/><br/>Price:" + productInfo.price;

    var newTdAddCart = document.createElement('td');
    var newAddCartImage = document.createElement('img');
    newAddCartImage.src = "images/cart.png";
    newAddCartImage.className = "cartImage";
    newTdAddCart.innerHTML = "Add to cart";

    // set onclick event for the image
    var methodAttr = document.createAttribute("onclick");  // Create a onclick event
    methodAttr.value = "AddCart('"  + productInfo.id + "')";
    newAddCartImage.setAttributeNode(methodAttr);

    newTdAddCart.appendChild(newAddCartImage);

    newTableRow.appendChild(newTdImage);
    newTableRow.appendChild(newTdText);
    newTableRow.appendChild(newTdAddCart);

    newTableElement.appendChild(newTableRow);
    newLiElement.appendChild(newTableElement);
    ulNode.appendChild(newLiElement);                      // Append the <li> to category <ul> node
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
            totalListNodes[i].style.backgroundColor = "HotPink";
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
            UpdateProductRow(productInfo.title, 1)
        }
        // create a new row if the product is not added
        else
        {
            CreateNewProductRow(productInfo);
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

function UpdateProductRow(productName, counts)
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
    var singlePrice = bookPrices[locationOfBook].innerHTML / bookQuantities[locationOfBook].innerHTML;
    // new quantity of the book
    var newQuantity = parseInt(bookQuantities[locationOfBook].innerHTML) + counts;
    // if new quantity equal to zero, ask user for confirmation to delete the book
    if (newQuantity == 0)
    {
        // user choose to delete
        if (confirm("Are you sure you want to delete this book from cart?") == true)
        {
            // update total price
            totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + (counts * singlePrice);

            var tbody = document.getElementsByClassName("shoppingCart")[0].getElementsByTagName("table")[0].tBodies[0];
            // "locationOfBook + 1" because there is a table header row
            tbody.deleteRow(locationOfBook + 1);
        }
        return;
    }
    // update quantity
    bookQuantities[locationOfBook].innerHTML = parseInt(bookQuantities[locationOfBook].innerHTML) + counts;
    // update price
    bookPrices[locationOfBook].innerHTML = parseInt(bookPrices[locationOfBook].innerHTML) + (counts * singlePrice);
    // update total price
    totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + (counts * singlePrice);
}

function CreateNewProductRow(productInfo)
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
      newTableRow.style.backgroundColor = cartBackgroundColor1;
    }
    else
    {
      newTableRow.style.backgroundColor = cartBackgroundColor2;
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
    removeIcon.onclick = function () {UpdateProductRow(productInfo.title, -1)}
    var addIcon = document.createElement('img');
    addIcon.src = "images/add.png";
    // set onclick event
    addIcon.onclick = function () {UpdateProductRow(productInfo.title, 1)}
    newTdQuantity.appendChild(removeIcon);
    newTdQuantity.appendChild(quantityTxt);
    newTdQuantity.appendChild(addIcon);

    var newTdPrice = document.createElement('td');
    newTdPrice.className = "bookPrice";
    newTdPrice.innerHTML = productInfo.price;

    newTableRow.appendChild(newTdName);
    newTableRow.appendChild(newTdQuantity);
    newTableRow.appendChild(newTdPrice);

    // insert the new row before the total price row
    tbody.insertBefore(newTableRow, cartTable.rows[cartTable.rows.length - 1]);

    // update total price
    totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + productInfo.price;
}
