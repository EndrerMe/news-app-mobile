<template>
    <scroll-view :content-container-style="{contentContainer: {
        paddingVertical: 20
    }}" class="news" @press='goToCurrentNews'>
        <Header class="header" :type='"back"' :navigation='navigation'></Header>
        <image class="news-img" v-if="currentNews.urlToImage"
        :source="{uri: currentNews.urlToImage}" />
        <image class="news-img"
        :source="require('./../../../assets/image-not-found.png')" v-else />
        <view class="news-info">
            <text class="news-title">{{ currentNews.title }}</text>
            <text class="news-description">{{ currentNews.content }}</text>
            <text class="pablish-date">{{ currentNews.publishedAt | moment("from", "now") }}</text>
            <text @press='shared' class="shared">Shared</text>
        </view>
    </scroll-view>
</template>

<script>
import Header from './../../shared/layouts/header';
import {Share} from 'react-native';
import base64 from 'react-native-base64'

export default {
    name: 'currentNews',
    props: {
        navigation: {
            type: Object
        }
    },
    components: {
        Header
    },
    data() {
        return {
            currentNews: {
                urlToImage: '',
                title: '',
                content: ''
            },
        }
    },
    created() {
        if (this.navigation.getParam('news')) {
            this.currentNews = this.navigation.getParam('news');
        }
    },
    methods: {
        shared() {
            const img = this.currentNews.urlToImage;
            Share.share({
                message: this.currentNews.title + '\n' + img,
            })
        }
    }
}
</script>

<style scoped>
    .news {
        position: relative;
        width: 95%;
        margin-left: 2.5%;
        margin-top: 5%;
    }

    .news-info {
        background-color: #ffffff;
        padding-bottom: 45px;
    }

    .news-img {
        width: 100%;
        height: 320px;
    }

    .news-title {
        margin-top: 25px;
        font-size: 27px;
    }

    .news-description {
        margin-top: 25px;
        font-size: 18px;
    }

    .pablish-date {
        position: absolute;
        bottom: 5px;
        left: 0;
        font-size: 14px;
    }

    .shared {
        position: absolute;
        bottom: 5px;
        right: 0;
        font-size: 14px;
    }
</style>