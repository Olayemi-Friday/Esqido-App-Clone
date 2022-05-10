$('#theTarget').skippr({
    transition: 'slide',
    speed: 1000,
    easing: 'easeOutCirc',
    navType: 'bubble',
    childrenElementType: 'div',
    arrows: true,
    autoPlay: true,
    autoPlayDuration: 3000,
    keyboardOnAlways: false,
    hidePrevious: true,
  });

  $('#theTarget2').skippr({
    transition: 'slide',
    speed: 1000,
    easing: 'easeOutCirc',
    navType: 'bubble',
    childrenElementType: 'div',
    arrows: true,
    autoPlay: true,
    autoPlayDuration: 3000,
    keyboardOnAlways: false,
    hidePrevious: true,
  });

  //LOCAL STORAGE
//is a storage function for storing data in the browser, it has 4(four) methods for data manipulation
//1) setItem, 2) getItem, 3) removeItem, 4) clear
// The localstorage saves data in key and value pairs, for you to store any data in the local storage you /////have to convert this data to json string format using JSON.stringify() then to retrive data from the storage you have to reconvert the JsonString to Normal Data Type using JSON.parse()

//Variable declaration in jquery
let fName = $('#fName'),
age = $('#age'),
email = $('#email'),
phoneNumber = $('#phoneNumber'),
regBtn = $('#regBtn'),
productIndex,
products = [],
globalIpAddress="http://159.65.21.42:9000";

loadStadentsData();
//Events in jquery
regBtn.on('click', function () {
let aStudent = {
  name: fName.val(),
  job: 'Admin',
};

if (studentIndex == null) {
  //Add new products object
  $.ajax({
    type: 'POST',
    url: 'https://reqres.in/api/users',
    data: aStudent,
    success: function (response) {
      alert(`Registration successful, welcome ${response.name}`);
      window.location.href = 'about.html';
    },
    error: function (err) {
      console.log(err.statusText);
    },
  });
} else {
  //Update student object using the global index that was saved when you clicked edit btn
  //delete data using the index
  let updateId = products[studentIndex]['id'];
  $.ajax({
    type: 'PUT',
    url: `https://reqres.in/api/users/${updateId}`,
    data: aStudent,
    success: function (response) {
      alert(`Update successful, at ${response.updatedAt}`);
    },
    error: function (err) {
      alert(err.statusText);
      console.log();
    },
  });
  studentIndex = null;
  regBtn.html('Add Data');
}

//Implement localstorage, which has Key-Value pairs

// localStorage.setItem('studentDataBase', JSON.stringify(products));

clearForm();
loadStadentsData();
});

//Assign event to a tag which is editBtn
$('#section16').on('click', '.editBtn', function () {
//Get the attribute of this particular tag assign the value to a global variable which is studentIndex
studentIndex = $(this).attr('indexData');

//assign every key from the object in the array to the inputs tag so you can change or update the values
fName.val(products[studentIndex]['first_name']);
age.val(products[studentIndex]['last_name']);
email.val(products[studentIndex]['email']);
phoneNumber.val(products[studentIndex]['avatar']);
regBtn.html('Update Data');
});

//Delete a record in the array
$('#section16').on('click', '.deleteBtn', function () {
let shouldDelete = confirm('Do you want to delete this record?');

if (shouldDelete) {
  //get the index you want to delete
  let deleteIndex = $(this).attr('indexData');

  //delete data using the index
  let deleteId = products[deleteIndex]['id'];

  $.ajax({
    type: 'DELETE',
    url: `https://reqres.in/api/users/${deleteId}`,
    success: function (response) {
      console.log(response);
      alert('Data deleteId');
    },
    error: function (err) {
      console.log(err.statusText);
    },
  });

  //Save new array records in localstorage after deleting is done

  // localStorage.setItem('studentDataBase', JSON.stringify(products));

  //reload the data so the new view from the array shows
  loadStadentsData();
}
});

function loadStadentsData() {
// let stuData = localStorage.getItem('studentDataBase');
$.ajax({
  type: 'GET',
  url: `${globalIpAddress}/products`,
  success: function (response){
    products = response;
    let rows = '';
    for (let index = 0; index < products.length; index++) {
        if(products[index]['category']=="olayemi_shop"){
          rows += `<div class="section16" id="section16">
          <div class="shopping_product">
              <!-- <button>Save 35%</button> -->
              <img src="${globalIpAddress}${products[index]['image']}" alt="" class="image">
              <a href="yourCart.html"><p>Unisyn Lash Bundle - All styles </p></a>
              <p>$69.95 USD</p>
  
              <!-- <div class="overlay">
                  <div class="text"><img src="img/esq-unisyn.webp" alt=""></div>
              </div> -->
          </div>
          </div>`;
        }
    }

    $('#section16').html(rows);
  },
  error: function (err) {
    console.log(err);
  },
});

// if (stuData != null) {
//   products = JSON.parse(stuData);
// }

// console.log(stuData);
}

function clearForm() {
fName.val('');
age.val('');
email.val('');
phoneNumber.val('');
}
