import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      // {
      //   id: 1,
      //   title: 'hello',
      //   done: false
      // },
      // {
      //   id: 2,
      //   title: 'how are uu',
      //   done: false
      // },
      // {
      //   id: 3,
      //   title: 'fine thx gtfo',
      //   done: false
      // }
    ]
  },
  mutations: {
    handleAddTask(state, taskTitle) {
      if (taskTitle !== ''){
        let newTask = {
          id: Date.now(),
          title: taskTitle,
          done: false
        }
        state.tasks.push(newTask)
      }
    },
    handleDoneTask(state, id) {
      let cur_task = state.tasks.filter(task => task.id === id)
      cur_task[0].done = !cur_task[0].done
    },
    handleDeleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    }
  },
  actions: {
    addTask({ commit }, taskTitle) {
      commit('handleAddTask', taskTitle)
    },
    doneTask({ commit }, id) {
      commit('handleDoneTask', id)
    },
    deleteTask({ commit }, id) {
      commit('handleDeleteTask', id)
    }
  }
})
