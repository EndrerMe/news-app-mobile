<template>
  <view class="container">
    <app-loading v-if="!isAppReady"> </app-loading>
    <navigation :permission='notificationPermission' v-if="isAppReady"></navigation>
  </view>
</template>

<script>
import navigation from './src/router';
import Vue from "vue-native-core";
import VueMoment from 'vue-moment';
import { StackNavigator } from "vue-native-router";
import { VueNativeBase } from "native-base";
import { AppLoading } from "expo";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueNativeBase);
Vue.use(Autocomplete);
Vue.use(VueMoment);
Vue.use(VueGeolocation);

export default {
  components: { navigation, AppLoading },
  data: function() {
    return {
      isAppReady: false,
      notificationPermission: null,
    };
  },
  created: function() {
    this.loadFonts();
  },
  methods: {
    loadFonts: async function() {
      try {
        this.isAppReady = false;
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.isAppReady = true;
      } catch (error) {
        console.log("some error occured", error);
        this.isAppReady = true;
      }
    }
  }
};
</script>

<style scoped>

</style>