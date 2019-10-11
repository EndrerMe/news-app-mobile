import axios from 'axios';
import {environment} from './../../environment/environment'
 
export default class newsService {
    
    static getData(category, page, someFilter) {
        return axios.get(`${environment.newsApiUrl}top-headlines?category=${category}&pageSize=10&page=${page}&country=us&${someFilter}&apiKey=${environment.newsApiKey}`);
    }
    
    static getTopNews(someFilter) {
        return axios.get(`${environment.newsApiUrl}top-headlines?sources=bbc-news&${someFilter}apiKey=${environment.newsApiKey}`);
    };
    
    static searchByTitle(text) {
        return axios.get(`${environment.newsApiUrl}everything?qInTitle=${text}&apiKey=${environment.newsApiKey}`);
    };
}

