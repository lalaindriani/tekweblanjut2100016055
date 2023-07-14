<template>
  <div>
    <h1 class="title">Buat Rencana Kegiatan Anda</h1>
    <form @submit.prevent="createRencana" class="form">
      <input v-model="rencanaData.rencana" type="text" placeholder="Masukkan rencana kegiatan anda" required class="form-input">
      <input v-model="rencanaData.waktu" type="text" placeholder="Masukkan waktu kegiatan" required class="form-input">
      <input v-model="rencanaData.keterangan" type="text" placeholder="Keterangan kegiatan" required class="form-input">
      <button type="submit" class="form-button">Tambahkan Kegiatan</button>
    </form>

    <h1>Rencana Kegiatan</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Rencana</th>
          <th>Waktu</th>
          <th>Keterangan</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rencana in rencanas" :key="rencana._id">
          <td>{{ rencana.rencana }}</td>
          <td>{{ rencana.waktu }}</td>
          <td>{{ rencana.keterangan }}</td>
          <td>
            <div class="action-buttons">
              <button @click="editRencana(rencana)" class="edit-button">Edit</button>
              <button @click="deleteRencana(rencana._id)" class="delete-button">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEditing" class="edit-form">
      <h1>Ubah Rencana Kegiatan</h1>
      <form @submit.prevent="updateRencana" class="form">
        <input v-model="selectedRencana.rencana" type="text" placeholder="Rencana" required class="form-input">
        <input v-model="selectedRencana.waktu" type="text" placeholder="Waktu" required class="form-input">
        <input v-model="selectedRencana.keterangan" type="text" placeholder="Keterangan" required class="form-input">
        <button type="submit" class="form-button">Update</button>
      </form>
    </div>
  </div>
  <button @click="handleLogout" class="logout-button">Logout</button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rencanaData: {
        rencana: '',
        waktu: '',
        keterangan: '',
      },
      rencanas: [],
      selectedRencana: null,
      isEditing: false,
    };
  },
  mounted() {
    this.getAllRencana();
  },
  methods: {
    getToken() {
      return localStorage.getItem('token');
    },
    async createRencana() {
      try {
        const response = await axios.post('http://localhost:3333/data/rencana', this.rencanaData, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.rencanas.push(response.data);
        this.rencanaData.rencana = '';
        this.rencanaData.waktu = '';
        this.rencanaData.keterangan = '';
      } catch (error) {
        console.error(error);
      }
    },
    async getAllRencana() {
      try {
        const response = await axios.get('http://localhost:3333/data/rencana', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.rencanas = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editRencana(rencana) {
      this.selectedRencana = { ...rencana };
      this.isEditing = true;
    },
    async updateRencana() {
      try {
        const response = await axios.put(
          `http://localhost:3333/data/rencana/${this.selectedRencana._id}`,
          this.selectedRencana,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );
        const index = this.rencanas.findIndex((rencana) => rencana._id === response.data._id);
        if (index !== -1) {
          this.rencanas.splice(index, 1, response.data);
        }
        this.selectedRencana = null;
        this.isEditing = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteRencana(id) {
      try {
        await axios.delete(`http://localhost:3333/data/rencana/${id}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.rencanas = this.rencanas.filter((rencana) => rencana._id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    handleLogout() {
      const confirmed = confirm('Apakah Anda yakin ingin logout?');
      if (confirmed) { 
      // Hapus token dari local storage atau jalankan logika logout sesuai kebutuhan
      localStorage.removeItem('token');
      
      // Redirect ke halaman login
      this.$router.push('/login');
    }
  }
  },
};
</script>

<style scoped>
.logout-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #dc3545; /* Ubah warna latar belakang menjadi merah */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #b02a37;
}
h1.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
h1 {
  font-size: 2rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-input {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: block;
  margin-left: 100px;
  margin-right: 100px;
}

.form-button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #087bf6;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  width: 180px;
  display: block;
  margin: auto;
  margin-top: 10px;
}

.form-button:hover {
  background-color: #131f2b;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

.table th,
.table td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.edit-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #3fb582;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #396f22;
}

.delete-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #b02a37;
}

.edit-form {
  margin-top: 1rem;
}
</style>
