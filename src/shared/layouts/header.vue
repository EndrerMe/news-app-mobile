<template>
    <view class="header">
        <touchable-opacity v-if='type === "back"' class="back btn-container" :on-press="goBack">
            <image class="back-img"
            :source="require('./../../../assets/left-arrow.png')" />
        </touchable-opacity>
        <touchable-opacity v-if='type === "menu"' class="menu btn-container" :on-press="openMenu">
            <view class="menu-btn top"></view>
            <view class="menu-btn center"></view>
            <view class="menu-btn bottom"></view>
        </touchable-opacity>
        <text class='pageTitle'>{{ title }}</text>
    </view>
</template>

<script>
export default {    
    name: 'Header',
    props: {
        navigation: {
            type: Object
        },
        title: String,
        type: String,
    },
    data() {
        return {
        }
    },
    methods: {
        openMenu() {
            this.navigation.toggleDrawer();
        },

        goBack() {
            this.navigation.goBack();
        }
    }
}
</script>

<style scoped>
    .header {
        display: flex;
        position: relative;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 75px; 
        background-color: #ffffff;
        border-bottom-color: #cfcfcf;
        border-bottom-width: 1px;
        z-index: 1;
    }

    .pageTitle {
        font-size: 28px;
        margin-top: 30px;
    }

    .btn-container {
        position: absolute;
        height: 100%;
        width: 15%;
        left: 0;
    }

    .menu-btn {
        position: absolute;
        width: 25px;
        height: 3px;
        bottom: 23px;
        left: 15px;
        background-color: black;
    }

    .top {
        bottom: 30px;
    }

    .bottom {
        bottom: 16px;
    }
    
    .back-img {
        margin-top: 45%;
        margin-left: 5%;
    }
</style>