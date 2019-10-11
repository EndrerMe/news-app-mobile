<template>
    <view class="weather" ref='weather'>  
        <view class="left-panel panel">
            <text class="date">{{ date | moment("dddd") }}</text>

            <text class="date">
                {{ date | moment("MMMM DD, YYYY") }}
            </text>
            <text class="city">
                {{ location }}
            </text>
            <view class="temp-container">
                <text class="temp">
                {{ temp }}&deg;</text>
                <view class="temp-type">
                    <text class="temp-symbol" v-bind:class="{ active: !isCelsius }" @click='changeTemp("fahrenheit")'>F</text>
                    <text class="temp-symbol"> | </text>
                    <text class="temp-symbol" v-bind:class="{ active: isCelsius }" @click='changeTemp("celsius")'>&#8451</text>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
import weatherService from './../../shared/services/weather.service';

export default {
    name: 'myWeather',
    data() {
        return {
            temp: '',
            location: '',
            date: '',
            coordinates: null,
            isCelsius: true,
        }
    },
    created() {
        this.$getLocation()
        .then(coordinates => {
            this.coordinates = coordinates;
            weatherService.getWeather(coordinates.lat, coordinates.lng).then((res) => {
                this.temp = res.data.main.temp;
                this.temp = this.temp + '';
                this.temp = this.temp.split(".")[0];
                this.location = res.data.name;
                this.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            });
        });
    },
    methods: {
        changeTemp(temp) {
            if (temp === 'fahrenheit') {
                this.isCelsius = false;
                weatherService.getWeather(this.coordinates.lat, this.coordinates.lng).then((res) => {
                    this.temp = res.data.main.temp * 1.8 + 32;
                    this.temp = this.temp + '';
                    this.temp = this.temp.split(".")[0];
                });
            } else {
                this.isCelsius = true;
                weatherService.getWeather(this.coordinates.lat, this.coordinates.lng).then((res) => {
                    this.temp = res.data.main.temp;
                    this.temp = this.temp + '';
                    this.temp = this.temp.split(".")[0];
                });
            }
        }
    }
}
</script>

<style scoped>
    .weather{
       display: flex;
       flex-direction: row;
       margin-top: 10px;
    }

    .date{
        font-size: 22px;
        font-weight: bold;
        color: rgba(0,0,0, 1);
    }

    .city{
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        padding-top: 5px;
        color: rgba(0,0,0, 1);
    }

    .temp{
        font-size: 30px;
        color: rgba(0,0,0, 1);
        font-weight: 100;
    }

    .left-panel {
        text-align: left;
    }

    .active {
        color: blue;
    }

    .temp-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .temp-type {
        display: flex;
        flex-direction: row;
        margin-left: 12px;
    }

    .temp-symbol {
        font-size: 24px;
    }
</style>