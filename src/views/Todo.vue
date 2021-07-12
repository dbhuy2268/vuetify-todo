<template>
  <div class="home">
    <v-list
        flat
    >
      <div
          v-for="item in this.tasks"
          :key="item.id"
      >
        <v-list-item
            @click="handleDoneTask(item.id)"
            :class="{'blue lighten-5': item.done}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                  :input-value="item.done"
                  color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                  :class="{'text-decoration-line-through': item.done === true}"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>

    </v-list>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        tasks: [
          {
            id: 1,
            title: 'Wake up',
            done: false
          },
          {
            id: 2,
            title: 'Get bananas',
            done: false
          },
          {
            id: 3,
            title: 'Eat bananas',
            done: false
          },
          {
            id: 4,
            title: 'Drop shit',
            done: false
          },
        ]
      }
    },
    methods: {
      handleDoneTask(id) {
        let cur_task = this.tasks.filter(task => task.id === id)
        cur_task[0].done = !cur_task[0].done
      }
    }
  }
</script>
