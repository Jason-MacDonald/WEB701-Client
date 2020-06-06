import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("jwt"),
    account: null,
    member: null,
    selectedEventIndex: 0,
    selectedItemIndex: 0,
    selectedMemberIndex: 0,
    events: [],
    items: [],
    members: [],
    itemBids: []
  },
  mutations: {
    // ##### REFRESH #####
    refreshEvents(state, events) {
      state.events = events;
    },
    refreshItems(state, items) {
      state.items = items;
    },
    refreshMembers(state, members) {
      state.members = members;
    },
    refreshItemBids(state, itemBids) {
      state.itemBids = itemBids;
    },
    // ##### UPDATE INDEX #####
    updateSelectedEventIndex(state, index) {
      state.selectedEventIndex = index;
    },
    updateSelectedItemIndex(state, index) {
      state.selectedItemIndex = index;
    },
    updateSelectedMemberIndex(state, index) {
      state.selectedMemberIndex = index;
    },
    setAccountDetails(state, account) {
      state.account = account;
    },
    setMemberDetails(state, member){
      state.member = member;
    },
    // ##### TOKEN #####
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("jwt", token);
    },
    clearAccount(state) {
      state.account = null;
    },
  },
  actions: {
    // ##### API CALLS #####
    // ### ACCOUNT ###
    async register(unused, user) {
      await axios.post("https://webdev.talos.net.nz/web701_sj/server/api/users/register", user);
      await this.dispatch("login", user);
    },
    async login({ commit }, user) {
      let jwt = (await axios.post("https://webdev.talos.net.nz/web701_sj/server/api/users/login", user)).data;
      commit("setToken", jwt);
      this.dispatch("getAccount");
    },
    async getAccount({ commit }) {
      const endpoint = await axios.get(
        "https://webdev.talos.net.nz/web701_sj/server/api/users/account",
        {
          headers: { authorization: localStorage.getItem("jwt") },
        }
      );
      commit("setAccountDetails", endpoint.data);
    },
    async getMember({ commit }) {
      const endpoint = await axios.get(
        "https://webdev.talos.net.nz/web701_sj/server/api/member",
        {
          headers: { authorization: localStorage.getItem("jwt") },
        }
      );
      commit("setMemberDetails", endpoint.data);
    },
    async putAccount(unsued, user) {
      axios.put("https://webdev.talos.net.nz/web701_sj/server/api/users/account/update", user);
    },
    // ##### PUSH NOTIFICATION SUBSCRIPTION #####
    async savePushSubscription(unused, pushSubscription) {
      let PushSubscription = (JSON.stringify(pushSubscription));
      axios.put("https://webdev.talos.net.nz/web701_sj/server/api/users/account/subscribe", PushSubscription, { headers: { "Content-Type": "application/json", authorization: localStorage.getItem("jwt") }});
    },
    async triggerPush() {
      axios.post("https://webdev.talos.net.nz/web701_sj/server/api/users/trigger-push");
    },
    // ### GET ALL ###
    async getEvents({ commit }) {
      const endpoint = await axios.get("https://webdev.talos.net.nz/web701_sj/server/api/events");
      var events = endpoint.data;
      commit("refreshEvents", events);
    },
    async getItems({ commit }) {
      const endpoint = await axios.get("https://webdev.talos.net.nz/web701_sj/server/api/items");
      var items = endpoint.data;
      commit("refreshItems", items);
    },
    async getMembers({ commit }) {
      const endpoint = await axios.get("https://webdev.talos.net.nz/web701_sj/server/api/members");
      var members = endpoint.data;
      commit("refreshMembers", members);
    },
    async getBids({commit}, id) {
      const endpoint = await axios.get("https://webdev.talos.net.nz/web701_sj/server/api/bids/" + id);
      var itemBids = endpoint.data;
      commit("refreshItemBids", itemBids);
    },
    // ### POST ###
    async postNewEvent(unused, data) {
      await axios.post("https://webdev.talos.net.nz/web701_sj/server/event", data, { headers: { authorization: localStorage.getItem("jwt") }});
      this.dispatch("getEvents");
    },
    async postNewItem(unused, data) {
      await axios.post("https://webdev.talos.net.nz/web701_sj/server/api/item", data, { headers: { authorization: localStorage.getItem("jwt") }});
      this.dispatch("getItems");
    },
    async postBid(unused, bid) {
      await axios.post("https://webdev.talos.net.nz/web701_sj/server/api/bid", bid, { headers: { authorization: localStorage.getItem("jwt") }});
    },
    // ### PUT ###
    async putItem(unsued, item) {
      item.active = false;
      axios.put("https://webdev.talos.net.nz/web701_sj/server/api/item", item);
      this.dispatch("getItems");
    },
    async putMember(unsued, member) {
      await axios.put("https://webdev.talos.net.nz/web701_sj/server/api/member", member, { headers: { authorization: localStorage.getItem("jwt") }});
      this.dispatch("getMembers");
    },
    // ### DELETE ###
    async deleteEvent(unused, id) {
      await axios.delete("https://webdev.talos.net.nz/web701_sj/server/api/event/" + id);
      this.dispatch("getEvents");
    },
    async deleteItem(unused, id) {
      await axios.delete("https://webdev.talos.net.nz/web701_sj/server/api/item/" + id);
    },
    // ##### STORE MANIPULATIN #####
    // ### SET INDEX ###
    async selectEvent({ commit }, index) {
      commit("updateSelectedEventIndex", index);
    },
    async selectItem({ commit }, index) {
      commit("updateSelectedItemIndex", index);
    },
    async selectMember({ commit }, index) {
      commit("updateSelectedMemberIndex", index);
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
  },
  modules: {},
});
