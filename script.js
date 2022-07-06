const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup_edit-profile");
const profileNameInputField = popup.querySelector(
  '.form__input-field[name="profile-name"]'
);
const profileDutyInputField = popup.querySelector(
  '.form__input-field[name="profile-duty"]'
);

const inputNameField = popup.querySelector(
  '.form__input-field[name="profile-name"]'
);
const inputDutyField = popup.querySelector(
  '.form__input-field[name="profile-duty"]'
);
const popupContainer = popup.querySelector(".popup__container");
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

const profileInfoSaveButton = popup.querySelector("#form__save-button-profile");

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

//функция нажатия на кнопку лайка
function clickLikeButton() {
  const likeButton = document.querySelectorAll(".card__like-button");
  const likeButtonArray = Array.from(likeButton);
  likeButtonArray.forEach(function (item, index, array) {
    item.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });
  });
}

clickLikeButton();

// Добавление 6 карточек на страницу
function render() {
  initialCards.forEach(function renderCard({ name, link }) {
    const placeElement = templateCards.querySelector(".card").cloneNode(true);
    placeElement.querySelector(".card__name").textContent = name;
    placeElement.querySelector(".card__image").src = link;
    cardTable.append(placeElement);
  });
  clickLikeButton();
  deleteCard();
}
render();

//создание карточки при нажатии на кнопку создать

const cardCreateButton = popupAddCard.querySelector(".form__save-button");
cardCreateButton.addEventListener("click", sendFormCardAdd);

function renderNewCard() {
  const placeElement = templateCards.querySelector(".card").cloneNode(true);
  placeElement.querySelector(".card__name").textContent = initialCards[0].name;
  placeElement.querySelector(".card__image").src = initialCards[0].link;

  cardTable.prepend(placeElement);

  deleteCard();
  //clickLikeButton();
  getFullSizePhoto();
}

//Отправка формы с карточкой
function sendFormCardAdd(event) {
  event.preventDefault();
  const newCardInfo = {};
  newCardInfo.name = cardTitleInputField.value;
  newCardInfo.link = cardImageInputField.value;
  initialCards.unshift(newCardInfo);
  renderNewCard();
  addWindowClose();
}

//функция открытия попапа с большой фотографией
function getFullSizePhoto() {
  const cardImages = document.querySelectorAll(".card__image");
  const cardImagesArray = Array.from(cardImages);
  const popupPhoto = document.querySelector("#popup-photo");

  cardImagesArray.forEach(function (item, index, array) {
    item.addEventListener("click", function (evt) {
      openPopup(popupPhoto);
      fullSizePhoto.src = item.src;
      popupPhotoCapture.textContent =
        item.nextElementSibling.nextElementSibling.childNodes[1].textContent;
    });
  });
}

function deleteCard() {
  const cardDeleteButtons = document.querySelectorAll(".card__delete-button");
  const cardDeleteButtonsArray = Array.from(cardDeleteButtons);

  cardDeleteButtonsArray.forEach(function (item, index, array) {
    item.addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });
  });
}

function closePopupPhoto() {
  popupPhoto.classList.remove("popup_opened");
}

popupPhoto
  .querySelector(".popup__close-button")
  .addEventListener("click", closePopupPhoto);

cardImagesArray.forEach(function (item, index, array) {
  item.addEventListener("click", function (evt) {
    openPopup(popupPhoto);
    fullSizePhoto.src = item.src;
    popupPhotoCapture.textContent =
      item.nextElementSibling.nextElementSibling.childNodes[1].textContent;
  });
});

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}


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
  popup.classList.add("popup_opened");
  inputNameField.value = profileName.textContent;
  console.log(inputNameField.value);
  inputDutyField.value = profileDuty.textContent;
}

editButton.addEventListener("click", editWindowOpen);

//реализация функции закрытия модального окна редактирования профиля
function editWindowClose() {
  popup.classList.remove("popup_opened");
}

let popupCloseButton = document.querySelector(
  ".popup__close-button_place_edit"
);

popupCloseButton.addEventListener("click", editWindowClose);

// открытие модального окна редактирования карточки
function addWindowOpen() {
  popupAddCard.classList.add("popup_opened");
}

addButton.addEventListener("click", addWindowOpen);

//закрытие модального окна редактирования карточки
const popupAddCardCloseButton = document.querySelector(
  ".popup__close-button_place_add"
);

function addWindowClose() {
  popupAddCard.classList.remove("popup_opened");
}

popupAddCardCloseButton.addEventListener("click", addWindowClose);

getFullSizePhoto()
//clickLikeButton()
