let form_add = document.forms[0];
console.log(form_add);

// ADD PRODUCTS
// Name
let name_fr_add = document.getElementById('name_french_add');
let name_eng_add = document.getElementById('name_english_add');
// Description
let desc_fr_add = document.getElementById('desc_french_add');
let desc_eng_add = document.getElementById('desc_english_add');
// Quantity
let quantity_add = document.getElementById('quantity_add');
// Unit
let unit_add = document.getElementById('unit_add');
// Price
let price_add = document.getElementById('price_add');
// Picture
let pic_add = document.getElementById('item_picture_add'); // not sure for this
// Category
let category_add = document.getElementById('category_add');


// UPDATE PRODUCTS
// Product ID
let id_update = document.getElementById('product_id_update').value;
// Name
let name_fr_update = document.getElementById('name_french_update').value;
let name_eng_update = document.getElementById('name_english_update').value;
// Description
let desc_fr_update = document.getElementById('description_french_update').value;
let desc_eng_update = document.getElementById('description_english_update').value;
// Quantity
let quantity_update  = document.getElementById('quantity_update').value;
// Unit
let unit_update = document.getElementById('unit_update').value;
// Price
let price_update = document.getElementById('price_update').value;
// Picture
let pic_update = document.getElementById('item_picture_update').value; // not sure for this
// Category
let category_update = document.getElementById('category_update').value;


// REMOVE PRODUCTS
// Product ID
let id_remove = document.getElementById('product_id_remove').value;

let test_data = {"test": "test"};

// Add Product Button
let add_product = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5001/add-product', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }};

    var data = `product_name_fr=${name_fr_add.value}&product_name_eng=${name_eng_add.value}&product_description_fr=${desc_fr_add.value}&product_description_eng=${desc_eng_add.value}&unit_in_stock=${quantity_add.value}&unit=${unit_add.value}&price=${price_add.value}&category=${category_add.value}&picture=${pic_add.value}`;
    data = data.replace(/\n/g, '');

    xhr.send(data); 
    

    // fetch('http://localhost:5001/add-product', {
    //     method: "POST",
    //     body: add_form,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // })
    // .then(response => {
    //     return response.text();
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log('Request Failed:', err);
    // })

}