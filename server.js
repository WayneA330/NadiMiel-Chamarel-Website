const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'waynecelestin',
        password: 'root',
        database: 'Nadimiel-Database',
        port: 5432
    }
});

app.set('db', db);



//Database
let menu = [
    {
        name: "Margarita",
        price: 10,
        ingredients: ["Tomato Sauce", "Mozzarella", "Basil"]
    },
    {
        name: "Bianca",
        price: 13,
        ingredients: ["Ricotta", "Mozzarella", "Garlic"]
    }, 
    {
        name: "Etna",
        price: 14,
        ingredients: ["Tomato sauce", "Mozzarella", "Anchovies", "Capers", "Olives"]
    },
    {
        name: "Etna",
        price: 14,
        ingredients: ["Tomato sauce", "Mozzarella", "Anchovies", "Capers", "Olives"]
    }
]


// sets EJS as the view engine for the Express application
app.set('view engine', 'ejs');

// load css and assets folder
// app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('js'));



app.get('/', function(req, res){
    res.render('index', {title: 'Home'}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Home')
})

app.get('/orders', function(req, res){
    res.render('orders', {title: 'Orders'}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Orders')
})

app.get('/products', function(req, res){
    res.render('products', {title: 'Products', productMenu: menu}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Product')
})

app.get('/recipe', function(req, res){
    res.render('recipe', {title: 'Recipes'}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Recipe')
})

app.get('/admin', function(req, res){
    res.render('admin', {title: 'Administrator'}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Admin')
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


app.listen(5001);