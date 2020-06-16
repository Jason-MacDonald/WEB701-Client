<template>
  <v-app>
    <!-- ##### DEVELOPMENT PANEL ##### for assistance during development. -->
    <div class="mb-10"/>
    <v-card class="px-4 pt-4 pb-3 mt-10">
      <div class="mt-2">
        <h2>Development Panel</h2>
        <div class="d-flex justify-center" :v-if="buttonEnabled == true">

          <v-btn @click="subscription">
            {{pushButtonText}}
          </v-btn>

          <v-btn class="ml-5" @click="triggerPush">
            Push Notification
          </v-btn>

        </div>
      </div>
    </v-card>

    <!-- ##### NAVIGATION DRAWER ##### -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">

          <router-link style="text-decoration: none; color: inherit;" to="/events">
            <v-list-item>                
              <v-list-item-title>
                Events
              </v-list-item-title>       
            </v-list-item>
          </router-link> 

          <router-link style="text-decoration: none; color: inherit;" to="/members">
            <v-list-item>
              <v-list-item-title>
                <v-list-item-title>Members</v-list-item-title>
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/items">
            <v-list-item>
              <v-list-item-title>      
                <v-list-item-title>Items</v-list-item-title>
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/login">
            <v-list-item v-if="this.$store.state.token == null">
              <v-list-item-title>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/account">
            <v-list-item v-if="this.$store.state.token != null">
              <v-list-item-title>
                <v-list-item-title>Account</v-list-item-title>  
              </v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- ##### APP BAR ##### -->
    <v-app-bar app color="white">
      <v-app-bar-nav-icon class="ml-2" @click="drawer = true"></v-app-bar-nav-icon>

      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/">
        <h2>NGC <span class="d-none d-lg-inline">Nelson Galleries Collective</span></h2>
      </router-link>

      <v-spacer></v-spacer>
      
      <router-link class="mx-3 d-none d-sm-inline" style="text-decoration: none; color: inherit;" to="/events">
        <h3>Events</h3>
      </router-link>

      <router-link class="mx-3 d-none d-sm-inline" style="text-decoration: none; color: inherit;" to="/members">
        <h3>Members</h3>
      </router-link>

      <router-link class="mx-3 d-none d-sm-inline" style="text-decoration: none; color: inherit;" to="/items">
        <h3>Items</h3>
      </router-link>
      

      <div class="mx-3 d-none d-sm-inline" v-if="this.$store.state.token == null">
        <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/login">
          <h3>Login</h3>
        </router-link>
      </div>

      <div class="mx-3 d-none d-sm-inline" v-if="this.$store.state.token != null">
        <router-link style="text-decoration: none; color: inherit;" to="/account">
          <h3>Account</h3>
        </router-link>
      </div>

      <div class="mx-3" v-if="this.$store.state.token != null">
        <v-btn style="text-decoration: none; color: inherit;" @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>

    </v-app-bar>
 
    <!-- #### ROUTED VIEW ##### -->
    <div class="mt-10 mb-10">
      <router-view class="mt-10"/>
    </div>
    <div class="mb-10"/>
    <div class="mb-10"/>
    <div class="mb-3"/>



    <!-- ##### FOOTER ##### -->
    <!-- 
      .absolute places the footer at the bottom of the visible window as a minimum 
      br's are temporary positioning fix.
    --> 
    <v-footer absolute padless> 
      <v-card
        flat
        tile
        width="100%"
        class="grey darken-3 lighten-1 text-center"
      >
        <v-card-text>
          <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/">
            <v-icon size="24px">mdi-home</v-icon>
          </router-link>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    loggedIn: false,
    drawer: false,

    // Push notification related variables.
    swRegistration: "",
    pushButtonText: "Push Messaging Not Available",
    buttonEnabled: false,
    isSubscribed: false
  }),
  created() {
    if (localStorage.getItem("jwt") != "null") { // Ensures user is login is updated on created and on refresh.
      this.loggedIn = true;
      this.$store.dispatch("getAccount"); // Sets the store account to the logged in account after jwt authentication.

      if(this.$route.path != "/home") 
        this.$router.push("/home"); // Navigate to home if not already at home. (For refresh)

      console.log(localStorage.getItem("jwt"));
    } else {
      this.loggedIn = false;
      console.log(localStorage.getItem("jwt"));
    } 
  },
  methods: {
    logout() { // Removes any account information from store and local storage.
      this.$store.commit("setToken", null);
      this.$store.commit("clearAccount", null);
      this.$router.push("/login");
      var storage = window.localStorage;
      storage.clear();
    },   
    subscription (){
      if(this.isSubscribed){
        alert("unsubscribing");
        this.unsubscribeUser();
      }
      else{
        alert("subscribing");
        this.buttonEnabled == false;
        this.subscribeUser();
      }
    },
    triggerPush () {
      alert("Getting Subscriptions.");
      this.$store.dispatch("triggerPush");
    },
    subscribeUser() {
      let _this = this;
      const applicationServerPublicKey = this.urlB64ToUint8Array('BKpP09O0gtV3MIlztTaGgzLFw5M69UXuHzwqjhZL3QpxsaQDUP2z_GJllH8L7NKWNeUUlYGmD0Oyu2NfKxcAacI');
      //const applicationServerPublicKey = 'BKpP09O0gtV3MIlztTaGgzLFw5M69UXuHzwqjhZL3QpxsaQDUP2z_GJllH8L7NKWNeUUlYGmD0Oyu2NfKxcAacI';
      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
      })
      .then(function(subscription) {
        console.log("User is subscribed");
        console.log(subscription);
        _this.updateSubscriptionOnServer(subscription);
        _this.isSubscribed = true;
        _this.buttonEnabled = true;
        _this.pushButtonText = 'Disable Push Messaging';
      })
      .catch(function(err) {
        console.error("Failed to subscribe the user: ", err)
      });
    },
    unsubscribeUser() {
      let _this = this;
      this.swRegistration.pushManager.getSubscription()
      .then(function(subscription){
        if(subscription){
          return subscription.unsubscribe();
        }
      })
      .catch(function(error) {
        console.log("Error unsubscribing", error);
      })
      .then(function() {
        _this.$store.dispatch("removeSubscriptionFromDatabase");
       // _this.updateSubscriptionOnServer();
        console.log("User is unsubscribed");
        _this.isSubscribed = false;
        _this.pushButtonText = 'Enable Push Messaging';
      })
    },
    updateSubscriptionOnServer(subscription) {
      this.$store.dispatch("savePushSubscription", subscription);
    },
    serviceWorker() {
      //let isSubscribed = false;
      // eslint-disable-next-line no-unused-vars
      //let swRegistration = null;
      let _this = this;

      if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');

        navigator.serviceWorker.register('./sw.js')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);

          _this.swRegistration = swReg;
          _this.initializeUI(_this);
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
      } else {
        console.warn('Push messaging is not supported');
        _this.pushButtonText = 'Push Not Supported';
      }
    },
    initializeUI(_this) {
        // Set the initial subscription value
      _this.swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        _this.isSubscribed = !(subscription === null);

        if (_this.isSubscribed) {
          _this.buttonEnabled = true;
          console.log('User IS subscribed!');
          _this.pushButtonText = 'Disable Push Messaging';
          _this.subscribed = true;
        } else {
          console.log('User is NOT subscribed!');
          _this.pushButtonText = 'Enable Push Messaging';
          _this.subscribed = false;
        }
      })
    },
    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        //eslint-disable-next-line no-useless-escape
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  },
  
  mounted() {
      this.serviceWorker();
  },
};
</script>

<style scoped>
li a {
  text-decoration: none;
  color: black;
}
</style>
