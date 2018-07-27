<template>
    <div class="theme">
      <ul>
        <info-list v-for="(item,index) in themelist" :id="item.id" :key ="index" :themeName="item.themeName" :introducets="item.introduce_ts" showtheme="theme" @toPoem="toPoem"></info-list>
      </ul>
    </div>
</template>
<script>
import { theme } from "@/api/author";
import { mapState } from "vuex";
import infoList from "@com/infolist/infolist";
import { Indicator } from "mint-ui";
export default {
  name: "theme",
  components: {
    infoList,
    Indicator
  },
  props: ["showtheme", "showauthor"],
  data() {
    return {
      themelist: {}
    };
  },

  watch: {},
  methods: {
    toPoem(data) {
      console.log(data.id)
      console.log(data.themeName)
        this.$router.push({
        path: "/themedetail",
        query: {
          id: data.id,
          themeName:data.themeName
        }
      });
    },
    _initData() {
      var params = {
        params: {
          poemRange: this.degree,
          pNumber: this.pNumber,
          userName: this.userName
        }
      };
      theme(params)
        .then(res => {
          console.log(res.infos.themeList)
          this.themelist = res.infos.themeList;
           Indicator.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["degree", "pNumber", "userName"])
  },
  created() {
    // 初始化数据
     Indicator.open();
    this._initData();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.theme {
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
}
</style>
