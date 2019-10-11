<template>
  <view class="container">
    <app-navigator class="main-container">
    </app-navigator>
  </view>
</template>

<script>
import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
} from "vue-native-router";
import Home from "./pages/home/home";
import News from './pages/news/news';
import sideMenu from './shared/components/side-menu';
import currentNews from './pages/current-news/current-news';
import Header from './shared/layouts/header'
import exchangeRates from './pages/exchange-rates/exchange-rates';
import weather from './pages/weather/weather';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      defaultNavigationOptions: {
        drawerLabel: 'Videos',
      },
    },
    Health: News,
    Business: News,
    Entertainment: News,
    General: News,
    Science: News,
    Sports: News,
    Technology: News,
    currentNews: currentNews,
    ExchangeRates: exchangeRates,
    Weather: weather,
    header: Header,
  },
  {
    gesturesEnabled: false,
    contentComponent: sideMenu,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
          marginVertical: 0,
      },
      iconContainerStyle: {
          opacity: 1
      }
    }
    
  }
);

const StackNavigator = createStackNavigator(
  {
    Drawer: DrawerNavigator,
    Home: Home,
    Health: News,
    Business: News,
    Entertainment: News,
    General: News,
    Science: News,
    Sports: News,
    Technology: News,
    currentNews: currentNews,
    ExchangeRates: exchangeRates,
    Weather: weather,
  },
  {
    headerMode: 'none',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
    name: 'navigation',
    components: { 
      AppNavigator ,
      Header,
    },
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }

  .main-container {
    position: relative;
    z-index: 2;
  }
</style>