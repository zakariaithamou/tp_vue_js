const app = Vue.createApp({
  data() {
    return {
      books: [
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          year: 2008,
          genre: "Génie logiciel",
          isFav: true,
          image: "img/clean_code.jpg",
          link: "https://www.lkhibra.ma/books/clean-code.pdf",
        },
        {
          id: 2,
          title: "Introduction to Algorithms",
          author: "Cormen, Leiserson, Rivest, Stein",
          year: 2009,
          genre: "Algorithmique",
          isFav: false,
          image: "img/intro_algo.jpg",
          link: "https://www.cs.mcgill.ca/~akroit/math/compsci/Cormen%20Introduction%20to%20Algorithms.pdf",
        },
        {
          id: 3,
          title: "Design Patterns",
          author: "Gamma, Helm, Johnson, Vlissides",
          year: 1994,
          genre: "Génie logiciel",
          isFav: true,
          image: "img/design_pattern.jpg",
          link: "https://www.javier8a.com/itc/bd1/articulo.pdf",
        },
        {
          id: 4,
          title: "Le Petit Prince",
          author: "Antoine de Saint-Exupéry",
          year: 1943,
          genre: "Littérature",
          isFav: false,
          image: "img/petit_prince.jpg",
          link: "https://www.ease.fr/wordpress/wp-content/uploads/2019/11/PETIT-PRINCE-LE-Antoine-de-Saint-Exupery.pdf",
        },
        {
          id: 5,
          title: "Computer Networks",
          author: "Andrew S. Tanenbaum",
          year: 2010,
          genre: "Réseaux",
          isFav: false,
          image: "img/computer_networks.jpg",
          link: "https://networking.harshkapadia.me/files/books/computer-networks-tanenbaum-5th-edition.pdf",
        },
        {
          id: 6,
          title: "You Don't Know JS",
          author: "Kyle Simpson",
          year: 2015,
          genre: "Développement web",
          isFav: false,
          image: "img/js_book.jpg",
          link: "https://kingyinliang.github.io/PDF/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript%EF%BC%88%E4%B8%8B%E5%8D%B7%EF%BC%89.pdf",
        },
      ],
      favorisSeulement: false,
      formulaireVisible: false,
      showDetails: {},
      nouveauLivre: {
        title: "",
        author: "",
        year: new Date().getFullYear(),
        genre: "",
        image: "",
        link: "",
        isFav: false,
      },
    };
  },
  computed: {
    nombre_books_Favoris() {
      return this.books.filter((book) => book.isFav).length;
    },

    livresFavoris() {
      return this.books.filter((book) => book.isFav === true);
    },

  
    booksTriesParAnnee() {
      return [...this.books].sort((bookA, bookB) => bookB.year - bookA.year);
    },
  },
  methods: {
    selectionnerImage(event) {
      const fichier = event.target.files[0];

      if (!fichier) {
        this.nouveauLivre.image = "";
        return;
      }

      const lecteur = new FileReader();
      lecteur.addEventListener("load", () => {
        this.nouveauLivre.image = lecteur.result;
      });
      lecteur.readAsDataURL(fichier);
    },

    ajouterLivre() {
      const prochainId =
        this.books.length > 0
          ? Math.max(...this.books.map((book) => book.id)) + 1
          : 1;

      this.books.push({
        ...this.nouveauLivre,
        id: prochainId,
        showDetails: false,
      });

      this.nouveauLivre = {
        title: "",
        author: "",
        year: new Date().getFullYear(),
        genre: "",
        image: "",
        link: "",
        isFav: false,
      };
    },

    supprimerLivre(id) {
      this.books = this.books.filter((book) => book.id !== id);
    },
  },
});

app.mount("#app");
