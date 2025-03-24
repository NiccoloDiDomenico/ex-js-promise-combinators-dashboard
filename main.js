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
        city: city[0].name,
        country: city[0].country,
        temperature: wheater[0].temperature,
        weather: wheater[0].weather_description,
        airport: airport[0].name
    };

    return result
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));