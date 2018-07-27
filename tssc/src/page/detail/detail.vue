<template>
  <div class="detail">
      <common-header :headTitle="title" goBack="title" listbutton="title" @showlist="showlist()">
      </common-header>
    <!--左右联动-->
      <div class="relative-both">
        <!--左侧导航-->
        <div class="relative-both-left" ref="leftnav">
          <ul>
            <!--导航的数据循环-->
            <li class="menu-item "
                v-for="(item, index) in goods.config"
                :key ="index"
                :class="{'active': currentIndex === index}"
                @click="selectMenu(index, $event)">
              <span v-if="item">{{ item.name }}</span>
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
                   <!--下面是循环的诗的相关情况-->
                   <!-- <li v-for="item in goods.poemlist" class="poemList" >
                     <p class="name-poem">【<span>{{item.name}}</span>】</p>
                      <ul class="inner-poem">
                        <li v-for="item in item.poemlist">{{item.content}}</li>
                      </ul>
                   </li> -->
                 </ul>
               </div>
        </div>
        <transition name="slide-fade">
          <right-enter v-if="showright"></right-enter>
        </transition>
      </div>
  </div>
</template>

<script>
import commonHeader from "@com/header/commonheader";
import rightEnter from "@com/right-slide/rightslide";
import BScroll from "better-scroll";
import { poemDetail } from "@/api/author";
import { mapState } from "vuex";
export default {
  name: "detail",
  components: {
    commonHeader,
    rightEnter
  },
  data() {
    return {
      title: "",
      listHeight: [],
      titlemain:"",
      content:"",
      scrollY: 0,
      showright: false,
      changewidth: false,
      id: this.$route.query.id, //接收参数
      status: this.$route.query.status,
      themeId: this.$route.query.themeId,
      writerName: this.$route.query.writerName,
      loading:false,
      goods: {}
    };
  },
  methods: {
    /*头部点击显示的额效果*/
    showlist() {
      this.showright = !this.showright;
      this.changewidth = !this.changewidth;
    },
    /*实现左右联动的效果*/
    _initData() {
      var params = {
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userName: this.userName,
          id:this.id,
          status:this.status,
          themeId:this.themeId,
          writerName:this.writerName
        }
      };
      this.loading=true,
      poemDetail(params)
        .then(res => {
          console.log(res)
          this.title=res.infos.poem.title;
           this.goods=res.infos;
           this.loading=false
           console.log(this.goods)
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
      /* console.log(this.listHeight)*/
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
     ...mapState(["degree", "pNumber", "userName"])
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
     font-family: "FangSong";
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
            font-family: "FangSong";
          }
        }
      }
      .name-poem {
        color: #0091ff;
        height: 35px;
        line-height: 35px;
      }
      ul {
        li {
          line-height: 27px;
          font-size: 15px;
        }
      }
    }
    .maintitle {
      margin-top: 0.33333rem;
      font-size: 30px;
      line-height: 35px; /*no*/
    }
    .subtitle {
      font-size: 15px;
      text-align: center;
      line-height: 35px; /*no*/
      margin-bottom: 25px;
    }
    .poem-content{
      font-size: 21px;
      text-align: center;
      line-height: 35px; /*no*/
     
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
