const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;

//Database
const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-35-168-194-15.compute-1.amazonaws.com' || '127.0.0.1',
        user: 'hijbttiixkirth' || 'waynecelestin',
        password: 'b22c057232f47934c0f946d9a516509f72559bc9f03504846448807b35613052' || 'root',
        database: 'daj4bgaqkmbhan' || 'Nadimiel-Database',
        port: 5432,
        ssl: { 
            rejectUnauthorized: false 
        }
    }
})

app.set('db', db);

// sets EJS as the view engine for the Express application
app.set('view engine', 'ejs');

// load css and assets folder
app.use(express.static('public'));


app.get('/', function(req, res){
    res.render('index');
})


app.get('/orders', function(req, res){
    let today = new Date().toISOString().slice(0, 10);
    // console.log(today);
    db
    .select().from('calendar').where('date', '>=', today)
    .then(function(data) {
        console.log(data);
        res.render('checkout',  {PORT: PORT, title: 'Add to Cart', CalendarItems: data});
    })
    
})

app.get('/product_description/:product_id', function(req, res){
    console.log(typeof parseInt(req.params.product_id));
    db
    .select().from('product')
    .where({'product_id': parseInt(req.params.product_id)})
    .then(function(data){
        console.log(data);
        res.render('product_description', {title: 'Product description', 'productMenu': data});
    })
    .catch(function(data){
        console.log('An error occured');
        // console.log(data);
    })
})

app.get('/product_id/:product_id', function(req, res){
    console.log(typeof parseInt(req.params.product_id));
    db
    .select().from('product')
    .where({'product_id': parseInt(req.params.product_id)})
    .then(function(data){
        // console.log(data);
        res.send(data);
    })
    .catch(function(data){
        console.log('Failed to retrieve product');
        // console.log(data);
    })
})

app.get('/products', function(req, res){
    db
    .select().from('product').then(function(data){
        // console.log(data);
        res.render('products', {title: 'Products', productMenu: data});
    })
    
})

app.get('/recipe', function(req, res){
    db
    .select().from('recipe')
    .then(function(recipe){
        db.select('recipe_description_fr').from('recipe')
        .then(function(ingredients) {
            let ingredients_arr = ingredients[0].recipe_description_fr.split(',');
            // console.log(ingredients_arr);
            db.select('recipe_article_fr').from('recipe')
            .then(function(preparation) {
                let preparation_arr = preparation[0].recipe_article_fr.split(',');
                // console.log(preparation_arr);e
                res.render('recipe', {'title': 'Recipes', 'recipeMenu': recipe, 'Ingredients': ingredients_arr, 'Preparation': preparation_arr});
            })
        })
    })
})

// let productLists;
app.get('/admin', function(req, res){
    db
    .select().from('customer')
    .then(function(customers) {
        db.select().from('product')
        .then(function(products) {
            res.render('admin', {PORT: PORT, title: 'Admin', customerLists: customers, productLists: products});
        })
    })
})

function convert_picture_link(link){
    if (link.includes('drive.google')){
        link = link.replace('file/d/', 'uc?export=view§§id=').replace('/view?usp=sharing', '');
    }
    return link
}

