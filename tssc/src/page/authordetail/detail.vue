<template>
  <div class="detail">
      <common-header v-if="!loading" :headTitle="short.writer.name" goBack="detail">
      </common-header>
    <!--左右联动-->
      <div class="relative-both">
        <!--左侧导航-->
        <div class="relative-both-left" ref="leftnav">
          <ul>
            <!--导航的数据循环-->
            <li class="menu-item "
                v-for="(item, index) in leftnavs"
                :key="index"
                :class="{'active': currentIndex === index}"
                @click="selectMenu(index, $event)">
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <!--右侧内容-->
        <div class="relative-both-right" ref="rightpoem" :class="{'right-width-change':changewidth}">
               <div class="right-poem" ref="poemList" v-if="!loading">
                 <ul >
                   <li  class="poemList">
                     <div class="name-pic clearfix">
                        <span class="mui-poet-img fl" v-if="short.last">
                          {{short.last}} <!--没有图片时取最后一个字-->
                        </span>
                       <img :src="short.writer.avatarUrl" v-else class="fl">
                       <div class="name-pic-de fl">
                         <h3 class="poem-name f-24">{{short.writer.name}}</h3>
                         <p class="dynasty f-15">{{short.writer.years}}</p>
                       </div>
                     </div>
                    <p class="name-poem">【<span>简介</span>】</p>
                     <div class="poemintro">{{short.writer.introduction}}</div>
                   </li>
                 
                   <li class="poemList">
                     <p class="name-poem">【<span>作品</span>】 <span class="total-poem fr">共{{short.list.length}}首</span></p>
                     <ul class="show-product">
                      <router-link tag="li" v-for="(item,index) in short.list" :to="{ path: '/detail', query: { id: item.id,status:'', themeId:'',writerName: short.writer.name}}" :key="index">
                         <h4>{{item.title}}</h4>
                    
                         <p v-html="item.quotes"></p>
                       </router-link>
                     </ul>
                   </li>
                 </ul>
               </div>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import commonHeader from "@com/header/commonheader";
import BScroll from "better-scroll";
import { getPoemList } from "@/api/author";
import { mapState } from "vuex";
export default {
  name: "detail",
  components: {
    commonHeader
  },
  data() {
    return {
      showtxt: true,
      detail: "张九龄",
      listHeight: [],
      scrollY: 0,
      leftnavs:["简","作"],
      showright: false,
      changewidth: false,
      picperson: null,
      id: this.$route.query.id, //接收参数
      genre: this.$route.query.genre,
      title: [],
      short: {},
      relative: [],
      lengthlist: 0,
      loading:false
    };
  },
  methods: {
    /*实现左右联动的效果*/
    _initData() {
      // DOM 渲染完成才能进行计算
      var params = {
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userId: this.userId,
          id:this.id,
          genre:this.genre
        }
      };
      this.loading=true;
      getPoemList(params)
      
        .then(res => {
          this.loading=false;
          console.log(res)
           
         this.short=res.infos;
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
        /* console.log(this.scrollY)*/
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
         console.log(this.listHeight)
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];

        // 落到这个区间 或者 最后一个(无 h2)
        if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
          return i;
        }
      }
      return 0;
    },
    ...mapState(["degree", "pNumber", "userId"])
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
    transition: all 0.5s ease;
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
        text-align: left;
        .name-pic {
          overflow: hidden;
          margin-bottom: 25px;
          .mui-poet-img {
            display: inline-block;
            width: 90px; /*no*/
            height: 90px; /*no*/
            line-height: 90px; /*no*/
            color: #fff;
            text-align: center;
            font-size: 0.407407rem;
            border-radius: 50%;
            border: #e5e5e5 solid 1px;
            background: #ccc;
            margin-right: 15px;
          }
          .poem-name {
            font-weight: normal;
            margin-top: 18px; /*no*/
            margin-bottom: 10px; /*no*/
            font-size: 16px; /*no*/
          }
          .dynasty {
            font-size: 12px; /*no*/
            color: #999;
          }
        }
      }
      .poemintro {
        line-height: 27px; /*no*/
        font-size: 15px; /*no*/
      }
      ul.show-product {
        li {
          padding: 10px 40px 10px 10px; /*no*/
          border-bottom: 1px solid #eee;
          h4 {
            margin-top: 0;
            font-size: 18px; /*no*/
            line-height: 24px; /*no*/
            font-weight: normal;
            margin-bottom: 6px; /*no*/
          }
          p {
            margin-top: 0;
            font-size: 12px; /*no*/
            line-height: 21px; /*no*/
            color: #999;
          }
        }
      }
      .name-poem {
        color: #0091ff;
        height: 35px;
        line-height: 35px;
        font-size: 15px; /*no*/
        margin-top: 25px;
        span.fr {
          color: #999;
        }
      }
    }
    .maintitle {
      margin-top: 70px;
      font-size: 35px;
      line-height: 35px; /*no*/
    }
    .subtitle {
      font-size: 15px;
      text-align: center;
      line-height: 35px; /*no*/
    }
  }
}
</style>
