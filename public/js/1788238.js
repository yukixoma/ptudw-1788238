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

function showReply(parentCommentId, fullname) {
  $("#reply-for").css("display", "");
  $("#reply").html(`Reply ${fullname}`);
  $("#parentCommentId").val(parentCommentId);
}

function removeReply() {
  $("#reply-for").css("display", "none");
  $("#reply").html("");
  $("#parentCommentId").val("");
}

function checkStars(ratings) {
  const stars = document.getElementsByClassName("ratings-star");
  for (let i = 0; i < 5; i++) {
    if (i < ratings) {
      stars[i].classList.remove("far");
      stars[i].classList.add("fa");
    } else {
      stars[i].classList.remove("fa");
      stars[i].classList.add("far");
    }
  }
  $("#rating").val(ratings);
  const starNames = [
    "Please rating this product!",
    "Worst",
    "Bad",
    "OK",
    "Good",
    "Outstanding"
  ];
  $("#starName").html(starNames[ratings]);
}

function highlightStars(ratings) {
  const currentStarVal = $("#rating").val();
  checkStars(ratings);
  $("#rating").val(currentStarVal);
}

function resetStars() {
  const currentStarVal = $("#rating").val();
  checkStars(currentStarVal);
}
