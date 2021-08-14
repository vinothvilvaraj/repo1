<template>
  <header class="main-header">
    <span class="logo-mini">
     <!-- <img src="/static/img/images/cmslogo_icon.png" alt="Logo" class="img-responsive center-block logo" style="width:100px"/>  -->
     <img src="/static/img/images/cmslogo_icon.png" alt="Logo" class="img-responsive center-block logo" style="width:100px"/>
    </span>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
    <!-- <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a> -->
      <div class="navbar-custom-center">
          <ul class="nav navbar-nav">
            <li>Central Data Collection System (CDCS)</li>
          </ul>
      </div>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!--
          <notifications-menu></notifications-menu>
          <tasks-menu></tasks-menu>
           -->
        <dashboard-menu></dashboard-menu>
        <messages-menu></messages-menu>
        <commands-menu></commands-menu>
        <ssdata-menu></ssdata-menu>
        <view-menu></view-menu>
        <diags-menu></diags-menu>
        <diagnostic-menu></diagnostic-menu>
        <user-menu :user="user"></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import { mapState } from 'vuex'
import DashboardMenu from './DashboardMenu'
import MessagesMenu from './MessagesMenu'
import CommandsMenu from './CommandsMenu'
// import ReportsMenu from './ReportsMenu'
import DiagnosticMenu from './DiagnosticMenu'
import SsdataMenu from './SsdataMenu'
import NotificationsMenu from './NotificationsMenu'
import TasksMenu from './TasksMenu'
import UserMenu from './UserMenu'
import ViewMenu from './ViewMenu'

export default {
  name: 'DashHeader',
  components: {
    UserMenu,
    MessagesMenu,
    DashboardMenu,
    CommandsMenu,
    DiagnosticMenu,
    ViewMenu,
    //ReportsMenu,
    SsdataMenu
  },
   data () {
    return {
      sessionLoginID: this.$session.get('sessionloginID'),
      username: this.$session.get('username'),
      userrole: this.$session.get('userrole'),
      checkactivated:null,
      }
    },
  props: ['user'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created(){
     // document.addEventListener('beforeunload', this.handler);
     /* window.onbeforeunload = function (event) {
       var _this = this;
    var message = 'Important: Please click on \'Save\' button to leave this page.';
    if (typeof event == 'undefined') {
        event = window.event;
    }
    if (event) {
        event.returnValue = message;
    }
    return message;
};
*/
  },
  mounted(){
    if(this.username == undefined){
      this.clearsession();
     this.$router.push({ name: 'Login' });
   }
  //  else{
  //    console.log('this.userrole :', this.userrole);
  //   if(this.userrole == "Admin"){
  //   this.checkactivated = setInterval(() => {
  //     this.checkactivatedSession();
  //   }, 5000);
  //  }
  //  }
  },
  methods:{
     handler() {
       if(this.username == undefined){
      this.clearsession();
     this.$router.push({ name: 'Login' });
   }else{
     console.log('this.userrole :', this.userrole);
    if(this.userrole == "Admin"){
    this.checkactivated = setInterval(() => {
      this.checkactivatedSession();
    }, 5000);
   }
   }
    },
     checkactivatedSession(){
      var checkactivatedURL = this.checkactivatedURL.replace("$$sessionloginid$$",this.sessionLoginID)
        axios
        .get(checkactivatedURL)
        .then(response => {
          var checkactivateStatus = response.data.status;
          if (checkactivateStatus == "deactivated") {
         //  alert("Another admin has taken the access, So your machine has going to logout.");
           this.clearsession();
           this.$router.push({ name: 'Login' });
          }
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
   clearsession(){
      console.log('*HEADER CLEAR SESSION ALL*');
      this.$session.remove('sessionloginID');
      this.$session.remove('loginsession');
      this.$session.remove('username');
      this.$session.remove('userrole');
      this.$session.remove('userdetailsOBJ');
      if(this.checkactivated != null){
        clearInterval(this.checkactivated);
      }
    }
  },
}
</script>
<style  scoped>

.main-header .navbar-custom-center {
    float: left;
    background-color: transparent;
    background-image: none;
    color: #fff;
    font-size: 32px !important;
    margin-left: 170px;
}
</style>
