$(function() {
  $("body").on("click", ".transfer-button", function() {
    var $form = $("#transfer-modal form");
    var formAction = $form.attr("action");
    var id = $(this).data("id");
    var newAction = formAction.split("?").join(`${id}?`);
    $form.attr({action: newAction});
    $("#transfer-modal").modal("show");
    return false;
  });

  // Hard-coding these values is bad practice, but this is just an example app
  $("#transfer-modal").on('hide.bs.modal', function (event) {
    $("#transfer-modal form").attr("action", "/wish_list_items/?_method=PUT");
  });

  $("body").on("click", "#submit-transfer", function() {
    $("#transfer-modal form").submit();
  });


  $("body").on("click", "#open-wishlist-modal", function() {
    $("#wishlist-modal").modal("show");
    return false;
  });

  $("body").on("click", "#submit-wishlist-item", function() {
    $("#wishlist-modal form").submit();
  });
});