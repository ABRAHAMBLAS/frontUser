<!-- src/components/CreateUser.vue -->
<template>
  <div>
    <h2>Agregar Usuarios</h2>
    
    <form @submit.prevent="submitForm">
      <div>
        <label for="firtsname">Nombre</label>
        <input v-model="newUser.firstname" id="firstname" type="text" required />
      </div>
      <div>
        <label for="lastname">Apellido</label>
        <input v-model="newUser.lastname" id="lastname" type="text" required />
      </div>
      <div>
        <label for="username">Username</label>
        <input v-model="newUser.username" id="username" type="text" required />
      </div>

      <div>
        <label for="email">Correo</label>
        <input v-model="newUser.email" id="email" type="email" required />
      </div>
       <div>
        <label for="password">Contraseña</label>
        <input v-model="newUser.password" id="password" type="password" required />
      </div>
      <div>
        <label for="fecha">Fecha</label>
        <input v-model="newUser.fecha" id="fecha" type="date" required />
      </div>

     
      <button type="submit" :disabled="loading">Crear Usuario</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserApi } from '@/composables/useUserApi';
import { User } from '@/interfaces/User';

export default defineComponent({
  name: 'CreateUser',
  setup() {
    const { createUser, error, loading } = useUserApi();
    const newUser = ref<Omit<User, 'id'>>({
      firstname: '',
      lastname: '',
      username:'',
      email: '',
      password:'',
      fecha: new Date(),
      created_at: '',
      updated_at: ''
    });

    const submitForm = () => {
      createUser(newUser.value);
    };

    return {
      newUser,
      submitForm,
      error,
      loading
    };
  }
});
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
input {
  padding: 5px;
  width: 300px;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
}
.error {
  color: red;
}
</style>