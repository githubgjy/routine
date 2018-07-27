<template>
   <div class="index">
   	<common-header piclogo='index' router="index">
    </common-header>
     <div class="mui-my-content">
       <div class="mui-my-p">
         <!-- <span class="logo" :class="logotype[this.type]"></span> -->
         <img :src="this.info.imageUrl" width="90" height="90" alt="">
         <p class="mui-my-n">
           {{this.realName}}
           <span class="fexlog" :class="fextype[this.fextypenum]" ></span><!--男性-->
         </p>
       </div>
       <div class="my-cell">
         <ul class="my-cell-view">
           <li class="my-cell-view-cell">
             <span class="my-icon-t my-icon-school"></span>
             所在学校
             <div class="mui-choose-l" >
               {{info.schoolName}}
             </div>
           </li>
           <li class="my-cell-view-cell" v-if="this.showtype==2">
             <span class="my-icon-t my-icon-subject"></span>
             所授科目
             <div class="mui-choose-l" v-if="info.subjectNames.length>0">
               {{info.subjectNames}}
             </div>
           </li>
           <li class="my-cell-view-cell mui-unset" style="position: relative;z-index: 1;">
             <span class="my-icon-t my-icon-grade"></span>
             <span v-if="this.showtype==2">所教班级</span><span v-else>所在班级</span>
             <div v-if="this.showtype==2">
                <div class="mui-choose-grade">
                    <span class="mui-n-num" v-for="(item,index) in info.className" v-if="index<2">{{item}}、</span>
                    <span class="font-arrow" @click="showmoreclass" v-if="info.className>2">
                      <i class="fa" :class="[showarrow ? 'fa-angle-up':'fa-angle-down' ]"></i>
                    </span>
                  </div>
                  <!--多余的班级展示-->
                  <span class="my-choose-list"  v-if="spanmore">
                        <span v-for="(item,index) in info.className" v-show="index >=2">{{item}}</span>
                  </span>

               </div>    
               <div v-else>
                <div class="mui-choose-grade">
                    <span class="mui-n-num" >{{this.info.className}}</span>
                  </div>
               </div>    
            
           </li>
           <li class="my-cell-view-cell">
             <span class="my-icon-t my-icon-range"></span>
             内容范围
             <div class="mui-choose-l" >
               <div id="segmentedControl" class="mui-segmented-control">
                 <a :class="{'active':degree==1}"  @click="showfirst">
                   小学
                 </a>
                 <a :class="{'active':degree==2}"  @click="showtwo">
                   初中
                 </a>
                 <a :class="{'active':degree==3}"  @click="showthree">
                   高中
                 </a>
               </div>
             </div>
           </li>
         </ul>
         <div class="mui-signOut-bt">
           <div class="my-btn-signOut" @click="exit">退出登录</div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import Vue from "vue";
