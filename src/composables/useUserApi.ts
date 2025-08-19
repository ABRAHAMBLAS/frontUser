// src/composables/useUserApi.ts
import { ref } from 'vue';
import axios from 'axios';
import { User } from '@/interfaces/User';

export const useUserApi = () => {
  const users = ref<User[]>([]);
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Obtener todos los usuarios
  const getUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`http://localhost:8000/api/users`);
      users.value = response.data; // Usamos 'data' si estás paginando
    } catch (err) {
      error.value = 'Error al obtener usuarios';
    } finally {
      loading.value = false;
    }
  };



  // Crear un nuevo usuario
  const createUser = async (newUser: Omit<User, 'id'>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://localhost:8000/api/store', newUser);
      users.value.push(response.data.items); // Agregamos el nuevo usuario a la lista
       alert('Usuario creado exitosamente'); 
    } catch (err) {
      error.value = 'Error al crear usuario';
    } finally {
      loading.value = false;
    }
  };

  // Actualizar un usuario
  const updateUser = async (id: number, updatedUser: Partial<User>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, updatedUser);
      const index = users.value.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.value[index] = response.data.user;
      }
    } catch (err) {
      error.value = 'Error al actualizar el usuario';
    } finally {
      loading.value = false;
    }
  };

  // Eliminar un usuario
 const deleteUser = async (id: number) => {
  loading.value = true;
  error.value = null;

  try {
    // Enviar solicitud DELETE a la API
    const response = await axios.delete(`http://localhost:8000/api/destroy/${id}`);

    // Verificar si la respuesta es correcta (200 OK)
    if (response.status === 200) {
      // Eliminar el usuario localmente después de la respuesta exitosa
      users.value = users.value.filter((user) => user.id !== id);
      alert('Usuario eliminado exitosamente');  // Mostrar una alerta de éxito
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (err: any) {
    // Manejo de error con detalle
    if (err.response) {
      // Si hay una respuesta del servidor
      error.value = `Error al eliminar el usuario: ${err.response.data.message || err.response.statusText}`;
    } else if (err.request) {
      // Si no se recibe respuesta del servidor
      error.value = 'Error al conectar con el servidor';
    } else {
      // Otro tipo de error
      error.value = `Error inesperado: ${err.message}`;
    }
  } finally {
    loading.value = false;
  }
};


  return {
    users,
    user,
    loading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
};
