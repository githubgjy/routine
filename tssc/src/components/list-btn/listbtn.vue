<template>
      <section class="list-top head_login" :class="{'right-head':rightarrow}" @click="showlist" ref="iconlist">
	      <span>
	     <!--   <i class="fa fa-list"></i>-->
	      </span>
      </section>
</template>

<script>
export default {
  name: "listbtn",
  components: {},
  data() {
    return {
      rightarrow: false
    };
  },
  computed: {},
  created() {
    // 初始化数据
  },
  mounted() {},
  methods: {
    showlist() {
      this.rightarrow = !this.rightarrow;
      this.$emit("showlist");
    }
  }
};
</script>

<style lang="scss" scoped>
.head_login {
  right: 40px;
  @include sc(33px, #539be7);
  width: 100px;
  text-align: right;
  position: absolute;
  top: 0px;
  /* z-index:10;*/
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
    z-index: -1;
    /*transition: all 0.02s;*/
  }
}
</style>
