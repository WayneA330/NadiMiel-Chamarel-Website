// ADD CUSTOMER TO DATABASE
let first_name = document.getElementById('first_name_customer');
let last_name = document.getElementById('last_name_customer');
let email = document.getElementById('email_customer');
let phone = document.getElementById('phone_customer');
let address = document.getElementById('address_customer');

let payment = document.getElementById('payment_option');
let delivery = document.getElementById('payment_delivery');

// Retrieve domain (online or local)
const hostname = window.location.hostname;
const domain = hostname === 'localhost'? `http://${hostname}:${server_port}` :`https://${hostname}`;

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

    let data = `first_name=${capitalise_name(first_name.value)}&last_name=${capitalise_name(last_name.value)}&email=${email.value}&phone=${phone.value}&address=${address.value}`;
    data = data.replace(/\n/g, '');

    xhr.send(data);
}

// async function confirm_order_2(){
//     console.log("Sending order for confirmation...");
//     const data = {
//         "first_name": capitalise_name(first_name.value),
//         "last_name": capitalise_name(last_name.value),
//         "email": email.value,
//         "phone": phone.value,
//         "address": address.value,
//         "payment": payment.selectedOptions[0].value
//     }

//     const response = await fetch(`${domain}/confirm-order`,
//         {
//             "origins" : "*",
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         body: data
//     })

//     const result = await response.json();

//     console.log(result);
// }

let confirm_order = () => {
    console.log("Sending order for confirmation...");
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${domain}/confirm-order`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
        }
    };

    let cart = sessionStorage.getItem('cart');

    let data = `first_name=${capitalise_name(first_name.value)}&last_name=${capitalise_name(last_name.value)}&email=${email.value}&phone=${phone.value}&address=${address.value}&payment=${payment.selectedOptions[0].value}&delivery=${delivery.selectedOptions[0].value}&cart=${cart}`;
    data = data.replace(/\n/g, '');

    xhr.send(data);
}

function capitalise_name(name){
    return name.replace(name.charAt(0), name.charAt(0).toUpperCase());
}

function checkout(){
    confirm_order();
    add_customer();
}