<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header />
    <h1>Hello User, Welcome to adding Nurse page</h1>

    <form class="addNurse">
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        v-model="nurse.name"
      />
      <input
        type="text"
        name="address"
        placeholder="Enter Address"
        v-model="nurse.address"
      />
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        v-model="nurse.email"
      />
      <input
        type="number"
        name="phone"
        placeholder="Enter Phone Number"
        v-model="nurse.phone"
      />

      <input
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="file"
      />

      <button v-on:click="addNurse" type="button">Add new Nurse</button>
    </form>

  </div>
</template>
<script>
import Header from "./Header.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AddNurse",
  components: {
    Header,
  },
  data() {
    return {
      nurse: {
        name: "",
        image: "",
        address: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {

    handleFileChange(e) {
      if (!e.target.files) {
        return
      }
      const file = e.target.files[0]
      // reader
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const imageElement = document.createElement('img')
        imageElement.src = e.target.result
        imageElement.onload = (e) => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 600
          const scaleRatio = MAX_WIDTH / e.target.width
          // canvas size
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleRatio
          const ctx = canvas.getContext('2d')
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
          const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpg')
          this.nurse.image = srcEncoded;
        }
      }
    },

    async addNurse() {
      // console.log(this.nurse);
      const res = await fetch("http://localhost:5000/api/nurse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(this.nurse),
      });
      const result = await res.json();
      if (result) {
        this.$router.push({ name: "Home" });
      }
      console.log("result", result);
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
  },
};
</script>
