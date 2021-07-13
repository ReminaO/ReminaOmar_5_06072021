let teddyId = [];
const colorSelect = document.getElementById("color-select");



//---Récupération de l'ID

const idSelect = window.location.search;
const params = new URLSearchParams(idSelect);
const id = params.get("id");
console.log(id);

//---Affichage du produit par L'ID

const singleTeddy = async () => {
    const itemId = await fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((res) => res.json())
        .then((data) => (teddyId = data));
    
    //---Itération du choix des couleurs

        const colorChoice = itemId.colors;
        let colorOption = [];
    
        for (let i = 0; i < colorChoice.length; i++){
            colorOption = colorOption +
                `
                <option value = "${itemId.colors[i]}">${colorChoice[i]} </option>
                `
    }
    
    //---Affichage de L'item selectionné

    let singleCard =
        `
    <div class="card single-teddy border-warning shadow col-6 col-xl-6 col-lg-6 col-sm-6 col-md-6">
        <img class=”card-img-top” src=${itemId.imageUrl} alt="photo de ${itemId.name}>
        <div class="card-body">
            <h5 class="card-title" >${itemId.name}</h5>
            <p class="card-text" >${itemId.description}</p>
            <p class="card-prix" >${itemId.price / 100} €</p>
            <label for="color-select" required>Merci de sélectionner une couleur: </label>
                <select name"colors-pick" id="color-select">
                </select><br>
            <button type="submit" id="add-btn" name="add-btn">Ajouter l'article au panier</button><br>
        </div>
    </div>
    
    `
    document.getElementById("single-card").innerHTML = singleCard;

    //---Intégration de l'itération de couleur

    const colorSelect = document.getElementById("color-select");
    console.log(colorSelect);
    colorSelect.innerHTML += colorOption;

    //---Récupération des données selectionnées par l'utilisateur et envoi du panier

    const addButton = document.getElementById("add-btn");
    console.log(addButton);
    addButton.addEventListener("click", (e)=> {
    e.preventDefault();

    //---Mettre le choix de l'utilisateur dans une variable

        const formselect = colorSelect.value;

        //---récupreration des valeurs du formulaire

        let productSelect = {
            selectName : itemId.name,
            idSelect : itemId._id,
            option : formselect,
            quantity : 1,
            price : itemId.price / 100,
        };
        console.log(productSelect);
    });
}

singleTeddy();

