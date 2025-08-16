<template>
  <div>
    <h1>Tabla con Funciones Básicas</h1>

    <!-- Filtro de búsqueda -->
    <input
      v-model="search"
      type="text"
      placeholder="Buscar..."
      class="search-box"
    />

    <!-- Tabla -->
    <table class="datatable">
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('nombre')">Nombre</th>
          <th @click="sortBy('email')">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="pagination">
      <button @click="prevPage" :disabled="paginaActual === 1">Anterior</button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="nextPage" :disabled="paginaActual === totalPaginas">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos simulados
const datos = ref([
  { id: 1, nombre: 'Juan', email: 'juan@mail.com' },
  { id: 2, nombre: 'Ana', email: 'ana@mail.com' },
  { id: 3, nombre: 'Luis', email: 'luis@mail.com' },
  { id: 4, nombre: 'Lucía', email: 'lucia@mail.com' },
  { id: 5, nombre: 'Carlos', email: 'carlos@mail.com' },
  { id: 6, nombre: 'Marta', email: 'marta@mail.com' },
  { id: 7, nombre: 'Pedro', email: 'pedro@mail.com' },
  { id: 8, nombre: 'Laura', email: 'laura@mail.com' },
  { id: 9, nombre: 'Sofía', email: 'sofia@mail.com' },
  { id: 10, nombre: 'Diego', email: 'diego@mail.com' },
  { id: 11, nombre: 'Elena', email: 'elena@mail.com' },
])

// Parámetros de la tabla
const search = ref('')
const sortKey = ref('')
const sortAsc = ref(true)
const paginaActual = ref(1)
const porPagina = 5

// Función para ordenar por columna
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

// Filtrar y ordenar los datos
const datosFiltrados = computed(() => {
  let resultado = datos.value

  if (search.value) {
    const texto = search.value.toLowerCase()
    resultado = resultado.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(texto)
      )
    )
  }

  if (sortKey.value) {
    resultado.sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      return sortAsc.value
        ? (aVal > bVal ? 1 : -1)
        : (aVal < bVal ? 1 : -1)
    })
  }

  return resultado
})

// Paginación
const totalPaginas = computed(() =>
  Math.ceil(datosFiltrados.value.length / porPagina)
)

const paginatedItems = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  const fin = inicio + porPagina
  return datosFiltrados.value.slice(inicio, fin)
})

const nextPage = () => {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++
  }
}

const prevPage = () => {
  if (paginaActual.value > 1) {
    paginaActual.value--
  }
}
</script>

<style scoped>
.datatable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.datatable th,
.datatable td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.datatable th {
  cursor: pointer;
  background-color: #f0f0f0;
}
.search-box {
  margin-bottom: 10px;
  padding: 5px;
  width: 200px;
}
.pagination {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
