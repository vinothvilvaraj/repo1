<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          
        </div>
        <div class="pull-left info">
          <div>
            <h5 class="white" style="margin-top: 5px;margin-bottom: 10px;font-weight: bold;font-size:17px;margin-left: -58px;">Central Data Collection System (CDCS)</h5>
          </div>
        </div>
      </div>
      <!-- search form (Optional) -->
      <!-- <form v-on:submit.prevent class="sidebar-form" id="searchForm">
        <div class="input-group" id="searchContainer">
          <span class="input-group-btn">
            <input type="text" name="search"  id="search"  class="search form-control"  data-toggle="hideseek" placeholder="Search Menus"
            data-list=".sidebar-menu">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form> -->
      <!-- Search form -->
      <!-- Sidebar Menu -->
      <sidebar-menu />
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import SidebarMenu from './SidebarMenu'
export default {
  name: 'Sidebar',
  props: ['user'],
  components: { SidebarMenu },
  data () {
    return {
      max: 0
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scope="local">
.user-panel .image img {
  border-radius: 0%;
}
#searchForm {
  padding-left: 0em;
  padding-right: 0em;
}
#searchContainer {
  height: 100%;
  padding-bottom: 0em;
}
#search {
  width: 80%;
  float: right;
}
#search-btn {
  width: 20%;
}
</style>
