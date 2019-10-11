<template>
    <scroll-view class="sideMenu" :content-container-style="{contentContainer: {
        paddingVertical: 20
    }}">
        <touchable-opacity class="close" @press='closeMenu()'>
            <image class="close-img" :source="require('./../../../assets/x-mark-32.png')" />
        </touchable-opacity>
        <text class="nav-el home" v-bind:class="{ active: currentRoute ===  'Home' }" @press="redirect('Home')">Home</text>
        <text class="nav-el news" @press='showCategories'>News</text>
        <view class="submenu" v-if='isShowCategories'>
            <text class="submenu-item" v-for='cateory of cateories' v-bind:key='"key-" + cateory'
            @press='redirect(cateory)' v-bind:class="{ active: currentRoute ===  cateory }">{{ cateory }}</text>
        </view>
        <text class="nav-el rates" v-bind:class="{ active: currentRoute ===  'ExchangeRates'}" @press="redirect('ExchangeRates')">Exchange Rates</text>
        <text class="nav-el rates" v-bind:class="{ active: currentRoute ===  'Weather' }" @press="redirect('Weather')">Weather</text>
        <myWeather class="my-weather"></myWeather>
    </scroll-view>
</template>

<script>
import myWeather from './../../components/my-weather/my-weather'

export default {
    name: 'sideMenu',
    props: {
        navigation: {
            type: Object
        },
        activeItemKey: String,
    },
    components: {
        myWeather
    },
    data() {
        return {
            currentRoute: 'Home',
            isShowCategories: true,
            cateories: ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'],
            currentScreen: '',
        }
    },
    created() {
        this.test = this.activeItemKey
    },
    methods: {
        showCategories() {
            this.isShowCategories = !this.isShowCategories;
        },

        redirect(redirectTo) {
            for (let i = 0; i < this.cateories.length; i++) {
                if (redirectTo == this.cateories[i]) {
                    this.navigation.navigate({
                        routeName: redirectTo,
                        params: {
                            category: redirectTo
                        },
                    });
                }
            }
            this.navigation.navigate(redirectTo);
            this.currentRoute = redirectTo;
        },

        closeMenu() {
            this.navigation.toggleDrawer();
        }
    }
}
</script>

<style scoped>
    .nav-el {
        margin-top: 10px;
        margin-left: 25px;
        font-size: 24px;
        font-weight: bold;
    }

    .home {
        margin-top: 35%;
    }

    .activeCategory {
        color: red;
        border-bottom-color:#ff9900;
        border-bottom-width: 3px;
    }

    .close {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 35px;
        right: 35px;
        width: 45px;
        height: 45px;
    }

    .close-img {
        width: 25px;
        height: 25px;
    }

    .submenu-item {
        font-size: 18px;
        font-weight: bold;
        margin-top: 7px;
        margin-left: 45px;
    }

    .active {
        background-color: #e3e3e3;
        color: #ff7878;
        width: 85%;
        padding: 5px 0px 5px 0px;
    }

    .my-weather {
        margin-top: 35px;
        margin-left: 25px;
    }
</style>