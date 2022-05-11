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
let pic_add = document.getElementById('item_picture_add');
// Category
let category_add = document.getElementById('category_add');


// UPDATE PRODUCTS
// Product ID
let id_update = document.getElementById('product_id_update');
// Name
let name_fr_update = document.getElementById('name_french_update');
let name_eng_update = document.getElementById('name_english_update');
// Description
let desc_fr_update = document.getElementById('description_french_update');
let desc_eng_update = document.getElementById('description_english_update');
// Quantity
let quantity_update  = document.getElementById('quantity_update');
// Unit
let unit_update = document.getElementById('unit_update');
// Price
let price_update = document.getElementById('price_update');
// Picture
let pic_update = document.getElementById('item_picture_update');
// Category
let category_update = document.getElementById('category_update');


// REMOVE PRODUCTS
// Product ID
let id_remove = document.getElementById('product_id_remove');

// ADD CUSTOMER TO DATABASE
let first_name = document.getElementById('first_name_customer');
let last_name = document.getElementById('last_name_customer');
let email = document.getElementById('email_customer');
let phone = document.getElementById('phone_customer');
let address = document.getElementById('address_customer');

// Retrieve domain (online or local)
// const server_port = sessionStorage.getItem('server_port');
const hostname = window.location.hostname;
const domain = hostname == 'localhost'? `http://${hostname}:${server_port}` :`https://${hostname}`;
console.log(domain);

// Add Product Button
let add_product = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${domain}/add-product`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }};

    var data = `product_name_fr=${name_fr_add.value}&product_name_eng=${name_eng_add.value}&product_description_fr=${desc_fr_add.value}&product_description_eng=${desc_eng_add.value}&unit_in_stock=${quantity_add.value}&unit=${unit_add.value}&price=${price_add.value}&category=${category_add.value}&picture=${convert_picture_link(pic_add.value)}`;
    data = data.replace(/\n/g, '');

    xhr.send(data);
}

// Update Product Button
let update_product = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${domain}/update-product`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }};

    let new_id_update = id_update.value;
    let id_arr = new_id_update.split("-");
    // console.log(Number(id_arr[0]));

    var data = `product_id=${Number(id_arr[0])}&product_name_fr=${name_fr_update.value}&product_name_eng=${name_eng_update.value}&product_description_fr=${desc_fr_update.value}&product_description_eng=${desc_eng_update.value}&unit_in_stock=${quantity_update.value}&unit=${unit_update.value}&price=${price_update.value}&category=${category_update.value}&picture=${pic_update.value}`;
    data = data.replace(/\n/g, '');

    xhr.send(data);
}

// Get values of update product
let values_update_product = () => {
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', `${domain}/admin`, true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //        console.log(xhr.status);
    //        console.log(xhr.responseText);
    //     }};

    // console.log(productList);

    // let new_id_update = id_update.value;
    // let id_arr = new_id_update.split("-");
    // // console.log(Number(id_arr[0]));

    // var data = `product_id=${Number(id_arr[0])}&product_name_fr=${name_fr_update.value}&product_name_eng=${name_eng_update.value}&product_description_fr=${desc_fr_update.value}&product_description_eng=${desc_eng_update.value}&unit_in_stock=${quantity_update.value}&unit=${unit_update.value}&price=${price_update.value}&category=${category_update.value}&picture=${pic_update.value}`;
    // data = data.replace(/\n/g, '');

    // xhr.send(data);
}

values_update_product();



// Remove Product Button
let remove_product = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${domain}/remove-product`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }};

    let new_id_remove = id_remove.value;
    let id_arr = new_id_remove.split("-");
    var data = `product_id=${Number(id_arr[0])}`;

    xhr.send(data);
}

// Add Customer Button
let add_customer = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${domain}/add-customer`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }};

    var data = `first_name=${capitalise_name(first_name.value)}&last_name=${capitalise_name(last_name.value)}&email=${email.value}&phone=${phone.value}&address=${address.value}`;
    data = data.replace(/\n/g, '');

    xhr.send(data);
}

function capitalise_name(name){ 
    return name.replace(name.charAt(0), name.charAt(0).toUpperCase());
}

function retrieve_product(id){
    console.log(`Retrieving product ${id}`);
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${domain}/product_id/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    //onload - Executed after response has been received
    xhr.onload = function(){
    if(xhr.status === 200){
      product = JSON.parse(xhr.response)[0];
      console.log(product);
      display_product_details_update(product);
    }
    else{
      console.log("Error!");
      alert(`Status code: ${xhr.status} - ${xhr.statusText}`);
    }
  }
  
  // onerror - When you have an error
  xhr.onerror = function(){
    alert("Request failed!");
  }
}

function display_product_details_update(product) {
    // Name
    name_fr_update.value = product.product_name_fr;
    name_eng_update.value = product.product_name_eng;
    // Description
    desc_fr_update.value = product.product_description_fr
    desc_eng_update.value = product.product_description_eng
    // Quantity
    quantity_update.value = product.unit_in_stock
    // Unit
    unit_update.value = product.unit
    // Price
    price_update.value = product.price
    // // Picture
    pic_update.value = convert_picture_link(product.picture)
    // Category
    category_update.value = product.category
}

function convert_picture_link(link){
    if (link.includes('drive.google')){
        link = link.replace('file/d/', 'uc?export=view§§id=').replace('/view?usp=sharing', '');
    }
    return link
}
 