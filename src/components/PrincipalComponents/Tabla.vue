<template>
    <v-data-table
    :headers="headers"
    :items="items"
    class="text-caption"
    density="compact"
    item-value="name"
    hide-default-footer
    hover
    >
    <template v-slot:item.eficency="{ value }">
        <Gauge :value="value"/>
    </template>
    <template v-slot:item.status="{ value }">
        <v-row justify="center">
            <v-icon :color="getColor(value)"> mdi-circle </v-icon>
        </v-row>
    </template>
    </v-data-table>

</template>

<script setup lang="ts">
import Gauge from './Gauge.vue';
const headers = [
    { title: 'Nombre', key: 'name'},
    { title: 'Usuario', key: 'user'},
    { title: 'Estado', key: 'status'},
    { title: 'Eficiencia', key: 'eficency'},
  ]

  const items = [
    {
      name: 'RD041',
      user: 'Alejandro Mejia Navarro',
      status: 'ok',
      eficency: 100
    },
    {
      name: 'RD042',
      user: 'Alejandro Mejia Navarro',
      status: 'alert',
      eficency: 80
    },
    {
      name: 'RD043',
      user: 'Alejandro Mejia Navarro',
      status: 'down',
      eficency: 50
    },
    {
      name: 'RD044',
      user: 'Alejandro Mejia Navarro',
      status: 'alarm',
      eficency: 89
    },
  ]

  function getColor(status:string){
    // let finalColor = ''

    const COLORS:any = {
        ok : 'green',
        alert : 'yellow',
        alarm : 'red',
        down : 'grey',

    }

    return COLORS[status]
  }
</script>

<style scoped>

</style>