// Add products in database
app.post('/add-product', function(req, res) {
    console.log('Product has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    const picture_link = convert_picture_link(data.picture);

    db('product')
        .insert({ product_name_fr : data.product_name_fr, product_name_eng : data.product_name_eng, product_description_fr : data.product_description_fr, product_description_eng : data.product_description_eng, unit_in_stock : data.unit_in_stock, picture : picture_link, unit : data.unit, category : data.category, price : data.price }, ['*'])
        .then(res.send('Product inserted in database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

// Update products in database
app.post('/update-product', function(req, res) {
    console.log('Product info to be updated has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    const picture_link = convert_picture_link(data.picture);

    db('product')
        .where('product_id', data.product_id)
        .update({ product_name_fr : data.product_name_fr, product_name_eng : data.product_name_eng, product_description_fr : data.product_description_fr, product_description_eng : data.product_description_eng, unit_in_stock : data.unit_in_stock, picture : picture_link, unit : data.unit, category : data.category, price : data.price }, ['*'])
        .then(res.send('Product inserted in database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

// Remove product from database
app.post('/remove-product', function(req, res) {
    console.log('Product ID has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    db('product')
        .where('product_id', data.product_id )
        .del(['*'])
        .then(res.send('Product has been removed from the database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

// Add Customer to database
app.post('/add-customer', function(req, res) {
    console.log('Add Customer request has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    db('customer')
        .insert({ first_name : data.first_name, last_name : data.last_name, email : data.email, phone : data.phone, address : data.address}, ['*'])
        .then(res.send('Product inserted in database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

// Add Calender to database
app.post('/add-calendar', function(req, res) {
    console.log('Add Calendar request has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    db('calendar')
        .insert({ time_slot: data.time_slot, location: data.location, date: data.date })
        .then(res.send('Product inserted in database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

// Confirm order
app.post('/confirm-order', function(req, res) {
    console.log('Order request has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    let cart_arr = JSON.parse(data.cart);

    for (let product of cart_arr){
        let item = JSON.parse(product);
        console.log(item);
        const new_stock = Number(item.unit_in_stock) - Number(item.qty);
        console.log(`${item.product_name_fr} has ${new_stock} left.`)

        // Update item stock in database
        // db('product')
        //     .where('product_id', item.product_id)
        //     .update({unit_in_stock : new_stock}, ['*'])
        //     .then(res.send('Product qty updated in database'))
        //     .catch(err => {
        //         console.log('Request Failed:', err);
        //     });
    }

    send_email(data)
        .then(() => console.log('Email successful'))
        .catch((e) => console.log(`An error occured: ${e}`))
    // db('orders')
    //     .insert({ first_name : data.first_name, last_name : data.last_name, email : data.email, phone : data.phone, address : data.address}, ['*'])
    //     .then(res.send('Order added in database'))
    //     .then(() => {
    //         send_email(data);
    //     })
    //     .catch(err => {
    //         console.log('Request Failed:', err);
    //     });
})

async function send_email(user) {
    //let testAccount = await nodemailer.createTestAccount();
    //cart_obj = JSON.parse(user.cart);
    console.log(user);

    let order_summary = ``;
    const no_reply_email = 'order.nadimielchamarel@gmail.com';
    const no_reply_pass = '$g0s@jg1m';

    let cart_arr = JSON.parse(user.cart);
    let cart_total = 0;
    for (let product of cart_arr){
        let item = JSON.parse(product);
        console.log(item);

        if (item.qty > 0) {
            const item_total = Number(item.qty) * Number(item.price);
            cart_total += item_total;
            order_summary += `<tr>
                                <td style="text-align:left">${item.product_name_fr}</td>
                                <td style="text-align:center">${item.qty}</td>
                                <td style="text-align:right">${item.price.toLocaleString()}</td>
                                <td style="text-align:right">${item_total.toLocaleString()}</td>
                            </tr>`
        }
    }
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: no_reply_email,
          pass: no_reply_pass
      }
    });
    

    let msg_fr = `<p>
    <div class='container'>
        <p>Merci pour votre commande!<p>
        <br>
        <img class="center" src="https://drive.google.com/uc?export=view&id=1kGnYKjU8HvKYkpMJFQeAE40iX0ap1X_6" height="200px"><br>
        <p>Bonjour ${user.first_name}, nous sommes heureux de vous annoncer que nous avons bien reçu votre commande comme suit:</p>

        <table>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Nom:</td>
                <td>${user.first_name} ${user.last_name}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Téléphone:</td>
                <td>${user.phone}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Adresse:</td>
                <td>${user.address}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Mode de paiement:</td>
                <td>${user.payment}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Livraison:</td>
                <td>${user.delivery}</td>
            </tr>
        </table>

        <br>

        <table>
            <tr>
                <th style="text-align:left">Produit</th>
                <th style="text-align:center">Qté</th>
                <th style="text-align:right">Prix à l'unité</th>
                <th style="text-align:right; min-width: 80px">Prix Total</th>
            </tr>
            <tr>
                <td colspan="4"><hr/></td>
            </tr>
            ${order_summary}
            <tr>
                <td colspan="4"><hr/></td>
            </tr>
            <tr>
                <td colspan="3" style="text-align:right; font-weight: bold">Montant total (MUR):</td>
                <td style="text-align:right; font-weight: bold">${cart_total.toLocaleString()}</td>
            </tr>
            <tr>
                <td colspan="4"><hr/></td>
            </tr>
            
            
        </table>

        <p>Nos abeilles préparent votre commande et nous vous contacterons bientôt pour la livraison!</p>
        <p>Si vous avez des questions, contactez-nous par e-mail à <a href="mailto:nadimielchamarel@gmail.com">nadimielchamarel@gmail.com</a> ou appelez-nous au <a href="tel:+23052538740">(+230) 52538740</a>.</p>
        <br>
        Restez à l'écoute de Nadi'Miel Chamarel en nous suivant sur nos pages <a href="https://www.facebook.com/NadiMiel/" target="_blank">Facebook</a> et <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">Instagram</a>.
        <br>
        <br>
        <a href="https://www.facebook.com/NadiMiel/" target="_blank" style="text-decoration: none">
        <img src="https://drive.google.com/uc?export=view&id=1D6Ln2ISMAltBoXxjCBMW9uBRI1UJMLYC">
        </a>
        <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">
        <img src="https://drive.google.com/uc?export=view&id=1HHzsuzHZn1KfI0PivoLVvVaVznGb43Vp">
        </a>
    </div>
    </p>`

    let msg_en = `<p>
    <div class='container'>
        <p>Thank you for your order!<p>
        <br>
        <img class="center" src="https://drive.google.com/uc?export=view&id=1kGnYKjU8HvKYkpMJFQeAE40iX0ap1X_6" height="200px"><br>
        <p>Hello ${user.first_name}, we're happy to let you know that we've received your order as follows:</p>

        <table>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Name:</td>
                <td>${user.first_name} ${user.last_name}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Phone:</td>
                <td>${user.phone}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Address:</td>
                <td>${user.address}</td>
            </tr>
            <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Payment mode:</td>
                <td>${user.payment}</td>
            </tr>
             <tr>
                <td style="text-align:left; font-weight: bold; width: 150px">Delivery:</td>
                <td>${user.delivery}</td>
            </tr>
        </table>

        <br>

        <table>
            <tr>
                <th style="text-align:left">Product</th>
                <th style="text-align:center">Qty</th>
                <th style="text-align:right">Unit Price</th>
                <th style="text-align:right; min-width: 80px">Total Price</th>
            </tr>
            <tr>
                <td colspan="4"><hr/></td>
            </tr>
            ${order_summary}
            <tr>
                <td colspan="4"><hr/></td>
            </tr>
            <tr>
                <td colspan="3" style="text-align:right; font-weight: bold">Total amount (MUR):</td>
                <td style="text-align:right; font-weight: bold">${cart_total.toLocaleString()}</td>
            </tr>
            <tr>
                <td colspan="4"><hr/></td>
            </tr>        
        </table>

        <p>Our bees are preparing your order and we will contact you soon for delivery!</p>
        <p>If you have any questions, reply us at <a href="mailto:nadimielchamarel@gmail.com">nadimielchamarel@gmail.com</a> or call us on <a href="tel:+23052538740">(+230) 52538740</a>.</p>
        <br>
        Stay tuned to Nadi'Miel Chamarel by following us on our <a href="https://www.facebook.com/NadiMiel/" target="_blank">Facebook</a> and <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">Instagram</a> pages.
        <br>
        <br>
        <a href="https://www.facebook.com/NadiMiel/" target="_blank" style="text-decoration: none">
        <img src="https://drive.google.com/uc?export=view&id=1D6Ln2ISMAltBoXxjCBMW9uBRI1UJMLYC">
        </a>
        <a href="https://www.instagram.com/nadimiel_chamarel/" target="_blank">
        <img src="https://drive.google.com/uc?export=view&id=1HHzsuzHZn1KfI0PivoLVvVaVznGb43Vp">
        </a>
    </div>
    </p>`

    let order_id = "000000";
    let regex = /^.+@.+\..+$/;

    if (regex.test(user.email)) {
        let info = await transporter.sendMail({
            from: `"Nadi'Miel Chamarel Order" <${no_reply_email}>`,
            to: user.email,
            //cc: ['nadimielchamarel@gmail.com'],
            bcc: ['damien@developers.institute'],
            replyTo: 'nadimielchamarel@gmail.com',
            subject: `Order #${order_id} received [Testing]`, 
            text: "",
            html: msg_fr, 
        });
            console.log(`Email sent to ${user.email} (${user.first_name})`);
    } else{
        console.log(`Error - The email provided is invalid: ${user.email}`);
    }
}


  
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})