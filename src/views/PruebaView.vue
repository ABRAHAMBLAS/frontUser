<template>
  <div class="home">
    
    <HelloWorld1 msg="Mi primer componente en Vue" />
    <UserList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserList from '@/components/UserList.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserList
  }
});
</script>

