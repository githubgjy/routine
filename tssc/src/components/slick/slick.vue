<template>
<div class="finish-wrap">
    <div class="index-wrap" :class="{'right-width-change':changewidth,'left-width-change':!changewidth}">
	    <div class="mui-slider-wrap">
			    <div class="slickfuc"
			      ref="slick"
            @afterChange="handleAfterChange"
			      @beforeChange="handleBeforeChange"
			      @breakpoint="handleBreakpoint"
			      @destroy="handleDestroy"
			      @edge="handleEdge"
			      @init="handleInit"
			      @reInit="handleReInit"
			      @setPosition="handleSetPosition"
			      @swipe="handleSwipe"
			      @lazyLoaded="handleLazyLoaded"
			      @lazyLoadError="handleLazeLoadError">
			       <div v-for="(item,index) in cardArrs" :key = "index">
				      <router-link :to="{path:'/detail',query: { id:item.id,status:0, themeId:'',writerName:item.author,bb:bibei,tz:tuoz}}" tag="a" class="mui-tabslider">
				            <span class="style02-txt">{{item.title}}</span>
				            <span class="style02-name">{{item.author}}</span>
				            <span class="style02-content">
				            	   <ul>
				            	   	   <li v-html="item.quotes">{{item.quotes}}</li>
				            	   </ul>
				            </span>
				       </router-link>
			       </div>
			    </div>
		</div>
		<div class="mui-slider-num" v-if="cardArrs.length"><span v-if="this.cardArrs.length>0" class="c-333">{{click}}</span> <span class="c-333" v-else>0</span>/<span class="c-999">{{cardArrs.length}}</span></div>
	  </div>
</div>
</template>

<script>
import $ from "jquery";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
import "@ass/scss/slick-theme.scss";
import { Indicator } from "mint-ui";
export default {
  name: "slick",
  props: {
    cardArrs: {
      type: Array,
      default: []
    },
    click: {
      type: Number,
      default: 1
    },
    gotopage: {
      type: Number,
      default: 1
    },
    bibei: {
      type: String,
      default: ""
    },
    tuoz:{
      type: String,
      default: ""
    },
    changewidth: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Indicator
  },
  data() {
    return {
      // changewidth: false,
      slickOptions: {
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3
      }
    };
  },
  methods: {
    slick() {
      /*不得已用的jquery的操作（vue的方法在这个地方静态数据显示正常，但是数据接口调取的时候样式会出现问题）*/
      // $(".slickfuc").slick({
      //   centerMode: true,
      //   centerPadding: "0px",
      //   slidesToShow: 3
      // });
      $(".slickfuc").slick("slickGoTo", this.gotopage - 1);

      $(".slickfuc").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
      ) {
        _this.click = nextSlide + 1;
        _this.currentshowswiper = nextSlide;
      });
    },
    next() {
      this.$refs.slick.next();
    },
    slickCurrentSlide() {
      alert(this.$refs.slick.index);
    },
    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },

    // Events listeners
    handleAfterChange(event, slick, currentSlide) {
      alert("handleAfterChange", event, slick, currentSlide);
      this.click = currentSlide + 1;
      console.log(currentSlide);
    },
    handleBeforeChange(event, slick, currentSlide, nextSlide) {
      //      console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
      /* this.click=(nextSlide);*/
    },
    handleBreakpoint(event, slick, breakpoint) {
      //      console.log('handleBreakpoint', event, slick, breakpoint);
    },
    handleDestroy(event, slick) {
      //      console.log('handleDestroy', event, slick);
    },
    handleEdge(event, slick, direction) {
      //      console.log('handleEdge', event, slick, direction);
    },
    handleInit(event, slick) {
      //      console.log('handleInit', event, slick);
    },
    handleReInit(event, slick) {
      //      console.log('handleReInit', event, slick);
    },
    handleSetPosition(event, slick) {
      //      console.log('handleSetPosition', event, slick);
    },
    handleSwipe(event, slick, direction) {
      //      console.log('handleSwipe', event, slick, direction);
    },
    handleLazyLoaded(event, slick, image, imageSource) {
      //      console.log('handleLazyLoaded', event, slick, image, imageSource);
    },
    handleLazeLoadError(event, slick, image, imageSource) {
      //      console.log('handleLazeLoadError', event, slick, image, imageSource);
    }
  },
  created() {
    this.slick();
    Indicator.open();
  }
};
</script>

<style lang="scss" scoped>
.finish-wrap {
  background-color: #f4f4f4;
  height: 100%;
  position: fixed;
  width: 100%;
  .index-wrap {
    position: relative;
    &.right-width-change {
      opacity: 1;
      transform: translateX(-235px);
      transition: all 0.3s ease;
      .mui-slider-wrap a {
        opacity: 0;
        transition: all 0.3s;
      }
      .mui-slider-wrap .slick-center a {
        opacity: 1;
        transition: all 0.3s;
      }
    }
    &.left-width-change {
      transform: translateX(0);
      transition: all 0.3s ease;
    }
  }
  .mui-slider-wrap .slick-slider {
    font-family: "FangSong";
  }
  .mui-slider-wrap button:enabled:active {
    background: transparent;
  }
  .mui-slider-wrap a {
    opacity: 1;
    transition: all 100ms ease;
    display: inline-block;
    background: #fff;
    color: #333;
    font-size: 18px;
    line-height: 30px;
    margin: 38% 5% 25% 13%;
    width: 5.925926rem;
    height: 6.666667rem;
    overflow: hidden;
    position: relative;
    text-align: center;
    border-radius: 2px;
    box-shadow: 0 1px 6px #d0d0d0;
    span {
      width: 4.262963rem;
      line-height: 0.444444rem;
      margin: 0 auto;
      display: inline-block;
      overflow: hidden;
      color: #999;
      &.style02-txt {
        padding-top: 30%;
        font-size: 23px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &.style02-name {
        font-size: 16px;
      }
      &.style02-content {
        display: none;
        font-size: 15px;
        li {
          line-height: 28px;
        }
      }
    }
  }
  .mui-slider-wrap .slick-center {
    .style02-txt {
      padding-top: 10%;
      line-height: 40px;
      font-size: 25px;
      color: #333;
    }
    .style02-name {
      font-size: 18px;
      color: #333;
    }
    .style02-content {
      display: block;
      font-size: 15px;
      width: 5rem;
      height: 200px;
      line-height: 35px;
      overflow: hidden;
      margin: 0 auto;
      color: #333;
    }
  }
  .mui-slider-num {
    text-align: center;
    font-size: 24px;
  }
  .c-999 {
    color: #999;
  }
}

.mui-backdrop {
  position: absolute;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.1);
}
.mui-fc {
  right: 170px;
}
.slick-track .slick-center a {
  opacity: 1;
  transform: scale(1.4);
  color: #333;
}

.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>


