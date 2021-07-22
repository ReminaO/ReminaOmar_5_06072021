//---Récupération de l'Id de la commande

const orderId = localStorage.getItem("orderId");
console.log(orderId);

//---Structure de la page de validation

const validationPage = document.getElementById("order-validation");

const validationContainer = `
    <h2>Récapitulatif de votre commande</h2>
    <div class="order-resume">
        <p>Merci pour votre commande</p>
        <p>Votre commande numéro <span class="bold">${orderId}</span> a bien été prise en compte.</p>
        <p>Le montant de votre commande est de <span class="bold">${totalCart}</span> €.</p>
        <p>A bientôt ! <p>
    </div>
`
validationPage.insertAdjacentHTML("afterbegin", validationContainer);

//---Suppression du panier apres commande

const storageClean = (key) => {
    localStorage.removeItem(key);
}
/*storageClean("orderId");
storageClean("totalCart");
storageClean("contact");
storageClean("products");
storageClean("createdOrder");*/

/*if (orderId == null || totalCart == null) {
    window.location.href = "index.html";
}*/