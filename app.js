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
//walidacja danych
const productName = document.getElementById('name');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');

form.addEventListener('submit',function(event){
    event.preventDefault();

    validateForm();
})

function validateForm(){
    const productNameValue = productName.value.trim();
    const quantityValue = quantity.value.trim();
    const priceValue = price.value.trim();

    if(productNameValue === ''){
        showError(productName, "Nazwa produktu nie może być pusta");
    }
    if(quantityValue === 'dd'){
        showError(quantityValue, "dasd");
    }
}
function showError(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
}
