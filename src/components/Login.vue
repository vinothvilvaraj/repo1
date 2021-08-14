<template>
  <div id='login'>
    <div style='height:105px'></div>
     <div class='text-center col-sm-3'>
     </div>
    <div class='text-center col-sm-6' style="box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);">
      <p></p>
       <img src='/static/img/images/cmslogo_icon.png' class='center-block' style="width:160px;"/>
      <h1 style='color:#fff'>Central Data Collection System (CDCS)</h1>
      <!-- login form -->
        <input name='username' placeholder='Username' type='text' v-model='username' style='width:50%;height:45px;' @keypress="clearlbl" v-on:keyup.enter="loginAction"/>
        <div style='height:20px'></div>
        <input name='password' placeholder='Password' type='password' v-model='password' style='width:50%;height:45px;' @keypress="clearlbl"  v-on:keyup.enter="loginAction" />

        <div style='height:20px'></div>
        <button type='submit' class='btn btn-lg' style="background-color:rgb(0, 29, 61);color:#fff;border: 1px solid #fff;" @click='loginAction'>Login</button>
       <p></p>
       <p>&nbsp;</p>
      <!-- errors -->
      <div v-if='responsemsg' class='text-red'>
        <p class='vertical-5p lead'>{{responsemsg}}</p>
      </div>
    </div>
    <div class='text-center col-sm-3'>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import CripNotice from 'crip-vue-notice'
// import VueElementLoading from 'vue-element-loading'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      loading: '',
      username: '',
      password: '',
      responsemsg: '',
      userrole: '',
      loginJson:'',
      sessionloginID:null,
    }
  },
  mounted () {

  },
  methods: {
    loginAction(){
       this.responsemsg = "";
       if (this.username == "" && this.password == "") {
        this.responsemsg = "Please enter username and password";
        return false;
      } else if (this.username == "") {
        this.responsemsg = "Please enter your username";
        return false;
      } else if (this.password == "") {
        this.responsemsg =  "Please enter your password";
        document.getElementById("disErrMsg").innerHTML = "";
        return false;
      } else if (this.username.length >= 33) {
        this.responsemsg = "Username too long - limit of 32 chars";
        return false;
      } else if (this.password.length >= 33) {
        this.responsemsg = "Password too long - limit of 32 chars";
        return false;
      }
      var checkbool = this.checksplChar(this.username);
      if (!checkbool) {
        this.responsemsg =  "User Name Only allow character, number and underscore";
        return false;
      }
      this.sessionloginID = this.getRandomInt(1000000000000);
      this.$session.set('sessionloginID', this.sessionloginID);
      var loginUrl = this.loginUrl.replace("$$username$$", this.username).replace("$$password$$", this.password).replace("$$sessionloginID$$",this.sessionloginID);
      console.log('loginUrl', loginUrl);
      axios
        .get(loginUrl)
        .then(response => {
          this.loginJson = response.data;
          console.log('this.loginJson :', JSON.stringify(this.loginJson));
          var loginuserstatus = this.loginJson.status;
          if (response.status === 200 ) {
          if (loginuserstatus == "Login success!") {
            var role = this.loginJson.details.role;
            var username = this.loginJson.details.user_name;
            this.$session.set('loginsession', 'Login success!');
            this.$session.set('username', username);
            this.$session.set('userrole', role);
            this.$session.set('userdetailsOBJ', this.loginJson.details)
            if(role == "Sub Station User"){
              this.$router.push({ path: '/tangedco/substation/importfile' });
            }else{
              this.$router.push({ path: '/tangedco/index' });
            }
            this.responsemsg = "";
            this.infoMessage('Login Successfully');
            return false;
         }
        //  else if(loginuserstatus.includes("already active")){
        //     var alertval = confirm(loginuserstatus);
        //     if(alertval){
        // axios
        // .get(this.deactivatedURL)
        // .then(response => {
        //   var deactivateStatus = response.data.status;
        //   if (deactivateStatus.includes("Success")) {
        //      this.$fire({title: "Confirmation",text: "Another machine logout successfully, please login your machine.",type: "success",timer: 44000
        //         }).then(r => {
        //         console.log(r.value);
        //     });
        //     //this.successMessage('Another machine logout successfully, please login your machine');
        //     return false;
        //   }else{
        //     this.warningMessage(deactivateStatus);
        //     return false;
        //   }
        // })
        // .catch(function(error) {
        //   // handle error
        //   alert(error);
        // })
        // .finally(function() {
        //   // always executed
        // });
        // return true;
        //     }else{
        //       return false;
        //     }
        //  }
         else{
           this.responsemsg = loginuserstatus;
            return false;
         }
         }else {
           this.responsemsg = loginuserstatus;
           return false;
          }
        })
        .catch(function(error) {
            alert(error.message);
             return false;
        });
    },
    clearlbl(){
       this.responsemsg = "";
    },
    loginAction1() {
      if(this.username ==  "admin" && this.password ==  "softel"){
        this.$session.set('loginsession', 'Login success!');
        this.$session.set('userrole', "Admin")
        this.$router.push({ path: '/tangedco/index' })
        this.infoMessage('Login Successfully');
        return false;
      }else{
        this.responsemsg = "Incorrect username and password.";
        return false;
      }
    },
    getRandomInt(max) {
  return "session_"+Math.floor(Math.random() * Math.floor(max));
},
    checksplChar(inputstring){
    var regex = /^[0-9a-zA-Z\_]+$/
    return regex.test(inputstring);
    },
    successMessage(msg) {
      this.$notice.success({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    warningMessage(msg) {
      this.$notice.warning({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    infoMessage(msg) {
      this.$notice.info({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    errorMessage(msg) {
      this.$notice.error({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    }
  }
}
</script>

<style>
#login {
  padding: 10em;
}
html,
body,
.container-table {
  height: 100%;
  background-color: #282b30 !important;
  background-image: url(/static/img/login.jpg);
  background-repeat: no-repeat;
  background-position: center
}

.container-table {
  display: table;
  color: white;
}

.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}

.vertical-20p {
  padding-top: 20%;
}

.vertical-10p {
  padding-top: 10%;
}

.vertical-5p {
  padding-top: 5%;
}

.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 50px;
  width: 50%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 50px;
}

@media (max-width: 1241px) {
  .input-group input {
    height: 50px;
  }
}
@media (min-width: 1242px) {
  form {
    padding-left: 20em;
    padding-right: 20em;
  }

  .input-group input {
    height: 50px;
  }

}

.input-group-addon i {
  height: 15px;
  width: 15px;
}

</style>
