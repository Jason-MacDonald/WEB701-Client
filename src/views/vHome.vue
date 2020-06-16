<template>
  <div>
    <FeaturedEvents/>
    <FeaturedMembers/>
    <FeaturedItems/>

  </div>
</template>

<script>
import FeaturedEvents from "@/components/FeaturedEvents.vue";
import FeaturedMembers from "@/components/FeaturedMembers.vue";
import FeaturedItems from "@/components/FeaturedItems.vue";

export default {
  name: "vHome",
  components: {
    FeaturedItems,
    FeaturedMembers,
    FeaturedEvents
  }
};
</script>