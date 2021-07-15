<template>
  <div class="home">

    <v-text-field
        class="pa-3"
        outlined
        label="What needs to be done?"
        append-icon="mdi-plus"
        @click:append="addTask"
        @keyup.enter="addTask"
        hide-details
        clearable
        v-model="taskTitle"
    ></v-text-field>
    <v-list
        v-if="$store.state.tasks.length"
        flat
    >
      <draggable
          :list="this.$store.state.tasks"
          handle=".handle">
        <div
          v-for="item in $store.state.tasks"
          :key="item.id"
          class="handle"
      >
        <v-list-item
            class="list-action-hover white"
            @click="doneTask(item.id)"
            :class="{'grey lighten-4': item.status}"
            :ripple="false"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                  :input-value="item.status"
                  color="primary"
                  on-icon="mdi-check"
                  off-icon="mdi-checkbox-blank-circle-outline"
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                  :class="{'text-decoration-line-through': item.status === true}"
              >
                <v-row>
                  <v-col cols="auto">
                    <v-text-field v-model="item.description"
                                  dense
                                  hide-details
                                  @click.stop=""
                                  @change="changeDescription(item.id, item.description)"
                                  @keyup.enter="changeDescription(item.id, item.description)"
                                  class="todo-description pb-1"
                    />
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  class="hover-close"
                  icon
                  @click.stop="deleteTask(item.id)"
              >
                <v-icon color="lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      </draggable>
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
  import draggable from "vuedraggable"

  export default {
    components: {
      draggable
    },
    name: 'Home',
    data() {
      return {
        drag: false,
        emptyQuote: {},
        taskTitle: '',
      }
    },
    mounted() {
      this.$store.dispatch('getTasks')
      axios
          .get("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
          .then(response => {
            this.emptyQuote = response.data.quotes[0]
          });
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    methods: {
      addTask(){
        if(this.taskTitle.length){
          this.$store.dispatch('addTask', this.taskTitle).then(() => {
            this.$store.dispatch('getTasks')
          })
          this.taskTitle = ''
        }
      },
      doneTask(id){
        this.$store.dispatch('doneTask', id)
      },
      deleteTask(id){
        this.$store.dispatch('deleteTask', id)
      },
      changeDescription(id, newDescription) {
        this.$store.dispatch('changeDescription', { 'id': id, 'description': newDescription })
      }
    }
  }
</script>

<style lang="css">
  .sortable-ghost {
    opacity: 0;
  }
  .hover-close {
    visibility: hidden;
  }
  .list-action-hover:hover .hover-close {
    visibility: visible;
  }
  .todo-description.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
  }
  .todo-description.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
  }
  /*.v-ripple__container {*/
  /*  opacity: 0.1 !important;*/
  /*}*/
</style>