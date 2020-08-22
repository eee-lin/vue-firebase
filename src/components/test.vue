<template>
  <div id="app">
    <header class="header">
      <Header></Header>
      <button v-if="user" v-on:click="logout()">ログアウト</button>
      <button v-else v-on:click="login()">ログイン</button>
    </header>
    <body>
      <input type="text" v-model="inputText" />
      <button v-on:click="post()">Tweet</button>
      <div v-for="(tweet, index) in tweets" v-bind:key="index">
        {{ tweet.text }}
      </div>
      <!-- <router-view></router-view> -->
      <font-awesome-icon icon="user" />
      <font-awesome-icon icon="user-secret" />
    </body>
  </div>
</template>
<script>
// import Header from "@/components/Header.vue";
// export default {
//   name: "App",
//   components: {
//     Header: Header
//   }
// };
import firebase from "firebase";
import { db } from "@/firebase";
export default {
  data() {
    return {
      tweets: [],
      inputText: "",
      user: null,
    };
  },
  created() {
    // ここから
    db.collection("tweets").onSnapshot(snapshot => {
      this.tweets = [];
      const docs = snapshot.docs;
      docs.forEach(doc => {
        this.tweets.push(doc.data());
      });
    });
    // ここまで
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    post() {
      db.collection("tweets").add({ text: this.inputText });
      this.inputText = "";
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    logout() {
      // const provider = new firebase.auth.GoogleAuthProvider();
      // firebase.auth().signOutWithPopup(provider);
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("ログアウト成功！");
        });
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 3px solid black;
}
</style>
