<template>
  <div>
    <h1>Editar Usuario</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading">Cargando...</div>

    <form v-if="user" @submit.prevent="submitForm">
      <label>Nombre:</label>
      <input v-model="user.firstname" required />

      <label>Apellido:</label>
      <input v-model="user.lastname" required />

      <label>Username:</label>
      <input v-model="user.username" required />

      <label>Email:</label>
      <input v-model="user.email" type="email" required />

      <label>Fecha:</label>
      <input v-model="formattedFecha" type="date" required />

      <button type="submit">Guardar Cambios</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserApi } from '@/composables/useUserApi';
import { User } from '@/interfaces/User';

export default defineComponent({
  name: 'UserEdit',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { users, loading, error, updateUser, getUsers } = useUserApi();
    const user = ref<User | null>(null);
    const id = Number(route.params.id);

    const formattedFecha = computed({
      get: () => user.value?.fecha ? new Date(user.value.fecha).toISOString().split('T')[0] : '',
      set: (val: string) => {
        if (user.value) user.value.fecha = new Date(val);
      }
    });

    onMounted(async () => {
      await getUsers(); // Cargar usuarios si no están cargados
      user.value = users.value.find((u) => u.id === id) || null;
      if (!user.value) {
        error.value = 'Usuario no encontrado';
      }
    });

    const submitForm = async () => {
      if (user.value) {
        await updateUser(user.value.id, user.value);
        alert('Usuario actualizado con éxito');
        router.push('/prueba'); // Redirige a la lista de usuarios
      }
    };

    return {
      user,
      error,
      loading,
      submitForm,
      formattedFecha,
    };
  },
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
