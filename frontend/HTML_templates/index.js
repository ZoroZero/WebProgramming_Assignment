$(document).ready(function() {
    //banner owl carousel
    $("#banner-area .owl-carousel").owlCarousel({
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000,
        dotsSpeed: 1000,
        loop: true,
        items: 1
    });

    //top sale owl carousel
    $("#top-sale .owl-carousel").owlCarousel({
        loop:true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    //isotope filter
    var $grid = $(".grid").isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
    })

    //filter items on button press
    $(".button-group").on("click", "button", function(){
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    })

    //new pc owl carousel
    $("#new-pc .owl-carousel").owlCarousel({
        loop:true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    window.onload = function(){
        $grid.isotope({filter: '*'})
    }

    // blogs owl carousel
    $("#blogs .owl-carousel").owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        responsive : {
            0: {
                items: 1
            },
            600: {
                items: 3
            }
        }
    })

    // product qty section
    let $qty_up = $(".qty .qty-up");
    let $qty_down = $(".qty .qty-down");
    let $input = $(".qty .qty_input");

    // click on qty up button
    $qty_up.click(function(e){
        alert($input.val())
        //let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
        if($input.val() >= 1 && $input.val() <= 9){
            $input.val(function(i, oldval){
                return ++oldval;
            });
        }
    });

    // click on qty down button
    $qty_down.click(function(e){
        //let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
        if($input.val() > 1 && $input.val() <= 10){
            $input.val(function(i, oldval){
                return --oldval;
            });
        }
    });

    
    // Display the current tab
    showTab(currentTab); 


    
})

var currentTab = 0; // Current tab is set to be the first tab (0)
function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
  } else {
      document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
      document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
      // ... the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
      }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

// Googlemap js
const address1 = { lat: 10.772713935537316, lng: 106.65967597467676 };
const address2 = { lat: 10.790040966516928, lng: 106.66139794610773 };
const address3 = { lat: 10.812376924038709, lng: 106.61820978330887 };
const center = { lat: 10.795532861871804, lng: 106.63649092163753 };

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 13,
    streetViewControl: false,
    mapTypeControl:false

});

//custom marker
var map_icon = {
    url: 'https://www.flaticon.com/svg/static/icons/svg/25/25240.svg',
    scaledSize: new google.maps.Size(30, 30)
}

    var marker = new google.maps.Marker({
        position: address1,
        icon:map_icon,		
        map: map,
    }); 
    
    marker = new google.maps.Marker({
        position: address2,
        icon:map_icon,		
        map: map,
    }); 
    
    marker = new google.maps.Marker({
        position: address3,
        icon:map_icon,		
        map: map,
    }); 	


}

const Http = new XMLHttpRequest();
const userId = getCookie("userId");
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var isFormValid = true;
var isFirstNameValid = isLastNameValid = isEmailValid = isAddressValid = false;
var isNewPasswordValid = isConfirmPasswordValid = false;

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getUserInformation(){
  request = $.get(`../backend/user/GetUserInformation.php?userId=${userId}`,
      function(response) {
        if(response){
          console.log(response);
          let information = JSON.parse(response)['data'];
          // document.getElementById("profile_id").value = userId;
          document.getElementById("profile_username").value = information['UserName'];
          document.getElementById("profile_firstName").value = information['FirstName'];
          document.getElementById("profile_lastName").value = information['LastName'];
          document.getElementById("profile_email").value = information['Email'];
          document.getElementById("profile_address").value = information['Address'];
          document.getElementById('user_profile_avatar').src = '../frontend/' + information['Path'];
        }
    }
  );

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error("The following error occurred: ", textStatus, errorThrown
);
  });
}

var request;

$(document).ready(function(){
  getUserInformation();
});

function checkFirstName(){
  if (document.getElementById("profile_firstName").value === ""){
    document.getElementById("profile_firstName_check").style.display = 'block';
    document.getElementById("profile_firstName").classList.add('warning');
    isFirstNameValid = false;
  } 
  else{
    document.getElementById("profile_firstName_check").style.display = 'none';
    isFirstNameValid = true;
  }
}

function checkLastName(){
  if (document.getElementById("profile_lastName").value === ""){
    document.getElementById("profile_lastName_check").style.display = 'block';
    document.getElementById("profile_lastName").classList.add('warning');
    isLastNameValid = false;
  } 
  else{
    document.getElementById("profile_lastName_check").style.display = 'none';
    isLastNameValid = true;
  }
}

