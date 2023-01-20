<script>
import { searchDeparture } from '../store/trainService';

export default {
  data() {
    return {
      departures: [],
      field: {from: '', to: ''}
    }
  },
  methods: {
    search() {
      searchDeparture(this.field.from, this.field.to)
        .then(data => this.departures.push(data));
    }
  }
}
</script>

<template>
  <form @submit.prevent>

  <div class="field-container">
    <div>
        <label>Från: </label>
        <input v-model="field.from" type="text"/>
      </div>

      <div>
        <label>Till: </label>
        <input v-model="field.to" type="text"/>
      </div>
  </div>


  <button @click="search">Sök tider</button>
  </form>

  <table>
    <thead>
      <tr>
        <th>Tågnummer</th>
        <th>Avgång</th>
        <th>Ankomst</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="departure in departures">
        <td>{{ departure.nr }}</td>
        <td>{{ departure.time }}</td>
        <td>{{ departure.arrival }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
form, table {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.3em;
}
.field-container {
  display: flex;
  justify-content: center;
  gap: 1em;
}

input, button {
  width: 100%;
  font-size: inherit;
}

input {
  padding: .1em;
  border-radius: .2em;
  border: none;
  text-align: center;
}

button {
  padding: .3em 0;
  margin: 2em 0;
  background-color: rgb(31, 72, 123, 0.8);
  color: #fff;
  border: none;
  border-radius: .3em;
}
</style>
