<template>
    <scroll-view :content-container-style="{contentContainer: {
        paddingVertical: 20
    }}">
        <Header :type='"menu"' :title='pageTitle' :navigation='navigation'></Header>
        <view class="rates" ref="rates">
            <view class="container">
                <view class="rates-type">
                    <view class="rates-value">
                        <text-input v-model="possibleAmount" type="number" placeholder="Amount" class="amount"/>
                        <touchable-opacity class="submit-value" @press="changeAmount()">
                            <text>Enter</text>
                        </touchable-opacity>
                    </view>
                    <text class="rates-title"> Exchange rate from </text>
                    <view class="rates-select">
                        <view class="from-container">
                            <text class="from" @press='showCurrency("from")'>{{ currentRate }}</text>
                        </view>
                        <text class="text-to"> to </text>
                        <view class="to-container">
                            <text class="to" @press='showCurrency("to")'>{{ exchangeName }}</text>
                        </view>
                    </view>
                </view>
                <view class="current-rate-container">
                    <text class="current-rate">{{ rateAmount }} {{ currentRate }}: {{ exchangeName }} {{ exchangeTo[0] }}.{{exchangeTo[1]}}</text>
                </view>

                <view class="rates-couples">
                    <view class="couple">
                        <text>EUR/USD = {{ retesCouples.first.usd[0] }}.{{ retesCouples.first.usd[1] }}</text>
                    </view>
                    <view class="couple">
                        <text>USD/JPY = {{ retesCouples.secound.jpy[0] }}.{{ retesCouples.secound.jpy[1] }}</text>
                    </view>
                    <view class="couple">
                        <text>GBP/USD = {{ retesCouples.third.usd[0] }}.{{ retesCouples.third.usd[1] }}</text>
                    </view>
                </view>   
            </view>
        </view>
        <Modal class='modal' :backdrop='false'  position="top" ref="modal">
            <view class="currencys">
                <view v-for="value of ratesName" v-bind:key="'currency-' + value" class="currency">
                    <text class="currency-value" @press='changeRate(value)'>{{ value }}</text>
                </view>
            </view>
        </Modal>
    </scroll-view>
</template>

<script>
import ratesService from './../../shared/services/rates.service'
import Header from './../../shared/layouts/header';
import Modal from 'react-native-modalbox';
import _ from 'lodash'

