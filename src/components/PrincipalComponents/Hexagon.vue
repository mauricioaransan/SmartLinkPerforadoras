<template>
    <div :style="styles" class="contenedorHEXA">
        
        <v-sheet class="hexagon" />
        <v-sheet class="iconHEXACard text-center" :width="sizeHexa-5" color="transparent">
            <v-icon :color="colorText">{{ icon }}</v-icon>
        </v-sheet>
        <v-sheet class="subtituloHEXACard text-center" :width="sizeHexa-5" color="transparent">
            <span class="subtituloHEXAText" > {{ subtitle }} </span>
        </v-sheet>
        <v-sheet class="tituloHEXACard text-center" :width="sizeHexa-5" color="transparent">
            <span class="tituloHEXAText"> {{ title }} </span>
        </v-sheet>
    </div>
    
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    title: string
    subtitle: string,
    color: string
    icon: string
    sizeHexa?: number
    sizeTitle?: number
    sizeSubTi?: number
    colorText?: string
}

const props = withDefaults(defineProps<Props>(),{
    sizeHexa: 110,
    sizeTitle: 45,
    sizeSubTi: 20,
    colorText: 'white'
})

const sizeHexa      = computed(() => props.sizeHexa);
const sizeTitle     = computed(() => props.sizeTitle);
const sizeSubTi     = computed(() => props.sizeSubTi);
const colorHexagon  = computed(() => props.color);
const finalColorT   = computed(() => props.colorText)


const styles = computed(() =>  ({
    '--varColor' : colorHexagon.value,
    '--varSizeHexa': `${sizeHexa.value}px`,
    '--varSizeTitle': `${sizeTitle.value}px`,
    '--varSizeSubTi': `${sizeSubTi.value}px`,
    '--varColorText' : finalColorT.value
}))

</script>

<style>

.contenedorHEXA{
    position: relative;
    width: calc(var(--varSizeHexa) * 0.645);
    height: var(--varSizeHexa);
    margin: 1px 15px;
}

.contenedorHEXA .hexagon {
  cursor: pointer;
  position: absolute;
  width: calc(var(--varSizeHexa) * 0.645);
  height: var(--varSizeHexa);
  background-image: linear-gradient(90deg, var(--varColor),var(--varColor));
  border-radius: calc(var(--varSizeHexa) / 10);
  transition: transform 400ms ease;
  
}

.contenedorHEXA:hover .hexagon{
    transform: rotate(30deg);
}

.contenedorHEXA .hexagon:before, .contenedorHEXA .hexagon:after{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: inherit;
    height: inherit;
    background-image: inherit;
    border-radius: inherit;
}

.contenedorHEXA .hexagon:before{
    transform: rotate(60deg);
}

.contenedorHEXA .hexagon:after{
    transform: rotate(-60deg);
}

.contenedorHEXA  .iconHEXACard{
    position: absolute;
    z-index: 3;
    top: 5%;
    left: -25%;
    cursor: pointer;
}

.contenedorHEXA  .subtituloHEXACard{
    position: absolute;
    z-index: 3;
    top: 70%;
    left: -24%;
    cursor: pointer;
}

.subtituloHEXACard .subtituloHEXAText{
    font-family: 'Poppins',sans-serif;
    font-weight: 400;
    color: var(--varColorText);
    font-size: var(--varSizeSubTi);
    font-weight: bold;
}


.contenedorHEXA  .tituloHEXACard{
    position: absolute;
    z-index: 2;
    top: 0%;
    left: -24%;
    cursor: pointer;
    height: 110px;
    align-content: center;
}

.tituloHEXACard .tituloHEXAText{
   font-family: 'Poppins',sans-serif;
    font-weight: bold;
    font-size: var(--varSizeTitle);
    text-shadow: 2px 3px 3px rgba(0,0,0,0.2);
    color: var(--varColorText);
    

}



</style>