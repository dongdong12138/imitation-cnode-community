<template>
  <main>

    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>

    <!--主题帖子列表-->
    <div v-else class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="topic in topicArr" :key="topic.id">
          <img :src="topic.author.avatar_url" alt="avatar">
          <span class="allcount">
            <span class="reply_count">{{ topic.reply_count }}</span>/{{ topic.visit_count }}
          </span>
          <span :class="{put_good: topic.good, put_top: topic.top, 'topiclist-tab': !topic.good && !topic.top}">
            {{ topic | tabFormatter }}
          </span>
          <span>{{ topic.title }}</span>
          <span class="last_reply">{{ topic.last_reply_at | formatDate }}</span>
        </li>
      </ul>
    </div>

  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ThePostList',
  data() {
    return {
      isLoading: true,
      topicArr: []
    }
  },
  async mounted() {
    await this.reqTopics()
    this.isLoading = false
  },
  methods: {
    /**
     * 查询主题首页
     */
    async reqTopics() {
      try {
        const result = await axios.get('https://cnodejs.org/api/v1/topics', { params: { page: 1, limit: 20 } })
        console.log('reqTopics:', result)
        this.topicArr = result.data.data
      } catch (err) {
        console.log('reqTopics err:', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
a {
  text-decoration: none;
  color: black;
  &:hover { text-decoration: underline; }
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.posts {
  margin-top: 10px;

  > ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
    padding: 0;

    > li:not(:first-child) {
      padding: 9px;
      font-size: 15px;
      font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
      font-weight: 400;
      background-color: white;
      color: #333;
      border-top: 1px solid #f0f0f0;

      &:hover {
        background: #f5f5f5;
      }
    }

    .toobar {
      height: 40px;
      background-color: #f5f5f5;
      span {
        font-size: 14px;
        color: #80bd01;
        line-height: 40px;
        margin: 0 10px;
        cursor: pointer;
        &:hover { color: #9e78c0; }
      }
    }

    img {
      height: 30px;
      width: 30px;
      vertical-align: middle;
    }

    span {
      line-height: 30px;
    }

    .allcount {
      width: 70px;
      display: inline-block;
      text-align: center;
      font-size: 12px;
    }

    .reply_count {
      color: #9e78c0;
      font-size: 14px;
    }

    .put_good, .put_top {
      background: #80bd01;
      padding: 2px 4px;
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -o-border-radius: 3px;
      color: #fff;
      font-size: 12px;
      margin-right: 10px;
    }

    .topiclist-tab {
      background-color: #e5e5e5;
      color: #999;
      padding: 2px 4px;
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -o-border-radius: 3px;
      font-size: 12px;
      margin-right: 10px;
    }

    .last_reply {
      text-align: right;
      min-width: 50px;
      display: inline-block;
      white-space: nowrap;
      float: right;
      color: #778087;
      font-size: 12px;
    }
  }
}
</style>