export default {
    name: 'exchangeRates',
    props: {
        navigation: {
            type: Object
        },
    },
    components: {
        Header,
        Modal
    },
    data() {
            return {
                possibleAmount: null,
                pageTitle: 'Exchange Rates',
                isShowCurrencys: false,
                typeOfCurrency: null,
                amount: null,
                selected: '',
                ratesName: [],
                ratesValue: {},
                currentRate: 'USD',
                currentRateValue: '',
                exchangeTo: '',
                exchangeName: 'EUR',
                rateAmount: 100,
                isLoaderShow: false,
                retesCouples: {
                    first: {
                        eur: this.rateAmount,
                        usd: ''
                    },

                    secound: {
                        usd: this.rateAmount,
                        jpy: '',
                    },

                    third: {
                        gbp: this.rateAmount,
                        usd: '',
                    }
                }
            }
        },
        created() {
            this.isLoaderShow = true;

            ratesService.getRates(this.currentRate).then(res => {
                for (let i in res.data.rates) {
                    this.ratesName.push(i);
                }
                this.ratesValue = res.data.rates;
                this.exchangeTo = this.ratesValue[this.exchangeName] * this.rateAmount;
                this.exchangeTo = this.exchangeTo+'';
                this.exchangeTo = this.exchangeTo.split('.');
                let array = this.exchangeTo[0].split('');
                this.exchangeTo[0] = ''; 
                for (let i = 0; i < array.length; i++) {
                    if (array.length > 3) {
                        if (i % 3 == 0) { 
                            if (i < array.length-1) {
                                array[i] = array[i]+','
                            } else {
                                continue;
                            }
                        }
                    }
                }
                this.exchangeTo[0] = array.join('')
                this.exchangeTo[1] = this.exchangeTo[1].slice(0, 4);
                this.isLoaderShow = false;
            });

            ratesService.getRates('EUR').then((res) => {
                this.retesCouples.first.usd = res.data.rates.USD;
                this.retesCouples.first.usd = this.retesCouples.first.usd + '';
                this.retesCouples.first.usd = this.retesCouples.first.usd.split(".");
                let array = this.retesCouples.first.usd[0].split('');
                this.retesCouples.first.usd[0] = ''; 
                for (let i = 0; i < array.length; i++) {
                    if (array.length > 3) {
                        if (i % 3 == 0) { 
                            if (i < array.length-1) {
                                array[i] = array[i]+','
                            } else {
                                continue;
                            }
                        }
                    }
                }
                this.retesCouples.first.usd[0] = array.join('')
                this.retesCouples.first.usd[1] = this.retesCouples.first.usd[1].slice(0, 4);
            });

            ratesService.getRates('USD').then((res) => {
                this.retesCouples.secound.jpy = res.data.rates.JPY;
                this.retesCouples.secound.jpy = this.retesCouples.secound.jpy + '';
                this.retesCouples.secound.jpy = this.retesCouples.secound.jpy.split(".");
                let array = this.retesCouples.secound.jpy[0].split('');
                this.retesCouples.secound.jpy[0] = ''; 
                for (let i = 0; i < array.length; i++) {
                    if (array.length > 3) {
                        if (i % 3 == 0) { 
                            if (i < array.length-1) {
                                array[i] = array[i]+','
                            } else {
                                continue;
                            }
                        }
                    }
                }
                this.retesCouples.secound.jpy[0] = array.join('')
                this.retesCouples.secound.jpy[1] = this.retesCouples.secound.jpy[1].slice(0, 4);
            });

            ratesService.getRates('GBP').then((res) => {
                this.retesCouples.third.usd = res.data.rates.USD;
                this.retesCouples.third.usd = this.retesCouples.third.usd + '';
                this.retesCouples.third.usd = this.retesCouples.third.usd.split(".");
                let array = this.retesCouples.third.usd[0].split('');
                this.retesCouples.third.usd[0] = ''; 
                for (let i = 0; i < array.length; i++) {
                    if (array.length > 3) {
                        if (i % 3 == 0) { 
                            if (i < array.length-1) {
                                array[i] = array[i]+','
                            } else {
                                continue;
                            }
                        }
                    }
                }
                this.retesCouples.third.usd[0] = array.join('')
                this.retesCouples.third.usd[1] = this.retesCouples.third.usd[1].slice(0, 4);

            });

        },
        methods: {
            showCurrency(type) {
                this.typeOfCurrency = type;
                this.$refs.modal.open()
            },

            hideCurrencys() {
                this.isShowCurrencys = false;
            },

            changeRate(value) {
                if (this.typeOfCurrency === 'from') {
                    this.changeCurrentRate(value)
                } else if (this.typeOfCurrency === 'to') {
                    this.changeRateTo(value);
                }

                this.$refs.modal.close()
            },

            changeCurrentRate(value) {
                this.isLoaderShow = true;
                let target = value;
                this.currentRate = target;
                this.itemValue = ['EUR', 'USD', 'RUB', 'CHF'];

                for (let i = 0; i < this.itemValue.length; i++) {
                    if (this.itemValue[i] === this.currentRate) {
                        this.itemValue.splice(i,1);
                    }
                }

                ratesService.getRates(this.currentRate).then(res => {
                    this.rates = res.data.rates;
                    this.currentRateValue = this.rates[this.currentRate];

                    this.exchangeTo = this.rates[this.exchangeName] * this.rateAmount;
                    this.exchangeTo = this.exchangeTo+'';
                    this.exchangeTo = this.exchangeTo.split('.');
                    let array = this.exchangeTo[0].split('');
                    this.exchangeTo[0] = ''; 
                    for (let i = 0; i < array.length; i++) {
                        if (array.length > 3) {
                            if (i % 3 == 0) { 
                                if (i < array.length-1) {
                                    array[i] = array[i]+','
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                    this.exchangeTo[0] = array.join('')
                    this.exchangeTo[1] = this.exchangeTo[1].slice(0, 4);
                    this.isLoaderShow = false;
                });
            },

            changeRateTo(value) {
                this.isLoaderShow = true;
                let target = value;

                ratesService.getRates(this.currentRate).then(res => {
                    this.rates = res.data.rates;
                    this.exchangeTo = this.rates[target] * this.rateAmount;
                    this.exchangeTo = this.exchangeTo+'';
                    this.exchangeTo = this.exchangeTo.split('.');
                    let array = this.exchangeTo[0].split('');
                    this.exchangeTo[0] = ''; 
                    for (let i = 0; i < array.length; i++) {
                            if (array.length > 3) {
                                if (i % 3 == 0) { 
                                    if (i < array.length-1) {
                                        array[i] = array[i]+','
                                    } else {
                                        continue;
                                    }
                                }
                            }
                    }
                    this.exchangeTo[0] = array.join('')
                    this.exchangeTo[1] = this.exchangeTo[1].slice(0, 4);
                    this.exchangeName = target;
        
                    this.isLoaderShow = false;
                });
            },

            async changeAmount() {
                this.isLoaderShow = true;
                const value = this.possibleAmount;
                this.amount = this.possibleAmount;

                this.rateAmount = value;

                const res = await ratesService.getRates(this.currentRate);

                if (value) {
                    if (this.exchangeTo === 0) {
                        this.exchangeTo = res.data.rates[this.exchangeName]
                        this.exchangeTo = this.exchangeTo * value;
                    } else {
                        this.exchangeTo = res.data.rates[this.exchangeName] * value
                        this.exchangeTo = this.exchangeTo+'';
                        this.exchangeTo = this.exchangeTo.split('.');
                        let array = this.exchangeTo[0].split('');
                        this.exchangeTo[0] = ''; 
                        for (let i = 0; i < array.length; i++) {
                            if (array.length > 3) {
                                if (i % 3 == 0) { 
                                    if (i < array.length-1) {
                                        array[i] = array[i]+','
                                    } else {
                                        continue;
                                    }
                                }
                            }
                        }
                        this.exchangeTo[0] = array.join('')
                        this.exchangeTo[1] = this.exchangeTo[1].slice(0, 4);
                    }
                } else {
                    this.rateAmount = 100;
                    this.exchangeTo = res.data.rates[this.exchangeName] * this.rateAmount;
                    this.exchangeTo = this.exchangeTo+'';
                    this.exchangeTo = this.exchangeTo.split('.');
                    let array = this.exchangeTo[0].split('');
                    this.exchangeTo[0] = ''; 
                    for (let i = 0; i < array.length; i++) {
                        if (array.length > 3) {
                            if (i % 3 == 0) { 
                                if (i < array.length-1) {
                                    array[i] = array[i]+','
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                    this.exchangeTo[0] = array.join('')
                    this.exchangeTo[1] = this.exchangeTo[1].slice(0, 4);
                }
                
                this.rates = res.data.rates;

                for (let item in this.rates) {
                    if (typeof this.rates[item] == 'number') {
                        this.rates[item] = this.rates[item] * value;
                    }
                    continue;
                }
                this.isLoaderShow = false;
            },
        }
}
</script>

<style scoped>
    .rates {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .rates-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%; 
    }

    .rates-title {
        font-size: 22px;
    }

    .rates-select {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .currencys {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        margin-top: 125px;
    }

    .currency {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 55px;
        padding-top: 3px;
        padding-bottom: 3px;
        border-top-color: black;
        border-bottom-color: black;
        border-left-color: black;
        border-right-color: black;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
        border-radius: 25px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 17px;
    }

    .bg-close {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .7);
    }

    .submit-value {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-left: 40px;
        border-top-color: black;
        border-bottom-color: black;
        border-left-color: black;
        border-right-color: black;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
        width: 75px;
        padding: 3px 0px 3px 0px;
    }

    .from,
    .to,
    .text-to {
        font-size: 22px;
    }

    .container {
        background-color: white;
        width: 100%;
        padding: 45px 0px 45px 0px;
    }

    .current-rate-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%; 
        margin-top: 12px;
        font-size: 18px;
    }

    .rates-value {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: rgba(255, 255, 255, .7);
        width: 100%;
        height: 100%;
    }

    .rates-couples {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .couple {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 75px;
        /* border: 1px solid black; */
        border-top-color: black;
        border-bottom-color: black;
        border-left-color: black;
        border-right-color: black;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
        margin: 10px 0 0 10px;
    }

    .rate-items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 35px;
        justify-content: center;
        background-color: #ffffff;
    }

    .rate-item {
        /* border: 1px solid #f0f0f0; */
        border-top-color: #f0f0f0;
        border-bottom-color: #f0f0f0;
        border-left-color: #f0f0f0;
        border-right-color: #f0f0f0;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 1px;
        margin-left: 25px;
        padding: 25px 20px;
        margin-top: 10px;
    }

    .amount {
        /* border: none; */
        width: 90px;
        padding: 2px 5px;
        /* border-bottom: 1px solid #d1d1d1; */
        border-bottom-color: #d1d1d1;
        border-bottom-width: 1px;
    }

    .rate {
        font-size: 27px;
    }

    .wrapper {
        padding-top: 50;
        flex: 1;
    }

    .modal {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
    }
</style>