<template>
    <view class="weather">
        <Header :type='"menu"' :title='pageTitle' :navigation='navigation'></Header>
        <view class="widget" ref='widget'>
            <view class="city">
                <view class='city-input'>
                    <text-input @change="changeCity()" v-model='city' type="text" placeholder="London" class="amount"/>
                    <touchable-opacity class="enter-button" :on-press='getWeather("user")'>
                        <text class="button-text">Enter</text>
                    </touchable-opacity>
                </view>
                <text class='hint' v-if='hint !== null' @press='getWeather("hint")'>Did you mean {{ hint }}?</text>
                <text class="wrong"  v-if='isWrong'>Something wrond</text>
            </view>
            <view class="left-panel panel">
                <view class="info">
                    <view class="weather-info" v-if="moreWeather !== null">
                        <text class="info-component"> Country: {{ moreWeather.sys.country }}</text>
                        <text class="info-component"> Min Temperature: {{ moreWeather.main.temp_min }}&deg;</text>
                        <text class="info-component"> Max Temperature: {{ moreWeather.main.temp_max }}&deg;</text>
                        <text class="info-component"> Temperature: {{ moreWeather.main.temp }}&deg;</text>
                        <view class="info-image">
                            <text class="info-component"> weather: {{ moreWeather.weather[0].description }}</text> 
                            <image class="weather-image" :source="{uri: currentWeatherImg}" />
                        </view>
                        <text class="info-component"> Humidity: {{ moreWeather.main.humidity }}</text>
                        <text class="info-component"> Wind Speed: {{ moreWeather.wind.speed }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>  
</template>

<script>
import weatherService from './../../shared/services/weather.service';
// import * as cities from './../../shared/citys/cities.json';
import Header from './../../shared/layouts/header';
import _ from 'lodash'

export default {
    name: 'weather',
    props: {
        navigation: {
            type: Object
        },
    },
    components: {
        Header,
    },
    data() {
        return {
            pageTitle: 'Weather',
            isWrong: false,
            hint: null,
            city: '',
            search: '',
            temp: '',
            userCoutry: 'London',
            currentWeatherImg: '',
            weather: '',
            probablyCountry: 'London',
            moreWeather: null,
            isShowMoreWeather: false,
            isCelsius: true,
            autocomplete: null,            
        }
    },
    created() {
        weatherService.getWeatherByCountry(this.userCoutry).then((res) => {
            this.moreWeather = res.data;
            this.temp = res.data.main.temp;
            this.temp = this.temp + '';
            this.temp = this.temp.split(".")[0];
            this.userCoutry = res.data.name;

            this.currentWeatherImg = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
            this.weather = res.data.weather[0].description
        });
    },
    methods: {
        changeCity() {
            this.temp = this.city
        },
        changecountry:_.debounce(function(event) {
            const value = event.target.value;
            autocompleteService.getDataForAutocomplete(value).then((res) => {
                let fullCountry = res.data.predictions[0].description;
                let country = fullCountry.split(',');
                this.probablyCountry = country[0];
            }, (err) => {
                console.log(err)
            })
        }, 500),

        getWeather(input) {
            let value;
            if (input === 'user') {
                value = this.city;
            } else {
                this.city = this.hint;
                value = this.hint;
            }
            weatherService.getWeatherByCountry(value).then((res) => {
                this.moreWeather = res.data;
                this.temp = res.data.main.temp;
                this.temp = this.temp + '';
                this.temp = this.temp.split(".")[0];
                this.userCoutry = res.data.name;
                
                this.currentWeatherImg = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
                this.weather = res.data.weather[0].description
            });
        },

        changeTemp(temp) {
            let value = this.userCoutry;

            if (temp === 'fahrenheit') {
                this.isCelsius = false;
                weatherService.getWeatherByCountry(value).then((res) => {
                    this.temp = res.data.main.temp * 1.8 + 32;
                    this.temp = this.temp + '';
                    this.temp = this.temp.split(".")[0];
                });
            } else {
                this.isCelsius = true;
                weatherService.getWeatherByCountry(value).then((res) => {
                    this.temp = res.data.main.temp;
                    this.temp = this.temp + '';
                    this.temp = this.temp.split(".")[0];
                });
            }
        },

        showMoreWeather() {
            this.isShowMoreWeather = true;
        },

        closePopup() {
            this.isShowMoreWeather = false;
        },

        setPlace(place) {
            this.userCoutry = place.name;
            this.getWeather();
        },
    },
    watch: {
        city: _.debounce(function(val) {
            // if (val.length > 2 && !val.match(/\s\s+/g)) {
            //     for (let name in cities) {
            //         let cityName = cities[name].name;
            //         try {
            //             if (cityName.indexOf(val) > -1) {
            //                 this.isWrong = false;
            //                 this.hint = cityName;
            //                 return;
            //             }
            //         } catch (error) {
            //             this.isWrong = true;
            //             this.hint = null;
            //         }
            //     }
            // }
        }, 1000)
    }
}
</script>

<style scoped>
    .weather {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .widget {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 75%;
        height: 350px;
        border-top-color: black;
        border-bottom-color: black;
        border-left-color: black;
        border-right-color: black;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
        border-radius: 9px;
        padding: 25px;
        margin-top: 25%;
        z-index: 9;
    }

    .temp {
        display: flex;
        flex-direction: row;
    }

    .city-input {
        display: flex;
        flex-direction: row;
    }

    .enter-button {
        margin-top: 7px;
        margin-left: 15px;
    }

    .button-text {
        font-size: 18px;
    }

    .amount {
        width: 80%;
        border-bottom-color: #cfcfcf;
        border-bottom-width: 1px;
        font-size: 18px;
    }

    .hint {
        margin-top: 10px;
        color: green;
        font-size: 18px;
    }

    .wrong {
        margin-top: 10px;
        color: red;
        font-size: 18px;
    }

    .weather-info {
        margin-top: 10px;
    }

    .weather-text {
        font-size: 18px;
        margin-top: 10px;
    }

    .temp-value {
        font-size: 18px;
        margin-top: 10px;
    }

    .temp-symbol,
    .symbol-line {
        font-size: 18px;
        margin-top: 10px;
    }

    .info-component {
        font-size: 18px;
    }

    .weather-image {
        width: 45px;
        height: 45px;
        margin-left: 5px;
    }

    .info-image {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    /* .showWeather {
        width: 30%;
        background-color: transparent;
        margin-top: 5px;
        border-top-color: black;
        border-bottom-color: black;
        border-left-color: black;
        border-right-color: black;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
    }

    .probablyCountry-container {
        font-size: 14px;
    }

    .probablyCountry {
        color: blue;
    }

    .country {
        margin-top: 15px;
    }

    .widget {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 550px;
        background-color: red;
        border-radius: 9px;
        padding: 25px;
        padding-right: 30px;
        z-index: 9;
    }

    .left-panel {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .more-btn {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }

    .earth-map {
        position: absolute;
        bottom: 15px;
        left: 15px;
        color: rgb(44, 62, 80);;
    }

    .more-popup {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 999;
    }

    .info {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .city {
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-around;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        padding-top: 5px;
        width: 100%;
        color: rgba(0,0,0,0.7);
    }

    .temp {
        display: flex;
        flex-direction: row;
        background-color: black
    }

    .temp,
    .weather-info {
        font-size: 25px;
        color: rgba(0,0,0,0.9);
        font-weight: 100;
    }

    .right-panel {
        position: absolute;
        top: 0;
        right: 0;
    }

    .active {
        color: blue;
    }

    .input-country {
        font-size: 18px;
        width: 65%;
        border-bottom-color: black;
        border-bottom-width: 1px;
    } */

    .active {
        color: blue;
    }
</style>