import { MessageBox, Toast } from "mint-ui";
import commonHeader from "@com/header/commonheader";
import { mapState, mapMutations } from "vuex";
import { personInfo, infoDegree } from "@/api/author";
import { getStore, removeStore } from "../../assets/js/storage.js";
export default {
  name: "index",
  components: {
    commonHeader
  },
  data() {
    return {
      logotype: ["tecman", "tecwoman", "stuman", "stuwoman"],
      fextype: ["man", "woman"],
      type: 1,
      fextypenum: 1,
      spanmore: false,
      showarrow: true,
      showtype: "",
      realName: "",
      imgSrc: "",
      activeNum: "",
      info: {}
    };
  },
  props: {},
  watch: {},
  methods: {
    showmoreclass() {
      this.spanmore = !this.spanmore;
      this.showarrow = !this.showarrow;
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
      personInfo(params).then(res => {
        console.log(res.infos);
        this.info = res.infos;
        this.showtype = res.infos.user.ownerType;
        this.fextypenum = res.infos.user.sex;
        this.realName = res.infos.user.realName;
        this.activeNum = res.infos.poemRange;
        this.CHANGE_DEGREE({ degree: res.infos.poemRange });
        this.CHANGE_INFO({ Id: res.infos.user.id, pNumber: res.infos.pNumber });
      });
    },
    ...mapMutations(["CHANGE_DEGREE", "CHANGE_INFO"]),
    message(m) {
      this.MessageBox.confirm("", {
        message: m,
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      });
    },
    showfirst() {
      var that = this;
      if (this.activeNum == 1) {
        Toast({
          message: "已选择小学阶段",
          position: "middle",
          duration: 2000
        });
      } else {
        MessageBox.confirm("", {
          message: "你确定要选择小学阶段的吗？",
          title: "提示",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              console.log("确认小学后的操作");
             
              this.CHANGE_DEGREE({ degree: 1 });
               this.activeNum = this.degree;
              var params = {
                poemRange: this.degree,
                pNumber: that.pNumber,
                userId: this.userId
              };
              console.log(that.pNumber);
              console.log(params);
              infoDegree(params).then(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
              );
              //this.$router.push("/index");
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
            }
          });
      }
    },
    exit() {
      MessageBox.confirm("", {
        message: "确认要退出当前登录吗？",
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            //删除本地store
          
            this.$router.push({
              path: "/login"
            });
            Toast({
              message: "已退出当前账号",
              position: "middle",
              duration: 1000
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    showtwo() {
      if (this.activeNum == 2) {
        Toast({
          message: "已选择初中阶段",
          position: "middle",
          duration: 2000
        });
      } else {
        MessageBox.confirm("", {
          message: "你确定要选择初中阶段的吗？",
          title: "提示",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              //确认初中的操作
              console.log("确认初中的操作")
               this.CHANGE_DEGREE({ degree: 2});
               this.activeNum = this.degree;
              var params = {
                poemRange: this.degree,
                pNumber: that.pNumber,
                userId: this.userId
              };
              console.log(that.pNumber);
              console.log(params);
              infoDegree(params).then(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
              );
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
            }
          });
      }
    },
    showthree() {
      if (this.activeNum == 3) {
        Toast({
          message: "已选择高中阶段",
          position: "middle",
          duration: 2000
        });
      } else {
        MessageBox.confirm("", {
          message: "你确定要选择高中阶段的吗？",
          title: "提示",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
             
               this.CHANGE_DEGREE({ degree: 3 });
                this.activeNum = this.degree;
              var params = {
                poemRange: this.degree,
                pNumber: that.pNumber,
                userId: this.userId
              };
              console.log(that.pNumber);
              console.log(params);
              infoDegree(params).then(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
              );
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
            }
          });
      }
    }
  },
  computed: {
    ...mapState(["usertype", "degree", "pNumber", "userName", "userId"])
  },
  created() {
    this._initData();
  },
  mounted() {
    // let uname = getStore("username");
    // /*如果cookie不存在，则跳转到登录页*/
    // if (!uname) {
    //   this.$router.push("/login");
    // }
  }
};
</script>

<style lang="scss" scoped>
.classlist {
  padding: 15px; /*no*/
  li {
    line-height: 30px; /*no*/
    font-size: 15px; /*no*/
  }
}
.mui-my-content {
  width: 48%;
  margin: 0 auto;
  color: #333;
  .mui-my-p {
    margin-top: 0.5rem;
    width: 100%;
    text-align: center;
    img {
      border: none;
    }
    .logo {
      display: inline-block;
      width: 90px; /*no*/
      height: 90px; /*no*/
      background-size: 100%;
      @include borderRadius(50%);
      &.tecman {
        background-image: url(../../assets/images/icon-teacher-m.png);
      }
      &.tecwoman {
        background-image: url(../../assets/images/icon-teacher-wm.png);
      }
      &.stuman {
        background-image: url(../../assets/images/icon-student-m.png);
      }
      &.stuwoman {
        background-image: url(../../assets/images/icon-student-wm.png);
      }
    }
    .mui-my-n {
      font-size: 18px; /*no*/
      .fexlog {
        display: inline-block;
        width: 18px; /*no*/
        height: 18px; /*no*/
        vertical-align: middle;
        background-size: 100%;
        margin-left: 8px; /*no*/
        &.man {
          background-image: url(../../assets/images/icon-5.png);
        }
        &.woman {
          background-image: url(../../assets/images/icon-6.png);
        }
      }
    }
  }
  .my-cell {
    .my-btn-signOut {
      text-align: center;
      width: 62%;
      margin: 0 auto;
      right: 0;
      margin-top: 30px; /*no*/
      border-radius: 30px; /*no*/
      height: 45px; /*no*/
      line-height: 45px; /*no*/
      padding: 0;
      font-size: 18px; /*no*/
      border: none;
      color: #fff;
      background: linear-gradient(left, #fe7b70, #fe6363);
      box-shadow: 1px 1px 15px 1px #ffd9d9; /*no*/
    }
    .my-cell-view-cell {
      position: relative;
      font-size: 15px; /*no*/
      padding: 12px 0; /*no*/
      color: #333;
      .mui-choose-l {
        color: #999;
        position: absolute;
        width: 70%;
        top: 50%;
        right: 10px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: right;
        @include ellp;
        .mui-segmented-control {
          font-size: 15px; /*no*/
          font-weight: 400;
          position: relative;
          display: table;
          overflow: hidden;
          table-layout: fixed;
          border: 1px solid #007aff;
          border-radius: 3px; /*no*/
          width: 60%;
          float: right;

          a {
            font-size: 13px; /*no*/
            line-height: 26px; /*no*/
            display: inline-block;
            width: 33.33333%;
            text-align: center;
            text-align: center;
            color: #0091ff;
            border-color: #0091ff;
            &:nth-child(2) {
              border-left: 1px solid #0091ff;
              border-right: 1px solid #0091ff;
            }
            &.active {
              background: #0091ff;
              color: #fff;
            }
          }
        }
      }
      .my-icon-t {
        display: inline-block;
        margin-bottom: 2px; /*no*/
        width: 18px; /*no*/
        height: 18px; /*no*/
        vertical-align: middle;
        background-size: 100%;
        margin-right: 12px; /*no*/
        &.my-icon-school {
          background-image: url(../../assets/images/icon-1.png);
        }
        &.my-icon-subject {
          background-image: url(../../assets/images/icon-2.png);
        }
        &.my-icon-grade {
          background-image: url(../../assets/images/icon-3.png);
        }
        &.my-icon-range {
          background-image: url(../../assets/images/icon-4.png);
        }
      }
      .mui-choose-grade {
        color: #999;
        position: absolute;
        width: 40%;
        top: 50%;
        right: 10px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .font-arrow {
          display: inline;
          i {
            display: inline-block;
            vertical-align: top;
            font-size: 24px; /*no*/
            color: #999;
            margin-top: -2px;
            width: 20px; /*no*/
            height: 20px; /*no*/
            line-height: 20px; /*no*/
          }
        }
      }
      .my-choose-list {
        position: absolute;
        max-width: 95px; /*no*/
        max-height: 134px; /*no*/
        overflow-y: scroll;
        top: 46px; /*no*/
        right: 0;
        padding: 10px 0;
        background-color: #fff;
        box-shadow: 0 1px 6px #d0d0d0;
        z-index: 10;
        border-radius: 3px;
        text-align: center;
        span {
          display: inline-block;
          font-size: 13px; /*no*/
          line-height: 25px; /*no*/
          color: #999;
        }
      }
    }
    .my-cell-view-cell:after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 30px;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #eee;
    }
  }
}
</style>
