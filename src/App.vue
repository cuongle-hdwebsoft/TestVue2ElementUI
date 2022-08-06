<template>
  <div class="wrapper">
    <el-form :model="form" ref="formRef">
      <el-form-item 
        :rules="rules.username" 
        label="Username"
        prop="username"
        :required="true"
      >
        <el-input 
          placeholder="Username"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item 
        :rules="rules.password" 
        label="Password"
        prop="password"
        :required="true"
      >
        <el-input 
          placeholder="Password" 
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item
        :rules="rules.sick" 
        prop="sick"
        label="Are you sick in a few day ago?"
      >
        <el-radio-group @change="handleChangeRadio" v-model="form.sick">
          <el-radio label="No I am not"></el-radio>
          <el-radio label="Yes I am"></el-radio>
          <el-radio label="I do not remember"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button @click="handleSubmit" type="primary">Submit</el-button>
    </el-form>
    <p>loginForm: {{ loginForm }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      form: {
        username: '',
        password: '',
        sick: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please enter username', trigger: ['change', 'blur'] },
          {
            validator(rule, value, callback) {
              console.log('validator rule, value, callback username');

              if(value === 'leminhcuong') {
                return callback('Please enter another username')
              }

              return callback();
            },
            trigger: ['change', 'blur'],
          }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: ['change', 'blur'] },
          {
            validator(rule, value, callback) {
              console.log('validator rule, value, callback password');

              if(value.length < 5) {
                return callback('Password is too weak')
              }

              return callback();
            }
          }
        ],
        sick: [
          { required: true, message: 'Please choose sick', trigger: ['change'] },
          {
            validator(rule, value, callback) {
              if(value === 'Yes I am') {
                return callback('Oh no !!!')
              }

              return callback();
            }
          }
        ]
      },
      loginForm: {}
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid, fields) => {
        if(!valid) {
          return console.log('Error', fields);
        }

        this.loginForm = this.form;
        return console.log('fields', this.form);
      })
    },
    handleChangeRadio(e) {
      console.log('handleChangeRadio', e);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

.wrapper {
  width: 50%;
  margin: auto;
}
</style>
