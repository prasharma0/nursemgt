<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header />
    <h1>Hello {{ name }}, Welcome to Dashboard</h1>
    <a-table :columns="columns" :data-source="nurse" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <img
            :src="record.image"
            alt="no image of this nurse"
            width="100"
            height="100"
          />
        </template>
        <template v-if="column.key === 'action'">
          <router-link :to="'/updateNurse/' + record._id">Update</router-link>
          <button v-on:click="deleteNurse(record._id)">Delete</button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
// import axios from 'axios';
import Header from "./Header.vue";
// import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        align: "center",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        align: "center",
      },
      {
        title: "Email",
        key: "email",
        dataIndex: "email",
        align: "center",
      },
      {
        title: "Phone",
        key: "phone",
        dataIndex: "phone",
        align: "center",
      },
      {
        title: "Actions",
        key: "action",
        align: "center",
      },
    ];
    return {
      name: "",
      nurse: [],
      columns,
    };
  },
  components: {
    Header,
  },
  methods:{
    async deleteNurse(id)
    {
      const res = await fetch(`http://localhost:5000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }); 
        await res.json();
        this.loadData();
    },
   async loadData(){

    let user = localStorage.getItem("user-info");
    this.name = JSON.parse(user).name;
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    let res = await fetch("http://localhost:5000/api/mynurses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (!result.error) {
      console.warn(result.nurses);
    } else {
      console.warn(result.nurses);
    }
    this.nurse = result.nurses;

    }
  },
  async mounted() {
     
    this.loadData();
  },
};
</script>

<style>
td {
  width: 160px;
  height: 40px;
}
button {
    margin-left: 5px;
    border-color: white;
    border-radius: 7px;
    background-color: #fb8686;
    cursor: pointer;
}
</style>
