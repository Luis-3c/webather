import axios from 'axios';

const ENDPOINT = " https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}
const api = {
    search(text){
        return axios.get(ENDPOINT + 'search/?query='+text, config);
    },
    getCityData(woeid){
        return axios.get(ENDPOINT + 'location/' + woeid, config);
    }
}

export default api;