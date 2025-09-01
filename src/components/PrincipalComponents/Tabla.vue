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
    <template v-slot:item.user="{ value }">
        {{ showUserInTable(value) }}
    </template>
    <template v-slot:item.status="{ value }">
        <v-row justify="center">
            <v-icon :color="getColor(value)"> mdi-circle </v-icon>
        </v-row>
    </template>
    </v-data-table>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Gauge from './Gauge.vue';
import axios from 'axios';
import { APIS_MAPS } from '@/const/apis';
const headers = [
    { title: 'Nombre', key: 'name'},
    { title: 'Usuario', key: 'user'},
    { title: 'Estado', key: 'status'},
    { title: 'Eficiencia', key: 'eficency'},
  ]

  const items = [
    {
      name: 'RD041',
      user: 1,
      status: 'ok',
      eficency: 100
    },
    {
      name: 'RD042',
      user: 1,
      status: 'alert',
      eficency: 80
    },
    {
      name: 'RD043',
      user: 2,
      status: 'down',
      eficency: 50
    },
    {
      name: 'RD044',
      user: 2,
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

const finalUsers = ref([])

function showUserInTable(idTable:number){
  let userFind = ''
  finalUsers.value.filter(({id,name})=>{
    if(id === idTable) userFind = name
  })
  return userFind
}

async function getAllUsers(){
  await axios.get(APIS_MAPS.getAllUsers).then((response) => {
      const items = response.data;
      finalUsers.value = items;
  })
}

onMounted(() => {
  getAllUsers()
})
</script>

<style scoped>

</style>