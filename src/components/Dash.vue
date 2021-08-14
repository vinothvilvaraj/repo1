<template>
  <div :class="['wrapper', classes]" @click="hideRightClickpane">

    <!-- Horizontal bar at top. Contains messages, notifications, tasks and user menu -->
    <dash-header ></dash-header>
    <!-- Left side column. contains the logo and sidebar -->
   <!-- <sidebar ref="sidebar"/>   -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="margin-left:0px">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1 style="color:#0073b7;" v-show="$route.name != 'Main Dashboard'">
          {{$route.name }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
         <!-- <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name}}</li>-->
        </ol>
      </section>
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->
    <!-- Horizontal bar at bottom. Contains copy right -->
    <dash-footer></dash-footer>
  </div>
</template>

<script>
import config from '../config'
import DashFooter from './layout/DashFooter'
import DashHeader from './layout/DashHeader'
import Sidebar from './layout/Sidebar'

export default {
  name: 'Dash',
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data: function () {
    return {
      // section: 'Dash',
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      }
    }
  },
  computed: {
  },
  methods: {
    hideRightClickpane () {
      // document.getElementById('rightclickpopup').style.display = 'none'
      var elem = document.getElementById('rightclickpopup')
      if (typeof elem !== 'undefined' && elem !== null) {
        elem.style.display = 'none'
      }
    }
  }
}
</script>

<style>
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
