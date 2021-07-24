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
            <div class="card text-center single-teddy border-warning shadow col-6 col-xl-6 col-lg-6 col-sm-6 col-md-6">
                <img class=”card-img-top” src=${itemId.imageUrl} alt="photo de ${itemId.name}>
                <div class="card-body">
                    <h5 class="card-title" >${itemId.name}</h5>
                    <p class="card-text" >${itemId.description}</p>
                    <p class="card-prix" >Prix : ${itemId.price / 100} €</p>
                    <label for="color-select" required>Merci de sélectionner une couleur: </label>
                        <select name="colors-pick" id="color-select">
                        </select><br>
                    <label for="quantity-select" required>Quantité: </label>
                    <select name="quantity-select" id="quantity-select">
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5</option>
                        <option value = "6">6</option>
                        <option value = "7">7</option>
                        <option value = "8">8</option>
                        <option value = "9">9</option>
                        <option value = "10">10</option>
                    </select><br><br>
                    <button type="submit" id="add-btn" name="add-btn">Ajouter l'article au panier</button><br>
                </div>
            </div>
        `
    document.getElementById("single-card").innerHTML = singleCard;

    //---Intégration de l'itération de couleur

    const colorSelect = document.getElementById("color-select");
    colorSelect.innerHTML += colorOption;

    //---Récupération des données selectionnées par l'utilisateur et envoi du panier

    const addButton = document.getElementById("add-btn");
    addButton.addEventListener("click", (e)=> {
    e.preventDefault();

    //---Mettre le choix de l'utilisateur dans une variable
        const quantitySelect = document.getElementById('quantity-select');
        const formSelect = colorSelect.value;
        const quantityChoice = quantitySelect.value;

        //---récupreration des valeurs du panier

        let productSelect = {
            imageSelect : itemId.imageUrl,
            selectName : itemId.name,
            idSelect : itemId._id,
            option : formSelect,
            quantity : quantityChoice,
            priceSelect: itemId.price / 100,
        };
        console.log(productSelect);

        //---Fonction appelant le Pop-Up

        const popupConfirmation = () => {
            if (window.confirm(`
        L'article ${itemId.name}, couleur : ${formSelect} a bien été ajouté à votre panier.
        Pour consulter le panier cliquez sur OK, pour revenir sur la page d'accueil cliquez sur ANNULER`)) {
                window.location.href = "cart.html";
            } else {
                window.location.href = "index.html";
             }
        }

        //---Enregistrement de l'Item dans le local Storage

        let cart = JSON.parse(localStorage.getItem("cart"));

        const addStorage = () => {
            cart.push(productSelect);
            localStorage.setItem(("cart"), JSON.stringify(cart));
        }

        if (cart) {
            addStorage();
            popupConfirmation();
        } else {
            cart = [];
            addStorage();
            popupConfirmation();
        }
    });
}

singleTeddy();

