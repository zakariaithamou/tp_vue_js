const { createApp } = Vue;

createApp({
  data() {
    return {
      budgetMensuel: 2000,
      filtreCategorie: "toutes",
      afficherStats: false,
      categories: [
        "Alimentation",
        "Logement",
        "Transport",
        "Loisirs",
        "Scolarité",
      ],

      nouvelleDepense: {
        titre: "",
        montant: null,
        categorie: "",
      },

      depenses: [
        {
          id: 1,
          titre: "Courses supermarché",
          montant: 250,
          categorie: "Alimentation",
        },
        { id: 2, titre: "Loyer mensuel", montant: 1200, categorie: "Logement" },
        {
          id: 3,
          titre: "Cinéma et sorties",
          montant: 150,
          categorie: "Loisirs",
        },
      ],
    };
  },

  computed: {
    depensesFiltrees() {
      if (this.filtreCategorie === "toutes") {
        return this.depenses;
      }
      return this.depenses.filter((d) => d.categorie === this.filtreCategorie);
    },

    totalGeneral() {
      return this.depenses.reduce(
        (acc, curr) => acc + Number(curr.montant || 0),
        0,
      );
    },

    totalFiltre() {
      return this.depensesFiltrees.reduce(
        (acc, curr) => acc + Number(curr.montant || 0),
        0,
      );
    },

    moyenneDepense() {
      if (this.depensesFiltrees.length === 0) {
        return 0;
      }
      return this.totalFiltre / this.depensesFiltrees.length;
    },
  },

  methods: {
    selectionnerCategorie(cat) {
      this.filtreCategorie = cat;
    },

    totalCategorie(cat) {
      return this.depenses
        .filter((d) => d.categorie === cat)
        .reduce((acc, curr) => acc + Number(curr.montant || 0), 0);
    },

    ajouterDepense() {
      if (
        !this.nouvelleDepense.titre ||
        !this.nouvelleDepense.montant ||
        !this.nouvelleDepense.categorie
      ) {
        return;
      }

      this.depenses.push({
        id: Date.now(),
        titre: this.nouvelleDepense.titre,
        montant: parseFloat(this.nouvelleDepense.montant),
        categorie: this.nouvelleDepense.categorie,
      });

      this.nouvelleDepense.titre = "";
      this.nouvelleDepense.montant = null;
      this.nouvelleDepense.categorie = "";
    },

    supprimerDepense(depenseASupprimer) {
      this.depenses = this.depenses.filter(
        (d) => d.id !== depenseASupprimer.id,
      );
    },
  },
}).mount("#app");
