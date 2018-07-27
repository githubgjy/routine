<template>
   <div class="slide-right">
     <div class="title">
       <label class="c-999">
         <span class="m-p"></span>
         <section class="list-top head_login" v-if="false" :class="{'right-head':rightarrow}" @click="showlist">
	      <span>
	      </span>
	    </section>
            <span v-if="bibei">必背</span><span v-if="tuoz">拓展</span>的诗
       </label>
       <span class="mui-n-info c-999 fr">共{{data.length}}首</span>
     </div>
     <div class="right-scroll" ref="listul">
       <ul >
         <li v-for="(item,index) in data" :key="index"  :class="{'active':index==currentIndex}" @click="plusactive(index,item)" ref="ulout">
           <p class="poem-list fl">{{item.poemTitle}}</p>
           <span class="poem-author fr">{{item.dynastyAndWriterName}}</span>
         </li>
       </ul>
     </div>
   </div>
</template>

<script>
import BScroll from "better-scroll";
import { getPoemInfo, poemDetail } from "@/api/author";
import { mapState } from "vuex";
export default {
  name: "rightslidepoem",
  components: {},
  data() {
    return {
      rightarrow: true,
      currentIndex: 0,
      id: "",
      status: 1,
      themeId: "",
      writerName: ""
      // showswiper: this.currentshowswiper
    };
  },
  props: ["listbtnshow", "data", "currentshowswiper","bibei","tuoz"],
  watch: {},
  methods: {
    plusactive(index, item) {
      // this.showswiper = index;
      this.$emit("plusactive", item);
      var that=this;
     // this.$emit("drop", index);
      this.currentIndex = index;
      
    },
    showlist() {
      this.rightarrow = !this.rightarrow;
      this.$emit("showlist");
    }
  },
  computed: {
    ...mapState(["degree", "pNumber", "userId"])
  },

  mounted() {
    /*也可以做个定时器*/
    //$refs绑定元素
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.listul, {
        //开启点击事件 默认为false
        click: true
      });
    } else if (!this.$refs.listul) {
      return;
    } else {
      this.scroll.refresh();
    }
    if (this.currentshowswiper) {
      this.scroll.scrollToElement(this.$refs.ulout[this.currentshowswiper], 0);
    }
  },
  watch: {
    //解决打开子页面的时候不能正常上下滑动的问题
    currentshowswiper(ne, old) {
      if (ne != old) {
        this.scroll.scrollToElement(
          this.$refs.ulout[this.currentshowswiper],
          0
        );
        console.log("暂时的数据变化");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-right {
  width: 345px; /*no*/
  position: fixed;
  top: 50px;
  right: 0;
  height: 100%;
  overflow: hidden;
  z-index: 9;
  background-color: #fff;
  box-shadow: 0 1px 6px #d0d0d0;
  .title {
    line-height: 55px;
    padding: 0 15px;
    font-size: 15px; /*no*/
    border-bottom: 1px solid #e5e5e5;
    .c-999 {
      color: #999;
    }
    .mui-n-info {
      font-size: 12px; /*no*/
    }
  }
  .right-scroll {
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 0;
    top: 55px;
    overflow-y: hidden;
    li {
      padding: 12px 15px;
      display: flex;
      flex-direction: row;

      .poem-list {
        width: calc(66.6666%);
        font-size: 15px; /*no*/
        @include ellp;
        color: #333;
      }
      &.active {
        .poem-list {
          color: #0091ff;
        }
      }
      .poem-author {
        width: calc(33.3333%);
        @include ellp;
        color: #999;
        text-align: right;
      }
    }
  }
}
.head_login {
  @include sc(33px, #539be7);
  width: 38px;
  float: left;
  span {
    display: inline-block;
    vertical-align: middle;
    width: 25px; /*no*/
    height: 25px; /*no*/
    background: url(../../assets/images/icon-bars-left.png) top center;
    background-size: 100% 100%;
  }
  &.right-head span {
    background: url(../../assets/images/icon-bars-right.png) top center;
    background-size: 100% 100%;
    /*transition: all 0.02s;*/
  }
}
</style>
