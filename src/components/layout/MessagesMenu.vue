<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-cogs"></i> Management <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li>
        <ul class="menu text-left" style="cursor: pointer">
           <li @click="calSubStationManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/ssmanagement">
                <i class="fa fa-map-marker" style="color:#1a495e;"></i>
                <span class="page"> Sub Station Management  </span>
              </router-link>
            </a>
          </li>
          <li @click="calDeviceManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/devicemanagement">
                <i class="fa fa-cog" style="color:#1a495e;"></i>
                <span class=""> DCU Management </span>
              </router-link>
            </a>
          </li>
          <li @click="calUserManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/usermanagement">
                <i class="fa fa-user" style="color:#1a495e;"></i>
                <span class="page"> User Management  </span>
              </router-link>
            </a>
          </li>
           <li @click="calNotifManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/notificationmanagement">
                <i class="fa fa-bell" style="color:#1a495e;"></i>
                <span class="page"> Notification Management  </span>
              </router-link>
            </a>
          </li>
          <li @click="calThresholdManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/thresholdmanagement">
                <i class="fa fa-lightbulb-o" style="color:#1a495e;"></i>
                <span class="page"> Threshold Management  </span>
              </router-link>
            </a>
          </li>
          <li @click="calFirmwareManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/firmwaremanagement">
                <i class="fa fa-object-group" style="color:#1a495e;"></i>
                <span class="page"> Firmware Management  </span>
              </router-link>
            </a>
          </li>
           <li v-show="false" @click="calImportFileManagementMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/substation/importfile">
                <i class="fa fa-cogs" style="color:#1a495e;"></i>
                <span class="page"> Import File Management  </span>
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
  name: "MessagesMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    calDeviceManagementMethod(){
        this.$router.push({ path: '/tangedco/devicemanagement' });
    },
    calUserManagementMethod(){
        this.$router.push({ path: '/tangedco/usermanagement' });
    },
    calImportFileManagementMethod(){
        this.$router.push({ path: '/tangedco/substation/importfile' });
    },
    calSubStationManagementMethod(){
        this.$router.push({ path: '/tangedco/ssmanagement' });
    },
    calNotifManagementMethod(){
       this.$router.push({ path: '/tangedco/notificationmanagement' });
    },
    calThresholdManagementMethod (){
        this.$router.push({ path: '/tangedco/thresholdmanagement' });
    },
    calFirmwareManagementMethod(){
        this.$router.push({ path: '/tangedco/firmwaremanagement' });
    },
  },
};
</script>
