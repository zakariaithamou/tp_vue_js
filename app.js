const { createApp } = Vue;

createApp({
  data() {
    return {
      nouveauMotCle: "",
      imageError: "",
      newBook: {
        title: "",
        author: "",
        year: new Date().getFullYear(),
        genre: "",
        isFav: false,
        keywords: [],
        image: "",
      },
      books: [
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          year: 2008,
          genre: "Informatique",
          isFav: true,
          keywords: ["Architecture", "Bonnes pratiques"],
          image: "img/clean_code.jpg",
        },
        {
          id: 2,
          title: "Dune",
          author: "Frank Herbert",
          year: 1965,
          genre: "Science-Fiction",
          isFav: false,
          keywords: ["Espace", "Classique"],
          image: "img/dune.jpg",
        },
      ],
    };
  },
  computed: {
    formulaireValide() {
      return (
        this.newBook.title.trim() !== "" && this.newBook.author.trim() !== ""
      );
    },
  },
  methods: {
    ajouterLivre() {
      if (!this.formulaireValide) return;

      const nouveauLivre = {
        ...this.newBook,
        id: Date.now(),
        keywords: [...this.newBook.keywords],
        image:
          this.newBook.image ||
          "img/clean_code.jpg",
      };

      this.books.push(nouveauLivre);
      this.reinitialiserFormulaire();
    },

    reinitialiserFormulaire() {
      this.newBook = {
        title: "",
        author: "",
        year: new Date().getFullYear(),
        genre: "",
        isFav: false,
        keywords: [],
        image: "",
      };
      this.nouveauMotCle = "";
      this.imageError = "";
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = "";
      }
    },

    supprimerLivre(bookToDelete) {
      this.books = this.books.filter((b) => b.id !== bookToDelete.id);
    },

    toggleFavori(book) {
      book.isFav = !book.isFav;
    },

    ajouterMotCle() {
      const tag = this.nouveauMotCle.trim();
      if (tag && !this.newBook.keywords.includes(tag)) {
        this.newBook.keywords.push(tag);
      }
      this.nouveauMotCle = "";
    },

    retirerMotCle(index) {
      this.newBook.keywords.splice(index, 1);
    },

    selectionnerImage(event) {
      const file = event.target.files && event.target.files[0];
      this.imageError = "";

      if (!file) {
        this.newBook.image = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.imageError = "Veuillez sélectionner un fichier image.";
        this.newBook.image = "";
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.imageError = "L'image ne doit pas dépasser 5 Mo.";
        this.newBook.image = "";
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.newBook.image = reader.result;
        } else {
          this.imageError = "Impossible de lire cette image.";
        }
      };
      reader.onerror = () => {
        this.imageError = "Impossible de lire cette image.";
        this.newBook.image = "";
      };
      reader.readAsDataURL(file);
    },
  },
}).mount("#app");
