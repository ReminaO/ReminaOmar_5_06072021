

let products = JSON.parse(localStorage.getItem("products"));
let cartStructure = [];
let totalPrice = [];

//---Vérification du contenu du panier si vide

const emptyBasket = () => {
    if  (products == null || products == 0) {
        return true;
    } else {
        return false;
    };
};

if (emptyBasket() == false) {
    for (let l = 0; l < products.length; l++){
        let cartPrice = products[l].priceSelect * products[l].quantity;
        totalPrice.push(cartPrice);
    };
};
//---Calcul total du panier


const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalCart = totalPrice.reduce(reducer, 0);


//---Affichage du produit dans le panier

const cartContainer = document.querySelector(".cart-container");
if  (products === null || products == 0) {
    const emptyCart = `
    <div class="empty-cart">
    <div> Le panier est vide</div>
    </div> 
    `;
    cartContainer.insertAdjacentHTML("afterbegin", emptyCart);
} else {
    
    for (k = 0; k < products.length; k++) {
        cartStructure = cartStructure + `
        <div class= "product">
            <a href="#" class="cart-delete"><i class="far fa-trash-alt"></i></a>
            <img src="${products[k].imageSelect}" alt="Photo de ${products[k].selectName}">
            <span> ${products[k].selectName}</span>
            <span class="color-choice"> ${products[k].option}</span>
        </div>
        <div class="price">${products[k].priceSelect} €</div>
        <div class="quantity">${products[k].quantity}</div>
        <div class="total">${products[k].quantity * products[k].priceSelect} € </div>
        `;
    }
    if (k ===products.length) {
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

        let idDelete =  products[j].idSelect;

        //---Utilisattion de la methode filter pour supprimer l'item
        products =  products.filter(el => el.idSelect !== idDelete);

        localStorage.setItem("products", JSON.stringify(products));

        alert("Cet article a été supprimé du panier");
        window.location.href = "cart.html";

    })
}
//---Vérification du panier avant envoi de la commande

if (emptyBasket() == false) {
    
//---Affichage du formulaire sur la page du panier
    
    const formDisplay = () => {
        const formContainer = document.querySelector("#form-container")
        const formContent = `
        
        <div class="form-content">
            <p class="form-intro">Merci compléter le formulaire de commande<p>
        
            <form action="#" class="form-input">
                <div class="form-input__label">
                    <label for="first-name">Prenom : </label>
                    <input type="text" id="first-name" name="first-name" required>
            
                    <label for="last-name">Nom : </label>
                    <input type="text" id="last-name" name="last-name" required>
                </div>
                    
                <div class="form-input__label">
                    <label for="address">Adresse : </label>
                    <textarea id="address" name="address" required></textarea>
                </div>
                <div class="form-input__label">
                    <label for="postal-code">Code postal : </label>
                    <input type="text" id="postal-code" name="postal-code" required>
                    <label for="city">Ville : </label>
                    <input type="text" id="city" name="city" required>
                </div>

                <div class="form-input__label">
                    <label for="email">E-mail : </label>
                    <input type="email" id="email" name="email" required>
                </div>
        
            <button type="submit" id="send-btn">Confirmer la commande</button>
            
            </form>
        </div>
        `;
        formContainer.innerHTML += formContent;
    }
    formDisplay();

    //---Enregitrer le formulaire dans le local Storage

    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const contact = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            postalCode: document.getElementById("postal-code").value
        }

        //---RegEx pour les champs textes
        
        const textCheck = (value) => {
            return /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(value);
        };

        //---RegEx pour le champs code postal
        
        const postalCheck = (value) => {
            return /^[0-9]{5}$/.test(value);
        };

        //---RegEx pour le champs email
        
        const emailCheck = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        };
        //---RegEx pour le champs adresse
        
        const addressCheck = (value) => {
            return /^[A-Za-z0-9\s]{5,100}$/.test(value);
        };

        //---Controle de l'input Prénom
        
        const firstNameCheck = () => {

            const theFirstName = contact.firstName;

            if (textCheck(theFirstName)) {
                return true;
            } else {
                alert("les chiffres et symboles ne sont pas acceptés dans le champs Prénom");
                return false;
            };
        };

        //---Controle de l'input Nom
        
        const lastNameCheck = () => {

            const theLastName = contact.lastName;

            if (textCheck(theLastName)) {
                return true;
            } else {
                alert("les chiffres et symboles ne sont pas acceptés dans le champs Nom");
                return false;
            };
        };

        //---Controle de l'input Ville
        
        const cityCheck = () => {

            const theCity = contact.city;

            if (textCheck(theCity)) {
                return true;
            } else {
                alert("les chiffres et symboles ne sont pas acceptés dans le champs Ville");
                return false;
            };
        };

        //---Controle de l'input Code Postal
        
        const postalCodeCheck = () => {

            const thePostalCode = contact.postalCode;

            if (postalCheck(thePostalCode)) {
                return true;
            } else {
                alert("Le code Postal doit être composé de 5 chiffres");
                return false;
            };
        };

        //---Controle de l'input email
        
        const mailCheck = () => {

            const theMail = contact.email;

            if (emailCheck(theMail)) {
                return true;
            } else {
                alert("L'email n'est pas valide");
                return false;
            };
        };
        
        //---Controle de l'input email
        
        const addressesCheck = () => {

            const theAddress = contact.address;

            if (addressCheck(theAddress)) {
                return true;
            } else {
                alert("L'adresse n'est pas valide");
                return false;
            };
        };
        
        //---Controle validité du formulaire avant envoie dans le localStorage
        
        if (firstNameCheck() && lastNameCheck() && cityCheck() && postalCodeCheck() && mailCheck() && addressesCheck()) {
            localStorage.setItem("contact", JSON.stringify(contact));
            localStorage.setItem("totalCart", JSON.stringify(totalCart));
            
    //---Mettre les valeurs du formulaires et des produits selectionnés dans un objet a envoyer au serveur
            
            const toSend = {
                products,
                contact,
                totalCart,
            };

    //---Envoie de l'objet vers le serveur
        
            const postSend = fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                body: JSON.stringify(toSend),
                headers: {
                    "Content-type": "application/json",
                },
            });

            postSend.then(async (response) => {
                try {
                    const content = await response.json();
                    console.log(content);

                    if (response.ok) {
                
                        //---Récupération de l'id dans le local Storage

                        localStorage.setItem("orderId", content._id);

                        //---Redirection vers la page validation

                        window.location.href = "validation.html";

                    } else {
                        alert(`Réponse du serveur: erreur ${response.status}`)
                    };
                
                    //---Erreur en cas d'echec de la reception du serveur

                } catch (e) {
                    alert(`Erreur: ${e}`);
                };
            });

        } else {
            alert("Merci de compléter correctement le formulaire");
        };
    });
    
};
