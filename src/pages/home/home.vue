<template>
    <view class='home'>
        <Header :type='"menu"' :title='pageTitle' :navigation='navigation'></Header>
        <scroll-view :content-container-style="{contentContainer: {paddingVertical: 20}}">
            <Carousel @changeSlide='changeSlide' :news='slides' :slideNumber='currentSlide' :navigation='navigation'></Carousel>
            <newsCard v-for='currentNews of news' v-bind:key='"key-" + currentNews.title' :sendedNews='currentNews' :navigation='navigation'></newsCard>
        </scroll-view>
    </view>
</template>

<script>
import newsService from './../../shared/services/news.service';
import newsCard from './../../components/news-card/news-card';
import Header from './../../shared/layouts/header';
import Carousel from './../../components/carousel/carousel';

export default {
    props: {
        navigation: {
            type: Object
        },
    },
    components: {
        newsCard,
        Header,
        Carousel,
    },
    name: 'Home',
    data() {
        return {
            news: [],
            pageTitle: 'Home',
            slides: [],
            currentSlide: 0,
            timer: null,
        }
    },
    created() {
        newsService.getTopNews('pageSize=6&').then((res) => {
            this.news = res.data.articles
            for (let i = 0; i < 3; i++) {
                this.slides.push(this.news[i]);
                this.slides[i].id = i;
            }
            this.isOverRequest = false;
        }, (err) => {
            this.isOverRequest = true;
        })

        this.timer = setInterval(() => {
            this.currentSlide+=1

            if (this.currentSlide > 2) {
                this.currentSlide = 0;
            }
        }, 4500)
    },
    methods: {
        changeSlide(type) {
            clearInterval(this.timer);
            this.currentSlide = type;
            this.timer = setInterval(() => {
                this.currentSlide+=1

                if (this.currentSlide > 2) {
                    this.currentSlide = 0;
                }
            }, 4500)
        }
    }
}
</script>

<style scoped>
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 55px;
    }

    .page-title {
        font-size: 28px;
    }
</style>