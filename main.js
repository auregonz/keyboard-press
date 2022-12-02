const row1 = ["échap", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
const row2 = ["²", "&", "é", '"', "'", "(", "-", "è", "_", "ç", "à", ")", "=", "Retour arr"];
const row3 = ["tab", "a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "^", "$", "entrée"];
const row4 = ["maj ver on", "maj ver off", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "ù", "*"];
const row5 = ["maj gauche", "<", "w", "x", "c", "v", "b", "n", ",", ";", ":", "!", "maj droite"];
const row6 = ["ctrl gauche", "windows", "alt", "espace", "alt gr", "alt gr", "ctrl droite"];

const insertion_row1 = ["insert", "début", "page up"];
const insertion_row2 = ["suppr", "fin", "page down"];

const navigation = ["gauche", "haut", "droite", "bas"];

const numpad_row1 = ["verr num off", "verr num on", "/", "*", "-"];
const numpad_row2 = ["7", "8", "9", "+"];
const numpad_row3 = ["4", "5", "6"];
const numpad_row4 = ["1", "2", "3", "entrée"];
const numpad_row5 = ["0", "."];

const keyboard = [].concat(
  row1,
  row2,
  row3,
  row4,
  row5,
  row6,
  insertion_row1,
  insertion_row2,
  navigation,
  numpad_row1,
  numpad_row2,
  numpad_row3,
  numpad_row4,
  numpad_row5
);

function launch() {
  const resume = [];

  const el = document.createElement("p");

  document.querySelector("main").appendChild(el);

  let index = 0;
  el.innerText = keyboard[index];

  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    const { key, code, keyCode, which } = event;
    const keyPressed = { touche: keyboard[index], key, code, keyCode, which };
    console.log(`${keyboard[index]} :`, keyPressed);
    resume.push(keyPressed);
    index++;
    el.innerText = keyboard[index];

    if (index === keyboard.length) {
      console.log("Terminé");
      const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
      el.innerText = blob;

      const dlButton = document.createElement("a");
      dlButton.innerText = "Download";
      dlButton.download = "resume.json";
      dlButton.href = window.URL.createObjectURL(blob);
      document.querySelector("main").appendChild(dlButton);
    }
  });
}

function displayResult() {
  fetch("./resume.json")
    .then((response) => response.json())
    .then((keys) => {
      console.log(keys);
      createCards(keys);
    });
}

function createCards(listOfKeys) {
  console.log("=== createCards ===");
  const sectionEl = document.querySelector("section");

  listOfKeys.forEach((key) => {
    console.log("encours :", key);
    let resumeCard = createCard(key);
    console.log("retour :", resumeCard);
    sectionEl.appendChild(resumeCard);
  });
}

function createCard(obj) {
  console.log("===== createCard =====", obj);
  const card = document.createElement("div");
  card.classList.add("card");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card__title");
  // cardTitle.innerHTML = "Touche :";
  // const cardKeySpan = document.createElement("span");
  // cardKeySpan.innerText = obj.key;
  // cardTitle.innerHTML.add(cardKeySpan);
  cardTitle.innerHTML = /*html*/ `
  Touche : <span class="card__key">${obj.touche}</span>
  `;

  const cardProperties = document.createElement("div");
  cardProperties.classList.add("card__properties");

  for (const [propName, propValue] of Object.entries(obj)) {
    console.log("propName & propValue : ", propName, propValue);
    if (propName === "touche") continue;

    const cardProperty = document.createElement("figure");
    cardProperty.classList.add("card__property");
    cardProperty.innerHTML = /*html*/ `
      <p class="card__property-value">${propValue}</p>
      <figcaption class="card__property-name">${propName}</figcaption>
    `;
    cardProperties.appendChild(cardProperty);
  }

  card.appendChild(cardTitle);
  card.appendChild(cardProperties);

  console.log("Carte :", card);

  return card;
}
