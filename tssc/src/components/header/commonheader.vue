<template>
  <header id='head_top' >
    <!--头部的导航-->
    <ul slot='navtop' class="topnav" v-if="router">
      <router-link class="" tag="li" :to="{path:'/index/bibei',query: {userName:this.userName,pNumber:this.pNumber,poemRange:this.degree}}">
        必背
      </router-link>
      <router-link class="" tag="li" :to="{path:'/index/command',query: {userName:this.userName,pNumber:this.pNumber,poemRange:this.degree}}">
        拓展
      </router-link>
      <router-link class="" tag="li" :to="{path:'/index/theme',query: {userName:this.userName,pNumber:this.pNumber,poemRange:this.degree}}">
        主题
      </router-link>
      <router-link class="" tag="li" :to="{path:'/index/author',query: {userName:this.userName,pNumber:this.pNumber,poemRange:this.degree}}">
        作者
      </router-link>
    </ul>
    <!--返回按钮-->
    <section class="head_goback"  @click="$router.go(-1)" v-if="goBack">
       <span class="page-back"><i class="mintui mintui-back"></i></span>
      <span class="return-span">返回</span>
    </section>
<!--我的返回菜单-->
    <section class="pic-person" v-if="piclogo">
      <router-link :to="{path:'/mine',query: {userName:this.userName,pNumber:this.pNumber,poemRange:this.degree}}">
      <img :src="headpic" alt="">
      </router-link>
    </section>
    <!--中间的标题-->
    <section class="title_head ellipsis " v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
<!--右侧list按钮-->
    <section class="list-top head_login" v-if="listbutton" :class="{'right-head':rightarrow}" @click="showlist" ref="iconlist">
      <span>
      </span>
    </section>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "commonheader",
  data() {
    return {
      rightarrow: false,
      headpic: require("../../assets/images/img1.jpg")
    };
  },

  mounted() {
    //获取用户信息
    /*  this.getUserInfo();*/
  },
  props: ["piclogo", "headTitle", "goBack", "listbutton", "router"],
  computed: {
    ...mapState([ 
      "userName","pNumber","degree"
    ])
  },
  methods: {
    ...mapActions([
      /*  'getUserInfo'*/
    ]),
    showlist() {
      this.rightarrow = !this.rightarrow;
      this.$emit("showlist");
    }
  }
};
</script>

<style lang="scss" scoped>
#head_top {
  background-color: #fff;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.925926rem;
  border-bottom: 1px solid #d0d0d0;
  .head_goback {
    left: 0.185185rem;
    @include wh(2.222222rem, 0.925926rem);
    line-height: 0.925926rem;
    font-size: 0.277778rem;
    position: relative;
    color: #539be7;
    span.page-back {
      display: inline-block;
      i {
        font-size: 0.277778rem;
      }
    }
    span.return-span {
      line-height: 0.925926rem;
      vertical-align: top;
    }
  }
  .pic-person {
    left: 0.185185rem;
    @include wh(2.916667rem, 0.925926rem);
    line-height: 0.925926rem;
    position: relative;
    color: #539be7;
    img {
      @include ct;
      border-radius: 50%;
      width: 0.518519rem;
    }
  }
  .head_login {
    right: 0.185185rem;
    @include sc(2.35rem, #539be7);
    width: 2.222222rem;
    height: 0.925926rem;
    line-height: 0.925926rem;

    text-align: right;
    @include ct;
    span {
      margin-top: -0.55rem;
      display: inline-block;
      vertical-align: middle;
      width: 0.444444rem; /*no*/
      height: 0.444444rem; /*no*/
      background: url(../../assets/images/icon-bars-left.png) top center;
      background-size: 100% 100%;
    }
    &.right-head span {
      background: url(../../assets/images/icon-bars-right.png) top center;
      background-size: 100% 100%;
    }
  }
  .title_head {
    @include center;
    @include ellp;
    width: 60%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    line-height: 0.925926rem;
    .title_text {
      @include sc(0.314815rem, #333);
      text-align: center;
      font-weight: normal;
    }
  }
  .topnav {
    position: absolute;
    width: 44%;
    margin: 0 auto;
    left: 28%;
    height: 100%;
    text-align: center;
    li {
      display: table-cell;
      overflow: hidden;
      box-sizing: border-box;
      width: 1%;
      vertical-align: middle;
      font-size: 0.314815rem;
      height: 0.925926rem;
      -webkit-transition: background-color 0.1s linear;
      transition: background-color 0.1s linear;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    li.router-link-active {
      color: #007aff;
      border-bottom: 2px solid #007aff; /*no*/
    }
  }
}
</style>
