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
