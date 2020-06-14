<template>
  <v-container>

    <v-card class="px-4 py-4">
      <v-card class="px-4 pb-1">

        <!-- ##### CAROUSEL ##### -->
        <v-carousel class="pt-4 mb-4">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        
        <!-- ##### MEMBER TITLE ##### -->
        <h2 class="px-2 pt-1">
          {{ this.$store.state.members[this.$store.state.selectedMemberIndex].name }}
        </h2>

        <!-- ##### MEMBER DESCRIPTION ##### -->
        <p class="px-2 pb-1">
          {{ this.$store.state.members[this.$store.state.selectedMemberIndex].description }}
        </p>
        
      </v-card>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "Member",
  data: () => ({ // Local copy of Member data. (Also includes images for prototyping)
    member: {},
    // Prototype image sources.
    items: [
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',},
    ],
  }),
  created() { // Retreives and sets local member to store's selected member.
    try{
      this.member = this.$store.state.members[this.$store.state.selectedMemberIndex];
    }
    catch(ex){
      console.log("Error MEM001: " + ex.message);
      alert("Error MEM001: The system was unable to get member information.");
    }
  }
};
</script>