function checkEmail(){
  if(document.getElementById("profile_email").value == ""){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_email").classList.add('warning');
    isEmailValid = false;
  }
  else if(!email_regex.test(String(profile_email.value).toLowerCase())){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please provide a correct email address!";
    document.getElementById("profile_email").classList.add('warning');
    isEmailValid = false;
  } 
  else{
    document.getElementById("profile_email_check").style.display = 'none';
    isEmailValid = true;
  }
}

function checkAddress(){
  if( document.getElementById("profile_address").value == ""){
    document.getElementById("profile_address_check").style.display = 'block';
    document.getElementById("profile_address").classList.add('warning');
    isAddressValid = false;
  }
  else{
    document.getElementById("profile_address_check").style.display = 'none';
    isAddressValid = true;
  }  
}

function updateUserInformation(){
  checkFirstName();
  checkLastName();
  checkEmail();
	checkAddress();
	
	if (isFirstNameValid && isLastNameValid && isEmailValid && isAddressValid) {
    var sent_data = $('#form_user_profile_general').serializeArray();
    sent_data.push({name: "id", value: userId});   
    $.ajax({
      type: 'post',
      url: '../backend/user/UpdateUserInformation.php',
      data: sent_data      
    })
    .done(function (response) {
      console.log(response);
      document.getElementById("inputcheck").innerHTML = "Success!";
      setTimeout(function(){
        document.getElementById("inputcheck").innerHTML = "&nbsp"
      },5000);
    });
  }
}

function checkPassword(){
  if (document.getElementById("profile_password").value == ""){
    document.getElementById("profile_password_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_password_check").style.display = 'block';
    document.getElementById("profile_password").classList.add('warning');
    isNewPasswordValid = false;
  } else if(document.getElementById("profile_password").value.length < 8){
    document.getElementById("profile_password_check").innerHTML = "Must be at least 8 character"; //ADD MORE  PASSWORD CONSTRAINT HERE
    document.getElementById("profile_password_check").style.display = 'block';
    document.getElementById("profile_password").classList.add('warning');
    isNewPasswordValid = false;
  } else {
    document.getElementById("profile_password_check").style.display = 'none';
    document.getElementById("profile_password").classList.remove('warning');	
    isNewPasswordValid = true;
  }
}

function checkConfirmPassword(){
  if (document.getElementById("profile_password").value == "" && document.getElementById("profile_password_re").value == ""){
    document.getElementById("profile_password_re_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_password_re_check").style.display = 'block';
    document.getElementById("profile_password_re").classList.add('warning')	
    isConfirmPasswordValid = false		
  }
  else if (document.getElementById("profile_password_re").value !== document.getElementById("profile_password").value){
    document.getElementById("profile_password_re_check").innerHTML = "Password does not match";
    document.getElementById("profile_password_re_check").style.display = 'block';
    document.getElementById("profile_password_re").classList.add('warning');		
    isConfirmPasswordValid = false;	
  } else {
    document.getElementById("profile_password_re_check").style.display = 'none';
    isConfirmPasswordValid = true;
  }	
}

function updatePassword(){
  checkPassword();
  checkConfirmPassword();
  if(isNewPasswordValid && isConfirmPasswordValid){
    var sent_data = $('#form_user_profile_password').serializeArray();
    sent_data.push({name: "id", value: userId});   
    $.ajax({
          type: 'post',
          url: '../backend/user/UpdateUserPassword.php',
          data: sent_data      
        })
    .done(function (response) {
      console.log("Update password", response);
      document.getElementById("passwordcheck").innerHTML = "Success!";
      setTimeout(function(){
      document.getElementById("passwordcheck").innerHTML = "&nbsp"
      },5000)
    });		
    document.getElementById("form_user_profile_password").reset();
  }
}

var loadFile = function(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  document.getElementById("imgs-label").innerHTML = event.target.files[0].name;
  document.getElementById("imgs-label").setAttribute("title", event.target.files[0].name);
  output.style.display= 'inline';
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};

function uploadAvatar(){
  var formData = new FormData();
  formData.append('section', 'general');
  formData.append('action', 'previewImg');
  // Attach file
  formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
  formData.append('id', userId); 
  $.ajax({
    url: '../backend/user/UploadAvatar.php',
    data: formData,
    type: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    success: function(res){
      console.log(res);
      getUserInformation();
    }
  });
}


