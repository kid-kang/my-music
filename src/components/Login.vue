<template>
  <div class="wrap">
    <h2>请登录网易云账号</h2>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="user">
        <el-input type="text" v-model="form.user" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: "Login",
  data () {
    return {
      form: {
        user: "",
        password: "",
      },
      rules: {
        //form表单里rules属性绑定的对象，用来对表单内控件做格式校验
        user: [
          { required: true, message: "请输入手机号" },
          {
            validator (rule, value, callback) {
              //长度
              if (value.length !== 11 || !(/^(\d){11}$/.test(value))) callback(new Error("请输入11位的手机号"))
              else callback()
            },
          },
        ],
      },
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async (bool) => {
        if (!bool) return
        let res = await this.axios.get(`/login/cellphone?phone=${this.form.user}&password=${this.form.password}`)
        console.log(res)
        if (res.code === 200) {
          ElMessage({
            message: "登录成功",
            type: 'success',
            offset: 30
          })
          localStorage.setItem("cookie",res.cookie)
          this.$store.commit("setUserId",res.account.id)
          this.$store.commit("setToken", res.token)
        } else {
          this.form.password = ""
          ElMessage.error({
            message: `${res.message}`,
            center: true,
            offset: 30
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  h2 {
    line-height: 1.2rem;
    color: brown;
    font-weight: 600;
    margin-top: 2rem;
  }
  .el-form {
    padding: 0.3rem;
    .el-button--primary {
      width: 100%;
    }
  }
}
</style>