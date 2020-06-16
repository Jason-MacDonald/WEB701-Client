<template>
  <v-container>

    <v-card class="px-4 pt-4 pb-3">
        <h1 class="text-center pb-4">Items</h1>
      <div class="d-flex flex-wrap justify-center">
        <!-- ##### GALLERY OF ITEMS ##### -->
        <div v-for="(item, index) in this.$store.state.items" :key="index">
          <!-- Pagination calculation -->
          <div v-if="index < page * perPage && index >= page * perPage - perPage">
            <v-card class="px-4 mb-4 py-1 pt-3 mx-4 d-flex flex-column" width="330px" height="370px">
              <v-img
              src="https://picsum.photos/230/165?random"
              width="100%"
              height="165px"
              max-height="165"
              class="grey darken-4"
            ></v-img>

              <!-- ##### ITEM TITLE ##### -->
              <h2 class="px-2 pt-1">
                {{item.name}}
              </h2>

              <!-- ##### ITEM DESCRIPTION ##### -->
              <p class="px-2 pb-1">
                {{item.description.substring(0, 80)}}...
              </p>

              <v-spacer/>

              <!-- ##### SEE MORE BUTTON ##### -->
              <div class="px-2 pb-4">
                <v-btn color="primary" @click="setSelectedItemIndex(index)">
                    See More
                </v-btn>
              </div>

            </v-card>
          </div>
          
        </div>
      </div>
      <!-- ##### PAGINATION #####  -->
      <div class="text-center">
        <v-pagination v-model="page" total-visible="10" :length="Math.ceil(this.$store.state.items.length / perPage)" />
      </div>
    
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Items",
  data() { // Pagination variables.
    return { 
      page: 1,
      perPage: 3
    }
  },
  created() { // Ensures store Items is up do date on created.
    try{
      this.$store.dispatch("getItems");
    }
    catch(ex) {
      console.log("Error ITS001: " + ex.message);
      alert("Error ITS001: The system was unable to get item information.")
    }
    
  },
  methods: {
    async setSelectedItemIndex(index) { // Sets selected item in store and navigates to Item page.
      try{
        await this.$store.dispatch("selectItem", index); // Sets selected item in store.
        this.$router.push("/item"); // Navigates to Item page.
      }
      catch(ex) {
        console.log("Error EVS002: " + ex.message);
        alert("Error EVS002: The system was unable to get item information.");
      }
    }
  }
};
</script>