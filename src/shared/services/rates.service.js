import axios from 'axios';
import {environment} from './../../environment/environment'
 
export default class ratesService {
    static getRates(base) {
        return axios.get(`${environment.ratesApiUrl}base=${base}`)
    }
}