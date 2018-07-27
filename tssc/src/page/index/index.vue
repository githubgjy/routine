<template>
   <div class="index">
   	<common-header piclogo='index' router="index">
    </common-header>

   <router-view></router-view>
   </div>
</template>

<script>
import commonHeader from "@com/header/commonheader";

export default {
  name: "index",
  components: {
    commonHeader
  },
  data() {
    return {
      typefour: [
        {
          name: "必备",
          id: 1
        },
        {
          name: "推荐",
          id: 2
        },
        {
          name: "主题",
          id: 3
        },
        {
          name: "作者",
          id: 4
        }
      ]
    };
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
