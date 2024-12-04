import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isDark: false, // Default theme
    },
    mutations: {
      toggleTheme(state) {
        state.isDark = !state.isDark; // Toggle theme state
      },
      setTheme(state, isDark) {
        state.isDark = isDark; // Explicitly set the theme
      },
    },
    getters: {
      isDark: (state) => state.isDark, // Getter to access theme state
    },
  });
};

export default createStore;
