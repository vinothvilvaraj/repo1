<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img src="/static/img/images/user.png" class="user-image" />
      <!--    <img :src="user.avatar" class="user-image" alt="User Image"> -->
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{userObj.user_name}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
             <img src="/static/img/images/cmslogo_icon.png" alt="Logo" class="img-responsive image" style="width:100px;margin-left: 75px;"/> 
           <!--   <img src="/static/img/modem.png" class="image" style="width:50px;"/> -->
          <small><i class="fa fa-user"></i> {{userObj.role}}</small>
           <small>Central Data Collection System (CDCS)</small>
        </p>
      </li>
      <li class="user-footer" @click="logoutAction">
        <a href="javascript:;" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </li>
</template>
<script>
import Vue from "vue";
import axios from "axios";
export default {
  name: 'UserMenu',
  props: ['user'],
  components: {
  },
  data() {
    return {
      section: 'Login',
      session_id:this.$session.get('sessionloginID'),
      userRole: this.$session.get('userrole'),
      userObj: this.$session.get('userdetailsOBJ'),
      loading: '',
      username: '',
      password: '',
      response: '',
    }
  },
  destroyed(){
    this.logoutAction();
  },
  methods: {
    logoutAction() {
      this.isLoading =true;
      var logoutPostjson = {"user_role":this.userObj.role,"session_id":this.session_id,"user_name":this.userObj.user_name,"password":this.userObj.password,"login_flag":"false"};
      console.log('logout :', JSON.stringify(logoutPostjson));
       axios.post(this.logoutUrl, logoutPostjson)
          .then(response => {
            var status = response.data.status;
            if (status == "logout success!") {
            this.$router.push({ name: 'Login' });
            this.clearsession();
            this.isLoading =false;
            }else{
              this.warningMessage(status);
              this.isLoading =false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    clearsession(){
      console.log('*CLEAR SESSION ALL*');
      this.$session.remove('sessionloginID');
      this.$session.remove('loginsession');
      this.$session.remove('username');
      this.$session.remove('userrole');
      this.$session.remove('userdetailsOBJ');
    }
    }

}
</script>
