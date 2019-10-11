<template>
    <view class="carousel-container">
        <touchable-opacity class="previos-img controll-btn" @press="changeSlide('previos')">
            <image :source="require('./../../../assets/left-arrow.png')" />
        </touchable-opacity>
        <touchable-opacity class="slide" v-for='slide of news' @press='goToCurrentNews(slide)' v-bind:key='"key-" + slide.title' v-if='slideNumber === slide.id'>
            <image class="news-img" 
            :source="{uri: slide.urlToImage}" />
            <view class="title-container">
                <text class="news-title">{{ slide.title }}</text>
            </view>
        </touchable-opacity>
        <touchable-opacity class="next-img controll-btn" @press="changeSlide('next')">
            <image :source="require('./../../../assets/right-arrow.png')" />
        </touchable-opacity>
    </view>
</template>

<script>
export default {
    name: 'Carousel',
    props: {
        news: Array,
        slideNumber: Number,
        navigation: {
            type: Object
        },
    },
    methods: {
        changeSlide(type) {
            if (type === 'next') {
                if (this.slideNumber === 2) {
                    this.$emit('changeSlide', 0);
                } else {
                    this.$emit('changeSlide', this.slideNumber+=1);
                }
            } 
            else if (type === 'previos') {
                if (this.slideNumber === 0) {
                    this.$emit('changeSlide', 2);
                } else {
                    this.$emit('changeSlide', this.slideNumber-=1);
                }
            }
        },

        goToCurrentNews(slide) {
            this.navigation.push('currentNews', {news: slide})
        }
    }
}
</script>

<style scoped>
    .carousel-container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 320px;
        margin-top: 25px;
    }

    .news-img {
        width: 97%;
        height: 320px;
        margin-left: 1.5%;
    }

    .title-container {
        position: absolute;
        top: 10%;
        left: 5%;
        width: 75%;
    }

    .news-title {
        font-size: 22px;
        color: white;
        font-weight: bold;
    }

    .controll-btn {
        position: absolute;
        z-index: 99;
    }

    .previos-img {
        top: 45%;
        left: 5%;
    }

    .next-img {
        top: 45%;
        right: 5%;
    }
</style>