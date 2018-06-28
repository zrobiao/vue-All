<template>
  <div :class="[bigWidth?'text-right':'text-center']">
    <div class="pager-container">
      <button class="btn btn-pager" :disabled="this.current == 1" @click="prePage">上一页</button>
      <div class="pager-box" v-if="bigWidth">
        <span v-if="pageNo !== 1" :class="[ 1 == current ? 'active':'','page-index']" @click="goPage(1)">1</span>
        <span v-if="preClipped" class="page-index">...</span>
        <span v-for="index in pages" :class="[ index == current ? 'active':'','page-index']" @click="goPage(index)">{{index}}</span>
        <span v-if="backClipped" class="page-index">...</span>
        <span :class=" [ pageNo == current ? 'active':'','page-index']" @click="goPage(pageNo)">{{pageNo}}</span>
      </div>
      <div class="pager-box" v-if="!bigWidth">
        <p>{{current}}/{{pageNo}}</p>
      </div>
      <button class="btn btn-pager" :disabled="this.current == pageNo" @click="nextPage">下一页</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 用于记录总页码，可由父组件传过来
    pageNo: {
      type: Number,
      default: 1
    },
    // 用于记录当前页数，这个与父组件进行数据交互来完成每一页的数据更新，所以我们只要改变current的值来控制整个页面的数据即可
    current: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      // 用于判断省略号是否显示
      backClipped: true,
      preClipped: false,
      bigWidth:true,
    }
  },
  created() {
    let windowScreen = window.innerWidth
    console.log(windowScreen)
    if (windowScreen<420) {
      this.bigWidth=false
    }
  },
  methods: {
    prePage () {
      // 上一页
      // this.current -= 1
      this.$emit('addCurrent',this.current -= 1)
      console.log(this.current)
    },
    nextPage () {
      // 下一页
      // this.current += 1
      this.$emit('addCurrent',this.current += 1)
      console.log(this.current)
    },
    goPage (index) {
      // 跳转到相应页面
      if (index !== this.current) {
        this.current = index
      }
      this.$emit('addCurrent',this.current)
    }
  },
  computed: {
    // 使用计算属性来得到每次应该显示的页码
    pages: function () {
      let ret = []
      if (this.current > 4) {
        // 当前页码大于4时，显示当前页码的前2个
        ret.push(this.current - 1)
        if (this.current > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true
        }
      } else {
        this.preClipped = false
        for (let i = 2; i < this.current; i++) {
          ret.push(i)
        }
      }
      if (this.current !== this.pageNo && this.current !== 1) {
        ret.push(this.current)
      }
      if (this.current < (this.pageNo - 3)) {
        // 显示当前页码的后2个
        ret.push(this.current + 1)
        if (this.current <= (this.pageNo - 3)) {
          //当前页与最后一页差距4以上时显示省略号
          this.backClipped = true
        }
      } else {
        this.backClipped = false
        for (let i = (this.current + 1); i < this.pageNo; i++) {
          ret.push(i)
        }
      }
      // 返回整个页码组
      return ret
    }
  }
}
</script>
<style scoped>
.pager-container {
  /* text-align: center; */
  margin:40px 0;
}
.btn-pager {
  margin:0 10px;
  font-size: 1.4rem;
  padding: 0px;
  width: 60px;
  height: 25px;
  text-align: center;
  background-color: #edf3f5;
  color: #000000;
  border-radius: 2px;
  -webkit-border-radius: 2px;
}
.page-index {
  display: inline-block;
  padding:0 8px;
  line-height: 25px;
  background-color: #ffffff;
  cursor: pointer;
  color: #333;
  border-radius: 4px;
  -webkit-border-radius: 4px;
}
.active {
  color: #ffffff;
  background-color: #34b8de;
}
.pager-box{
  display: inline-block;
}
/* 移动端样式调节 */
@media screen and (max-width: 420px) {
.btn-pager {
  margin:0 10px;
  font-size: 1.4rem;
  padding: 0px;
  width: 100px;
  height: 30px;
  text-align: center;
  background-color: #edf3f5;
  color: #000000;
  border-radius: 5px;
  -webkit-border-radius: 5px;
}
}
</style>
