import {formatPrice, getCookie, loadFile, getProductCategory } from '../../index.js';


var tableUserList = [];
$(document).ready(function() {
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
                                  data-toggle="modal" data-target="#userModal" data-whatever="@mdo">Update</button>
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


