const title = $("#title");
const button = $("#button");
const image = $("#image");
const description = $("#description");
const imageView = $("#image-view");

/*COUNTER FUNCTION */

function displayCounter(itemsSize) {
  $("#counter").text(`${itemsSize}`);
}

/* MODAL FUNCTIONS*/

function showModal(id = null) {
  document.getElementById("form").style.display = "block";

  let is_new_item = id === null;

  $(".save-edit").removeAttr("data-id");

  if (is_new_item) {
    cleanModal();
  } else {
    prepareModalForUpdate(id);
  }
}

function closeModal() {
  document.getElementById("form").style.display = "none";
}

function cleanModal() {
  title.text("New Item");
  button.text("Save");
  button.addClass("save-new").removeClass("save-edit");
  image.val("");
  description.val("");
  imageView.addClass("hidden");
}

function prepareModalForUpdate(id) {
  items.forEach(function(item, i) {
    if (item.id == id) {
      title.text("Update Item");
      button.text("Update");
      button.addClass("save-edit").removeClass("save-new");
      $(".save-edit").attr("data-id", item.id);
      image.val("");
      description.val(item.description);
      imageView.removeClass("hidden");
      imageView.attr("src", item.image.data);
    }
  });
}

/* NEW ITEM FUNCTIONS*/

function appendItem(item) {
  let btnEdit = `<button class='edit' id='edit-${item.id}' data-id='${item.id}'> <i class='fas fa-pencil-alt'></i></button>`;
  let btnDelete = `<button class='delete' id='delete-${item.id}' data-id='${item.id}'><i class='fas fa-trash-alt'></i></button>`;

  $("table").append(`
    <tr id="item-${item.id}">
      <td>${item.image.name}</td>
      <td>${item.description}</td>
      <td>${btnEdit} ${btnDelete}</td>
    </tr>`);
}

function addItem(items, item) {
  items.push(item);
  appendItem(item);

  displayCounter(items.length);

  saveItems(items);
}

/* DELETE ITEM FUNCTIONS */

function deleteItem(id) {
  let action = confirm("Are you sure you want to delete this item?");

  items.forEach(function(item, i) {
    if (item.id == id && action != false) {
      items.splice(i, 1);
      $("#table #item-" + item.id).remove();
    }
  });

  displayCounter(items.length);

  saveItems(items);
}

/* EDIT ITEM FUNCTIONS */

$("#form").on("click", ".save-edit", function(event) {
  event.preventDefault();

  let id = event.target.dataset.id;
  let image = $("#image")[0].files[0];
  let description = $("#description").val();

  items.forEach(function(item, i) {
    if (item.id == id) {
      item.image.name = image ? image.name : item.image.name;
      item.description = description ? description : item.description;

      let tds = $(`#item-${id}`).children();

      if (image) {
        reader = new FileReader();

        reader.addEventListener(
          "load",
          function() {
            item.image.data = reader.result;
          },
          false
        );

        reader.readAsDataURL(image);
      }

      $(tds[0]).text(item.image.name);
      $(tds[1]).text(item.description);
    }
  });

  closeModal();

  saveItems(items);
});

/* ITEMS */

let items = getItems();

if (items === null) {
  items = [];
}

appendItems(items);

let itemsSize = items.length;

displayCounter(items.length);

$(document).ready(function() {
  $("#form").on("click", ".save-new", function(event) {
    event.preventDefault();

    let image = $("#image")[0].files[0];
    let description = $("#description").val();

    let item = {
      id: items.length + 1,
      image: {
        name: image.name
      },
      description: description
    };

    if (image) {
      reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          item.image.data = reader.result;
          addItem(items, item);
        },
        false
      );

      reader.readAsDataURL(image);
    }

    closeModal();

    $("#image").val("");
    $("#description").val("");
  });

  let table = $("table");

  /* EDIT ITEM */

  table.on("click", ".edit", function(event) {
    let id = this.dataset.id;

    showModal(id);
  });

  /* DELETE ITEM */

  table.on("click", ".delete", function(event) {
    let id = this.dataset.id;

    deleteItem(id);
  });
});

/* SAVE ITEMS */

function saveItems(items) {
  let itemsJson = JSON.stringify(items);

  localStorage.setItem("items", itemsJson);
}

function getItems() {
  let items = localStorage.getItem("items");

  return JSON.parse(items);
}

function appendItems(items) {
  items.forEach(function(item, i) {
    appendItem(item);
  });
}
