<template>
<router-view />
</template>

<script>


export default {
  name: 'App',
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
body {
  padding: 0;
  margin:0;
}
.logo {
    width: 100px;
}

.register input, .login input, .addNurse input[type='text'], input[type='number'] {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    border: 1px solid rgb(41, 45, 47);
}

.register button, .login button, .addNurse button {
    width: 320px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgb(41, 45, 47);
    background: rgb(21, 29, 32);
    color: #fff;
    cursor: pointer;
}

.file {
  display: block;
  margin-left: 600px;
  margin-bottom: 30px;
}
</style>
