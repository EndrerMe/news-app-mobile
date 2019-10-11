<template>
    <touchable-opacity class="news" :on-press='goToCurrentNews'>
        <image class="news-img" v-if="news.urlToImage"
        :source="{uri: news.urlToImage}" />
        <image class="news-img"
        :source="require('./../../../assets/image-not-found.png')" v-else />
        <view class="news-info">
            <text class="news-title">{{ news.title }}</text>
            <text class="news-description">{{ news.description }}</text>
            <text class="pablish-date">{{ news.publishedAt | moment("from", "now") }}</text>
            <text @press='shared' class="shared">Shared</text>
        </view>
    </touchable-opacity>
</template>

<script>
import { Share } from 'react-native';
import base64 from 'react-native-base64'

export default {
    name: 'newsCard',
    props: {
        navigation: {
            type: Object
        },
        sendedNews: Object,
    },
    data() {
        return {
            news: {
                urlToImage: '',
                title: '',
                description: '',
                isImageForbidden: false,
            }
        }
    },
    mounted() {
        if (this.sendedNews) {
            this.news = this.sendedNews;
        }
    },
    created() {
        this.news = this.sendedNews;
    },
    methods: {
        goToCurrentNews() {
            this.navigation.push('currentNews', {news: this.news})
        },

        shared() {
            const img = this.news.urlToImage;
            const encode = base64.encode(img)
            Share.share({
                message: this.news.title + '\n' + 'data:image,' + img,
            })
        }
    }
}
</script>

<style scoped>
    .news {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 55px;
        padding-bottom: 45px;
        border-bottom-width: 1px;
        border-bottom-color: #f0f0f0;
        padding: 5px;
        background-color: #ffffff;
    }

    .news-img {
        width: 100%;
        height: 320px;
    }

    .news-title {
        font-size: 23;
    }

    .news-description {
        font-size: 16;
        margin-top: 15px;
    }

    .shared {
        position: absolute;
        bottom: 0;
        left: -10px;
    }

    .subscribe {
        position: absolute;
        bottom: 3.8em;
        left: 0;
        font-size: 14px;
        /* cursor: pointer; */
    }

    .social {
        width: 20px;
        margin-left: 10px;
        /* cursor: pointer; */
    }

    .news-info {
        position: relative;
        width: 100%;
        margin: 0 10px 0 10px;
    }

    /* .btn-read {
        position: absolute;
        display: block;
        width: 6vw;
        padding: 5px;
        bottom: 0;
        right: 0;
        background-color: transparent;
        outline: none;
        border: 1px solid #d1d1d1;
        cursor: pointer;
        transition: .3s;
        margin-top: 5%;
        text-decoration: none;
        color: black;
        font-size: 1.3vw;
        margin-left: 60%;
        border-radius: 25px;
        margin-top: 10%;
    }

    .btn-read:hover {
        background-color: #f0f0f0;
    } */

    .pablish-date {
        position: absolute;
        bottom: -35px;
        left: 0;
        font-size: 14px;
    }

    .shared {
        position: absolute;
        bottom: -35px;
        right: 0;
        font-size: 14px;
    }
</style>