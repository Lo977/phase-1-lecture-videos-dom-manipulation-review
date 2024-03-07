//

// Event Listeners
document.getElementById("animal-form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let animalObj = {
    name: e.target.name.value,
    imageUrl: e.target.imageUrl.value,
    description: e.target.description.value,
    donations: 0,
  };
  adoptAnimal(animalObj);
  renderOneAnimal(animalObj);
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

// DOM Render

function renderOneAnimal(animal) {
  let card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
<img class="image" src="${animal.imageUrl}">
<div>
<h4>${animal.name}</h4>
<p>
<span class="donations">${animal.donations}</span> Donated
</p>
<p>${animal.description} </p>
</div>

<div>
<button class="buttons" id="donate">Donate</button>
<button class="buttons" id="setFree">Set Free</button>
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
  // Add animal card to DOM
  document.getElementById("animal-list").appendChild(card);
}
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
// Patch

function updateDonations(animalObj) {
  fetch(`http://localhost:3000/animalData/${animalObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animalObj),
  })
    .then((res) => res.json())
    .then((animal) => console.log(animal));
}

function getAllAnimals() {
  fetch("http://localhost:3000/animalData")
    .then((res) => res.json())
    .then((animalData) =>
      animalData.forEach((animal) => renderOneAnimal(animal))
    );
}
getAllAnimals();
