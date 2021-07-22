class TeddyApi {

    constructor() {
        this.apiUrl = "http://localhost:3000/api/teddies"
    }

    getAll() {

        const result = fetch(this.apiUrl, {  //fetch méthode qui fait un appel au serveur 
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                //Divise le prix / 100 pour correspondre aux euros au lieu des centimes avec la fonction map()
                data.map(e => e.price = e.price / 100)
                return data
            }) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        console.log(result)
        return result
    }

    getById(id) {

        const result = fetch(`${this.apiUrl}/${id}`, {  //fetch méthode qui fait un appel au serveur 
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                //Divise le prix / 100 pour correspondre aux euros au lieu des centimes avec la fonction map()
                data.price = data.price / 100
                return data
            }) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        return result
    }
    
    createOrder(contact, products) {

        const data = {
            "contact": contact,
            "products": products
        }
        console.log(data)
        const result = fetch(`${this.apiUrl}/order`, {  //fetch méthode qui fait un appel au serveur 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));
        
        return result
    }
}