<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username" class="form-label">Username:</label>
        <input type="text" id="username" v-model="username" required class="form-input">
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-input">
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <p>Belum punya akun? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://backend-lala.vercel.app/login', {
          username: this.username,
          password: this.password
        });

        if (response.status === 200) {
          const { token } = response.data;
          // Save the token to local storage as a cookie
          localStorage.setItem('token', token);

          // Redirect the user to another page (e.g., Dashboard page)
          this.$router.push('/rencana');
        } else {
          console.error(response.data.error);
          // Display an error message to the user
        }
      } catch (error) {
        console.error(error);
        // Display an error message to the user
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #dfe5f1;
  font-family: Arial, sans-serif;
  background-image: url('../assets/background.jpg'); 
  background-size: cover;
  background-position: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #f7efef;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.login-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 1rem;
}
</style>
