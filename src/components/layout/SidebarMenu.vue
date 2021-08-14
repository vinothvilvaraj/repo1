<template>
<div>
  <ul class="sidebar-menu">
    <li class="header">MENUS </li>
   <!--  <li class="treeview">
      <a href="#">
        <i class="fa fa-cog text-yellow"></i>
        <span class="treeview-title">Dashboard</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw "></i>
        </span>
      </a>
      <ul class="treeview-menu" style="cursor:pointer;">
        <li>
          <a @click="modbusFunction1">
            <i class="fa fa-cogs text-yellow"></i> Dashboard 1
          </a>
        </li>
        <li>
          <a @click="modbusFunction2">
            <i class="fa fa-cogs text-yellow"></i>
          </a>
        </li>
        <li>
          <a @click="modbusFunction2">
            <i class="fa fa-cogs text-yellow"></i> Dashboard 3
          </a>
        </li>
      </ul>
    </li> -->
     <router-link tag="li" class="pageLink" to="/tangedco/index">
      <a>
        <i class="fa fa-desktop text-white"></i>
        <span class="page"> Main Dashboard </span>
      </a>
    </router-link>
  <router-link tag="li" class="pageLink" to="/tangedco/graphicaldashboard">
      <a>
        <i class="fa fa-line-chart text-white"></i>
        <span class="page"> Graphical Dashboard </span>
      </a>
    </router-link>
   <!--  <router-link tag="li" class="pageLink" to="/tangedco/ondemand">
      <a>
        <i class="fa fa-comments-o text-white"></i>
        <span class="page"> On Demand Config</span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/tangedco/communicationdashboard">
      <a>
        <i class="fa fa-connectdevelop text-white"></i>
        <span class="page"> Connectivity Dashboard </span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/tangedco/dataavailabilitydashboard">
      <a>
        <i class="fa fa-delicious text-white"></i>
        <span class="page"> Data Availability Dashboard </span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/tangedco/checkscreen">
      <a>
        <i class="fa fa-desktop text-white"></i>
        <span class="page"> Chech Screen </span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/tangedco/checkscreen1">
      <a>
        <i class="fa fa-desktop text-white"></i>
        <span class="page"> Chech Screen1 </span>
      </a>
    </router-link>-->
  </ul>
  </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'
export default {
  name: 'SidebarMenu',
  components: {
  },
  data() {
    return {
      rightclickFlag: false,
      iocardName: null,
      cardSLOTValue: 0,
      loading: '',
      username: '',
      password: '',
      response: '',
      userrole: ''
    }
  },
  updated () {
  },
  destroyed () {
    this.clearALLSession()
  },
  methods: {
    clearALLSession() {
      this.blockdevice = false
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style>
.rightclickMenu{
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-weight: 600;
  background:transparent;
  border: 1px solid transparent;
  width: 100%;
  height: 30px;
}
.rightclickMenu:hover{
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-weight: 600;
  color:white;
  background:#000;
  border: 1px solid transparent;
  width: 100%;
  height: 30px;
}
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}
</style>
