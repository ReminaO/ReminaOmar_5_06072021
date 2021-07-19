

let storageItem = JSON.parse(localStorage.getItem("product"));
let cartStructure = [];
let totalPrice = [];

//---Calcul total du panier

for (let l = 0; l < storageItem.length; l++){
    let cartPrice = storageItem[l].priceSelect * storageItem[l].quantity;
    totalPrice.push(cartPrice);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalCart = totalPrice.reduce(reducer, 0);

//---Affichage du produit dans le panier

const cartContainer = document.querySelector(".cart-container");
if (storageItem === null || storageItem == 0) {
    const emptyCart = `
    <div class="empty-cart">
    <div> Le panier est vide</div>
    </div> 
    `;
    cartContainer.innerHTML += emptyCart;
} else {
    
    for (k = 0; k < storageItem.length; k++) {
        cartStructure = cartStructure + `
        <div class="product">
            <a href="#"  class="cart-delete"><i class="far fa-trash-alt"></i></a>
            <img src="${storageItem[k].imageSelect}" alt="Photo de ${storageItem[k].selectName}">
            <span> ${storageItem[k].selectName}</span>
            <span class="color-choice"> ${storageItem[k].option}</span>
        </div>
        <div class="price">${storageItem[k].priceSelect} €</div>
        <div class="quantity">${storageItem[k].quantity}</div>
        <div class="total">${storageItem[k].quantity * storageItem[k].priceSelect} € </div>
        `;
    }
    if (k === storageItem.length) {
        cartContainer.innerHTML = cartStructure;
        cartContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalBasketTitle">Total</h4>
            <h4 class="basketTotal"> = ${totalCart} €</h4>
        </div>
        `;
    }
}

//---Gestion du bouton supprimer
let cartDelete = document.querySelectorAll(".cart-delete");
for (let j = 0; j < cartDelete.length; j++) {
    cartDelete[j].addEventListener("click", (e) => {
        e.preventDefault();

        // Selection de l'Id du produit

        let idDelete = storageItem[j].idSelect;

        //---Utilisattion de la methode filter pour supprimer l'item
        storageItem = storageItem.filter(el => el.idSelect !== idDelete);

        localStorage.setItem("product", JSON.stringify(storageItem));

        alert("Cet article a été supprimé du panier");
        window.location.href = "cart.html";

    })
}

//---Enregitrer le formulaire dans le local Storage
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const formValues = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        postalCode: document.getElementById("postal-code").value
    }

//---RegEx pour les champs textes
    
    const textCheck = (value) => {
        return /^[A-Za-z]{2,20}$/.test(value);
    }

    //---RegEx pour le champs code postal
    
    const postalCheck = (value) => {
        return /^[0-9]{5}$/.test(value);
    }

//---Controle de l'input Prénom
    
    const firstNameCheck = () => {

        const theFirstName = formValues.firstName;

        console.log(theFirstName);

        if (textCheck(theFirstName)) {
            return true;
        } else {
            alert("les chiffres et symboles ne sont pas acceptés dans le champs Prénom");
            return false;
        };
    }

//---Controle de l'input Nom
    
    const lastNameCheck = () => {

        const theLastName = formValues.lastName;

        if (textCheck(theLastName)) {
            return true;
        } else {
            alert("les chiffres et symboles ne sont pas acceptés dans le champs Nom");
            return false;
        };
    }

    //---Controle de l'input Ville
    
    const cityCheck = () => {

        const theCity = formValues.city;

        if (textCheck(theCity)) {
            return true;
        } else {
            alert("les chiffres et symboles ne sont pas acceptés dans le champs Ville");
            return false;
        };
    }

    //---Controle de l'input Code Postal
    
    const postalCodeCheck = () => {

        const thePostalCode = formValues.postalCode;

        if (postalCheck(thePostalCode)) {
            return true;
        } else {
            alert("Le code Postal doit être composé de 5 chiffres");
            return false;
        };
    }

//---Controle validité du formulaire avant envoie dans le localStorage
    
    if (firstNameCheck() && lastNameCheck() && cityCheck() && postalCodeCheck()) {
        localStorage.setItem("formValues", JSON.stringify(formValues));
    } else {
        alert("Merci de compléter correctement le formulaire");
    };
    

   /* const toSend = {
        storageItem,
        formValues
    }*/
}
)