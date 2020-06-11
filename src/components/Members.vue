<template>
  <v-container>
    <v-card >
      <div class="pt-4 d-flex flex-wrap justify-center">
        <!-- ##### GALLERY OF MEMBERS ##### -->
        <div v-for="(member, index) in this.$store.state.members" :key="index">
          <!-- Pagination calculation -->
          <div v-if="index < page * perPage && index >= page * perPage - perPage">

            <v-card class="px-4 mb-4 py-1 pt-3 mx-4" width="330px" >
            <v-img
              src="https://picsum.photos/230/165?random"
              width="100%"
              height="165px"
              class="grey darken-4"
            ></v-img>

              <!-- ##### MEMBER TITLE ##### -->
              <h2 class="px-2 pt-1">
                {{member.name}}
              </h2>

              <!-- ##### MEMBER DESCRIPTION ##### -->
              <p class="px-2 pb-1" >
                {{member.description}}
              </p>


              <div class="px-2 pb-4">
                <v-btn @click="setSelectedMemberIndex(index)">
                    See More
                </v-btn>
              </div>

            </v-card>
          </div>
        </div>
      </div>
      <!-- ##### PAGINATION #####  -->
      <div class="text-center">
        <v-pagination class="pb-3" v-model="page" total-visible="10" :length="Math.ceil(this.$store.state.members.length / perPage)" />
        <br/>
      </div>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Members",
  data() {
    return {
      page: 1,
      perPage: 8,
    }
  },
  created() {
    try{
      this.$store.dispatch("getMembers");
    }
    catch(ex){
      console.log("Error MES001: " + ex.message);
      alert("Error MES001: The system was unable to get member information.")
    }
  },
  methods: {
    setSelectedMemberIndex(index) {
      try{
        this.$store.dispatch("selectMember", index);
        this.$router.push("/member"); 
      }
      catch(ex) {
        console.log("Error MES002: " + ex.message);
        alert("Error MES002: The system was unable to get member information.");
      }
    }
  }
};
</script>
