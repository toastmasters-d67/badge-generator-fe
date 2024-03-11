<template>
  <UCard>
    <template #header>
      識別證產生器
    </template>
    <UContainer class="flex">
      <UInput type="file" v-model="value" />
      <UButton @click="click">產生識別證</UButton>
    </UContainer>
  </UCard>
</template>

<script setup lang="ts">
const value = ref('')
const click = () => {
  console.log(value.value)
}
</script>
