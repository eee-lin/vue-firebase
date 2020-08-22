<template>
  <div class="home">
    <input v-model="inputtext" type="text" />
    <button v-on:click="postTweet">ツイート</button>
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  //いれる
  name: "home",
  data() {
    return {
      tweets: [
        // こんな感じのデータが入る予定
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。",
        // },
      ],
    };
  },
  methods: {
    postTweet() {
      const tweet = {
        text: this.inputtext,
      };
      db.collection("tweets")
        .add(tweet)
        .then(ref => {
          //渡される参照（ref）からidを取り出して
          this.tweets.push({
            //tweetと合体
            id: ref.id,
            ...tweet,
          });
        });
    },
  },

  //DOMのツリーが作られる直前にfirebaseからデータを持ってくる
  created() {
    // ここから
    db.collection("tweets")
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        docs.forEach(doc => {
          this.tweets.push(doc.data());
        });
      });
    // ここまで
  },
};
</script>
