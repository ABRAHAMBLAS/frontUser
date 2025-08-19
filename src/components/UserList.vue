<!-- src/components/UserList.vue -->
<template>
  <div>
    <h1>Lista de Usuarios</h1>

    <!-- Mostrar error si existe -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Si está cargando, muestra un mensaje de carga -->
    <div v-if="loading">Cargando...</div>

    <!-- Si no hay error ni cargando, muestra la lista de usuarios -->
    <ul v-if="!loading && !error">
       <table border="1" cellpadding="20" cellspacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Username</th>
          <th>Email</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }} </td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.fecha }}</td>
          <td>
            <router-link :to="`/usuarios/editar/${user.id}`">
            <button>Editar</button>
            </router-link>

            <button @click="deleteUser(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </ul>

    <!-- Paginación o navegación entre páginas de usuarios -->
   
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router';
import { defineComponent, onMounted } from 'vue';
import { useUserApi } from '@/composables/useUserApi';

export default defineComponent({
  name: 'UserList',
  setup() {
    const { users, loading, error, getUsers, deleteUser } = useUserApi();

    // Cargar los usuarios al montar el componente
    onMounted(() => {
      getUsers();
    });

    // Función para cargar más usuarios (paginación)
    

    // Función para eliminar un usuario
    const handleDeleteUser = (id: number) => {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        deleteUser(id);
      }
    };

    return {
      users,
      loading,
      error,
      deleteUser: handleDeleteUser
    };
  }
});
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
