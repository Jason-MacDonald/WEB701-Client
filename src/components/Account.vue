<template>
  <v-container>

    <v-card class="px-4 py-4"> 

      <v-card class="px-4 pt-4 pb-1">
<!-- ########## ACCOUNT DETAILS FORM ########## -->
        <v-form v-model="valid">

          <!-- ##### ACCOUNT TITLE #####  -->
          <h2 class="px-2 pt-1">
            Account - {{account.type}}
          </h2>
          
          <!-- ##### USERNAME INPUT ##### -->
          <div class="mt-5">
            <v-text-field 
              class="px-2 pt-1" 
              label="Username" 
              v-model="account.name" 
              :counter="30"
              :rules="usernameRules" 
            />     
          </div>
          
          <!-- ##### UPDATE USERNAME BUTTON -->
          <v-btn 
            color="primary" 
            class="px-2 pt-1" 
            @click="updateUserName" 
            :disabled="!valid"
          >
              Update Username
          </v-btn>

          <!-- ##### EMAIL DISPLAY (Static) ###### -->
          <v-text-field 
            class="px-2 pt-1" 
            disabled 
            v-model="account.email"
          />

        </v-form>      
      </v-card>

      <div v-if="account.type == 'Member'"> 
        <v-card class="px-4 pt-4 pb-1 mt-5">
<!-- ########## MEMBER DETAILS FORM ########## -->
          <v-form v-model="validMemberDesc">
            <!-- ##### MEMBER DETAILS TITLE #####  -->
            <h2 class="px-2 pt-1">
              Member Details - {{member.name}}
            </h2>
            
            <!-- ##### DESCRIPTION INPUT ##### -->
            <div class="mt-5">
              <v-textarea 
                class="px-2 pt-1" 
                label="description" 
                v-model="member.description" 
                :rules="descriptionRules"
                :counter="255"
                required
              />     
            </div>
            
            <!-- ##### UPDATE USERNAEME BUTTON -->
            <v-btn 
              color="primary" 
              class="px-2 pt-1 mb-4" 
              @click="updateMemberDescription"
              :disabled="!validMemberDesc"
            >
                Update Description
            </v-btn>
          </v-form>
        </v-card>
      </div>

    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "Account",
  data: () => ({ // Holds local copy of Account and Member details.
    account: {},
    member: {
      name: 'no name',
      description: 'no description'
    },
    valid: false,
    validMemberDesc: false,
    usernameRules: [
      username => (username && username.length <= 40) || "Username cannot exceed 40 characters."
    ], 
    descriptionRules: [
      description => !!description || "description is required",
      description => (description && description.length <= 255) || "Description must not exceed 255 characters"
    ]
  }),
  async created() { // Updates store Account and Member and assigns to local variable on created.
    try{ // Update and assign Account.
      await this.$store.dispatch("getAccount");
      this.account = this.$store.state.account;
    }
    catch(ex) {
      console.log("Error ACC001: " + ex.message);
      alert("Error ACC001: The system was unable to get account information.");
    }  

    // Update and assign Member.
    if(this.account.type == "Member"){
      try{
        await this.$store.dispatch("getMember");
        this.member = this.$store.state.member;
      }
      catch(ex) {
        console.log("Error ACC002: " + ex.message);
        alert("Error ACC002: The system was unable to get member information.");
      } 
    }
  },
  methods: {
    // ##### ACCOUNT METHODS #####
    updateUserName() { // Sends account object with new details (username) to the store to be updated in the database.
      if(this.account.name.length < 40){
        let account = {
          id: this.account.id,
          name: this.account.name,
          email: this.account.email // TODO: Use jwt authentication for account information.
        };

        try{
          this.$store.dispatch("putAccount", account);
          alert("Your username has been updated successfully.");
        }
        catch(ex) {
          console.log("Error ACC003: " + ex.message);
          alert("Error ACC003: The system was unable to update your account.");
        } 
      }
      else {
        alert("Error ACC004: The system was unable to update your account. Your username must be under 40 characters in length.");
      }
    },
    // ##### MEMBER METHODS #####
    updateMemberDescription() { // Sends member object to the store to be updated in the database.
      if(this.member.description.length < 255) {
        let member = { // Creates newmember object to be updated in the database.
          name: this.member.name,
          description: this.member.description
        };

        try{
          this.$store.dispatch("putMember", member);
          alert("Your member details have been successfully updated.");
        }
        catch(ex) {
          console.log("Error ACC005: " + ex.message);
          alert("Error ACC005: The system was unable to update your member details.");
        }
      }
      else {
        alert("Error ACC006: The system was unable to update your member details. Your description must be under 255 characters in length.");
      }
    }
  }
};
</script>