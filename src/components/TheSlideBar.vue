<template>
  <div v-if="userInfo" class="autherinfo">

    <div class="authersummay">
      <div class="topbar">作者</div>
      <router-link :to="{
        name: 'userInfo',
        params: { name: userInfo.loginname }
      }">
        <img :src="userInfo.avatar_url" alt="avatar">
        <span class="loginname">{{userInfo.loginname}}</span>
      </router-link>
    </div>

    <div v-if="topicList.length" class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="topic in topicList" :key="topic.id">
          <router-link :to="{
            name: 'article',
            params: { id: topic.id, name: topic.author.loginname }
          }">
            {{topic.title}}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="replyList.length" class="recent_replies">
      <div class="topbar">作者最近回复</div>
      <ul>
        <li v-for="reply in replyList" :key="reply.id">
          <router-link :to="{
            name: 'article',
            params: { id: reply.id, name: reply.author.loginname }
          }">
            {{reply.title}}
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheSlideBar',
  data() {
    return {
      userInfo: null
    }
  },
  computed: {
    topicList() {
      if (!this.userInfo) return
      const { recent_topics } = this.userInfo
      if (recent_topics) {
        // console.log('recent_topics:', recent_topics)
        return recent_topics.slice(0, 5)
      } else {
        return []
      }
    },
    replyList() {
      if (!this.userInfo) return
      const { recent_replies } = this.userInfo
      if (recent_replies) {
        return recent_replies.slice(0, 5)
      } else {
        return []
      }
    }
  },
  mounted() {
    const { name } = this.$route.params
    this.reqUserInfo(name)
  },
  methods: {
    async reqUserInfo(name) {
      try {
        const result = await axios.get(`https://cnodejs.org/api/v1/user/${name}`)
        // console.log('reqUserInfo:', result)
        this.userInfo = result.data.data
      } catch (err) {
        console.log('reqUserInfo err:', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.autherinfo {
  width: 328px;
  float: right;
  margin-top: 0;
}

.authersummay, .recent_replies, .recent_topics {
  background-color: #fff;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.authersummay {
  .topbar {
    margin-top: 0;
  }
  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }
  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }
}

.recent_replies, .recent_topics {
  ul {
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
    padding-left: 14px;
    li {
      padding: 3px 0;
    }
    a {
      font-size: 12px;
      text-decoration: none;
      color: #778087;
    }
  }
}
</style>