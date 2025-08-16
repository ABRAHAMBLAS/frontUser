<!-- src/components/CreateUser.vue -->
<template>
  <div>
    <h2>Agregar Usuario</h2>
    
    <form @submit.prevent="submitForm">
      <div>
        <label for="nombre">Nombre</label>
        <input v-model="newUser.firstname" id="nombre" type="text" required />
      </div>

      <div>
        <label for="email">Correo</label>
        <input v-model="newUser.email" id="email" type="email" required />
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
      email: '',
      edad: "",
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
.error {
  color: red;
  font-weight: bold;
}
</style>
