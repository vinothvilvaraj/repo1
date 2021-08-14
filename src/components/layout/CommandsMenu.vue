<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-commenting-o"></i> Command <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li>
        <ul class="menu text-left" style="cursor: pointer">
          <li @click="calOnDemandCommandsMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/ondemand">
                <i class="fa fa-commenting-o" style="color:#1a495e;"></i>
                <span class="page"> On Demand Commands</span>
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
  name: "CommandsMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    calOnDemandCommandsMethod(){
      this.$router.push({ path: '/tangedco/ondemand' });
    },
  },
};
</script>
