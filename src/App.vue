<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    saveState() {
      if (this.$store.state.userInfo) {
        sessionStorage.setItem(
          "state",
          JSON.stringify(this.$store.state.userInfo)
        );
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul,ol{
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
