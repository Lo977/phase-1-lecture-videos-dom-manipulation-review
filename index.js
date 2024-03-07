// DOM RENDER
function renderOneAnimal(animal) {
  let card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
    <img class='image' src="${animal.imageUrl}">
    <div>
    <h4>${animal.name}</h4>
    <p>
    <span>$${animal.donations}</span> Donated
    </P>
    <p>${animal.description}</P>
    </div>

    <div>
    <button id="donate" class="buttons">Donate</button>
    <button id="setFree" class="buttons">Set Free</button>
    </div>
    `;
  card.querySelector("#donate").addEventListener("click", () => {
    animal.donations += 10;
    card.querySelector("span").textContent = animal.donations;
    updateDonations(animal);
  });
  card.querySelector("#setFree").addEventListener("click", () => {
    card.remove();
    deleteAnimal(animal.id);
  });

  document.getElementById("animal-form").appendChild(card);
}
// FETCH ALL OBJECT
function getAllAnimals() {
  fetch("http://localhost:3000/animalData")
    .then((res) => res.json())
    .then((animalData) =>
      animalData.forEach((animal) => renderOneAnimal(animal))
    );
}
getAllAnimals();

// POST
document.querySelector("form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let animalObj = {
    name: e.target.name.value,
    imageUrl: e.target.imageUrl.value,
    description: e.target.description.value,
    donations: 0,
  };
  // form.reset();
  renderOneAnimal(animalObj);
  adoptAnimal(animalObj);
}

function adoptAnimal(animalObj) {
  fetch("http://localhost:3000/animalData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animalObj),
  })
    .then((res) => res.json())
    .then((animal) => console.log(animal));
}

// Patch
function updateDonations(animalObj) {
  fetch(`http://localhost:3000/animalData/${animalObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animalObj),
  })
    .then((res) => res.json)
    .then((animal) => console.log(animal));
}

// DELETE
function deleteAnimal(id) {
  fetch(`http://localhost:3000/animalData/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((animal) => console.log(animal));
}
