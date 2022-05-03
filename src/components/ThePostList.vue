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
          <router-link :to="{
            name: 'article',
            params: { id: topic.id, name: topic.author.loginname }
          }">
            <span>{{ topic.title }}</span>
          </router-link>
          <span class="last_reply">{{ topic.last_reply_at | formatDate }}</span>
        </li>
      </ul>
    </div>

    <!--<ThePagination />-->
    <div v-if="!isLoading" class="pagination-container">
      <el-pagination
          :pager-count="5"
          :total="1000"
          prev-text="上一页"
          next-text="下一页"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          @prev-click="prevClick"
          @next-click="nextClick"
      ></el-pagination>
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
    async reqTopics(page = 1) {
      try {
        const result = await axios.get('https://cnodejs.org/api/v1/topics', { params: { page, limit: 20 } })
        // console.log('reqTopics:', result)
        this.topicArr = result.data.data
      } catch (err) {
        console.log('reqTopics err:', err)
      }
    },
    currentChange(page) {
      this.reqTopics(page)
    },
    prevClick(page) {
      this.reqTopics(page)
    },
    nextClick(page) {
      this.reqTopics(page)
    }
  }
}
</script>

<style scoped lang="less">
a {
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
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

        &:hover {
          color: #9e78c0;
        }
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


.pagination-container {
  width: 100%;
  max-width: 1344px;
  box-sizing: border-box;
  height: 60px;
  background-color: #fff;
  border: 1px solid #888888;
  border-radius: 5px;
  padding: 6px 20px;
  margin: 10px auto 0;
  display: flex;
  align-items: center;

  /deep/ .el-pagination.is-background {
    button, li {
      color: #778087;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
      padding: 0 2px;
      margin: 0 4px;
      width: 55px;
      height: 29px;

      &.number.active {
        color: white;
        background-color: #1f1b1b;

        &:hover {
          color: #fff;
        }
      }

      &:not(.disabled):hover {
        color: #1f1b1b;
      }
    }
  }
}
</style>