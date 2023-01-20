<script>
import { Todo } from '../model/todo';

export default {
  props: ["title", "content", "id"],
  data() {
    return {
      isUpdating: false,
      isDone: false,
      isNew: true
    }
  },
  methods: {
    toggleEdit(event) {
      this.isUpdating = !this.isUpdating;

      if(this.isUpdating) {
        this.$nextTick(() => this.$refs.contentField.focus());
      } else {
        let content = event.target.value;
        let todo = new Todo(this.title, content);
        this.$emit("update", this.id, todo);
      }
    },
    toggleDone() {
      this.isDone = !this.isDone;
    },
    toggleNew() {
      console.log("new toggled");
      this.isNew = false;
    }
  }
}
</script>

<template>
  <div @click.once.stop="toggleNew" class="todo" :class="{done: isDone, new: isNew}">
    <h3>{{ `${id + 1}. ${title}` }}</h3>

    <p @click="toggleEdit" v-if="!isUpdating">{{ content }}</p>
    <input v-else 
      type="text"
      ref="contentField" 
      :value="content"
      @keydown.enter="toggleEdit"
      @blur="toggleEdit" />

    <button @click="toggleDone">Completed</button>
    <button @click="$emit('delete', id)">Delete</button>
  </div>
</template>

<style>
  .todo {
    padding: .5em;
    border: 1px solid black;
    border-radius: .3em;
    margin: 1em 0;
    background-color: #fff;
  }

  .done {
    background-color: rgb(171, 171, 171);
  }

  .new {
    background-color: rgb(127, 255, 165);
  }
</style>