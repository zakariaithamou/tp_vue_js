const { createApp } = Vue;

createApp({
  data() {
    return {
      rechercheTexte: "",
      filtreCategorie: "",

      articleSelectionne: null,

      nouvelArticle: {
        nom: "",
        categorie: "",
        quantite: 0,
        prixUnitaire: 0,
        seuilAlerte: 5,
      },

      articles: [
        {
          id: 1,
          nom: "Eau Minérale",
          categorie: "Boisson",
          quantite: 15,
          prixUnitaire: 3,
          seuilAlerte: 5,
        },
        {
          id: 2,
          nom: "Soda",
          categorie: "Boisson",
          quantite: 2,
          prixUnitaire: 5,
          seuilAlerte: 4,
        },
        {
          id: 3,
          nom: "Chips",
          categorie: "Snack",
          quantite: 0,
          prixUnitaire: 4,
          seuilAlerte: 3,
        },
        {
          id: 4,
          nom: "Chocolat",
          categorie: "Snack",
          quantite: 8,
          prixUnitaire: 6,
          seuilAlerte: 2,
        },
      ],
    };
  },

  computed: {
    articlesFiltres() {
      return this.articles.filter((article) => {
        const correspondNom = article.nom
          .toLowerCase()
          .includes(this.rechercheTexte.toLowerCase());
        const correspondCat =
          this.filtreCategorie === "" ||
          article.categorie === this.filtreCategorie;
        return correspondNom && correspondCat;
      });
    },

    valeurTotaleStock() {
      return this.articles.reduce(
        (acc, a) => acc + a.quantite * a.prixUnitaire,
        0,
      );
    },

    nombreRupture() {
      return this.articles.filter((a) => a.quantite === 0).length;
    },
  },

  methods: {
    incrementer(article) {
      article.quantite++;
    },

    decrementer(article) {
      if (article.quantite > 0) {
        article.quantite--;
      }
    },

    toggleDetail(article) {
      this.articleSelectionne =
        this.articleSelectionne === article ? null : article;
    },

    supprimerArticle(article) {
      this.articles = this.articles.filter((a) => a.id !== article.id);
      if (this.articleSelectionne === article) {
        this.articleSelectionne = null;
      }
    },

    ajouterArticle() {
      if (
        !this.nouvelArticle.nom.trim() ||
        !this.nouvelArticle.categorie
      ) {
        return;
      }

      this.articles.push({
        id: Date.now(),
        nom: this.nouvelArticle.nom,
        categorie: this.nouvelArticle.categorie,
        quantite: Number(this.nouvelArticle.quantite),
        prixUnitaire: Number(this.nouvelArticle.prixUnitaire),
        seuilAlerte: Number(this.nouvelArticle.seuilAlerte),
      });

      this.nouvelArticle = {
        nom: "",
        categorie: "",
        quantite: 0,
        prixUnitaire: 0,
        seuilAlerte: 5,
      };
    },
  },
}).mount("#app");
