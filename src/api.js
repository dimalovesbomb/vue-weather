const Api = {
    yandex: {
        url: 'https://geocode-maps.yandex.ru/1.x/',
        apikey: '0aa5a112-1461-4070-ae3d-31b73d94583c',
        kind: 'locality',
        lang: 'ru_RU',
        format: 'json'
    },
    weathermap: {
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        appId: '09e9879c47b2100b6e33141332699804',
        exclude: 'current,minutely,hourly,alerts',
        units: 'metric',
        lang: 'ru'
    }
};

export default Api;