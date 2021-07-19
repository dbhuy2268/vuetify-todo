import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

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
    ],
    snackbar: {
      show: false,
      text: ''
    }
  },
  mutations: {
    clearTask(state) {
      state.tasks = []
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (this.state.snackbar.show){
        state.snackbar.show = false
        timeout = 200
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    async handleAddTask(state, taskTitle) {
      if (taskTitle.length){
        let newTask = {
          description: taskTitle,
          status: false
        }
      await axios.post(`http://127.0.0.1:8000/tasks/`, { description: newTask.description, status: newTask.status })
        .then(response => {
          this.state.tasks.unshift(newTask)
        });
      }
    },
    handleDoneTask(state, id) {
      let cur_task = state.tasks.filter(task => task.id === id)
      cur_task[0].status = !cur_task[0].status
      axios.put(`http://127.0.0.1:8000/tasks/${id}/`, { description: cur_task[0].description, status: cur_task[0].status })
        .then(response => {});
    },
    handleDeleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
      axios.delete(`http://127.0.0.1:8000/tasks/${id}/`)
        .then(response => {});
    },
    handleGetTask(state) {
      axios
          .get("http://127.0.0.1:8000/tasks/")
          .then(response => {
            state.tasks = response.data
          });
    },
    handleChangeDescription(state, payload){
      let cur_task = state.tasks.filter(task => task.id === payload.id)
      cur_task[0].description = payload.description
      axios.put(`http://127.0.0.1:8000/tasks/${payload.id}/`,
          { description: payload.description })
          .then(response => {});
    }
  },
  actions: {
    addTask({ commit }, taskTitle) {
      commit('handleAddTask', taskTitle)
      commit('showSnackbar', 'Task added!')
    },
    doneTask({ commit }, id) {
      commit('handleDoneTask', id)
    },
    deleteTask({ commit }, id) {
      commit('handleDeleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    },
    getTasks({ commit }) {
      commit('handleGetTask')
    },
    changeDescription({ commit }, payload) {
      commit('handleChangeDescription', payload)
    }
  }
})
