<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-square-o"></i> View <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li>
        <ul class="menu text-left" style="cursor: pointer">
          <li @click="calAuditMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/auditview">
                <i class="fa fa-newspaper-o" style="color:#1a495e;"></i>
                <span class="page"> Audit Trail </span>
              </router-link>
            </a>
          </li>
          <li @click="calReportsMethod()">
            <a>
               <router-link tag="li" class="pageLink" to="/tangedco/reportsview">
                <i class="fa fa-file" style="color:#1a495e;"></i>
                <span class="page"> Reports </span>
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
  name: "auditviewMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    calAuditMethod(){
      this.$router.push({ path: '/tangedco/auditview' });
    },
    calReportsMethod(){
      this.$router.push({ path: '/tangedco/reportsview' });
    },
    alertmeg(){
      alert('Need to implement');
      return false;
    },
  },
};
</script>
