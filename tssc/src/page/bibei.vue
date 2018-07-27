<template>
<div class="outposi">
   <slick-show :cardArrs="cardArrs" :click="click" :gotopage="gotopage" :bibei="bibei" :changewidth="changewidth"></slick-show>
   <list-btn @showlist="showlist()" ></list-btn>
	  <transition name="slide-fade">
          <right-enter v-if="showright" :bibei="bibei"  :data="realArrs" :currentshowswiper="currentshowswiper"  @showlist="showlist()" @drop="drop"></right-enter>
    </transition>
  </div>
</template>

<script>
import $ from "jquery";
import rightEnter from "@com/right-slide/rightslide";
import listBtn from "@com/list-btn/listbtn";
import slickShow from "@com/slick/slick";
import { biBei } from "@/api/author";
import { mapState } from "vuex";
import { Indicator } from "mint-ui";
export default {
  name: "bibei",
  components: {
    rightEnter,
    listBtn,
    slickShow,
    Indicator
  },
  data() {
    return {
      showright: false,
      changewidth: false,
      listbtnshow: true,
      currentshowswiper: 0,
      click: 1,
      gotopage: 1,
      poemRange: "2",
      bibei:"bb",
      cardArrs: [],
      realArrs:[]
    };
  },
  methods: {
    drop(data) {
      this.$nextTick(function() {
        $(".slickfuc").slick("slickGoTo", data);
        this.currentshowswiper = data;
      });
    },
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
          userName: this.userName
        }
      };
      biBei(params)
        .then(res => {
          this.realArrs=res.infos.necessaryList;
          Indicator.close();
          //判断当前数据的长度，主要是考虑三条及其以下
          if (res.infos.necessaryList.length == 1) {
            this.cardArrs = res.infos.necessaryList.length.concat(
              res.infos.necessaryList,
              res.infos.necessaryList,
              res.infos.necessaryList
            );
          } else if (res.infos.necessaryList.length == 2) {
            this.cardArrs = res.infos.necessaryList.concat(
              res.infos.necessaryList
            );
          } else if (res.infos.necessaryList.length == 3) {
            this.cardArrs = res.infos.necessaryList.concat(
              res.infos.necessaryList[2]
            );
          } else {
            this.cardArrs = res.infos.necessaryList;
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
            $(".slickfuc").slick("slickGoTo", this.gotopage - 1);
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
    ...mapState(["degree", "pNumber", "userName"])
  }
};
</script>

<style lang="scss" scoped>
.outposi {
  position: relative;
}
</style>
