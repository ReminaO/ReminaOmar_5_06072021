let teddyData = [];
let teddyColor = [];
let teddyLink = document.getElementById('select-link');
let card = document.querySelector(".card");
let teddyCard = document.getElementById("single-card");
const button = document.getElementById('add-btn');




const fetchTeddy = async () => {
    await fetch("http://localhost:3000/api/teddies")
        .then((res) => res.json())
        .then((data) => (teddyData = data));

    console.log(teddyData);
}

fetchTeddy();

const teddyDisplay = async () => {
    await fetchTeddy();
    document.getElementById('articles').innerHTML += teddyData.map((teddy) =>
        `
        <div class="card border-warning shadow col-4 col-xl-4 col-lg-4 col-sm-12 col-md-12">
            <img class=”card-img-top” src=${teddy.imageUrl} alt="photo de ${teddy.name}>
            <div class="card-body">
                <h5 class="card-title" >${teddy.name}</h5>
                <p class="card-text" >${teddy.description}</p>
                <p class="card-prix" >${teddy.price} €</p>
                <a href="./product.html" id="select-link" class="stretched-link">Voir le produit</a>
            </div>
        </div>
        
        `
    ).join("")
};

teddyDisplay();



const teddyStorage = (teddy) => {
    let singleCard = localStorage.getItem('teddyCard');
    singleCard = JSON.parse(singleCard);
    if (singleCard != null) {
        singleCard[teddy._id] += 1;
        if (singleCard[teddy._id] == undefined) {
            singleCard = {
                ...singleCard,
                [teddy._id]:teddy
            }
        }
    } else {
        singleCard = {
    [teddy._id]:teddy
        }
    }
}


const singleDisplay = async () => {
    let singleCard = localStorage.getItem('teddyCard');
    singleCard = JSON.parse(singleCard);
    if (singleCard && teddyCard) {
        teddyCard.innerHTML +=
        `
        <h1 class="card-title" >${teddy.name}</h1>
            <div class="card border-warning shadow col-6 col-xl-6 col-lg-4 col-sm-12 col-md-12">
                <img class=”card-img-top” src=${teddy.imageUrl} alt="photo de ${teddy.name}>
                <div class="card-body">
                    <p class="card-text" >${teddy.description}</p>
                    <p class="card-prix" >${teddy.price} €</p>
                    <label for="color-select" required>Selectionnez une couleur: </label>
                    <select name"colors-pick">
                        <option value="">--Merci de choisir une couleur--</option>
                        <option value="${color}">${color}</option>
                    </select>
                    <button type="submit" id="add-btn">Ajouter au panier</button>
                </div>
            </div>
         `
        }
    };
    singleDisplay();
