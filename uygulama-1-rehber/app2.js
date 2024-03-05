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
    this.form = document.getElementById("form-directory");
    this.form.addEventListener("submit", this.saveEdit.bind(this));
    this.personList = document.querySelector(".person-list");
    this.personList.addEventListener("click", this.editOrDelete.bind(this));
    this.storage = new Storage();
    this.selectedRow = undefined;
    this.prntPeopleFromStoragetoScreen();
  }
  editOrDelete(e) {
    const clickTarget = e.target;
    if (clickTarget.classList.contains("btn--delete")) {
      this.selectedRow = clickTarget.parentElement.parentElement;
      this.deleteFromUiAndStorage();
    } else if (clickTarget.classList.contains("btn--edit")) {
      this.selectedRow = clickTarget.parentElement.parentElement;
      this.saveEditButton.value = "EDIT";
      this.name.value = this.selectedRow.cells[0].textContent;
      this.surname.value = this.selectedRow.cells[1].textContent;
      this.mail.value = this.selectedRow.cells[2].textContent;
    }
  }

  editPersonFromUi(person) {
    this.storage.editPerson(person, this.selectedRow.cells[2].textContent);
    this.selectedRow.cells[0].textContent = person.name;
    this.selectedRow.cells[1].textContent = person.surname;
    this.selectedRow.cells[2].textContent = person.mail;
    this.clearZones();
    this.selectedRow = undefined;
    this.saveEditButton.value = "SAVE";
  }

  clearZones() {
    this.name.value = "";
    this.surname.value = "";
    this.mail.value = "";
  }

  deleteFromUiAndStorage() {
    this.selectedRow.remove();
    const deleteMail = this.selectedRow.cells[2].textContent;
    this.storage.deletePerson(deleteMail);
    this.clearZones();
    this.selectedRow = undefined;
  }

  prntPeopleFromStoragetoScreen() {
    this.storage.allPersons.forEach((person) => {
      this.printNewPerson(person);
    });
  }
  printNewPerson(person) {
    const newTr = document.createElement("tr");
    newTr.innerHTML = `<td>${person.name}</td>
    <td>${person.surname}</td>
    <td>${person.mail}</td>
    <td>
      <button class="btn btn--edit">
        <i class="fa-solid fa-user-pen"></i>
      </button>
      <button class="btn btn--delete">
        <i class="fa-solid fa-user-minus"></i>
      </button>
    </td>`;
    this.personList.appendChild(newTr);
  }
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
      if (this.selectedRow) {
        //if selectedRow != undefined, we are gonna edit saved contact
        this.editPersonFromUi(person);
      } else {
        //if selectedRow = undefined, just add new contact.
        this.statusInfo("Successfully Created!", true);
        this.printNewPerson(person);
        //also we want to include local storage
        this.storage.addPerson(person);
      }
      this.clearZones();
    } else {
      console.log("fill blank zones");
    }
  }
  statusInfo(context, condition) {
    const warningDiv = document.querySelector(".info");
    warningDiv.innerHTML = context;
    warningDiv.classList.add(condition ? "info--success" : "info--error");

    //Info pop-up

    setTimeout(function () {
      warningDiv.className = "info";
    }, 2000);
  }
}

class Storage {
  // when app started, get data from database etc.
  constructor() {
    this.allPersons = this.getPerson();
  }
  getPerson() {
    let allPersonsLocal;
    if (localStorage.getItem("allPersons") === null) {
      allPersonsLocal = [];
    } else {
      allPersonsLocal = JSON.parse(localStorage.getItem("allPersons"));
    }

    return allPersonsLocal;
  }
  addPerson(person) {
    this.allPersons.push(person);
    localStorage.setItem("allPersons", JSON.stringify(this.allPersons));
  }
  deletePerson(mail) {
    this.allPersons.forEach((person, index) => {
      if (person.mail === mail) {
        this.allPersons.splice(index, 1);
      }
    });
    localStorage.setItem("allPersons", JSON.stringify(this.allPersons));
  }
  editPerson(editedPerson, mail) {
    this.allPersons.forEach((person, index) => {
      if (person.mail === mail) {
        this.allPersons[index] = editedPerson;
      }
    });
    localStorage.setItem("allPersons", JSON.stringify(this.allPersons));
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  const screen = new Ui();
});
