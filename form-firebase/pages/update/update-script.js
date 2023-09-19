/* Variables */
const search = window.location.search;
const url = new URLSearchParams(search);
const ID_PERSONA = url.get("id");
const URL_FIREBASE_BY_ID =
  "https://js-yovani-default-rtdb.firebaseio.com/" + ID_PERSONA + ".json";

/* Select Elements DOM */
const sectionAvatar = document.querySelector("#section-avatar");
const inputUrl = document.querySelector("#input-url");
const inputName = document.querySelector("#input-name");
const inputLastName = document.querySelector("#input-lastname");
const inputDate = document.querySelector("#input-date");
const genderRadios = document.querySelectorAll('input[name="gender"]');
const selectCountry = document.querySelector("#select-country");
const txtDescription = document.querySelector("#textarea-description");
const btnUpdate = document.querySelector("#update-person");

/* Methods API */
const getPersonApiById = async () => {
  try {
    const response = await fetch(URL_FIREBASE_BY_ID, {
      method: "GET",
    });
    const parsed = await response.json();

    const imgAvatar = document.createElement("img");
    imgAvatar.className = "avatar";
    imgAvatar.alt = "avatar-" + parsed.name;
    imgAvatar.src = parsed.avatar;
    sectionAvatar.appendChild(imgAvatar);

    inputUrl.value = parsed.avatar;
    inputName.value = parsed.name;
    inputLastName.value = parsed.lastName;
    inputDate.value = parsed.date;
    genderRadios.forEach((element) => {
      if (element.value === parsed.gender) {
        element.checked = true;
      }
    });
    selectCountry.value = parsed.country;
    txtDescription.value = parsed.description;
  } catch (error) {
    console.error(error);
  }
};

const updatePersonApiById = async (updateInfo) => {
  try {
    const response = await fetch(URL_FIREBASE_BY_ID, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(updateInfo),
    });
    if (response.status === 200) {
      window.location.href = "http://127.0.0.1:5500/";
    }
  } catch (error) {
    console.error(error);
  }
};

/* Events */
btnUpdate.addEventListener("click", () => {
  const inputGender = document.querySelector('input[name="gender"]:checked');
  const person = {
    avatar: inputUrl.value,
    name: inputName.value,
    lastName: inputLastName.value,
    date: inputDate.value,
    gender: inputGender.value,
    country: selectCountry.value,
    description: txtDescription.value,
  };

  updatePersonApiById(person);
});

getPersonApiById(ID_PERSONA);
