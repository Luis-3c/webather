import axios from 'axios';

const APIKEY = "bfa1ede84622419da8d30636232904";
const ENDPOINT = "https://api.weatherapi.com/v1/";

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}
const api = {
    search(text){
        return axios.get(ENDPOINT + `search.json?q=${text}&key=${APIKEY}`, config);
    },
    getCityData(woeid){
        console.log('WOEEIDD: ', woeid)
        return axios.get(ENDPOINT + `forecast.json?q=${woeid}&aqi=no&days=1&key=${APIKEY}`, config);
    }
}

export default api;