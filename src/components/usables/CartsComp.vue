<template>
  <v-sheet class="roundedSheet" :color="colorCard">
    <h2 :style="`color:${colorText};`">{{ title }}</h2>
    <span claas="subtitle">{{ subtitle }}</span>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps({
  colorText: { required: true, type: String },
  colorCard: { required: true, type: String },
  title: { required: true, type: String },
  subtitle: { required: true, type: String },
})
</script>

<style>
.roundedSheet {
  border-radius: 10px;
  text-align: center;
  align-content: center;
  width: 100%;
  height: 100px;
  color: white;
}

.subtitle {
  font-size: 20px;
}
</style>
