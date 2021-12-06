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

class Receipt {

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
const form = document.getElementById('addProduct');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm()){
        let product = new Product(productName,quantity,price)
        receipt.addProduct(product);
    } //zwrocenie false CHYBA zabezpiecza przed przeslaniem formularza
});

function validateForm() {

    let isProductNameValid = checkProductName();
    let isQuantityValid = checkQuantity();
    let isPriceValid = checkPrice();

    if (isProductNameValid && isQuantityValid && isPriceValid) {
        return true;
    }
    else return false;
}

function showError(input, message) {
    const formControl = input.parentElement;

    const small = formControl.querySelector('small');
    small.textContent = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;

    const small = formControl.querySelector('small');
    small.textContent = '';
}

function isEmpty(value) {
    if (value === '') {
        return true;
    }
    else return false;
}

function isNumber(value) {
    if (isNaN(value)) {
        return false;
    }
    else return true;
}

function isZero(value) {
    if (value == '0') {
        return true;
    }
    else return false;
}

function checkProductName() {
    const productNameValue = productName.value.trim();

    if (isEmpty(productNameValue)) {
        showError(productName, 'Nazwa produktu nie może być pusta');
    }

    else {
        showSuccess(productName);
        return true;
    }

    return false;
}

function checkQuantity() {
    const quantityValue = quantity.value.trim();

    if (isEmpty(quantityValue)) {
        showError(quantity, 'Pole "Ilość" nie może być puste');
    }

    else if (!isNumber(quantityValue)) {
        showError(quantity, 'Ilość musi być liczbą');
    }

    else if (isZero(quantityValue)) {
        showError(quantity, 'Ilość nie może wynosić 0');
    }

    else {
        showSuccess(quantity);
        return true;
    }

    return false;
}

function checkPrice() {
    const priceValue = price.value.trim();

    if (isEmpty(priceValue)) {
        showError(price, 'Pole "Cena" nie może być puste');
    }

    else if (!isNumber(priceValue)) {
        showError(price, 'Cena musi być liczbą');
    }

    else if (isZero(priceValue)) {
        showError(price, 'Cena nie może wynosić 0');
    }

    else {
        showSuccess(price);
        return true;
    }

    return false;
}

function writeProducts() {
    var productList = document.getElementById('products')

    var productAmount = productList.rows.length;
    var LineProduct = productList.insertRow(productAmount)

    var nameShow = LineProduct.insertCell(0);
    console.log(nameShow)
    nameShow.innerHTML = productName;

    var costShow = LineProduct.insertCell(1);
    costShow.innerHTML = price;

    var quantityShow = LineProduct.insertCell(2)
    quantityShow.innerHTML = quantity;
}
writeProducts();

//TODO: sprawdzic czy jest poprawnie zabezpieczony przed przeslaniem danych formularza
//      w przypadku zlych danych

//TODO: pamietac o skrocaniu liczb do 2 miejsc po przecinku pozniej w  kodzie bo formularz pozwala 
//      przesylac liczby typu 123.456789

//TESTOWANIE
var receipt = new Receipt();
