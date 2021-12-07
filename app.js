//jshint esnext:true

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

    sum() {
        return Math.round(this.quantity * this.price * 100) / 100
    }
}

class Receipt {

    constructor() {
        this.array = []
    }

    getLocalStorage() {
        let dataArray = JSON.parse(localStorage.getItem('array'))
        if (dataArray === null || dataArray === '') {
            return [];
        }
        else {
            return dataArray;
        }

    }

    updateLocalStorage() {
        localStorage.setItem('array', JSON.stringify(this.array));
    }

    addProduct(product) {

        if (product === null || product === undefined) throw 'Product parameter is null';
        
        this.array = this.getLocalStorage()
        this.array.push(product);
        this.updateLocalStorage()
    }

    editProduct(index, newProduct) {
        
        if (index < 0 || index > this.getArray().length) throw 'Invalid index parameter';
        if (product === null || product === undefined) throw 'Product parameter is null';

        this.array = this.getLocalStorage()
        this.array[index].name = newProduct.name
        this.array[index].price = newProduct.price
        this.array[index].quantity = newProduct.quantity
        this.updateLocalStorage()
    }

    deleteProduct(index) {
      
        if (index < 0 || index > this.getArray().length) throw 'Invalid index parameter';

        this.array = this.getLocalStorage()
        this.array.splice(index, 1)
        this.updateLocalStorage()
    }

    moveProduct(index1, index2) {
      
        if (index1 < 0 || index1 > this.getArray().length) throw 'Invalid index1 parameter';
        if (index2 < 0 || index2 > this.getArray().length) throw 'Invalid index2 parameter';

        this.array = this.getLocalStorage()
        let temp = this.array[index1]
        this.array[index1] = this.array[index2]
        this.array[index2] = temp
        this.updateLocalStorage()
    }

    getArray() {
        return this.getLocalStorage()
    }

    getSum() {
        let sum = 0

        this.getLocalStorage().forEach(p => {
            sum += Product.prototype.sum.call(p)
        })

        return Math.round(sum * 100) / 100
    }
}

//TESTOWANIE
var receipt = new Receipt();

//walidacja danych
const productName = document.getElementById('name');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const form = document.getElementById('addProduct');

let productNameValue = productName.value.trim();
let quantityValue = quantity.value.trim();
let priceValue = price.value.trim();
form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm()) {
        let product = new Product(
            productName.value.trim(),
            Math.round(quantity.value.trim() * 100) / 100,
            Math.round(price.value.trim() * 100) / 100)

        receipt.addProduct(product);
        writeProducts();
    }
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

    const small = formControl.lastChild;
    small.textContent = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;

    const small = formControl.lastChild;
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

function isNegative(value) {
    if (value < 0) {
        return true
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

    else if (isNegative(quantityValue)) {
        showError(quantity, 'Ilość nie może być ujemna');
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

    else if (isNegative(priceValue)) {
        showError(price, 'Cena nie może być ujemna');
    }

    else {
        showSuccess(price);
        return true;
    }

    return false;
}

function writeProducts() {

    let productList = document.getElementById('products')

    let productArray = receipt.getArray()

    let rowCount = productList.rows.length
    for (let i = 1; i < rowCount; i++) {

        productList.deleteRow(-1);
    }

    for (let i = 0; i < productArray.length; i++) {

        let LineProduct = productList.insertRow(i + 1)

        let indexShow = LineProduct.insertCell(0);
        indexShow.innerHTML = (i + 1);

        let nameShow = LineProduct.insertCell(1);
        nameShow.innerHTML = productArray[i].name;

        let costShow = LineProduct.insertCell(2);
        costShow.innerHTML = productArray[i].quantity;

        let quantityShow = LineProduct.insertCell(3)
        quantityShow.innerHTML = productArray[i].price;

        let sumShow = LineProduct.insertCell(4)
        sumShow.innerHTML = (Product.prototype.sum.call(productArray[i]));

        let editShow = LineProduct.insertCell(5)
        editShow.innerHTML = '<input type="button" onClick="" value="Edytuj">'

        let deleteShow = LineProduct.insertCell(6)
        deleteShow.innerHTML = '<input type="button" onClick="deleteProductReal(\'' + i + '\')" value="Usuń">'
    
        let upShow = LineProduct.insertCell(7)
        upShow.innerHTML = '<input type="button" onClick="upProduct(\'' + i + '\')" value="/\\">'
        
        let downShow = LineProduct.insertCell(8)
        downShow.innerHTML = '<input type="button" onClick="downProduct(\'' + i + '\')" value="\\/">'
    }

    let LineProduct = productList.insertRow(productArray.length + 1)

    LineProduct.insertCell(0);
    LineProduct.insertCell(1);
    LineProduct.insertCell(2);
    LineProduct.insertCell(3).innerHTML = 'RAZEM';
    LineProduct.insertCell(4).innerHTML = receipt.getSum()
    LineProduct.insertCell(5);
    LineProduct.insertCell(6);
    LineProduct.insertCell(7);
    LineProduct.insertCell(8);
}

writeProducts();

function deleteProductReal(index) {
    receipt.deleteProduct(index);
    writeProducts();
}

function upProduct(index){
  if (index > 0) {
    receipt.moveProduct(index, index-1);
    writeProducts();
  }
}

function downProduct(index){
  if (index < receipt.getArray().length-1) {
    receipt.moveProduct(index, +index +1)
    writeProducts();
  }
}
