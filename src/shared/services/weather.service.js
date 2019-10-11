import axios from 'axios';
import {environment} from './../../environment/environment'
 
export default class weatherService {
    static getWeather(lat, lon, country) {
        return axios.get(`${environment.weatherApiUrl}lat=${lat}&lon=${lon}${environment.weatherApiKey}&units=metric`);
    };

    static getWeatherByCountry(country) {
        return axios.get(`${environment.weatherApiUrl}q=${country}&${environment.weatherApiKey}&units=metric`);
    }
}