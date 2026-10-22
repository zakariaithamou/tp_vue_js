const { createApp } = Vue;

createApp({
  data() {
    return {
      recherche: "",
      nouveauModule: {
        nom: "",
        note: null,
        coefficient: null,
      },
      detailsVisibles: {},
      modules: [
        { id: 1, nom: "Développement Web & JS", note: 16.5, coefficient: 3 },
        { id: 2, nom: "Bases de Données Avancées", note: 8.5, coefficient: 2 },
        { id: 3, nom: "Réseaux & Protocoles", note: 13.0, coefficient: 2 },
        { id: 4, nom: "Systèmes d’Exploitation", note: 9.0, coefficient: 3 },
        { id: 5, nom: "Génie Logiciel & UML", note: 15.0, coefficient: 2 },
      ],
    };
  },

  computed: {
    moyenneGenerale() {
      if (this.modules.length === 0) return 0;

      const sommePoints = this.modules.reduce(
        (accumulateur, m) => accumulateur + m.note * m.coefficient,
        0,
      );

      const sommeCoefficients = this.modules.reduce(
        (accumulateur, m) => accumulateur + m.coefficient,
        0,
      );

      if (sommeCoefficients === 0) return 0;
      return +(sommePoints / sommeCoefficients).toFixed(2);
    },

    modulesARattraper() {
      return this.modules.filter((m) => m.note < 10);
    },

    modulesTries() {
      return [...this.modules].sort((a, b) => b.note - a.note);
    },

    modulesAffiches() {
      const q = this.recherche.trim().toLowerCase();
      if (!q) return this.modulesTries;
      return this.modulesTries.filter((m) => m.nom.toLowerCase().includes(q));
    },

    moduleMax() {
      if (this.modulesTries.length === 0) return null;
      return this.modulesTries[0];
    },

    moduleMin() {
      if (this.modulesTries.length === 0) return null;
      return this.modulesTries[this.modulesTries.length - 1];
    },

    tousValides() {
      if (this.modules.length === 0) return false;
      return this.modules.every((m) => m.note >= 10);
    },
  },

  methods: {
    ajouterModule() {
      if (
        !this.nouveauModule.nom ||
        this.nouveauModule.note === null ||
        this.nouveauModule.coefficient === null
      ) {
        return;
      }

      this.modules.push({
        id: Date.now(),
        nom: this.nouveauModule.nom,
        note: Number(this.nouveauModule.note),
        coefficient: Number(this.nouveauModule.coefficient),
      });

      this.nouveauModule = { nom: "", note: null, coefficient: null };
    },

    supprimerModule(moduleASupprimer) {
      this.modules = this.modules.filter((m) => m.id !== moduleASupprimer.id);
      delete this.detailsVisibles[moduleASupprimer.id];
    },

    toggleDetail(id) {
      this.detailsVisibles[id] = !this.detailsVisibles[id];
    },
  },
}).mount("#app");
