import {formatPrice, getCookie, loadFile, getProductCategory } from '../../index.js';

window.initUpdateUserForm = initUpdateUserForm;
var tableUserList = [];
var updateValidator, addValidator;
const userId = getCookie("userId");

$(document).ready(function() {

    updateValidator = $("form[id='update-user-information-form']").validate({
        rules:{
            userFistname: {
                required: true,
            },
            userLastname: {
                required: true,
            },
            userEmail: {
                required: true,
            },
            userAddress: {
                required: true,
            },
        },
        messages: {
            userFistname: {
                required: "This field is required...",
            },
            userLastname: {
                required: "This field is required...",
            },
            userEmail: {
                required: "This field is required...",
            },
            userAddress: {
                required: "This field is required...",
            }
        },
    });

    addValidator = $("form[id='register-form']").validate({
        rules:{
            userFistname: {
                required: true,
            },
            userLastname: {
                required: true,
            },
            userEmail: {
                required: true,
            },
            username: {
                required: true,
                minlength: 8
            },
            password: {
                required: true,
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
            },
            rePassword: {
                required: true,
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                equalTo: "#password"
            },
        },
        messages: {
            userFistname: {
                required: "This field is required...",
            },
            userLastname: {
                required: "This field is required...",
            },
            userEmail: {
                required: "This field is required...",
            },
            username: {
                required: "This field is required...",
                minlength: jQuery.validator.format("At least {0} characters required!"),
            },
            password: {
                required: "This field is required...",
                pattern: "The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            },
            rePassword: {
                required: "This field is required...",
                equalTo : "This has to be the same as new password"
            }
        },
    });

    $('#btn-submit-user-update').click(function() {
        if($("#update-user-information-form").valid()){   // test for validity
            var sent_data = $('#update-user-information-form').serializeArray();
            sent_data.push({name: "updatedBy", value: userId});  
            $.post({
                url: '../backend/user/AdminUpdateUserInformation.php',
                data: sent_data      
            })
            .done(function (response) {
                console.log(response);
                response = JSON.parse(response);
                if(response && !response.error){
                    $('#userModal').modal('hide');
                    getAllCurrentUser();
                }
            });
            return false;
        } else {
            console.log('invalid form')
        }
    });

    $('#btn-submit-user-add').click(function(){
        if($("#register-form").valid()){   // test for validity
            var sent_data = $('#register-form').serializeArray();
            sent_data.push({name: "updatedBy", value: userId});  
            $.post({
                url: '../backend/user/AddNewUser.php',
                data: sent_data      
            })
            .done(function (response) {
                console.log(response);
                response = JSON.parse(response);
                if(response && !response.error){
                    $('#AddUserModal').modal('hide');
                    getAllCurrentUser();
                }
            });
            return false;
        } else {
            console.log('invalid form')
        }
    })
    getAllCurrentUser();
})

function getRole(id){
    switch(id){
        case 1: return 'User';
        case 2: return 'Staff';
        case 3: return 'Admin';
    }
}


function getAllCurrentUser(){
    $.get(`../backend/user/GetAllUser.php`,
    function(response) {
      if(response){
          if(!JSON.parse(response)['error']){
            tableUserList = JSON.parse(response)['data'];
              console.log("Users: ",tableUserList);
              var list_product = tableUserList.map(function(element){
                  return `<tr>
                              <th scope="row">${element.Id}</th>
                              <td>${element.FirstName}</td>
                              <td>${element.LastName}</td>
                              <td>${getRole(element.RoleId)}</td>
                              <td>${element.Email}</td>
                              <td> 
                                  <button type="button" class="btn btn-primary" onclick=initUpdateUserForm(${element.Id})
                                  data-toggle="modal" data-target="#userModal" >Update</button>
                              </td>
                          </tr>`});
              $('#manage-user-table-body').html(list_product.join(' '));
          }
          else{
              console.log("Error ", response['message']);
          }
      }
  });
}

function initUpdateUserForm(id){
    var user = tableUserList.filter(element => element.Id === id)[0];
    document.getElementById('btn-submit-update').setAttribute("disabled", true)
    for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
        document.getElementsByTagName('input')[i].classList.remove("error");
    }
    updateValidator.resetForm()
    $('#userId').val(id);
    $('#userFistname').val(user.FirstName);
    $('#userLastname').val(user.LastName);
    $('#userEmail').val(user.Email);
    $('#userRole').val(getRole(user.RoleId));
    $('#userAddress').val(user.Address);
    $('#isActive').val(user.IsActive);
}


