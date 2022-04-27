const express = require('express'); //Link ejs to css
const app = express();

//Database
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Living@123',
        database: 'Nadimiel-Database',
        port: 5432
    }
});

app.set("db", db);


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


app.get('/product_description', function(req, res){
    res.render('product_description', {title: 'Product description'}); //Name of the file is products
   
})

app.get('/products', function(req, res){
    db
    .select().from('product').then(function(data){
        res.render('products', {title: 'Products', productMenu: data});
    })
    
})

app.get('/recipe', function(req, res){
    db
    .select().from('recipe').then(function(data){
        res.render('recipe', {'title': 'Recipes', 'recipeMenu': data});
        
    })
   
   
})



app.get('/recipe_details/:recipe_id', function(req, res){
    db
    .select().from('recipe')
    .where({'recipe_id': `${req.params.recipe_id}`})
    .then(function(data){
        res.render('recipe_details', {'title': 'Recipes', 'recipeMenu': data});
        
    })
    
})



app.get('/admin', function(req, res){
    res.render('admin', {title: 'Administrator'}); //Name of the file is products
    console.log('Listening to the server on http://localhost:5000/Admin')
})

app.listen(5001)