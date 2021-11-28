// Acá manejo las ide de los heroes que se seleccionan, para guardar todo en localstorage

const heroList = {
  idHeroes: [],
  bad: 3,
  good: 3,
  heroCounter: 6,

  addHero(id, alignment) {
    const response = {
      msg: "Hero successfully added to your team!",
      type: "success",
    };
    this.localStorageHeroes();

    for (let index = 0; index < this.idHeroes.length; index++) {
      if (this.idHeroes[index] === id) {
        response.msg = "The chosen hero is already in your team.";
        response.type = "danger";
        return response;
      }
    }

    if (this.heroCounter === 0) {
      response.msg = "Your team is already Full";
      response.type = "danger";
      return response;
    }

    if (alignment === "bad") {
      if (this.bad > 0) {
        this.bad--;
        this.heroCounter--;
        this.idHeroes.push(id);
      } else {
        response.msg = "Your team is empty of slots for bad alignment";
        response.type = "danger";
      }
    } else if (alignment === "good") {
      if (this.good > 0) {
        this.good--;
        this.heroCounter--;
        this.idHeroes.push(id);
      } else {
        response.msg = "Your team is empty of slots for good alignment";
        response.type = "danger";
      }
    } else if (alignment === "-" || alignment === "neutral") {
      this.idHeroes.push(id);
      this.heroCounter--;
    }

    window.localStorage.setItem("SelectedHeroes", JSON.stringify(heroList));
    return response;
  },

  removeHero(id, alignment) {
    console.log(alignment);
    if (alignment === "bad") {
      this.bad++;
      this.heroCounter++;
    } else if (alignment === "good") {
      console.log("asdasd");
      this.good++;
      this.heroCounter++;
    } else if (alignment === "-" || alignment === "neutral") {
      this.heroCounter++;
    }
    this.idHeroes = this.idHeroes.filter((idHero) => idHero !== id);
    window.localStorage.setItem("SelectedHeroes", JSON.stringify(heroList));
    const response = {
      msg: "Hero successfully removed from your team.",
      type: "success",
    };
    return response;
  },

  localStorageHeroes() {
    const items = window.localStorage.getItem("SelectedHeroes");
    const localStorageHeroes = JSON.parse(items);
    if (!localStorageHeroes) {
      return;
    }
    this.heroCounter = localStorageHeroes.heroCounter;
    this.bad = localStorageHeroes.bad;
    this.good = localStorageHeroes.good;
    this.idHeroes = localStorageHeroes.idHeroes;
  },
};

export default heroList;
