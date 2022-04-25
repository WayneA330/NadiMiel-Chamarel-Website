const express = require('express'); //Link ejs to css
const app = express();

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

//load css and assets folder
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

app.listen(5001)