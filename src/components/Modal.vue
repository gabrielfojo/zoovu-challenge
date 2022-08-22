<template>
  <div
    class="fixed inset-0 w-auto mx-32 h-screen flex items-center justify-center bg-semi-75"
  >
    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center zoovu_bg_secondary text-white font-bold"
    >
      <span v-html="msg"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style></style>
