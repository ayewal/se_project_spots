const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Golden Gate Bridge",
    link: "  https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];
//profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddCard = document.querySelector(".profile__add-btn");

//Form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

// Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const cardFormElement = addCardModal.querySelector(".modal__form");
const cardSubmitBtn = addCardModal.querySelector(".modal__submit-btn");
const cardNameInput = addCardModal.querySelector("#add-card-name-input");
const cardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close-btn");
const addCardForm = addCardModal.querySelector("form");

//select the modal Preview
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

//card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-icon");

  cardNameEl.textContent = data.name || "untitiled card";
  // assign values to the image src and alt
  cardImageEl.src = data.link || "https://via.placeholder.com/150";
  cardImageEl.alt = data.name || "No description available";

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });
  cardDeleteBtn.addEventListener("click", handleDeleteCard);
  //preview
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal); //opens modal preview
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  console.log("closing modal with esc");
  // check if the key was escape
  if (event.key === "Escape") {
    // if it was, close the modal
    const modal = document.querySelector(".modal_opened");
    // remove the class from that modal
    closeModal(modal);
  }
}

// function handleEscapeKey(event) {
//   if (event.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     if (openModal) {
//       closeModal(openModal);
//     }
//   }
// }

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescription.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  //make image appear when adding card
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disabledButton(cardSubmitBtn, settings);

  closeModal(addCardModal, settings);
}

// Function to open the image modal with the correct image and title

addCardModalCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

profileAddCard.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescription.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescription],
    settings
  );
  openModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addCardModal.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});
