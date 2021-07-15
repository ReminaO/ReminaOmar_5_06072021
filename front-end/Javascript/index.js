let teddyData = [];
let teddyColor = [];
let teddyLink = document.getElementById('select-link');
let teddyCard = document.getElementById("single-card");
;




//---Appel de L'API

const fetchTeddy = async () => {
    await fetch("http://localhost:3000/api/teddies")
        .then((res) => res.json())
        .then((data) => (teddyData = data));
    console.log(fetchTeddy);
}

fetchTeddy();

//---Affichage des Items sur la page d'accueil

const teddyDisplay = async () => {
    await fetchTeddy();
    document.getElementById('articles').innerHTML += teddyData.map((teddy) =>
        `
        <div class="card scale border-warning shadow col-4 col-xl-4 col-lg-4 col-sm-12 col-md-12">
            <img class=”card-img-top” src=${teddy.imageUrl} alt="photo de ${teddy.name}>
            <div class="card-body">
                <h5 class="card-title" >${teddy.name}</h5>
                <p class="card-text" >${teddy.description}</p>
                <p class="card-prix" >Prix : ${teddy.price / 100} €</p>
                <a href="./product.html?id=${teddy._id}" id="select-link" class="stretched-link">Voir le produit</a>
            </div>
        </div>
        
        `
    ).join("")
};

teddyDisplay();
