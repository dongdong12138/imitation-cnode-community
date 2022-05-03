<template>
  <div class="UserInfo">

    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>

    <div v-else class="userInfomation">

      <section>
        <img :src="userInfo.avatar_url" alt="avatar">
        <span>{{ userInfo.loginname }}</span>
        <p>{{ userInfo.score }}积分</p>
        <p>注册时间：{{ userInfo.create_at | formatDate }}</p>
      </section>

      <div class="replies">
        <p>回复的主题</p>
        <ul>
          <li v-for="item in userInfo.recent_replies" :key="item.id">
            <router-link :to="{
              name: 'article',
              params: { id: item.id, name: item.author.loginname }
            }">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="topics">
        <p>创建的主题</p>
        <ul>
          <li v-for="item in userInfo.recent_topics" :key="item.id">
            <router-link :to="{
              name: 'article',
              params: { id: item.id, name: item.author.loginname }
            }">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheUserInfo',
  data() {
    return {
      isLoading: true,
      userInfo: null
    }
  },
  async mounted() {
    const { name } = this.$route.params
    await this.reqUserInfo(name)
    this.isLoading = false
  },
  methods: {
    async reqUserInfo(name) {
      try {
        const result = await axios.get(`https://cnodejs.org/api/v1/user/${name}`)
        console.log('reqUserInfo:', result)
        this.userInfo = result.data.data
      } catch (err) {
        console.log('reqUserInfo err:', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;

  section { padding: 12px; }

  img { width: 30px; }

  li { list-style:none; }

  .replies, .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }

  > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }

  > div > ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
    > a {
      color: #094E99;
      text-decoration: none;
    }
  }
}
</style>