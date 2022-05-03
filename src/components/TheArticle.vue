<template>
  <div class="article">

    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>

    <div v-else>

      <div class="topic_header">
        <div class="topic_title">{{ article.title }}</div>
        <ul>
          <li>•发布于：{{ article.create_at | formatDate }}</li>
          <li>•作者：{{ article.author.loginname }}</li>
          <li>•{{ article.visit_count }}次浏览</li>
          <li>•来自{{ article | tabFormatter }}</li>
        </ul>
        <div v-html="article.content" class="topic_content"></div>
      </div>

      <div id="reply">
        <div class="topbar">回复</div>
        <div v-for="(reply, index) in article.replies" :key="index" class="replySec">
          <div class="replyUp">
            <router-link :to="{
              name: 'userInfo',
              params: { name: reply.author.loginname }
            }">
              <img :src="reply.author.avatar_url" alt="avatar">
            </router-link>
            <router-link :to="{
              name: 'userInfo',
              params: { name: reply.author.loginname }
            }">
              <span>{{ reply.author.loginname }}</span>
            </router-link>
            <span>{{ index + 1 }}楼</span>
            <span v-if="reply.ups.length > 0">☝ {{ reply.ups.length }}</span>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheArticle',
  data() {
    return {
      isLoading: true,
      article: null
    }
  },
  async mounted() {
    const { id } = this.$route.params
    await this.reqTopicDetail(id)
    this.isLoading = false
  },
  watch: {
    '$route'(newValue) {
      this.reqTopicDetail(newValue.params.id)
    }
  },
  methods: {
    async reqTopicDetail(id) {
      try {
        const result = await axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
        // console.log('reqTopicDetail:', result)
        this.article = result.data.data
      } catch (err) {
        console.log('reqTopicDetail err', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/markdown-github.css";

.article {
  margin-right: 340px;
  margin-top: 15px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

#reply, .topic_header {
  background-color: #fff;
}

.topic_header {
  padding: 10px;

  > .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  > ul {
    list-style: none;
    padding: 0 0;
    margin: 6px 0;

    > li {
      display: inline-block;
      font-size: 12px;
      color: #838383;
    }
  }

  > .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
    width: 100%;

    & /deep/ .markdown-text img {
      width: 92% !important;
    }
  }
}

#reply {
  margin-top: 15px;

  > .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  > .replySec {
    border-bottom: 1px solid #e5e5e5;
    padding: 0 10px;

    > .replyUp {
      margin-bottom: 10px;
      a:nth-of-type(2) {
        margin: 0 8px;
        display: inline-block;
      }
    }

    > p {
      margin-bottom: 10px;
    }
  }

  img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  a, span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
}
</style>