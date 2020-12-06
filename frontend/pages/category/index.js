$(document).ready(function() {

  //isotope filter
  var $grid = $(".grid").isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    getSortData: {
        productname: '.product-name',
        productprice: '.product-price'
    }
  })

  $grid.isotope({filter: '*'})

  //filter items on button press
  $(".button-group").on("click", "button", function(){
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({filter: filterValue});
  })

  $(".button-group-sort").on("click", "button", function(){
    var filterValue = $(this).attr('data-filter');
    console.log(filterValue)
    /* Get the element name to sort */
    // var sortValue = $(this).attr('data-sort-value');

    /* Get the sorting direction: asc||desc */
    var direction = $(this).attr('direction');

    /* convert it to a boolean */
    var isAscending = (direction == 'asc');
    // var newDirection = (isAscending) ? 'desc' : 'asc';
    /* pass it to isotope */
    $grid.isotope({ sortBy: filterValue, sortAscending: isAscending });

    // $(this).attr('data-sort-direction', newDirection);

  })
})