const request = require("request");


const geocode = (address,callback) => {
    address = encodeURIComponent(address)
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia21yYWRpIiwiYSI6ImNrZmRhaGl5ZzFoM20yeG9mbjJweHlzcHIifQ.BO1EE4iZM0Q35JLPfkRxBQ&limit=1'
    request({url:url,json:true},(error,response) => {
        if(error)
        {
            callback('Unable to connect, please check your network',undefined)
        }else if(response.body.features.length===0)
        {
            callback('Unable to find the location',undefined)
        }else
        {
            callback(undefined,{
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                place:response.body.features[0].place_name
            })
        }
    })    
}

module.exports = geocode