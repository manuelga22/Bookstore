
// DISPLAY THE CORRECT MODAL FOR EVERY REQUEST
$('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const request = button.data('request') // Extract info from data-* attributes
    const action = button.data('action')
    console.log(request)
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    const modal = $(this)
    modal.find('.modal-title').text('Are you sure you want to ' + request + "?")
    modal.find('.modal-form-request').attr('action', action);
})


// DISPLAY THE QUANTITY EDIT FORM
$('.editBtn').on('click',function(event){
    event.preventDefault()
    let wrapper = $(this).parent()
    wrapper.children().toggle()
})


$('.add-to-save-for-later .add-to-shopping-cart').on('click',function (event) {
    const bookId = $(this).attr('data-bookid')
    $.post('/addToSaveForLater', {bookId}, function (data) {
        location.reload()
    });
});

