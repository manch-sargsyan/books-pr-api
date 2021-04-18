//link https://manch-pr.herokuapp.com/

var myBook = {
  "owner":"Mariam Sargsyan",
  "project": "Book",
  "firstname" : "",
  "title" : "",
  "author" : "",
  "color" : "",
  "covertype" : "",
  "numofpages" : "",
  "price" : "",
  "currency" : "",
  "language" : "",
  "otherLanguageValue" : "",
  "origLanguage" : "",
  "otherOrigLangauageValue" : "",
  "edition" : "",
  "dimensions" : "",
  "publisher" : "",
  "publishingdate" : "",
  "origpublishingdate" : "",
  "genre" : "",
  "ageregistration" : ""
}

function handleFullnameChange() {
  myBook.firstname = document.getElementById("firstname").value;
}


function handleTitleChange() {
  myBook.title = document.getElementById("title").value;
}

function handleAuthorChange() {
  myBook.author = document.getElementById("author").value;
  }

function handleColorChange() {
  myBook.color = document.getElementById("color").value;
}

function handleCoverTypeChange(e){
  myBook.covertype=e.target.value;
  if (myBook.covertype != "other") {
      myBook.otherCoverValue = "";
      document.getElementById("otherCoverValue").style.display = "none";
  }
  else{
    document.getElementById("otherCoverValue").style.display = "block";
  }
}

function handleCoverMaterialchange() {
  if (myBook.covertype == "other") {
    document.getElementById("otherCoverValue").style.display="block";
    myBook.otherCoverValue = document.getElementById("otherCoverValue").value;
  }
}

function handleNumofPagesChange() {
  myBook.numofpages = document.getElementById("numofpages").value;
}

function handlePriceChange() {
  myBook.price = document.getElementById("price").value;
}

function handleCurrencyChange() {
  myBook.currency = document.getElementById("currency").value;
}

function handleLanguageChange(e) {
  myBook.language = e.target.value;
  if(myBook.language!="otherlang"){
    myBook.otherLanguageValue = "";
    document.getElementById("otherLanguageValue").style.display = "none";
  }
  else{
    document.getElementById("otherLanguageValue").style.display = "block";
  }
}

function handleOtherLanguageChange(){
  if(myBook.language == "otherlang"){
    document.getElementById("otherLanguageValue").style.display = "block";
    myBook.otherLanguageValue = document.getElementById("otherLanguageValue").value;

  }
}

function handleOrigLanguageChange(e) {
  myBook.origLanguage = e.target.value;
  if(myBook.origLanguage!="otheroriglang"){
    myBook.otherOrigLangauageValue = "";
    document.getElementById("otherOrigLanguageValue").style.display = "none";
  }
  else{
    document.getElementById("otherOrigLanguageValue").style.display = "block";
  }
}

function handleOtherOrigLanguageChange(){
  if(myBook.origLanguage == "otheroriglang"){
    document.getElementById("otherOrigLanguageValue").style.display = "block";
    myBook.otherOrigLangauageValue = document.getElementById("otherOrigLanguageValue").value;
  }
}
 
function handleEditionChnage() {
  myBook.edition = document.getElementById("edition").value;
}


function handleDimensionsChange() {
  myBook.dimensions = document.getElementById("dimensions").value;
}

function handlePublisherChange() {
  myBook.publisher = document.getElementById("publisher").value;
}

function handlePublishingDateChange() {
  myBook.publishingdate = document.getElementById("date").value;
}

function handleOrigPublishingDateChange() {
  myBook.origpublishingdate = document.getElementById("origdate").value;
}

function handleGenreChange() {
  myBook.genre = document.getElementById("genre").value;
}

function handleAgeRegistrationChange() {
  myBook.age = document.getElementById("age").value;
}
function showTheBookData(e){
handleFullnameChange()
handleTitleChange()
handleAuthorChange() 
handleColorChange()
handleCoverMaterialchange()
handleNumofPagesChange() 
handlePriceChange()
handleCurrencyChange()
handleLanguageChange()
handleOtherLanguageChange()
handleOrigLanguageChange(e)
handleOtherOrigLanguageChange()
handleEditionChnage()
handleDimensionsChange()
handlePublisherChange()
handlePublishingDateChange()
handleOrigPublishingDateChange()
handleGenreChange()
handleAgeRegistrationChange()
  e.preventDefault();
  console.log(myBook);

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api.herokuapp.com/data",
    data: myBook,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}
function loadExistingData() {
    $.ajax({
   type : "GET",
    url : "https://cse120-2021-api.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
    console.log("success", data);
    displayData(data.data);
  },
  error : function(data) {
  console.log("Error")
        }
    });
}

function displayData(data) {
    document.getElementById("dataContainer").innerHTML = "";
    data.forEach(elem => {
     var item = document.createElement("div");
      item.id = "div" + elem["_id"];
      item.className = "item";
      if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
         if (key != "_id") {
         var span = document.createElement("span");

         var b = document.createElement("b");
             b.innerHTML = key + ": ";
              span.appendChild(b);
                
            span.className = "item";
            if (elem[key]) {
             span.innerHTML += elem[key];
            } else {
         var span1 = document.createElement("span");
             span1.className = "undefined";
             span1.innerHTML = "N/A";
             span.appendChild(span1)
            }
           item.appendChild(span);

           var br = document.createElement("br");
               item.appendChild(br);
            }
        })
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = elem["_id"];
        button.addEventListener("click", function(e){
            deleteData(e.target.id);
        }, false);
        item.appendChild(button);
        document.getElementById("dataContainer").appendChild(item);
    })

}
function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
      return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}
function loadEditItem() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_idBook").innerHTML = editItem["_id"];
  document.getElementById("fullname").value = editItem["firstname"];
  document.getElementById("title").value = editItem["title"];
  document.getElementById("author").value = editItem["author"]; 
  document.getElementById("color").value = editItem["color"];
  document.getElementById("covertype").value = editItem["covertype"];
  document.getElementById("numofpages").value = editItem["numofpages"];
  document.getElementById("price").value = editItem["price"];
  document.getElementById("currency").value = editItem["currency"];
  document.getElementById("language").value = editItem["language"];
  document.getElementById("origLanguageValue").value = editItem["origLanguage"];
  document.getElementById("edition").value = editItem["edition"];
  document.getElementById("dimensions").value = editItem["dimensions"];
  document.getElementById("publisher").value = editItem["publisher"];
  document.getElementById("publishingdate").value = editItem["publishingdate"];
  document.getElementById("origpublishingdate").value = editItem["origpublishingdate"];
  document.getElementById("genre").value = editItem["genre"];
  document.getElementById("ageregistration").value = editItem["age"]; 
}


function toggleOtherData() {
  var otherData = document.getElementById("otherDataContainer");
  if (otherData.style.display == "block") {
    otherData.style.display = "none";
  } else {
    otherData.style.display = "block";
  }
}


function displayData(existingData) {
  console.log(Object.values(existingData))
  console.log(existingData[1])
   document.getElementById("existingData").innerHTML = "<ul>";
  let exData = document.getElementById("existingData")
  for (var i = 0; i < existingData.length; i++) {
    let itemData = existingData[i]
    let ul = document.createElement('ul')
    exData.appendChild(ul)
   currentBook = existingData[i];
    for (let k = 0; k < Object.values(itemData).length; k++) {
      let li = document.createElement('li')
      li.innerHTML = Object.values(itemData)[k]
      ul.appendChild(li)
    }
    

    
   exData += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b> </li>" + currentBook.author + "</li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
}
