<template>
  <div class="home">

    <v-text-field
        class="pa-3"
        outlined
        label="What needs to be done?"
        append-icon="mdi-plus"
        @click:append="handleAddTask"
        @keyup.enter="handleAddTask"
        :hide-details="true"
        clearable
        v-model="taskTitle"
    ></v-text-field>

    <v-list
        v-if="tasks.length"
        flat
    >
      <div
          v-for="item in this.tasks"
          :key="item.id"
      >
        <v-list-item
            class="list-action-hover"
            @click="handleDoneTask(item.id)"
            :class="{'grey lighten-4': item.done}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                  :input-value="item.done"
                  color="primary"
                  on-icon="mdi-check"
                  off-icon="checkbox-blank-circle-outline"
                  disabled
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                  :class="{'text-decoration-line-through': item.done === true}"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  class="hover-close"
                  icon
                  @click.stop="handleDeleteTask(item.id)"
              >
                <v-icon color="lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>

    </v-list>
    <div v-else>
      <p class="font-weight-thin pt-10 pb-0 font-italic pa-3 text-center">
        {{ this.emptyQuote.text }}
      </p>
      <p class="caption pt-0 px-3 text-center">
        {{ this.emptyQuote.author }}.
      </p>
    </div>
  </div>
</template>

<script>

  import axios from "axios";

  export default {
    name: 'Home',
    data() {
      return {
        emptyQuote: {},
        taskTitle: '',
        tasks: []
      }
    },
    created() {
      axios
          .get("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
          .then(response => {
            this.emptyQuote = response.data.quotes[0]
            console.log(this.emptyQuote)
          });
    },
    methods: {
      handleAddTask(){
        if (this.taskTitle !== ''){
          let newTask = {
            id: Date.now(),
            title: this.taskTitle,
            done: false
          }
          this.tasks.push(newTask)
          this.taskTitle = ''
        }
      },
      handleDoneTask(id) {
        let cur_task = this.tasks.filter(task => task.id === id)
        cur_task[0].done = !cur_task[0].done
      },
      handleDeleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
      }
    }
  }
</script>

<style lang="css">
  .hover-close {
    visibility: hidden;
  }
  .list-action-hover:hover .hover-close {
    visibility: visible;
  }
</style>