
let itemsSize = 0;

/* MODAL FUNCTIONS*/

function showModal(id = null) {

    document.getElementById("form").style.display = "block";

    var is_new_item = (id === null);

    if (is_new_item) {

         $("#title").text("New Item");
          $("#button").text("Save"); 
          $("#image").val("");
          $("#description").val("");

    } else {

      items.forEach(function(item, i) {
        if (item.id == id) {
          $("#title").text("Update Item");
          $("#button").text("Update"); 
          var dt = new DataTransfer();
          dt.items.add(item.image);
          $("#image")[0].files = dt.files;
          $("#description").val(item.description);
        }
      });
    }
}

function closeModal() {
  document.getElementById("form").style.display = "none";
}

/* NEW ITEM FUNCTONS*/

function appendItems(item) {
let btnEdit = `<button class='edit' id='edit-${item.id}' data-id='${item.id}'> <i class='fas fa-pencil-alt'></i></button>`;
let btnDelete =  `<button class='delete' id='delete-${item.id}' data-id='${item.id}'><i class='fas fa-trash-alt'></i></button>`;

  $("table").append(`
    <tr id="item-${item.id}">
      <td>${item.image.name}</td>
      <td>${item.description}</td>
      <td>${btnEdit} ${btnDelete}</td>
    </tr>`);

  console.log(item);
}

function addItem(items, item) {
  itemsSize += 1;
  items.push(item);
  appendItems(item);
}

/* DELETE ITEM FUNCTIONS */

function deleteItem(id) {
  itemsSize -= 1;
  var action = confirm("Are you sure you want to delete this item?");

  items.forEach(function(item, i) {
    if (item.id == id && action != false) {
      items.splice(i, 1);
      $("#table #item-" + item.id).remove();
    }
  });
}


/* EDIT ITEM FUNCTIONS */

function editItem(id) {
  
  
}


/* ITEMS */

let items = [];
console.log(items);

$(document).ready(function() {
  $("#button").click(function() {
    event.preventDefault();

    let image = $("#image")[0].files[0];
    let description = $("#description").val();

    let item = {
      id: items.length + 1,
      image: image,
      description: description
    };

    /* NEW ITEM */

    addItem(items, item);
    console.log(image, description);
    closeModal();

    $("#image").val("");
    $("#description").val("");
  });

  let table = $("table");

  /* EDIT ITEM */

  table.on("click", ".edit", function(event) {

    var id = this.dataset.id;

    console.log(id);

    showModal(id);

  }); 

  /* DELETE ITEM */

  table.on("click", ".delete", function(event) {

    var id = this.dataset.id;

    console.log(id);

    deleteItem(id);

  });
});



  for (var i = 0; i < items.length; i++) {
    console.log(items.length);
  }
