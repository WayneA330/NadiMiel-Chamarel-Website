//const nodemailer = require("nodemailer");

// ADD CUSTOMER TO DATABASE
let first_name = document.getElementById('first_name_customer');
let last_name = document.getElementById('last_name_customer');
let email = document.getElementById('email_customer');
let phone = document.getElementById('phone_customer');
let address = document.getElementById('address_customer');

// Create domain variable
const domain = `http://${window.location.hostname}:${server_port}`;

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


// // Send email



// async function send_email() {
//     console.log(user);
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: 'dradhoa74@gmail.com',
//         pass: 'yaj051201?'
//     }
//   });
  
// //   for (let i = 0; i < user.length; i++) {
//     // console.log(user[i]);
//     let regex = /^.+@.+\..+$/;
    

//       let msg = `<p>
//       <div class='container'>
//         <p>Thank you for your purchase!<p>
//         <br>
//         <img class="center" src="https://drive.google.com/uc?export=view&id=1kGnYKjU8HvKYkpMJFQeAE40iX0ap1X_6" height="200px"><br>
//         <p>
//           Hello ${first_name.value}, We're happy to let you know that we've received your order.
//           <br><br>
//           If you have any questions, contact us here or call us on 52538740!
//         </p>
//         <br>
//         <br>
//         Click here to visit our Facebook and instagram page!<br><br>
//         <a href="https://www.facebook.com/NadiMiel/" target="_blank" style="text-decoration: none">
//           <img src="https://logoeps.com/wp-content/uploads/2013/11/facebook-flat-vector-logo.png" height="50px">
//         </a>
//         <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">
//           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" height="44px" style="padding: 3px">
//         </a>
//       </div>
//     </p>`



//     let order_id = "000001";

//     if(regex.test(email.value)) {
//       let info = await transporter.sendMail({
//         from: '<dradhoa74@gmail.com>',
//         to: email.value, 
//         subject: `Order #${order_id} received`, 
//         text: "",
//         html: msg, 
//       });
//       console.log(`Email sent to ${first_name.value}`);
//     } 
//     else{
//       console.log(`Error - ${email.value} is invalid`);
//     }
//     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   }
// // }


// function checkout(){
//     add_customer();
//     send_email();
// }