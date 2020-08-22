<template>
  <header>
    <div v-if="user">
      <button v-on:click="logOut">logOut</button>
    </div>
    <div v-else>
      <button v-on:click="logIn">logIn</button>
    </div>
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
          // this.user = user;
        } else {
          // No user is signed in.
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
        .then(() => {
          console.log("ログアウトしました");
        })
        .catch(error => {
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    },
  },
  created() {
    this.authState();
  },
};
</script>
