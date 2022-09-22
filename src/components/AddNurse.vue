<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Header />
    <h1>Hello User, Welcome to adding Nurse page</h1>
    <form class="addNurse">
        <input type="text" name="name" placeholder="Enter Name" v-model="nurse.name" />
        <input type="text" name="address" placeholder="Enter Address" v-model="nurse.address"/>
        <input type="text" name="email" placeholder="Enter Email" v-model="nurse.email" />
        <input type="number" name="phone" placeholder="Enter Phone Number" v-model="nurse.phone" />
        <button v-on:click="addNurse" type="button">Add new Nurse</button>
    
    </form>
      
    </template>
    <script>
   
import Header from './Header.vue'
    
    
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name:'AddNurse',
        components:{
            Header
    },
    data()
    {
        return{
            nurse:{
                name:'',
                address: '',
                email:'',
                phone: '',
            }
        }
    },
    methods:{
      async addNurse()
      {
        // console.log(this.nurse);
        const res = await fetch("http://localhost:5000/api/nurse", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
                     },
       body: JSON.stringify(this.nurse),
        

      });
      const result = await res.json();
      if(result)
      {
        this.$router.push({name:'Home'});
      }
      console.log("result",result);

    }
    },
        mounted()
      {
        let user= localStorage.getItem('user-info');
        if(!user)
        {
            this.$router.push({name:'SignUp'});
        }
      }
    }
    </script>