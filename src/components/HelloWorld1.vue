<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <h2>Aqui vamos a conectar la api de laravel</h2>
      
     
    </p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld1 extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #1c1492ff;
}
</style>
