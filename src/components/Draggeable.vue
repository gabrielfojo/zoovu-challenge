<template>
  <div
    class="w-40 bg-grey-400 border-2 border-dashed h-40 block"
    @drop="drop"
    @dragover.prevent
    @dragenter.prevent="dragenter"
    @dragleave.prevent="dragleave"
    :id="'box' + boxID"
    :class="{ 'border-yellow-400 ': effect }"

  >
    <div
      v-if="box.length"
      class="w-40 bg-white-400 border-2 h-40  flex"
      draggable="true"
      @dragstart="$emit('startDrag', $event, this.box[0])"
      @dragover.prevent
      @dragenter.prevent
    >
      <img
        alt="logo2"
        :src="this.box[0].image"
        class="flex-grow w-40 h-40 p-4"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["items", "boxID"],
  emits: ["startDrag", "onDrop"],
  data() {
    return {
      effect: false,
    };
  },
  methods: {
    dragenter() {
      this.effect = true;
    },
    dragleave() {
      this.effect = false;
    },
    drop($event, boxID) {
      $event.preventDefault();
      this.effect = false;
      this.$emit("onDrop", $event, this.boxID);
    },
  },
  computed: {
    box() {
      return this.items.filter((item) => item.list == this.boxID);
    },
  },
};
</script>

<style></style>
