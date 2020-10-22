$(document).ready(() => {

  //Color picker
  let image = $('.image-container img');
  let carPrice = 100000;
  const startedCarPrice = 100000;

  $('.color-block input').on('click', function() {
    $('.color-block input').each((i, input) => {
      $(input).prop('checked', false);
    })
    $(this).prop('checked', true);
    image.attr('src', 'imgs/' + $(this)[0].id + '.jpg');
    $(modelColor).text('Solid ' + $(this)[0].id.substr(0,1).toUpperCase() + $(this)[0].id.substr(1));
  })

  $('.form-content input').on('click', function() {
    if ($(this).prop('checked')) {
      let _this = $(this);
      checkActiveSameNames(_this);
      calculateCarPrice(+$(this).val());
      showCarPrice(carPrice);
    } else {
      carPrice = startedCarPrice;
      $('.form-content input').each((i, input) => {
        if ($(input).prop('checked')) {
          calculateCarPrice(+$(this).val());
          showCarPrice(carPrice);
        } else {
          carPrice = startedCarPrice;
          $('.form-content input').each(function(i, input) {
            if ($(input).prop('checked')) {
              calculateCarPrice(+$(this).val());
              showCarPrice(carPrice);
            }
          });
          showCarPrice(carPrice);
        }
      })
    }
  })

  //If you click on input with same name then minus val and ckecked false
  function checkActiveSameNames(context) {
    $('.form-content input').each(function(i, input) {
      if ($(input).prop('checked')) {
        if (context.prop('name') == $(this).prop('name')) {
          if (context.prop('id') != $(this).prop('id')) {
            $(this).prop('checked', false);
            carPrice = carPrice - +$(this).val();
          }
        }
      }
    })
  }

  //Calculate car price
  function calculateCarPrice(price) {
    carPrice += price;
  }

  //Show calctulated car price
  function showCarPrice(price) {
    $(modelPrice).empty().text(price + '$');
  }

  $('form').on('submit', function(e) {
    e.preventDefault();
    let result = confirm(`Would you like to spend ${carPrice}$ for car?`);
    if (result) {
      alert("Grats!!! You bought a new car");
      location.reload();
    } else {
      alert("Next time");
    }
  })
});
