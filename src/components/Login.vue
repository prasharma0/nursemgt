<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <img class="logo" src="../assets/nurse.png" />
    <h2> Welcome to Nurse Management </h2>
    <p>Please login or sign up to continue.</p>
    <div class="login">
        <input type="email" v-model="email" placeholder="Enter Email" required />
        <input type="password" v-model="password" placeholder="Enter password" required/>
        <button v-on:click="login" type = "button" v-if="!loading">Login</button>
        <button disabled type="button" v-else>Logging...</button>
        <!-- <button v-on:click="addNurse" type="button" v-if="!loading">Add new Nurse</button> -->
      
        <p>
            Not registered yet? <router-link to = "/signup" >Sign Up</router-link>
        </p> 
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name:'Login',
        data(){
            return{
                email:'',
                password:'',
                loading: false
            }
        },
        methods:{
            async login(){
                this.loading=true;
                let result = await axios.post("http://localhost:5000/api/login",
                {
                  email:this.email,
                  password:this.password
                })
                this.loading = false;

                if(result.status==200){
                    
                    localStorage.setItem("token", result.data.token);
                    
                    localStorage.setItem("user-info", JSON.stringify(result.data.user));
                    this.$router.push({name:'Home'});
                }
                
                
                console.warn(result);
            }
        },
        mounted()
  {
    let user=localStorage.getItem("user-info");
    let token = localStorage.getItem("token");
    if(user && token)
    {
        this.$router.push({name:"Home"});
    }
  } 
    }
</script>