<script>
import TodoItem from './TodoItem.vue';
import { Todo } from '../model/todo';

const todos = [
  new Todo("Hey", "Batman"),
  new Todo("Handla äpplen", "Behöver 3 stycken")
];

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      items: todos,
      field: { title: '', content: ''}
    }
  },
  methods: {
    addTodo() {
      let todo = new Todo(this.field.title, this.field.content);

      this.items.push(todo);
    },
    removeTodo(index) {
      this.items.splice(index, 1);
    },
    updateTodo(index, value) {
      this.items[index] = value;
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="field-group">
      <label>Todo title</label>
      <input v-model="field.title" type="text" placeholder="place todo title.." />
    </div>

    <div class="field-group">
      <label>Todo content</label>
      <input v-model="field.content" type="text" placeholder="Place todo content here.." />
    </div>

    <button @click="addTodo">Add todo</button>
  </form>

  <section>
    <h2>Todo list</h2>

    <TodoItem 
      v-for="(item, index) in items"
      :title="item.title" 
      :content="item.content"
      :id="index"
      @delete="removeTodo"
      @update="updateTodo" />

  </section>
</template>


<style>
.field-group {
  display: flex;
  flex-direction: column;
  margin-bottom: .7em;
}
</style>
