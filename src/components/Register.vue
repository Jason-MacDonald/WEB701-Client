<template>
  <v-container>

    <v-card class="px-4 py-4">
      <!-- ##### REGISTRATION FORM ##### -->
      <v-form>

        <!-- ##### REGISTER TITLE ##### -->
        <h2 class="px-2 pt-1">
          Register
        </h2>

        <!-- ##### EMAIL INPUT ##### -->
        <v-text-field class="px-2 pt-1" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <!-- ##### PASSWORD INPUT ##### -->
        <v-text-field
          class="px-2 pt-1"
          v-model="password"
          :counter="40"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
        
        <!-- ##### REGISTER BUTTON ##### -->
        <div class="px-2 pb-2">
          <v-btn @click="register">
            Create Account
          </v-btn>
        </div>

      </v-form>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "Account",
  data: () => ({ // Details and rules for registration functionality.
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 40) || "Name must be less than 40 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    // Register will also perform Login functionality from within the store.
    async register() { // Registers a new user for an account within the database. Only 'user' type accounts can be created using the online functionality.
      var user = { // Vreates a user object to generate an account in the database.
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("register", user); // Registers a new account in the database and also perform login functionality within the store.
        this.$router.push("/account"); // Navigates to the account page.
      }
      catch (ex) {
        console.log("Error REG001: " + ex.message);
        alert("Error REG001: The system was unable to register a new account.");
      }
    }
  }
};
</script>