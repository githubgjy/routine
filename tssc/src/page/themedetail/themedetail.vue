<template>
  <div class="outposi">
      <common-header :headTitle="title" goBack="title"  @showlist="showlist()">
      </common-header>
       <slick-show :cardArrs="cardArrs" :click="click" :gotopage="gotopage" :changewidth="changewidth"></slick-show>
      <list-btn @showlist="showlist()" ></list-btn>
	    <transition name="slide-fade">
          <right-enter v-if="showright"  :data="realArrs" :currentshowswiper="currentshowswiper"  @showlist="showlist()" @drop="drop"></right-enter>
      </transition>
  </div> 
</template>

<script>
import commonHeader from "@com/header/commonheader";
import rightEnter from "@com/right-slide/rightslide";
import listBtn from "@com/list-btn/listbtn";
import slickShow from "@com/slick/slick";
import { themeDetail } from "@/api/author";
import { mapState } from "vuex";
import { Indicator } from "mint-ui";
import $ from "jquery";
export default {
  name: "bibei",
  components: {
    commonHeader,
    rightEnter,
    listBtn,
    slickShow,
    Indicator
  },
  props:["themeName"],
  data() {
    return {
      title: "",
      showright: false,
      changewidth: false,
      listbtnshow: true,
      currentshowswiper: 0,
      click: 1,
      gotopage: 1,
      poemRange: "2",
      cardArrs: [],
      realArrs: [],
      theme: this.$route.query.id
    };
  },
  methods: {
    //展开第几个
      drop(data) {
      this.$nextTick(function() {
        $(".slickfuc").slick("slickGoTo", data);
        this.currentshowswiper = data;
      });
    },
    //控制右侧信息展开以及左侧轮播的样式
     showlist() {
      this.showright = !this.showright;
      this.changewidth = !this.changewidth;
    },
    _initData() {
      var _this = this;
      var params = {
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userId: this.userId,
          theme: this.theme
        }
      };
      themeDetail(params)
        .then(res => {
         
          this.realArrs = res.infos.themeList;
         
          this.title=res.infos.theme.themeName;
          Indicator.close();
          if (res.infos.themeList.length == 1) {
            this.cardArrs = res.infos.themeList.concat(
              res.infos.themeList,
              res.infos.themeList,
              res.infos.themeList
            );
           
          } else if (res.infos.themeList.length == 2) {
            this.cardArrs = res.infos.themeList.concat(res.infos.themeList);
          } else if (res.infos.themeList.length == 3) {
            this.cardArrs = res.infos.themeList.concat(
              res.infos.themeList[2]
            );
          } else {
            this.cardArrs = res.infos.themeList;
            this.gotopage = res.infos.currentNum;
          }
         
            this.$nextTick(() => {
            /*  this.$refs.slick.reSlick();*/
            /*不得已用的jquery的操作（vue的方法在这个地方静态数据显示正常，但是数据接口调取的时候样式会出现问题）*/
            $(".slickfuc").slick({
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3
            });
           // $(".slickfuc").slick("slickGoTo", this.gotopage - 1);
          });
          $(".slickfuc").on("beforeChange", function(
            event,
            slick,
            currentSlide,
            nextSlide
          ) {
            _this.click = nextSlide + 1;
            _this.currentshowswiper = nextSlide;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 初始化数据
    this._initData();
  },
  computed: {
    ...mapState(["degree", "pNumber", "userId"])
  }
};
</script>

<style lang="scss" scoped>
.outposi {
  position: relative;
}
</style>


