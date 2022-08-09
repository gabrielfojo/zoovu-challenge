<template>
  <div class="flex flex-col bg-gray-100 p-8 shadow-md">
    <div class="w-80 text-center mx-auto m-3 font-bold">
      Hello friend, tell me your name...
    </div>
    <div class="w-80 text-center mx-auto m-3 border-b-2 border-gray-200">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        placeholder="Your name here"
        class="bg-gray-100 italic text-center focus:outline-none"
        @keydown.enter="$emit('hideMe')"
      />
    </div>
    <div class="text-center mx-auto m-3">
      <button
        class="focus:outline-none focus:bg-white focus:color_zoovu hover:bg-white hover:color_zoovu rounded-full px-3 zoovu_color shadow font-bold focus:borderColor"
        @click="$emit('hideMe')"
      >
        Let's go
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "hideMe"],
  name: "Hello",
  data() {
    return {};
  },
};
</script>
