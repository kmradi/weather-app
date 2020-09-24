const request = require('request')

const forecast = (longitude,latitude,callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=ad5c568049905b1c685ee7e11c06abf5&query='+latitude+','+longitude
    request({url:url,json:true}, (error,response) => {
        if(error)
        {
            callback('unable to connect, check your network',undefined)
        }
        else if(response.body.error)
        {
            callback('Location not found',undefined)
        }
        else
        {
            const temp = response.body.current.temperature
            const feel = response.body.current.feelslike
            const weather = response.body.current.weather_descriptions[0]

            callback(undefined,'weather is '+weather+'\nTemperature is '+temp+'\n feels like '+feel)
        }
    })    
}

module.exports = forecast