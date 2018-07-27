<template>
  <div class="detail">
      <common-header :headTitle="title" goBack="title" listbutton="title" @showlist="showlist">
      </common-header>
    <!--左右联动-->
      <div class="relative-both">
        <!--左侧导航-->
        <div class="relative-both-left" ref="leftnav">
          <ul>
            <!--导航的数据循环-->
            <li class="menu-item" v-for="(item, index) in leftnavs"
                v-if="!loading"
                :key ="index"
                :class="{'active': currentIndex === index}"
                @click="selectMenu(index, $event)">
              <span v-if="item">{{ item }}</span>
            </li>
          </ul>
        </div>
        <!--右侧内容-->
        <div class="relative-both-right" ref="rightpoem" :class="{'right-width-change':changewidth}">
               <div class="right-poem" ref="poemList">
                 <ul >
                   <!--第一部分是一首诗-->
                  <li   class="first-height poemList" v-if="!loading">
                    <div class="maintitle" >{{ this.goods.poem.title }}</div>
                    <div class="subtitle" >{{ this.goods.writer.name  }}</div>
                    <!-- <ul>
                        <li v-for="items in item.poem">{{items.content}}</li> 
                    </ul> -->
                    <div class="poem-content" v-html="this.goods.poem.content">{{ this.goods.poem.content }}</div>
                  </li>
                   <li class="poemList" v-if="!loading&&this.goods.poem.translation">
                     <p class="name-poem">【<span>翻译</span>】</p>
                      <ul class="inner-poem">
                        <li v-html="this.goods.poem.translation"></li>
                      </ul>
                   </li>
                    <li class="poemList" v-if="!loading&&this.goods.poem.annotation">
                     <p class="name-poem">【<span>注释</span>】</p>
                      <ul class="inner-poem">
                        <li v-html="this.goods.poem.annotation"></li>
                      </ul>
                   </li>
                      <li class="poemList" v-if="!loading&&this.goods.poem.appreciation">
                     <p class="name-poem">【<span>赏析</span>】</p>
                      <ul class="inner-poem">
                        <li v-html="this.goods.poem.appreciation"></li>
                      </ul>
                   </li>
                       <li class="poemList" v-if="!loading&&this.goods.poem.allusions">
                     <p class="name-poem">【<span>典故</span>】</p>
                      <ul class="inner-poem">
                        <li>{{this.goods.poem.allusions}}</li>
                      </ul>
                   </li>
                    <li class="poemList" v-if="!loading&&this.goods.poem.createBg">
                     <p class="name-poem">【<span>创作背景</span>】</p>
                      <ul class="inner-poem">
                        <li v-html="this.goods.poem.createBg"></li>
                      </ul>
                   </li>
                   <li class="poemList" v-if="!loading&&this.goods.writer.introduction">
                     <p class="name-poem">【<span>作者</span>】</p>
                      <ul class="inner-poem">
                        <li v-html="this.goods.writer.introduction"></li>
                      </ul>
                   </li>
                 </ul>
               </div>
        </div>
      </div>
      <transition name="slide-fade">
          <right-enter-poem v-if="showright" :data="slidedata" :bibei="bb" :tuoz="tz" :currentshowswiper="currentshowswiper" @plusactive="getinfo"></right-enter-poem>
     </transition>
  </div>
</template>

