//picking elements

const namee = document.getElementById("name");
const surname = document.getElementById("surname");
const mail = document.getElementById("mail");
const form = document.getElementById("form-directory");
const personList = document.querySelector(".person-list");
const saEdButton = document.querySelector(".save-and-edit");

// adding event listeners
const contactList = [];
let selectedRow = undefined;
form.addEventListener("submit", save);
personList.addEventListener("click", handleAction);

function save(e) {
  e.preventDefault();
  const newPerson = {
    namee: namee.value,
    surname: surname.value,
    mail: mail.value,
  };

  const value = verifyData(newPerson);
  if (value.cond) {
    if (selectedRow) {
      editPerson(newPerson);
    } else {
      addPerson(newPerson);
    }
  } else {
    createInfo(value.message, value.cond);
    //console.log(value.message);
  }
}

function editPerson(newPerson) {
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].mail === selectedRow.cells[2].textContent) {
      contactList[i] = newPerson;
      break;
    }
  }

  selectedRow.cells[0].textContent = newPerson.namee;
  selectedRow.cells[1].textContent = newPerson.surname;
  selectedRow.cells[2].textContent = newPerson.mail;

  saEdButton.value = "SAVE";
  selectedRow = undefined;
}

function addPerson(newPerson) {
  const newTrElement = document.createElement("tr");
  newTrElement.innerHTML = `<td>${newPerson.namee}</td>
    <td>${newPerson.surname}</td>
    <td>${newPerson.mail}</td>
    <td>
      <button class="btn btn--edit">
        <i class="fa-solid fa-user-pen"></i>
      </button>
      <button class="btn btn--delete">
        <i class="fa-solid fa-user-minus"></i>
      </button>
    </td>`;
  personList.appendChild(newTrElement);
  contactList.push(newPerson);
  createInfo("Contact added to the list.", true);
  console.log(contactList);
}

function verifyData(newPerson) {
  for (v in newPerson) {
    if (newPerson[v]) {
    } else {
      const value = {
        cond: false,
        message: "fill the blank zones please",
      };
      return value;
    }
  }
  clearPlaces();
  return {
    cond: true,
    message: "Successfully Created!",
  };
}

function createInfo(context, condition) {
  const createdInfo = document.createElement("div");
  createdInfo.textContent = context;
  createdInfo.className = "info";
  condition
    ? createdInfo.classList.add("info--success")
    : createdInfo.classList.add("info--error");
  document.querySelector(".container").insertBefore(createdInfo, form);

  //Info pop-up

  setTimeout(function () {
    const removeDiv = document.querySelector(".info");
    if (removeDiv) {
      removeDiv.remove();
    }
  }, 2000);
}

function clearPlaces() {
  namee.value = "";
  surname.value = "";
  mail.value = "";
}

function handleAction(event) {
  if (event.target.classList.contains("btn--delete")) {
    const deletedTr = event.target.parentElement.parentElement;
    const deletedMail =
      event.target.parentElement.previousElementSibling.textContent;
    handleDelete(deletedTr, deletedMail);
  } else if (event.target.classList.contains("btn--edit")) {
    saEdButton.value = "EDIT";
    const editingRow = event.target.parentElement.parentElement;
    const editingMail = editingRow.cells[2].textContent;

    namee.value = editingRow.cells[0].textContent;
    surname.value = editingRow.cells[1].textContent;
    mail.value = editingMail;

    selectedRow = editingRow;
  }
}

function handleDelete(a1, a2) {
  a1.remove();
  contactList.forEach((namee, index) => {
    if (namee.mail === a2) {
      contactList.splice(index, 1);
    }
  });
  clearPlaces();
  saEdButton.value = "SAVE";
  // console.log(contactList);
}
