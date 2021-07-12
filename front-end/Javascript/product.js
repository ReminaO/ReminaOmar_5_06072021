let teddyId = [];

//---Récupération de l'ID

const idSelect = window.location.search;
const params = new URLSearchParams(idSelect);
const id = params.get("id");
console.log(id);

//---Affichage du produit par L'ID

const singleTeddy = async () => {
    const itemId = await fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((res) => res.json())
        .then((data2) => (teddyId = data2));

let singleCard =
        `
    <div class="card border-warning shadow col-6 col-xl-6 col-lg-6 col-sm-12 col-md-12">
        <img class=”card-img-top” src=${itemId.imageUrl} alt="photo de ${itemId.name}>
        <div class="card-body">
            <h5 class="card-title" >${itemId.name}</h5>
            <p class="card-text" >${itemId.description}</p>
            <p class="card-prix" >${itemId.price} €</p>
            <label for="color-select" required>Selectionnez une couleur: </label>
                <select name"colors-pick">
                    <option value="">--Merci de choisir une couleur--</option>
                    <option value="${itemId.colors}">${itemId.colors}</option>
                </select><br><br>
            <button type="submit" id="add-select">Ajouter au panier</button>
        </div>
    </div>
    
    `
    document.getElementById("single-card").innerHTML = singleCard;
}

singleTeddy();
