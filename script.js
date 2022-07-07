const editButton = document.querySelector(".profile__edit-button");
const popupEditForm = document.querySelector(".popup_edit-profile");
const profileNameInputField = popupEditForm.querySelector(
  '.form__input-field[name="profile-name"]'
);
const profileDutyInputField = popupEditForm.querySelector(
  '.form__input-field[name="profile-duty"]'
);

const inputNameField = popupEditForm.querySelector(
  '.form__input-field[name="profile-name"]'
);
const inputDutyField = popupEditForm.querySelector(
  '.form__input-field[name="profile-duty"]'
);
const popupContainer = popupEditForm.querySelector(".popup__container");
const popupAddCard = document.querySelector(".popup_add-card");
const cardTitleInputField = popupAddCard.querySelector(
  '.form__input-field[name="place-name"]'
);
const cardImageInputField = popupAddCard.querySelector(
  '.form__input-field[name="place-picture-link"]'
);

const profileName = document.querySelector(".profile__name");
const profileDuty = document.querySelector(".profile__duty");
const addButton = document.querySelector(".profile__add-button");

const profile = document.querySelector(".profile");

const templateCards = document.querySelector("#template").content;
const cardTable = document.querySelector(".elements");
const placeElement = templateCards.querySelector(".card").cloneNode(true);

const cardImages = document.querySelectorAll(".card__image");
const cardImagesArray = Array.from(cardImages);
const popupPhoto = document.querySelector("#popup-photo");

const cardName = placeElement.querySelector(".card__name");
const fullSizePhoto = document.querySelector(".popup__full-size-photo");
const popupPhotoCapture = document.querySelector(".popup__photo-caption");

const profileInfoSaveButton = popupEditForm.querySelector(
  "#form__save-button-profile"
);

const popupCloseButton = document.querySelector(
  ".popup__close-button_place_edit"
);

const popupAddCardCloseButton = document.querySelector(
  ".popup__close-button_place_add"
);

//Добавление 6 изначальных карточек на страницу
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardCreateButton = popupAddCard.querySelector(".form__save-button");
cardCreateButton.addEventListener("click", sendFormCardAdd);

//Сборка карточки
function createCard(name, link) {
  const placeElement = templateCards.querySelector(".card").cloneNode(true);
  placeElement.querySelector(".card__name").textContent = name;
  placeElement.querySelector(".card__image").src = link;

  placeElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_active");
    });

  placeElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      event.target.closest(".card").remove();
    });

  placeElement
    .querySelector(".card__image")
    .addEventListener("click", function (event) {
      openPopup(popupPhoto);
      fullSizePhoto.src = link;
      popupPhotoCapture.textContent = name;
    });

  return placeElement;
}

function renderCard(name, link) {
  const card = createCard(name, link);
  cardTable.append(card);
}

initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
});

//Добавление новой карточки
function renderNewCard(name, link) {
  const card = createCard(name, link);
  cardTable.prepend(card);
}

//Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Отправка формы с карточкой
function sendFormCardAdd(event) {
  event.preventDefault();
  const newCardInfo = {};
  newCardInfo.name = cardTitleInputField.value;
  newCardInfo.link = cardImageInputField.value;
  initialCards.unshift(newCardInfo);
  renderNewCard(initialCards[0].name, initialCards[0].link);
  addWindowClose();
  cardImageInputField.closest(".form").reset();
}

//закрытие модального окна с полноразмерной фотографией
function closePopupPhoto() {
  closePopup(popupPhoto);
}

popupPhoto
  .querySelector(".popup__close-button")
  .addEventListener("click", closePopupPhoto);

//Изменение имени и информации при нажатии на кнопку сохранить
function saveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = profileNameInputField.value;
  profileDuty.textContent = profileDutyInputField.value;
  editWindowClose();
}

profileInfoSaveButton.addEventListener("click", saveProfileInfo);

//реализация функции открытия модального окна редактирования профиля
function editWindowOpen() {
  openPopup(popupEditForm);
  inputNameField.value = profileName.textContent;
  console.log(inputNameField.value);
  inputDutyField.value = profileDuty.textContent;
}

editButton.addEventListener("click", editWindowOpen);

//реализация функции закрытия модального окна редактирования профиля
function editWindowClose() {
  closePopup(popupEditForm);
}

popupCloseButton.addEventListener("click", editWindowClose);

// открытие модального окна создания карточки
function addWindowOpen() {
  openPopup(popupAddCard);
}

addButton.addEventListener("click", addWindowOpen);

// закрытие модального окна создания карточки
function addWindowClose() {
  closePopup(popupAddCard);
}

popupAddCardCloseButton.addEventListener("click", addWindowClose);
