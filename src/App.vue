<template>
  <div class="container mx-auto px-4">
    <Hello
      v-model="userName"
      v-if="showSplash"
      @hideMe="showSplash = false"
      :items="items"
    />

    <div v-if="showSplash === false">
      <div class="flex flex-col mt-40 bg-gray-100">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-left">
            <h1>Good Luck, {{ userName }}!</h1>
            <span class="text-gray-400">Pick up the right cards</span>
          </div>
          <div class="text-right">
            <p class="zoovu_color">
              Your score: {{ score }}
              {{ score == 1 ? "second" : "seconds" }}
            </p>
            <span class="text-gray-400">The faster the better</span>
          </div>
        </div>

        <!-- Pieces -->
        <div class="grid grid-cols-5 gap-4 m-10">
          <draggeable
            v-for="n in [0, 1, 2, 3, 4]"
            :key="n"
            :boxID="n"
            :items="items"
            @startDrag="startDrag"
            @onDrop="onDrop"
          ></draggeable>
        </div>

        <!-- Boxes -->

        <div class="grid grid-cols-5 gap-4 m-10">
          <draggeable
            v-for="n in [5, 6, 7, 8, 9]"
            :key="n"
            :boxID="n"
            :items="items"
            @startDrag="startDrag"
            @onDrop="onDrop"
          ></draggeable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->

  <Modal v-show="modal.show" :msg="modal.msg" @click.capture="init"></Modal>
</template>

<script>
import _ from "lodash";
import Hello from "./components/Hello.vue";
import Modal from "./components/Modal.vue";
import Draggeable from "./components/Draggeable.vue";
import logo_u from "./assets/zoovu-u.svg";
import logo_v from "./assets/zoovu-v.svg";
import logo_z from "./assets/zoovu-z.svg";
import logo_o from "./assets/zoovu-o.svg";

const timer = function () {};

export default {
  name: "App",
  components: {
    Hello,
    Draggeable,
    Modal,
  },
  data() {
    return {
      userName: "",
      showSplash: true,
      record: null,
      modal: {
        show: false,
        msg: "",
      },
      playing: false,
      timer: {
        count: 0,
        extra: 0,
        handler: null,
      },
      items: [
        {
          id: 0,
          image: logo_z,
          list: 0,
          order: [5],
        },
        {
          id: 1,
          image: logo_o,
          list: 0,
          order: [6, 7],
        },
        {
          id: 2,
          image: logo_o,
          list: 0,
          order: [6, 7],
        },
        {
          id: 3,
          image: logo_v,
          list: 0,
          order: [8],
        },
        {
          id: 4,
          image: logo_u,
          list: 0,
          order: [9],
        },
      ],
    };
  },
  created() {
    this.record = localStorage.getItem("record");
    this.init();
  },
  updated() {
    this.userName = _.upperFirst(this.userName);
  },
  methods: {
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      // Check gamem status
      if (!this.playing) {
        this.playing = true;
        this.timer.handler = setInterval(() => {
          this.timer.count += 1;
          if (this.timer.count > 10) {
            this.finish("Time's up!! You can do this better");
          }
        }, 1000);
      }

      // Drop handle
      const insider = this.items.find((item) => item.list == list);
      if (insider === undefined) {
        const itemID = evt.dataTransfer.getData("itemID");
        const item = this.items.find((item) => item.id == itemID);
        item.list = list;

        // Check places
        let rightPlace = item.order.includes(list);

        // Penalty
        if (!rightPlace) {
          this.timer.extra += 10;
        }

        // Did we win?
        let finish = this.items.every((el) => {
          return el.order.includes(el.list);
        });

        if (finish) {
          this.finish();
        }
      } else {
        console.log("Empty the box first!!");
      }
    },
    finish(msg = `Great!! you made it in ${this.score} secs`) {
      // Check record
      const isNull = (value) => typeof value === "object" && !value;

      if (isNull(this.record) || this.record > this.score) {
        localStorage.setItem("record", this.score);
        this.record = this.score;
        msg = `Super!! this is a new Record!!`;
      }

      this.modal.msg = `<p class="pb-2">${msg}</p>
        <span class="text-white text-xs italic ">Click to restart</span>
      `;
      this.modal.show = true;
      clearInterval(this.timer.handler);
      this.playing = false;
    },
    init() {
      this.timer.count = 0;
      this.timer.extra = 0;
      this.timer.handler = null;
      this.modal.show = false;

      // Lets Shuffle those pieces!
      let mix = _.shuffle([0, 1, 2, 3, 4]);
      this.items.forEach((element) => {
        element.list = mix.pop();
      });
    },
  },
  computed: {
    score() {
      return this.timer.count + this.timer.extra;
    },
  },
};
</script>
