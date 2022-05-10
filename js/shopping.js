
  products = [],
  globalIpAddress="http://159.65.21.42:9000";

  loadStadentsData();

  function loadStadentsData() {
  // let stuData = localStorage.getItem('studentDataBase');
  $.ajax({
    type: 'GET',
    url: `${globalIpAddress}/products`,
    success: function (response) {
      products = response;
      let rows = '';
      for (let index = 0; index < products.length; index++) {

          if(products[index]["category"] == "olayemi_shop"){
            rows += ` 
            <div class="shop11">
              <img src="${globalIpAddress}${products[index]['image']}" alt="" />
              <a href="#"><p>${products[index]['name']}</p></a>
              <p>$ ${products[index]['price']}USD</p>
            </div>`;
          }
       
      }

      $('#section16').html(rows);
    },
    error: function (err) {
      console.log(err);
    },
  });
}