<script>
import commonHeader from "@com/header/commonheader";
import rightEnterPoem from "@com/right-slide/rightslidepoem";
import BScroll from "better-scroll";
import { poemDetail, getPoemInfo } from "@/api/author";
import { mapState } from "vuex";
export default {
  name: "detail",
  components: {
    commonHeader,
    rightEnterPoem
  },
  data() {
    return {
      title: "",
      listHeight: [],
      leftnavs: [],
      titlemain: "",
      content: "",
      scrollY: 0,
      showright: false,
      changewidth: false,
      currentshowswiper: 0,
      id: this.$route.query.id, //接收参数
      status: this.$route.query.status,
      bb:this.$route.query.bb,
      tz:this.$route.query.tz,
      themeId: this.$route.query.themeId,
      writerName: this.$route.query.writerName,
      loading: false,
      goods: {},
      slidedata: []
    };
  },
  methods: {
    getinfo(data) {
      console.log(data);
      getPoemInfo({
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userId: this.userId,
          id: data.poemId
        }
      })
        .then(res => {
          console.log(res);
          this.id = res.infos.poem.id;
          this.themeId = res.infos.userId;
          this.writerName = res.infos.writer.name;
           this._initData()
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*头部点击显示的额效果*/
    showlist() {
      this.showright = !this.showright;
      this.changewidth = !this.changewidth;
      //console.log("显示转换")
    },
    /*实现左右联动的效果*/
    _initData() {
      var that = this;
      var params = {
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userId: this.userId,
          id: this.id,
          status: this.status,
          themeId: this.themeId,
          writerName: this.writerName
        }
      };
      this.loading = true;
      poemDetail(params)
        .then(res => {
          this.title = res.infos.poem.title;
          this.goods = res.infos;
          this.slidedata = res.infos.list;
          this.leftnavs=[];
          console.log(this.slidedata);
          if (this.goods.poem.title) {
            this.leftnavs.push("诗");
          }
          if (this.goods.poem.translation) {
            that.leftnavs.push("译");
            console.log("5555");
          }
          if (this.goods.poem.annotation) {
            this.leftnavs.push("注");
          }
          if (this.goods.poem.appreciation) {
            this.leftnavs.push("赏");
          }
          if (this.goods.poem.allusions) {
            this.leftnavs.push("典");
          }
          if (this.goods.poem.createBg) {
            this.leftnavs.push("创");
          }
          if (this.goods.writer.introduction) {
            this.leftnavs.push("作");
          }
          this.loading = false;
          setTimeout(() => {
            // 初始化 BScroll
            this._initScroll();
            // 计算右侧每一大项的高度
            this._calcHeight();
          }, 20);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化 BScroll
    _initScroll() {
      this.leftnav = new BScroll(this.$refs.leftnav, {
        click: true
      });
      this.rightpoem = new BScroll(this.$refs.rightpoem, {
        click: true,
        probeType: 3
      });

      this.rightpoem.on("scroll", pos => {
        this.scrollY = Math.abs(Math.floor(pos.y));
        /*console.log(this.scrollY)*/
      });
    },
    selectMenu(index, event) {
      // 防止pc端触发两次点击
      if (!event._constructed) {
        return;
      }
      let poemList01 = this.$refs.poemList.getElementsByClassName("poemList");
      let el = poemList01[index];
      this.rightpoem.scrollToElement(el, 100);
    },
    _calcHeight() {
      let foodList = this.$refs.poemList.getElementsByClassName("poemList");
      let height = 0;
      this.listHeight.push(height);

      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
      // (10) [0, 1172, 1343, 1478, 1828, 2070, 2334, 2685, 3251, 4035]
      console.log(this.listHeight);
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];

        // 落到这个区间 或者 最后一个(无 h2)
        if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
          return i;
        }
      }
      return 0;
    },
    ...mapState(["degree", "pNumber", "userName", "userId"])
  },

  created() {
    // 初始化数据
    this._initData();
  }
};
</script>
<style lang="scss" scoped>
.relative-both {
  display: flex;
  width: 100%;
  position: absolute;
  top: 0.925926rem; /*no*/
  bottom: 0;
  overflow: hidden;
  background-color: #fff;
  .relative-both-left {
    flex: 0 0 80px; /*no*/
    width: 80px; /*no*/
    position: fixed;
    top: 0.925926rem;
    bottom: 0;
    z-index: 10;
    ul {
      margin-top: 0.833333rem;
      li {
        margin-bottom: 25px;
        text-align: center;
        vertical-align: middle;
        span {
          display: inline-block;
          width: 30px; /*no*/
          line-height: 30px; /*no*/
          height: 30px; /*no*/
          cursor: pointer;
          margin: 0 auto;
          font-size: 14px;
          @include borderRadius(50%);
          border: 1px solid #9b9b9b;
        }
        &.active {
          span {
            border: 1px solid #0091ff;
            background: #e9f6ff;
          }
        }
      }
    }
  }
  .relative-both-right {
    transition: all 0.8s ease;
    flex: 1;
    margin-left: 55px; /*no*/
    margin-right: 55px; /*no*/
    &.right-width-change {
      margin-right: 395px; /*no*/
    }
    .right-poem {
      padding-top: 0.725926rem;
    }
    .right-poem > ul > li {
      text-align: left;

      padding-left: 40px;
      &:first-child {
        text-align: center;
        padding-left: 0;
        ul {
          display: inline-block;
          margin: 0 auto;
          text-align: left;
          li {
            font-size: 21px;
          }
        }
      }
      .name-poem {
        color: #0091ff;
        height: 25px;
        line-height: 25px;
        font-size: 15px;
        margin-top: 25px;
      }
      ul {
        li {
          line-height: 27px;
          font-size: 14px;
        }
      }
    }
    .maintitle {
      margin-top: 0.33333rem;
      font-size: 30px;
      line-height: 35px; /*no*/
      font-family: "FangSong";
    }
    .subtitle {
      font-size: 15px;
      text-align: center;
      line-height: 35px; /*no*/
      margin-bottom: 25px;
      font-family: "FangSong";
    }
    .poem-content {
      font-size: 21px;
      text-align: center;
      line-height: 35px; /*no*/
      font-family: "FangSong";
      padding-left: 40px;
      padding-right: 20px;
    }
  }
  .slide-fade {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .slide-fade-enter-active {
    transition: all 0.5s linear;
  }
  .slide-fade-leave-active {
    transition: all 0.5s linear;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
}
</style>
