<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
html,
body,
#app {
    margin: 0;
    padding: 0;
    height: 100%;
    min-width: 1366px;
}
@media screen and (max-width: 1200px) {
  body,
  html {
    font-size: 15px;
  }
}
@media screen and (max-width: 992px) {
  body,
  html {
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  body,
  html {
    font-size: 13px;
  }
}
@media screen and (max-width: 576px) {
  body,
  html {
    font-size: 12px;
  }
}
@media screen and (max-width: 400px) {
  body,
  html {
    font-size: 11px;
  }
}
</style>
