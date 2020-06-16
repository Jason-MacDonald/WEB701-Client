<template>
  <v-container>
    <v-card >
        <h1 class="text-center pt-4">Events</h1>
      <!-- Container to hold gallery of events. -->
      <div class="px-4 pt-4 pb-3 d-flex flex-wrap justify-center">

      <!-- ##### GALLERY OF EVENTS ##### -->    
        <div v-for="(event, index) in this.$store.state.events" :key="index">
          <!-- Pagination calculation -->
          <div v-if="index < page * perPage && index >= page * perPage - perPage">         
            <v-card class="px-4 mb-4 py-1 pt-3 mx-4 d-flex flex-column" width="330px" height="430">
              <v-img
              src="https://picsum.photos/230/165?random"
              width="100%"
              height="165"
              max-height="165"
              class="grey darken-4"
              ></v-img>

              <!-- ##### EVENT TITLE ##### -->
              <h2 class="px-2 pt-1">
                {{ event.name }}
              </h2>

              <!-- ##### EVENT DESCRIPTION ##### -->
              <p class="px-2 pb-1">
                {{ event.description.substring(0,80) }}...
              </p>

              <v-spacer/>

              <!-- formatDate and formatTime located in main.js -->
              <!-- ##### EVENT START DATE DISPLAY ##### -->         
              <div class="px-2">
                {{ event.startDate | formatDate }}
              </div>

              <!-- ##### STARTDATE AND ENDDATE DISPLAY ##### -->
              <p class="px-2 pb-1">
                {{ event.startDate | formatTime }} - {{ event.endDate | formatTime }}
              </p>

              <!-- ##### SEE MORE BUTTON ##### -->
              <div class="px-2 pb-4">
                <v-btn color="primary" @click="setSelectedEventIndex(index)">
                    See More
                </v-btn>
              </div>
            
            </v-card>
          </div>
        </div>
      </div>

      <!-- ##### PAGINATION #####  -->
      <div class="text-center">
        <v-pagination class="pb-3" v-model="page" total-visible="10" :length="Math.ceil(this.$store.state.events.length / perPage)" />
      </div>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Events",
  data: () => ({ // Holds data for pagination. 
    page: 1,
    perPage: 3
  }),
  created() { // Updates the store event array from the database on created.
    try{
      this.$store.dispatch("getEvents");    
    }
    catch(ex) {
      console.log("Error EVS001: " + ex.message);
      alert("Error EVS001: The system was unable to get event information.")
    }  
  },
  methods: {
    setSelectedEventIndex(index) { // Sets stores selected event index and navigates to the event page.
      try{
        this.$store.dispatch("selectEvent", index); // Updates the store selected Event index to the selected Events index.    
        this.$router.push("/event"); // Navigates to event.
      }
      catch(ex) {
        console.log("Error EVS002: " + ex.message);
        alert("Error EVS002: The system was unable to get event information.");
      } 
    }
  }
};
</script>