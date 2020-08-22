<template>
  <header>
    <button v-if="user" v-on:click="logOut()">ログアウト</button>
    <button v-else v-on:click="logIn()">ログイン</button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    authState() {
      //firebase loginしているかどうか
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    },
    logIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("ログアウト成功！");
        });
    },
  },
  created() {
    this.authState();
  },
};
</script>
