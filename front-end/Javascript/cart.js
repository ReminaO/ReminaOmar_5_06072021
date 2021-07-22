

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
//---Vérification du panier avant affichage du formulaire et envoi de la commande

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
        const getUserData = () => {
            const contact = {
                firstName: document.getElementById("first-name").value,
                lastName: document.getElementById("last-name").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                postalCode: document.getElementById("postal-code").value
            }
            return contact;
        }
        //--------------------------------------------------------------
        
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
        
                //---Contrôle de l'input Prénom
                
                const firstNameCheck = () => {
        
                    const theFirstName = getUserData.firstName;
        
                    if (textCheck(theFirstName)) {
                        return true;
                    } else {
                        alert("les chiffres et symboles ne sont pas acceptés dans le champs Prénom");
                        return false;
                    };
                };
        
                //---Contrôle de l'input Nom
                
                const lastNameCheck = () => {
        
                    const theLastName = getUserData.lastName;
        
                    if (textCheck(theLastName)) {
                        return true;
                    } else {
                        alert("les chiffres et symboles ne sont pas acceptés dans le champs Nom");
                        return false;
                    };
                };
        
                //---Contrôle de l'input Ville
                
                const cityCheck = () => {
        
                    const theCity = getUserData.city;
        
                    if (textCheck(theCity)) {
                        return true;
                    } else {
                        alert("les chiffres et symboles ne sont pas acceptés dans le champs Ville");
                        return false;
                    };
                };
        
                //---Contrôle de l'input Code Postal
                
                    const postalCodeCheck = () => {
        
                    const thePostalCode = getUserData.postalCode;
        
                    if (postalCheck(thePostalCode)) {
                        return true;
                    } else {
                        alert("Le code Postal doit être composé de 5 chiffres");
                        return false;
                    };
                };
        
                //---Contrôle de l'input email
                
                const mailCheck = () => {
        
                    const theMail = getUserData.email;
        
                    if (emailCheck(theMail)) {
                        return true;
                    } else {
                        alert("L'email n'est pas valide");
                        return false;
                    };
                };
                
                //---Contrôle de l'input email
                
                const addressesCheck = () => {
        
                    const theAddress = getUserData.address;
        
                    if (addressCheck(theAddress)) {
                        return true;
                    } else {
                        alert("L'adresse n'est pas valide");
                        return false;
                    };
                };
                
                //---Contrôle validité du formulaire avant envoie dans le localStorage
            
        if (firstNameCheck() && lastNameCheck() && cityCheck() && addressesCheck()) {
                    
                    localStorage.setItem("totalCart", JSON.stringify(totalCart));

                    const createOrder = async () => {
                        const api = new TeddyApi();
                        const contact = getUserData();
                        const products = [];
                        console.log(products)
                        for (const product of products) {
                          for (let i = 0; i < product.quantity; i++) {
                            products.push(product._id);
                          }
                        }
                        const result = await api.createOrder(contact, products);
                        localStorage.setItem("createdOrder", JSON.stringify(result));
                        localStorage.setItem("orderId", JSON.stringify(result.orderId));
                        document.location.href = "validation.html";
                        return result;
                    };
                    createOrder();

                } else {
                    alert("Merci de compléter correctement le formulaire");
                };
    });
}
