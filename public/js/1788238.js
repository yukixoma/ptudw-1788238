function addToCart() {
  const id = $(this).data("id");
  const quantity = $("#sst") ? $("#sst").val() : 1;
  $.ajax({
    type: "POST",
    url: "/cart",
    data: {
      id,
      quantity
    },
    success: function(response) {
      $("#card-badge").html(response.totalQuantity);
    }
  });
}

$(document).ready(() => {
  $(".add-to-cart").on("click", addToCart);
});

function updateCart(id, operator) {
  const result = document.getElementById(`sst${id}`);
  const sst = parseInt(result.value);
  if (operator == "inc") {
    if (!isNaN(sst)) {
      updateCartItem(id, sst + 1);
    }
  } else {
    if (sst > 1) {
      updateCartItem(id, sst - 1);
    } else {
      const removeConfirm = confirm("Do you really want to remove this item?");
      if (removeConfirm) {
        $.ajax({
          type: "DELETE",
          url: "/cart",
          data: { id },
          success: function(response) {
            location.reload();
          }
        });
      }
    }
  }
}

function updateCartItem(id, quantity) {
  $.ajax({
    type: "PUT",
    url: "/cart",
    data: {
      id: id,
      quantity: quantity
    },
    success: function(response) {
      location.reload();
    }
  });
}

function clearCart() {
  const clearCartConfirm = confirm("Do you really want to remove all items?");
  if (clearCartConfirm) {
    $.ajax({
      type: "DELETE",
      url: "/cart/all",
      success: function(response) {
        location.reload();
      }
    });
  }
}
