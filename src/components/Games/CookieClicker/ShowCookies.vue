<template>
  <h5 class="d-flex justify-content-center align-items-center text-decoration-underline">
    {{ cookies }}
    <slot></slot>
  </h5>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  cookies: number;
}>();
const { cookies } = toRefs(props);
</script>
<style scoped lang="scss"></style>
