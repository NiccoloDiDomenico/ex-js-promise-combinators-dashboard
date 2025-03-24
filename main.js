// EX - Dashboard della città
async function getDashboardData(query) {
    const cityPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`).then((resp) => resp.json())
    // console.log(cityPromise);

    const weathersPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`).then((resp) => resp.json())
    // console.log(weathersPromise);

    const airportsPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`).then((resp) => resp.json())
    // console.log(airportsPromise);

    const [city, wheater, airport] = await Promise.all([cityPromise, weathersPromise, airportsPromise])
    // console.log(city, wheater, airport);

    const result = {
        city: city.length > 0 ? city[0].name : null,
        country: city.length > 0 ? city[0].country : null,
        temperature: wheater.length > 0 ? wheater[0].temperature : null,
        weather: wheater.length > 0 ? wheater[0].weather_description : null,
        airport: airport.length > 0 ? airport[0].name : null
    };

    return result;
}

getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        let message = '';
        if (data.city && data.country) {
            message += `${data.city} is in ${data.country}.\n`
        }
        if (data.temperature && data.weather) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }
        if (data.airport) {
            message += `The main airport is ${data.airport}.\n`
        }
        console.log(message);
    })
    .catch(error => console.error(error));