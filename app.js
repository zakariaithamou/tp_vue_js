const { createApp, ref, computed, onMounted } = Vue;

const TaskList = {
  template: `
    <div class="task-list">
      <h2>Liste des tâches</h2>

      <!-- Boutons avec v-bind (:class) et v-on (@click) -->
      <div class="filter-buttons">
        <button 
          @click="setFilter('all')" 
          :class="{ active: filter === 'all' }">
          Toutes
        </button>
        <button 
          @click="setFilter('todo')" 
          :class="{ active: filter === 'todo' }">
          À faire
        </button>
        <button 
          @click="setFilter('done')" 
          :class="{ active: filter === 'done' }">
          Terminées
        </button>
      </div>

      <!-- Affichage de la liste filtrée -->
      <ul>
        <li v-for="t in filteredTasks" :key="t.id">
          <strong>{{ t.title }}</strong> : {{ t.description }} 
          <span>({{ t.completed ? 'Terminée' : 'À faire' }})</span>
        </li>
      </ul>
    </div>
  `,
  setup() {
    const tasks = ref([]);
    const filter = ref("all"); // 'all', 'todo', 'done'

    const setFilter = (selectedFilter) => {
      filter.value = selectedFilter;
    };

    onMounted(() => {
      fetch("./taskList.json")
        .then((res) => res.json())
        .then((data) => {
          tasks.value = data;
        })
        .catch((err) => console.error(err));
    });

    // Propriété calculée pour le filtrage
    const filteredTasks = computed(() => {
      switch (filter.value) {
        case "todo":
          return tasks.value.filter((task) => !task.completed);
        case "done":
          return tasks.value.filter((task) => task.completed);
        case "all":
        default:
          return tasks.value;
      }
    });

    return {
      filter,
      filteredTasks,
      setFilter,
    };
  },
};

createApp({
  components: {
    TaskList,
  },
}).mount("#app");
