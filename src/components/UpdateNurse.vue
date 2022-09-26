<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    {{ JSON.stringify(stateNurse)}}
    <Header />
    <h1>Hello User, Welcome to Update Nurse page</h1>
    <form class="addNurse">
      <a-input
        name="name"
        v-model:value="nurse.name"
        :defaultValue="stateNurse && stateNurse.name"
      />

      <a-input
        name="address"
        v-model:value="nurse.address"
        :defaultValue="stateNurse && stateNurse.address"
      />

      <a-input
        name="email"
        v-model:value="nurse.email"
        :defaultValue="stateNurse && stateNurse.email"
      />

      <a-input
        name="phone"
        v-model:value="nurse.phone"
        :defaultValue="stateNurse && stateNurse.phone"
      />

      <input type="file" accept="image/*" @change="handleFileChange" class="file"/>

      <button v-on:click="UpdateNurse" type="button" v-if="!loading">Update Nurse</button>
      <button disabled type="button" v-else>Updating...</button>
    </form>

  </div>
</template>
<script>
import Header from "./Header.vue";
import { mapMutations, mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateNurse",
  components: {
    Header,
  },
  data() {
    return {
      nurse: {
        name: "",
        address: "",
        email: "",
        phone: "",
        image: "",
      },
      loading: false
    };
  },
  computed: {
    ...mapState(["stateNurse"]),
  },
  methods: {
    ...mapMutations(["addNursesToState"]),

    async UpdateNurse() {
      let id = this.$route.params.id;
      {
        this.loading = true;
        const res = await fetch("http://localhost:5000/api/nurse", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id, ...this.nurse }),
        });
        const result = await res.json();
        this.loading = false;
        if (result) {
          this.$router.push({ name: "Home" });
        }
      }
    },

    handleFileChange(e) {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      // reader
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imageElement = document.createElement("img");
        imageElement.src = e.target.result;
        imageElement.onload = (e) => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          const scaleRatio = MAX_WIDTH / e.target.width;
          // canvas size
          canvas.width = MAX_WIDTH;
          canvas.height = e.target.height * scaleRatio;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpg");
          this.nurse.image = srcEncoded;
        };
      };
    },
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }

    let id = this.$route.params.id;
    const res = await fetch(`http://localhost:5000/api/nurse/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    this.addNursesToState(result);
  },
};
</script>
