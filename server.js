const express = require('express');
const app = express();
const localStorage = require('localStorage');
const bodyParser = require("body-parser");
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
// app.use(express.static('./images'));
// app.use(express.static('./css'));
// app.use(express.static('./js'));
app.use(express.static('public'));


app.get('/', function(req, res){
    res.render('index', {title: 'Home'});
})


app.get('/orders', function(req, res){
    res.render('checkout', {title: 'Add to Cart'});
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

app.get('/products', function(req, res){
    db
    .select().from('product').then(function(data){
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

app.get('/admin', function(req, res){
    db
    .select().from('customer')
    .then(function(customers) {
        db.select().from('product')
        .then(function(products) {
            res.render('admin', {title: 'Admin', customerLists: customers, productLists: products});
        })
    })
})

// Add products in database
app.post('/add-product', function(req, res) {
    console.log('Product has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    db('product')
        .insert({ product_name_fr : data.product_name_fr, product_name_eng : data.product_name_eng, product_description_fr : data.product_description_fr, product_description_eng : data.product_description_eng, unit_in_stock : data.unit_in_stock, picture : data.picture, unit : data.unit, category : data.category, price : data.price }, ['*'])
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

    // console.log(data.picture);

    db('product')
        .where('product_id', data.product_id)
        .update({ product_name_fr : data.product_name_fr, product_name_eng : data.product_name_eng, product_description_fr : data.product_description_fr, product_description_eng : data.product_description_eng, unit_in_stock : data.unit_in_stock, picture : data.picture, unit : data.unit, category : data.category, price : data.price }, ['*'])
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
    console.log('Product has been received');

    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    db('customer')
        .insert({ first_name : data.first_name, last_name : data.last_name, email : data.email, phone : data.phone, address : data.address}, ['*'])
        .then(res.send('Product inserted in database'))
        .catch(err => {
            console.log('Request Failed:', err);
        });
})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})
