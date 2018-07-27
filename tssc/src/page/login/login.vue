<template>
  <div>
    <common-header headTitle="注册/登录">
    </common-header>
   
     <div class="widthhalf">
      <div class="mui-content mui-my-center ">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" class="toggle-tab">登录</mt-tab-item>
          <mt-tab-item id="2">注册</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <!-- 登录 -->
          <mt-tab-container-item id="1" class="login-wrapper">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="login_username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="login_password"></mt-field>
            <div class="error-login" v-if="loginerr">
                {{loginTishi}}
            </div>  
            <mt-button type="primary" size="large" @click.native="login" class="btn-size">登录</mt-button>
          </mt-tab-container-item>
          <!-- 注册 -->
          <mt-tab-container-item id="2" class="register-wrapper" >
            <mt-field label="用户名" @blur.native="identy" placeholder="请输入用户名"  v-model="register_username"></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="register_email"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="register_password1"></mt-field>
            <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="register_password2"></mt-field>
             <div class="error-register" v-if="register">
                {{registerTishi}}
            </div>  
            <mt-button type="primary" size="large"  class="btn-size"  @click.native="registernext">注册</mt-button>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from "@com/header/commonheader";
import { userLogin, register } from "@/api/author";
import { mapMutations } from "vuex";
import { Field } from "mint-ui";
import { setStore, getStore } from "@/assets/js/storage.js";
export default {
  name: "login",
  components: {
    commonHeader
  },
  data() {
    return {
      selected: "1",
      login_username: "",
      login_password: "",
      register_username: "",
      register_email: "",
      register_password1: "",
      register_password2: "",
      usertypes: 2,
      loginTishi: "",
      registerTishi: "",
      loginerr: false,
      register: false,
      msgame: ""
    };
  },
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getStore("username")) {
      this.$router.push("/index");
    }
  },
  methods: {
    identy() {
      if (this.register_username == "") {
        this.registerTishi = "用户名不能为空";
        this.register = true;
      }
    },
    ...mapMutations(["USER_TYPE", "RECORD_USERINFO"]),
    login() {
      if (this.login_username == "" || this.login_password == "") {
        this.loginerr = true;
        this.loginTishi = "请先输入用户名或密码！";
        return false;
      } else {
        var params = {
          username: this.login_username,
          password: this.login_password,
          captcha_code:"8627"
        };
        /*接口的传值是(-1,该用户不存在),(0,密码错误)，返回成功直接跳转*/
        userLogin(params).then(res => {
          console.log(res)
          // if (res.data.type == -1) {
          //   this.loginTishi = "该用户不存在";
          //   this.loginerr = true;
          // } else if (res.data.type == 0) {
          //   this.loginTishi = "密码输入错误";
          //   this.loginerr = true;
          // } else {
          //   this.loginTishi = "";
          //   this.loginerr = false;
          //   setStore("token", res.result.token);
          //   setStore("username", this.login_username);
          //   setStore("password", this.login_password);
          //   setTimeout(
          //     function() {
          //       this.$router.push("/index");
          //     }.bind(this),
          //     1000
          //   );
          // }
        });
      }
      // this.USER_TYPE(this.usertypes);
      // this.$router.go(-1);
    },
    registernext() {
      //验证用户名
      if (this.register_username == "") {
        this.registerTishi = "用户名不能为空";
        this.register = true;
        return false;
      }
      //邮箱
      var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (this.register_email == "") {
        this.registerTishi = "邮箱不能为空";
        this.register = true;
        return false;
      } else if (!regEmail.test(this.register_email)) {
        this.registerTishi = "邮箱格式不正确";
        this.register = true;
        return false;
      }
      //密码
      var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/; //
      if (this.register_password1 == "") {
        this.registerTishi = "密码不能为空";
        this.register = true;
        return false;
      } else if (!pwdReg.test(this.register_password1)) {
        this.registerTishi = "密码不合法";
        this.register = true;
        return false;
      }
      //两次密码一致
      if (this.register_password2 == "") {
        this.registerTishi = "密码不能为空";
        this.register = true;
        return false;
      } else if (this.register_password2 != this.register_password1) {
        this.registerTishi = "输入密码保持一致";
        this.register = true;
        return false;
      }
      this.registerTishi = "";
      this.register = false;
      var params = {
        register_username: this.register_username,
        register_email: this.register_email,
        register_password1: this.register_password1,
        register_password2: this.register_password2
      };
      register(params).then(res => {
        if (res.result.state === 5) {
          // 验证成功后的操作
          //设置cookie
         // setCookie("username", this.login_username, 1000 * 60);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.widthhalf {
  /*width: 48%;*/
  margin: 0 auto;
  .mui-my-content {
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 3px solid #26a2ff; /*no*/
      color: #26a2ff;
      margin-bottom: -3px; /*no*/
    }
    .login {
      color: #333;
      margin-top: 40px;
      background-color: #fff;
      overflow: visible;
    }
  }
}
</style>
