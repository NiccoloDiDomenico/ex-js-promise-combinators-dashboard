// EX - Dashboard della città
// async function getDashboardData(query) {
//     try {
//         const cityPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`).then((resp) => resp.json())
//         // console.log(cityPromise);

//         const weathersPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`).then((resp) => resp.json())
//         // console.log(weathersPromise);

//         const airportsPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`).then((resp) => resp.json())
//         // console.log(airportsPromise);

//         const [city, wheater, airport] = await Promise.all([cityPromise, weathersPromise, airportsPromise])
//         // console.log([city, wheater, airport]);

//         const result = {
//             city: city[0]?.name ?? null,
//             country: city[0]?.country ?? null,
//             temperature: wheater[0]?.temperature ?? null,
//             weather: wheater[0]?.weather_description ?? null,
//             airport: airport[0]?.name ?? null
//         };

//         return result;
//     } catch (error) {
//         throw new Error(`Errore nel recupero dei dati: ${error.message}`)
//     }
// }

// getDashboardData('paris')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         let message = '';
//         if (data.city && data.country) {
//             message += `${data.city} is in ${data.country}.\n`
//         }
//         if (data.temperature && data.weather) {
//             message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
//         }
//         if (data.airport) {
//             message += `The main airport is ${data.airport}.\n`
//         }
//         console.log(message);
//     })
//     .catch(error => console.error(error));


// Bonus 2 - Promise.allSettled()
async function getDashboardData(query) {
    try {
        const cityPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`).then((resp) => resp.json())
        // console.log(cityPromise);

        const weathersPromise = fetch(`https://www.meteofittizio.it`).then((resp) => resp.json())
        // console.log(weathersPromise);

        const airportsPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`).then((resp) => resp.json())
        // console.log(airportsPromise);

        const [cityResult, weathersResult, airportsResult] = await Promise.allSettled([cityPromise, weathersPromise, airportsPromise])
        // console.log([cityResult, weathersResult, airportsResult]);

        const data = {};

        if (cityResult.status === "fulfilled") {
            const city = cityResult.value[0];
            data.city = city ? city.name : null;
            data.country = city ? city.country : null
        } else {
            console.error(`Errore nel city fetch: ${cityResult.reason}`)
            data.city = null;
            data.country = null;
        }

        if (weathersResult.status === "fulfilled") {
            const weather = weathersResult.value[0]
            data.temperature = weather ? weather.temperature : null;
            data.weather = weather ? weather.weather_description : null;
        } else {
            console.error(`Errore nel weather fetch: ${weathersResult.reason}`)
            data.temperature = null;
            data.weather = null;
        }

        if (airportsResult.status === "fulfilled") {
            const airport = airportsResult.value[0]
            data.airport = airport ? airport.name : null;
        } else {
            console.error(`Errore nel airport fetch: ${airportsResult.reason}`)
            data.airport = null;
        }

        return data;
    } catch (error) {
        throw new Error(`Errore nel recupero dei dati: ${error.message}`)
    }
}

getDashboardData('london')
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