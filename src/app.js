const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const { response } = require('express');

//Define path for Express
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set("view engine","hbs");
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'nitin' 
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'naitik'
    });
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message: 'I am here to help u out',
        title:'Help',
        name:'naitik'
    });
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address',
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                errorMessage:error
            })
        }
        //const location = response.loaction;
        weather(latitude, longitude, (error, forcastdata)=>{
            if(error){
                return res.send({
                    errMessage:error
                })
            }
            return res.send({
                forecast:forcastdata,
                address:req.query.address,
                location,
            })
        })
    })
    
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            err:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404page',{
        err: 'Help article Not Found',
        name:'naitik',
        title:'404'
    })
})

app.get('*',(req, res)=>{
    res.render('404page',{
        err:'Page Not Found',
        name:'naitik',
        title:'404'
    });
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})