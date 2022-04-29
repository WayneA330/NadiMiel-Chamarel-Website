// ADD CUSTOMER TO DATABASE
let first_name = document.getElementById('first_name_customer');
let last_name = document.getElementById('last_name_customer');
let email = document.getElementById('email_customer');
let phone = document.getElementById('phone_customer');
let address = document.getElementById('address_customer');

// Add Customer Button
let add_customer = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5001/add-customer', true);
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