
const axios = require('axios').default;


let datarequest = {
    API_CURRENT_URL: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: '82f5f82c803069ca8ce8b88c123615c2',
    LOCATION_CODE: '',
    UNITS: defaults = 'metric',
    FULL_API_URL: function () {
        return `${this.API_CURRENT_URL}?id=${this.LOCATION_CODE}&appid=${this.API_KEY}&units=${this.UNITS}&lang=es`;
    }
}

let cities = [];

const GetIdCity = (address) => {
    cities = require('../city.list.json');
    //cities = cities.Parser(cities);
    let locatios = cities.filter(c => {
        return c.name.toUpperCase().indexOf(address.toUpperCase()) > -1
    });

    //console.log(locatios);
   // chooseCity(locatios);


    let idcity = chooseCity(locatios); /*cities.findIndex(c => {
        return c.name.toUpperCase() === address.toUpperCase()
    });
*/
    if (idcity > 0) {
        //console.log(``, cities[idcity].id);
        return cities[idcity].id;
    } else {
        return -1;
    }

};


const chooseCity = (city) => {
    //const prompt = require('prompt')
    console.log('Ciudades Encontradas');
    for (var i = 0; i < city.length; i++) {
        console.log(`${(i + 1)} - Country  ${city[i].country} , Name : ${city[i].name}`)
    }
    // var ci = prompt.prompt("Elige tu Ciudad: ", '');

    console.log("Elige tu Ciudad: ");

    process.stdin.setEncoding('utf8');
    var d,id;
    process.stdin.on('readable', function () {
        d = process.stdin.read();
        if (d !== null) {
            id = city[parseInt(d)-1].id;
            console.log("Numero",parseInt(d));
            console.log('DATA', city[parseInt(d)-1]);
            console.log('ID', id);
            process.exit();
        }
    });
    return id;

}

//`${this.API_CURRENT_URL}?id=${this.LOCATION_CODE}&appid=${this.API_KEY}&units=${this.UNITS}&lang=es`
//this.API_CURRENT_URL+'?id='+this.LOCATION_CODE+'&appid='+this.API_KEY+'&units='+this.UNITS+'&lang=es'

const GetWeather = async (location) => {

    try {
        datarequest.LOCATION_CODE = GetIdCity(location)
        //console.log('',datarequest.FULL_API_URL())
        let respt = await axios.get(datarequest.FULL_API_URL());

        return `La temperatura para la ciudad de ${location} es de ${respt.data.main.temp}`;

    } catch (e) {
        return `Error!!! No se puede Obtener la temperatura para la Ciudad de ${location} `;
    }
}

module.exports = {
    GetWeather,
    GetIdCity
}