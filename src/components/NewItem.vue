<template>
  <v-container>

    <v-card class="pa-4">
      <v-form v-model="valid">

        <!-- ##### SIMPLE INPUTS ##### -->
        <v-text-field 
          label="Item Title" 
          v-model="name" 
          :counter="30"
          :rules="titleRules"
        />

        <v-textarea 
          label="Item Description" 
          v-model="description" 
          :counter="255"
          :rules="descriptionRules"
        />

        <v-text-field 
          label="Estimated Value" 
          v-model="estimatedValue" 
          type="number" 
          :rules="cannotBeEmpty"
        />

        <v-text-field  
          label="Width" 
          v-model="width" 
          type="number" 
          :rules="cannotBeEmpty"
        />

        <v-text-field  
          label="Height" 
          v-model="height" 
          type="number" 
          :rules="cannotBeEmpty"
        />

        <v-text-field  
          label="Length" 
          v-model="length" 
          type="number" 
          :rules="cannotBeEmpty"
        />

        <v-text-field  
          label="Weight" 
          v-model="weight" 
          type="number" 
          :rules="cannotBeEmpty"
        />
        
        <v-text-field   
          label="Fragility" 
          v-model="fragility" 
          type="number" 
          :rules="cannotBeEmpty"
        />

        <v-text-field  
          label="Additional Costs" 
          v-model="freightCost" 
          type="number" 
        />
        
        <!-- ##### SUBMIT NEW ITEM BUTTON ##### -->
        <v-btn color="primary" @click="submitNewItem" :disabled="!valid">
          Submit Item
        </v-btn>

      </v-form>
    </v-card>
    
  </v-container>
</template>

<script>
export default {
  name: "NewItem",
  data: () => ({ // Models data from inputs.
    name: "",
    description: "",
    estimatedValue: "",
    active: true,
    email: null,
    height: "",
    width: "",
    length: "",
    weight: "",
    fragility: "",
    freightCost: "",
    valid: false,
    titleRules: [
      title => !!title || "A title is required",
      title => (title && title.length <= 40) || "Title must not exceed 40 characters"
    ],
    descriptionRules: [
      description => !!description || "A description is required",
      description => (description && description.length <= 255) || "Title must not exceed 255 characters"
    ],
    cannotBeEmpty: [
      title => !!title || "Field cannot be empty",

    ],
  }),
  methods: {
    async submitNewItem() {
      if(this.validItem()) {  
        let item = { // Creates new Item object to be inserted into database.
          name: this.name,
          description: this.description,
          estimatedValue: this.estimatedValue,
          active: true, // Always set to true.
          email: null, // Will be assigned using jwt token authorisation.
          height: this.height,
          width: this.width,
          length: this.length,
          weight: this.weight,
          fragility: this.fragility,
          freightCost: this.freightCost != "" ? this.freightCost : 0
        };    
        try{
          await this.$store.dispatch("postNewItem", item); // Sends Item object to the store to be inserted into the database. 
          this.emptyForm(); // Empties the form Inputs.
          this.$router.push("/items"); // Navigates to the Items page.
        }
        catch(ex) {
          alert("Error NIT001: Unable to submit new item.");
        }       
      }
      else {
        alert("Error NIT002: The information you have entered has invalid details.");
      }
    },
    // TODO: Further validation required.   
    validItem() { // Checks if the New Item information is valid.   
      if(this.name == "")
        return false;
      if(this.description == "")
        return false;
      if(this.estimatedValue == "")
        return false;
      if(this.width == "")
        return false;
      if(this.height == "")
        return false;
      if(this.length == "")
        return false;
      if(this.weight == "")
        return false;
      if(this.fragility == "")
        return false;
      return true; 
    },
    emptyForm() { // Empties the form Inputs.
      this.name = "",
      this.description = "",
      this.estimatedValue = "",
      this.height = "",
      this.width = "",
      this.length = "",
      this.weight = "",
      this.fragility = "",
      this.freightCost = "" }
    }
  };
</script>