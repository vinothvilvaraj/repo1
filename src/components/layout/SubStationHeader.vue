<template>
  <header class="main-header">
    <span class="logo-mini">
    <!-- <img src="/static/img/images/cmslogo_icon.png" alt="Logo" class="img-responsive center-block logo" style="width:100px"/>  -->
     <img src="/static/img/images/cmslogo_icon.png" alt="Logo" class="img-responsive center-block logo" style="width:100px"/> 
    </span>
    
    <nav class="navbar navbar-static-top" role="navigation">
      <div class="navbar-custom-center">
          <ul class="nav navbar-nav">
            <li>Central Data Collection System (CDCS)</li>
          </ul>
      </div>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
           <user-menu :user="user"></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>


<script>
import { mapState } from 'vuex'
import NotificationsMenu from './NotificationsMenu'
import TasksMenu from './TasksMenu'
import UserMenu from './UserMenu'
export default {
  name: 'SubStationHeader',
  components: {
    UserMenu
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
  props: ['user'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created() {

  },
  methods:{
   
     }
}
</script>
<style  scoped>
.main-header .navbar-custom-center {
    float: left;
    background-color: transparent;
    background-image: none;
    color: #fff;
    font-size: 32px !important;
    margin-left: 480px;
}
</style>
