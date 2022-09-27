<template>
    <img class="logo" src="../assets/nurse.png" />
    <h2> Welcome to Nurse Management </h2>
    <p>Please login or sign up to continue.</p>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Name" required />
        <input type="email" v-model="email" placeholder="Enter Email" required />
        <input type="password" v-model="password" placeholder="Enter password" required />
        <div>
            <button v-on:click="signUp"  type = "button" v-if="!loading">Sign Up</button>
            <button disabled type="button" v-else>Signing up...</button>
        </div>
       
        <p>
        Go Back to <router-link to = "/login" >Login</router-link>
        </p> 
    </div>
</template>

<script>
    import axios from 'axios'
    import { useToast } from "vue-toastification";

export default {
    name: 'SignUp',
    data() {
        const toast = useToast();
        return {
            name: '',
            email: '',
            password: '',
            loading: false,
            toast
        }
    },
    methods: {
        async signUp() {
            this.loading = true;
            let result = await axios.post("http://localhost:5000/api/register",{
                name: this.name,
                email:this.email,
                password:this.password
            });
            // console.warn(result);
           
            if(result){
                this.toast.success("Sign up successful!");
                this.loading= false;
            }else{
                this.toast.error("Insert the details correctly!")
            }
            
            
            if(result.status==201)
            {

                localStorage.setItem('user-info',JSON.stringify(result.data));
                this.$router.push({name:'Home'});
            }
        }
    },
  mounted()
  {
    let user= localStorage.getItem('user-info');
    if(user)
    {
        this.$router.push({name:'Home'});
    }
  } 
}
</script>
<style>

</style>