<template>
  <v-container>

    <v-card class="pa-4">
      <v-form>

        <!-- ##### SIMPLE INPUTS ##### -->
        <v-text-field label="Event Title" v-model="name" />
        <v-textarea label="Event Description" v-model="description" />

        <!-- ##### START DATE PICKER ##### -->
        <div>
          <v-dialog
            ref="dialogStartDate"
            v-model="modalStartDate"
            :return-value.sync="startDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalStartDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogStartDate.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>

        <!-- ##### START TIME PICKER ##### -->
        <v-dialog ref="dialogStartTime" v-model="modalStartTime" :return-value.sync="startTime">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startTime"
              label="Start Time"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modalStartTime" v-model="startTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalStartTime = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogStartTime.save(startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <!-- ##### END DATE PICKER ##### -->
        <div>
          <v-dialog
            ref="dialogEndDate"
            v-model="modalEndDate"
            :return-value.sync="endDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalEndDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogEndDate.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>

        <!-- ##### END TIME PICKER ##### -->
        <v-dialog ref="dialogEndTime" v-model="modalEndTime" :return-value.sync="endTime">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endTime"
              label="End Time"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modalEndTime" v-model="endTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalEndTime = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogEndTime.save(endTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <!-- ##### SUBMIT NEW EVENT BUTTON ##### -->
        <v-btn color="primary" @click="submitNewEvent">
          Submit Event
        </v-btn>

      </v-form>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "NewEvent",
  data: () => ({ // Models data from inputs.
    name: "",
    description: "",
    // Picker variables.
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    modalStartDate: false,
    modalStartTime: false,
    modalEndDate: false,
    modalEndTime: false
  }),
  methods: {
    async submitNewEvent() {
      if(this.validEvent()){
        let event = { // Creates an event object to be inserted into database.
          name: this.name,
          description: this.description,
          startDate: this.startDate + " " + this.startTime,
          endDate: this.endDate + " " + this.endTime,
          email: null // Will be assigned using jwt token authentucation.
        };
        try {
          await this.$store.dispatch("postNewEvent", event); // Sends event object to store to be inserted into database.
          this.emptyForm(); // Empties the form inputs.
          this.$router.push("/events"); // Navigates to the Events page.     
        }
        catch (ex){
          alert("Error NEV001: Unable to submit new event.");
        }
      } 
      else {
        alert("Error NEV002: The information you have entered has invalid details.");
      }      
    },
    // TODO: Further validation required.
    validEvent() { // Checks if the New Event information is valid.
      if(this.name == "")
        return false;
      if(this.description == "")
        return false;
      if(this.startDate == null)
        return false;
      if(this.startTime == null)
        return false;
      if(this.endDate == null)
        return false;
      if(this.endTime == null)
        return false;
      return true;
    },
    emptyForm () { // Empties the form inputs.
      this.name = "";
      this.description = "";
      this.startDate = null;
      this.startTime = null;
      this.endDate = null;
      this.endTime = null;
    }
  }
};
</script>