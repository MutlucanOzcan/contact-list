class Person {
  constructor(namee, surname, mail) {
    this.name = namee;
    this.surname = surname;
    this.mail = mail;
  }
}

class Util {
  static checkBlankZones(...zones) {
    let result = true;
    zones.forEach((zone) => {
      if (zone.length === 0) {
        result = false;
        //  return result;
      }
    });
    return result;
  }
}

class Ui {
  constructor() {
    this.name = document.getElementById("name");
    this.surname = document.getElementById("surname");
    this.mail = document.getElementById("mail");
    this.saveEditButton = document.querySelector(".save-and-edit");
    this.form = document
      .getElementById("form-directory")
      .addEventListener("submit", this.saveEdit);
    this.personList = document.querySelector(".person-list");
    this.Storage = new Storage();
  }
  printNewPerson(person) {}
  saveEdit(e) {
    e.preventDefault();
    //console.log("working");
    const person = new Person(
      this.name.value,
      this.surname.value,
      this.mail.value
    );
    const result = Util.checkBlankZones(
      person.name,
      person.surname,
      person.mail
    );
    if (result) {
      this.printNewPerson(person);
    } else {
      console.log("fill blank zones");
    }
  }
}

class Storage {
  // when app started, get data from database etc.
  constructor() {
    this.allPersons = [];
  }
  getPersons() {
    let allPersonsLocal;
    if (localStorageLocal.getItem("allPersons") === null) {
      allPersonsLocal = [];
    } else {
      allPersonsLocal = JSON.parse(localStorage.getItem("allPersons"));
    }
    this.allPersons = allPersonsLocal;
    return allPersonsLocal;
  }
  addPerson(person) {
    const allPersonsLocal = this.getPersons();
    allPersonsLocal.push(person);
    localStorage.setItem("allPersons", JSON.stringify(allPersonsLocal));
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  const screen = new Ui();
});
