
// DISPLAY THE CORRECT MODAL FOR EVERY REQUEST
// $('#shopping_cart_modal').on('show.bs.modal', function (event) {
//     console.log("too")
//     const button = $(event.relatedTarget) // Button that triggered the modal
//     const request = button.data('request') // Extract info from data-* attributes
//     const action = button.data('action')
//     console.log(request, action, "HEYY")
//     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//     const modal = $(this)
//     modal.find('.modal-title').text('Are you sure you want to ' + request + "?")
//     modal.find('.modal-form-request').attr('action', action);
// })
$('.shopping-cart-modal-btn').on("click",function(event){
    console.log("hey")
    $('#shopping_cart_modal').modal("show")
    const button = $(this)[0]['attributes']// Button that triggered the modal
    console.log(button)
    const request = button['data-request'] // Extract info from data-* attributes
    const action = button['data-action']
    console.log(request, action, "HEYY")
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    const modal = $("#shopping_cart_modal")
    modal.find('.modal-title').text('Are you sure you want to ' + request.value + "?")
    modal.find('.modal-form-request').attr('action', action.value);
})

// DISPLAY THE QUANTITY EDIT FORM
$('.editBtn').on('click',function(event){
    event.preventDefault()
    let wrapper = $(this).parent()
    wrapper.children().toggle()
})


$('.add-to-save-for-later').on('click',function (event) {
    const bookId = $(this).attr('data-bookid')
    $.post('/addToSaveForLater', {bookId}, function (data) {
        location.reload()
    });
});

$('.add-to-shopping-cart').on('click',function (event) {
    const bookId = $(this).attr('data-bookid')
    $.post('/addToShoppingCart', {bookId}, function (data) {
        location.reload()
    });
});

