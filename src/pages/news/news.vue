<template>
    <view>
        <Header :type='"menu"' :title='category' :navigation='navigation'></Header>
        <scroll-view ref='scroll'>
            <view class="news-content">
                <touchable-opacity class="load-more" @press='loadPrevios()' v-if='pageNumber !== 1'>
                    <text class="load-more-title">Load Previos...</text>
                </touchable-opacity>
                <newsCard v-for='news of currentNews' v-bind:key="'ket-' + news.title" :sendedNews='news' :navigation='navigation'></newsCard>
                <touchable-opacity class="load-more" @press='loadMore()' v-if='currentNews'>
                    <text class="load-more-title">Load More...</text>
                </touchable-opacity>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import newsService from './../../shared/services/news.service';
import newsCard from './../../components/news-card/news-card';
import Header from './../../shared/layouts/header';

export default {
    name: 'News',
    props: {
        navigation: {
            type: Object
        },
    },
    components: {
        newsCard,
        Header
    },
    data() {
        return {
            position: {},
            currentNews: null,
            category: 'Health',
            pageNumber: 1,
        }
    },
    mounted() {

    },
    created() {
        if (this.navigation.getParam('category')) {
            this.test = this.navigation.getParam('category');
            this.category = this.navigation.getParam('category');
        }
        newsService.getData(this.category, this.pageNumber).then((res) => {
            this.currentNews = res.data.articles;
        })
    },
    methods: {
        loadMore() {
            this.pageNumber += 1;
            newsService.getData(this.category, this.pageNumber).then((res) => {
                this.currentNews = res.data.articles;
            })

            this.$refs.scroll.scrollTo({x: 0, y: 0, animated: true});
        },

        loadPrevios() {
            this.pageNumber -= 1;
            newsService.getData(this.category, this.pageNumber).then((res) => {
                this.currentNews = res.data.articles;
            })
        },
        scroll(el) {
            // window.onscroll = () => {
            //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            //     this.test = bottomOfWindow
            //     if (bottomOfWindow) {
            //         this.isLoaderShow = true;
            //         newsService.getData(this.category, this.page).then(res => {
            //             for (let i = 0; i < res.data.articles.length; i++) {
            //                 this.currentNews.push(res.data.articles[i]);
            //             }
            //             this.isLoaderShow = false;
            //             this.isOverRequest = false
            //         }, (err) => {
            //             if (err) {
            //                 this.isOverRequest = true
            //                 this.isLoaderShow = false;
            //             }
            //         });

            //         this.page += 1;
            //     }
            // }
        },
    },
    watch: {
        position: () => {
            this.test = this.position
        }
    }
}
</script>

<style scoped>
    .news-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 125px;
    }

    .load-more {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 35px;
        border-top-color: #000000;
        border-left-color: #000000;
        border-right-color: #000000;
        border-bottom-color: #000000;
        border-top-width: 2px;
        border-right-width: 2px;
        border-left-width: 2px;
        border-bottom-width: 2px;
        padding: 5px 15px 5px 15px;
    }

    .load-more-title {
        color: #000000;
        font-size: 24px;
        font-weight: bold;
    }
</style>