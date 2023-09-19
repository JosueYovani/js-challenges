/* Variables */
const URL_FIREBASE = "https://js-yovani-default-rtdb.firebaseio.com/.json";

/* Functions */
const parserResponsePersonsFireBase = (object) => {
  const listPersonParsed = [];

  for (const key in object) {
    const obectParsed = {
      id: key,
      avatar: object[key].avatar,
      name: object[key].name,
      lastName: object[key].lastName,
      gender: object[key].gender,
      date: object[key].date,
      country: object[key].country,
      description: object[key].description,
    };
    listPersonParsed.push(obectParsed);
  }
  return listPersonParsed;
};

/* Methods API */
const getPersonsApi = async () => {
  try {
    const response = await fetch(URL_FIREBASE, {
      method: "GET",
    });
    const parsed = await response.json();
    const results = parserResponsePersonsFireBase(parsed);
    cleanList();
    renderListPersons(results);
  } catch (error) {
    console.error(error);
  }
};

const postPersonApi = async (payload) => {
  try {
    const response = await fetch(URL_FIREBASE, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      getPersonsApi();
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePersonApi = async (id, updateInfo) => {
  const URL_FIREBASE_BY_ID =
    "https://js-yovani-default-rtdb.firebaseio.com/" + id + ".json";

  try {
    const response = await fetch(URL_FIREBASE_BY_ID, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(updateInfo),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const deletePersonApi = async (id) => {
  const URL_FIREBASE_BY_ID =
    "https://js-yovani-default-rtdb.firebaseio.com/" + id + ".json";

  try {
    const response = await fetch(URL_FIREBASE_BY_ID, {
      method: "DELETE",
    });
    if (response.status === 200) {
      getPersonsApi();
    }
  } catch (error) {
    console.error(error);
  }
};

/* Select Elements DOM */
const btnSave = document.querySelector("#add-person");
const containerListPersons = document.querySelector("#list-persons");

/* Renders DOM */
const renderPerson = (infoPerson) => {
  // Create Avatar
  const divAvatar = document.createElement("div");
  const imgAvatar = document.createElement("img");
  divAvatar.className = "col-5";
  imgAvatar.className = "rounded float-start avatar bg-secondary";
  imgAvatar.alt = "avatar-" + infoPerson.name;
  imgAvatar.src = infoPerson.avatar;
  divAvatar.appendChild(imgAvatar);

  // Create Info
  const divColName = document.createElement("div");
  const spanName = document.createElement("span");
  const textName = document.createElement("p");
  spanName.textContent = "Nombre:";
  textName.textContent = infoPerson.name + " " + infoPerson.lastName;
  divColName.className = "col";
  divColName.appendChild(spanName);
  divColName.appendChild(textName);

  const divColCountry = document.createElement("div");
  const spanCountry = document.createElement("span");
  const textCountry = document.createElement("p");
  spanCountry.textContent = "País:";
  textCountry.textContent = infoPerson.country;
  divColCountry.className = "col";
  divColCountry.appendChild(spanCountry);
  divColCountry.appendChild(textCountry);

  const divRowNameFull = document.createElement("div");
  divRowNameFull.className = "row";
  divRowNameFull.appendChild(divColName);
  divRowNameFull.appendChild(divColCountry);

  const divColDate = document.createElement("div");
  const spanDate = document.createElement("span");
  const textDate = document.createElement("p");
  spanDate.textContent = "Fecha:";
  textDate.textContent = infoPerson.date;
  divColDate.className = "col";
  divColDate.appendChild(spanDate);
  divColDate.appendChild(textDate);

  const divColGender = document.createElement("div");
  const spanGender = document.createElement("span");
  const textGender = document.createElement("p");
  spanGender.textContent = "Género:";
  textGender.textContent = infoPerson.gender;
  divColGender.className = "col";
  divColGender.appendChild(spanGender);
  divColGender.appendChild(textGender);

  const divRowDateAndGender = document.createElement("div");
  divRowDateAndGender.className = "row";
  divRowDateAndGender.appendChild(divColDate);
  divRowDateAndGender.appendChild(divColGender);

  const divColDescription = document.createElement("div");
  const spanDescription = document.createElement("span");
  const textDescription = document.createElement("p");
  spanDescription.textContent = "Descripción:";
  textDescription.textContent = infoPerson.description;
  divColDescription.className = "col";
  divColDescription.appendChild(spanDescription);
  divColDescription.appendChild(textDescription);

  const divRowDscription = document.createElement("div");
  divRowDscription.className = "row";
  divRowDscription.appendChild(divColDescription);

  // Create Buttons
  const btnEditPerson = document.createElement("button");
  const btnDeletePerson = document.createElement("button");
  btnEditPerson.className = "btn btn-outline-info m-2";
  btnEditPerson.textContent = "Editar";
  btnDeletePerson.className = "btn btn-outline-danger m-2";
  btnDeletePerson.textContent = "Eliminar";
  btnDeletePerson.dataset.person = infoPerson.id;
  btnEditPerson.dataset.person = infoPerson.id;
  // Events Buttons
  btnDeletePerson.addEventListener("click", (event) => {
    const idPerson = event.target.dataset.person;
    deletePersonApi(idPerson);
    getPersonsApi();
  });
  btnEditPerson.addEventListener("click", (event) => {
    const idPerson = event.target.dataset.person;
    console.log(idPerson);
  });

  const containerButtons = document.createElement("div");
  containerButtons.className = "d-grid gap-2 d-flex justify-content-end";
  containerButtons.appendChild(btnEditPerson);
  containerButtons.appendChild(btnDeletePerson);

  const divInfoCard = document.createElement("div");
  divInfoCard.className = "col-7";
  divInfoCard.appendChild(divRowNameFull);
  divInfoCard.appendChild(divRowDateAndGender);
  divInfoCard.appendChild(divRowDscription);
  divInfoCard.appendChild(containerButtons);

  // container card
  const divContainer = document.createElement("div");
  divContainer.className = "row";
  divContainer.appendChild(divAvatar);
  divContainer.appendChild(divInfoCard);
  // Card
  const liCard = document.createElement("li");
  liCard.className = "card p-1 m-2 bg-body-tertiary";
  liCard.appendChild(divContainer);

  containerListPersons.appendChild(liCard);
};
// Function by render list persons
const renderListPersons = (listToRender) => {
  listToRender.forEach((person) => {
    renderPerson(person);
  });
};
// Function by clean list in the DOM
const cleanList = () => {
  while (containerListPersons.firstChild) {
    containerListPersons.removeChild(containerListPersons.firstChild);
  }
};

/* Events */
btnSave.addEventListener("click", () => {
  const inputUrl = document.querySelector("#input-url");
  const inputName = document.querySelector("#input-name");
  const inputLastName = document.querySelector("#input-lastname");
  const inputDate = document.querySelector("#input-date");
  const inputGender = document.querySelector('input[name="gender"]:checked');
  const selectCountry = document.querySelector("#select-country");
  const txtDescription = document.querySelector("#textarea-description");
  // Create Object Person
  const person = {
    avatar: inputUrl.value,
    name: inputName.value,
    lastName: inputLastName.value,
    date: inputDate.value,
    gender: inputGender.value,
    country: selectCountry.value,
    description: txtDescription.value,
  };

  postPersonApi(person);
});

getPersonsApi();
