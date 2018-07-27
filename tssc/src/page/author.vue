<template>
   <div class="theme">
     <ul>
        <info-list v-for="(item,index) in themelist" :id="item.id" :key ="index" :name="item.name" :sayingTs="item.sayingTs" @toAuthor="toAuthor"></info-list>
     </ul>
   </div>
</template>

<script>
import themeModule from "@com/theme/theme";
import { author } from "@/api/author";
import { mapState } from "vuex";
import infoList from "@com/infolist/infolist";
import { Indicator } from "mint-ui";
export default {
  name: "author",
  components: {
    infoList,
    Indicator
  },
  data() {
    return {
      themelist: {}
    };
  },
  props: {},
  watch: {},
  methods: {
    toAuthor(data) {
      this.$router.push({
        path: "/authordetail",
        query: {
          id: data,
          genre:"TS"
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
      author(params)
        .then(res => {
          this.themelist = res.infos.writerList;
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
</style>
