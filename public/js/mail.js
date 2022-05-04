let user = [
  {firstname:"Dheeksha", lastname:"Radhoa",email:"dradhoa74@gmail.com",Number:"+23057772503"},
  {firstname:"Wayne", lastname:"Celestin",email:"waynecelestin.a3@gmail.com",Number:"+23058127670"},
  {firstname:"Oliver", lastname:"Ah You",email:"ahyouoliver9@gmail.com",Number:"+23059291082"},
  {firstname:"Damien", lastname:"Mallet",email:"damien@developers.institute",Number:"+23057479941"},
  {firstname:"Henry", lastname:"Oko",email:"herraph@gmail.com",Number:"+23054578573"},
]


"use strict";
const nodemailer = require("nodemailer");

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'dradhoa74@gmail.com',
        pass: 'yaj051201?'
    }
  });
  
  for (let i = 0; i < user.length; i++) {
    // console.log(user[i]);
    let regex = /^.+@.+\..+$/;
    

      let msg = `<p>
      <div class='container'>
        <p>Thank you for your purchase!<p>
        <br>
        <img class="center" src="https://drive.google.com/uc?export=view&id=1kGnYKjU8HvKYkpMJFQeAE40iX0ap1X_6" height="200px"><br>
        <p>
          Hello ${user[i].firstname}, We're happy to let you know that we've received your order.
          <br><br>
          If you have any questions, contact us here or call us on 52538740!
        </p>
        <br>
        <br>
        Click here to visit our Facebook and instagram page!<br><br>
        <a href="https://www.facebook.com/NadiMiel/" target="_blank" style="text-decoration: none">
          <img src="https://logoeps.com/wp-content/uploads/2013/11/facebook-flat-vector-logo.png" height="50px">
        </a>
        <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" height="44px" style="padding: 3px">
        </a>
      </div>
    </p>`



    let order_id = "000001";

    if(regex.test(user[i].email)) {
      let info = await transporter.sendMail({
        from: '<dradhoa74@gmail.com>',
        to: user[i].email, 
        subject: `Order #${order_id} received`, 
        text: "",
        html: msg, 
      });
      console.log(`Email sent to ${user[i].firstname}`);
    } 
    else{
      console.log(`Error - ${user[i].email} is invalid`);
    }
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

main().catch(console.error);
