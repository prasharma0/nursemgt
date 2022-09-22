<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
   <Header />
   <h1>Hello {{name}}, Welcome to Home page</h1>
 
   <table border="1">
     <tr>
       <td>
         Image
       </td>
       <td>
         Name
       </td>
       <td>
         Address
       </td>
       <td>
         Email
       </td>
       <td>
         Phone
       </td>
       <td>
         Actions
       </td>
 
     </tr>
     <tr v-for="item in nurse" :key="item._id">
 
       <td>
         <img :src="item.image" alt="no image of this nurse" width="100" height="100"/>
       </td> 
       <td>{{item.name}}</td>
       <td>{{item.address}}</td>
       <td>{{item.email}}</td>
       <td>{{item.phone}}</td>
       <td><router-link :to=" '/updateNurse/'+item._id">Update</router-link></td>
     </tr>
   </table>
  </div>
 </template>
 <script>
 // import axios from 'axios';
 import Header from './Header.vue'
 // import axios from 'axios';
 
 export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name: 'Home',
   data() {
     return {
 
       name: '',
       nurse: [],
 
     }
   },
   components: {
     Header
   },
   async mounted() {
     let user = localStorage.getItem('user-info');
     this.name = JSON.parse(user).name;
     if (!user) {
       this.$router.push({ name: 'SignUp' });
     }
     let res = await fetch("http://localhost:5000/api/mynurses", {
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       }
     });
     const result = await res.json();
     if (!result.error) {
       console.warn(result.nurses);
 
 
     } else {
       console.warn(result);
     }
     this.nurse = result.nurses;
 
   }
 
 }
 </script>
 
 <style>
   td{
     width:160px;
     height:40px;
   }
 </style>