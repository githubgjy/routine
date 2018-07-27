<template>
   <div>
        <li class="them-li"  v-if="themeName"  @click="toPoem({id,themeName})" :id="id">
          <a class="clearfix">
            <span class="m-line"><em></em></span>
            <span class="m-poetry-item">{{themeName}}</span>
            <span class="m-poetry-name">{{introducets}}</span>
          </a>
        </li>
        <li class="them-li" v-if="name" @click="toAuthor(id)" :id="id">
          <a class="clearfix">
            <span class="m-line"><em></em></span>
            <span class="m-poetry-item">{{name}}</span>
            <span class="m-poetry-name">{{sayingTs}}</span>
          </a>
        </li>
    </div>
</template>
<script>
export default {
  name: "infolist",
  components: {},
  props: {
    themeName: {
      type: String,
      default: ""
    },
    introducets: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    sayingTs: {
      type: String,
      default: ""
    },
     id: {
      type: Number
    }
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
     toAuthor (item) {
       
      this.$emit('toAuthor',item)
    },
    toPoem(item){
       this.$emit('toPoem',item)
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.them-li {
  box-sizing: border-box;
  float: left;
  font-family: "FangSong";
  width: 20%;
  list-style: none;
  margin: 4% 0 3% 0;
  padding: 0 20px 0 5%;
  @media screen and (max-width: 1600px) {
    width: 25%;
  }
  a {
    display: block;
    span {
      float: left;
      text-align: left;
      width: 100%;
      display: inline-block;
      color: #333;
      &.m-line {
        em {
          float: left;
          display: inline-block;
          width: 30px;
          height: 2px;
          border-top: 2px solid #e5e5e5;
        }
      }
      &.m-poetry-item {
        font-size: 24px; /*no*/
        margin-top: 15px; /*no*/
        font-weight: normal;
        @include ellp;
      }
      &.m-poetry-name {
        height: 20px; /*no*/
        overflow: hidden;
        font-size: 15px; /*no*/
        color: #999;
        margin-top: 12px; /*no*/
        @include ellp;
      }
    }
  }
}
</style>
