<template>
  <v-container>

    <v-card class="px-4 pt-4">
      <!-- ##### LOGIN FORM ##### -->
      <v-form v-model="valid">

        <!-- ##### LOGIN TITLE ###### -->
        <h2 class="px-2 pt-1">
          Login
        </h2>

        <!-- ##### EMAIL INPUT ##### -->
        <v-text-field 
          class="px-2 pt-1" 
          v-model="email" 
          :rules="emailRules" 
          label="E-mail" 
          required
        />

        <!-- ##### PASSWORD INPUT ##### -->
        <v-text-field
          class="px-2 pt-1"
          v-model="password"
          :counter="30"
          :rules="passwordRules"
          type="password"
          label="Password"
          required
        />

        <div class="px-2 pb-5">
          <!-- ##### LOGIN BUTTON ##### -->
          <v-btn @click="login" :disabled="!valid">
            Login
          </v-btn>

          <!-- ##### LINK TO REGISTER ACCOUNT ##### -->
          <router-link class="mx-3" style="text-decoration: none;" to="/register">
            Create new account
          </router-link>
        </div>

      </v-form>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({ // Details and rules for login functionality.
    valid: false,
    password: "",
    passwordRules: [
      password => !!password || "Password is required",
      password => (password && password.length <= 40) || "Password must not exceed 40 characters"
    ],
    email: "",
    emailRules: [
      email => !!email || "E-mail is required",
      email => /.+@.+\..+/.test(email) || "E-mail must be in a valid email format."
    ]
  }),
  methods: {
    // Login will assign store account and store jwt token in local storage.
    // TODO: Find more secure system for storage of jwt information.
    async login() { // Logs user in to their account and navigates to their account page.
      var user = { // Creates a user object to sign in to account.
        email: this.email,
        password: this.password
      };

      try{
        await this.$store.dispatch("login", user); // Logs user into account. Sets store account and jwt into local storage.
        this.$router.push("/account"); // Navigate to account page.
      }
      catch(ex) {
        console.log("Error LOG002: " + ex.message);
        alert("Error LOG002: The system was unable to log you in.");
      } 
    }
  }
};
</script>