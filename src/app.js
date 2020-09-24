const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const pathToPublic = path.join(__dirname,'../public')
const pathToViews = path.join(__dirname,'../template/views')
const pathToPartials = path.join(__dirname,'../template/partials')


const app = express()

//setup static directory to serve
app.use(express.static(pathToPublic))

//hbs and views code
app.set('view engine','hbs')
app.set('views',pathToViews) //optional, req only if hbs directory name is not views
hbs.registerPartials(pathToPartials)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Aditya'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Kumar Aditya'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'HELP',
        name:'Kumar Aditya'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'enter an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({error:error})
        }   
        forecast(longitude,latitude,(error,forecast)=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                forecast:forecast,
                location:place,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        message:'help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is running')
})