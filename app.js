class Product {
    
    constructor(
        name,
        quantity,
        price,
    ) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    suma() { return this.price * this.quantity }
}

class Paragon {

    constructor() {
        this.array = []
    }

    updateLocalStorage() {
        localStorage.removeItem('array');
        
        localStorage.setItem('array', JSON.stringify(this.array));

        var retrievedObject = localStorage.getItem('array');

        return JSON.parse(retrievedObject);
    }

    addProduct(product) {
        this.array.push(product)
        updateLocalStorage()
    }

    edytujProdukt(index, newProduct) {
        this.array[index] = newProduct
        updateLocalStorage()
    }

    usunProdukt(index) {
        this.array.slice(index, 1)
        updateLocalStorage()
    }

    zmienKolejnosc(index1, index2) {
        temp = this.array[index1]
        this.array[index1] = this.array[index2]
        this.array[index2] = temp
        updateLocalStorage()
    }

    getArray() {
        return this.array
    }

}

form.addEventListener('submit',function(event){
    event.preventDefault();

})