$(function() {
  $("body").on("click", ".transfer-button", function() {
    var $form = $("#transfer-modal form");
    var formAction = $form.attr("action");
    var id = $(this).data("id");
    $form.attr("action", formAction.split("?").join(`${id}?`));
  });

  // Hard-coding these values is bad practice, but this is just an example app
  $("#transfer-modal").on('hide.bs.modal', function (event) {
    $("#transfer-modal form").attr("action", "/wish_list_items/?_method=PUT");
  });

  $("body").on("click", "#submit-transfer", function() {
    $("#transfer-modal form").submit();
  });
});