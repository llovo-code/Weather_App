const argv = require('yargs').options({
    address: {
        alias: 'a',
        description: 'Address city for get weather',
        demand: true
    }
}).argv;

//console.log('', argv.address);


const weather = require('./weather/weather')

// weather.GetWeather(argv.address)
//     .then(console.log)
//     .catch(err =>{
//         console.log('',err.data)
//     })

console.log(`${weather.GetIdCity(argv.address)}`);