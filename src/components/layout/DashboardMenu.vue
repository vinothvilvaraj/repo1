<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-desktop"></i> Dashboard <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li >
        <ul class="menu text-left" style="cursor: pointer">
          <li @click="calMainDashboardMethod">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/index">
                <i class="fa fa-desktop" style="color:#1a495e;"></i>
                <span class="page"> Main Dashboard </span>
              </router-link>
            </a>
          </li>
          <li @click="calGraphicalDashboardMethod">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/graphicaldashboard">
                <i class="fa fa-line-chart" style="color:#1a495e;"></i>
                <span class="page"> Graphical Dashboard  </span>
              </router-link>
            </a>
          </li>
           <li @click="calViewSSMethod">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/ssdetailspage">
                <i class="fa fa-map-marker" style="color:#1a495e;"></i>
                <span class="page"> Sub Station Dashboard </span>
              </router-link>
            </a>
          </li>
        </ul>
      </li>
      <li>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
import MessageItem from "./MessageItem";
export default {
  name: "DashboardMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    alertmeg(){
      alert('Need to implement');
      return false;
    },
    calMainDashboardMethod(){
      this.$router.push({ path: '/tangedco/index' });
    },
    calGraphicalDashboardMethod(){
      this.$router.push({ path: '/tangedco/graphicaldashboard' });
    },
    calViewSSMethod(){
       this.$router.push({ path: '/tangedco/ssdetailspage' });
    },
  },
};
</script>
