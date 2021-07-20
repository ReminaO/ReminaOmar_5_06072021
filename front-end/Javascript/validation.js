//---Récupération de l'Id de la commande

const orderId = localStorage.getItem("orderId");

//---Récupération du prix total de la commande

const totalCart = localstorage.getItem("totalCart");

//---Structure de la page de validation

const validationPage = getElementById("order-validation");

const validationContainer = `
    <h2>Récapitulatif de votre commande</h2>
    <div class="order-resume">
        <p>Merci pour votre commande</p>
        <p>Votre commande numéro <span class="bold">${orderId}</span> a bien été prise en compte</p>
        <p>Le montant de votre commande est de <span class="bold">${totalCart}</span> € </p>
    </div>
`
validationPage.insertAdjacentHTML("afterbegin", validationContainer);

//---Suppression du panier apres commande

const storageClean = (key) => {
    localStorage.removeItem(key);
}
storageClean("orderId");
storageClean("totalCart");
storageClean("formValues");