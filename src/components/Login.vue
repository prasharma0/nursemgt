<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <img class="logo" src="../assets/nurse.png" />
    <h1> Login </h1>
    <div class="login">
        <input type="email" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter password" />
        <button v-on:click="login">Login</button>
        <p>
            <router-link to = "/signup" >Sign Up</router-link>
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
                password:''
            }
        },
        methods:{
            async login(){
                let result = await axios.post("http://localhost:5000/api/login",
                {
                  email:this.email,
                  password:this.password
                })

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