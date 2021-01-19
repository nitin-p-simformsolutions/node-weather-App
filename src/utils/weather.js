const request = require('postman-request');

//const weatherUrl = 'http://api.weatherstack.com/current?access_key=4d5a3ee91b3fce3f97b95499ece13803&query=37.8267,-122.4233';

const weather = (latitude, longitude, callback)=>{
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=4d5a3ee91b3fce3f97b95499ece13803&query='+latitude+','+longitude+'&units=f';
    request({url: weatherUrl, json:true}, (error, response)=>{
        if(error){
            callback('Unable to locate weather services')
        }else if(response.body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, `It is ${response.body.current.temperature} and feels like ${response.body.current.feelslike}`)
        }
    })
}

module.exports = weather;






// request({url:weatherUrl, json:true},(error,response)=>{
//     //console.log(response)
//     if(error){
//         console.log('Unable to locate weather services');
//     }else if(response.body.error){
//         console.log('Unable to find location');
//     }else{
//         const data = response.body;
//         console.log(`It is ${data.current.temperature} and feels like ${data.current.feelslike}`);
//     }
//  })

// const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/gujarat.json?access_token=pk.eyJ1Ijoibml0aW5wYWwiLCJhIjoiY2tqeHlwZmcxMHg1ejJwbGNuZ3hmaHJxdCJ9.N66G4meyFIAwABI7KROTlA&limit=1'
// request({url:geocodingUrl, json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to get Geocoding Service');
//     }
//     else if(response.body.features.length === 0){
//         console.log('Unable to find location');
//     }else{
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(`longitude is ${latitude} and latitude is ${longitude}`);
//     }
// })
