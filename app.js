(function(){
    'use strict';
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
        
          this.array = this.getLocalStorage()
          this.array.push(product);
          this.updateLocalStorage()
      }
  
      edytujProdukt(index, newProduct) {
          this.array = this.getLocalStorage()
          this.array[index] = newProduct
          this.updateLocalStorage()
      }
  
      usunProdukt(index) {
          this.array = this.getLocalStorage()
          this.array.slice(index, 1)
          this.updateLocalStorage()
  
      }
  
      zmienKolejnosc(index1, index2) {
          this.array = this.getLocalStorage()
          temp = this.array[index1]
          this.array[index1] = this.array[index2]
          this.array[index2] = temp
          this.updateLocalStorage()
      }
  
      getArray() {
          return this.getLocalStorage()
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
    
      if (validateForm()){
          let product = new Product(
            productName.value.trim(),
            quantity.value.trim(),
            price.value.trim()
          )
  
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
  
  function isNegative(value){
      if (value < 0){
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
      for(let i = 1; i < rowCount; i++) {
        productList.deleteRow(-1);
      }
      
      for(let i = 0; i < productArray.length; i++) {
        let LineProduct = productList.insertRow(i+1)
  
        let indexShow = LineProduct.insertCell(0);
        indexShow.innerHTML = (i+1);
        
        let nameShow = LineProduct.insertCell(1);
        nameShow.innerHTML = productArray[i].name;
  
        let costShow = LineProduct.insertCell(2);
        costShow.innerHTML = productArray[i].price;
  
        let quantityShow = LineProduct.insertCell(3)
        quantityShow.innerHTML = productArray[i].quantity;
        
        let sumShow = LineProduct.insertCell(4)
        sumShow.innerHTML = (productArray[i].price * productArray[i].quantity);

        let editShow = LineProduct.insertCell(5)
        editShow.innerHTML = '<input type="button" value="Edytuj">'

        let deleteShow = LineProduct.insertCell(6)
        deleteShow.innerHTML = '<input type="button" onClick="usunProdukt(i)" value="Usuń">'
      }   
  }
  
  writeProducts();
  
  //TODO: sprawdzic czy jest poprawnie zabezpieczony przed przeslaniem danych formularza
  //      w przypadku zlych danych
  
  //TODO: pamietac o skrocaniu liczb do 2 miejsc po przecinku pozniej w  kodzie bo formularz pozwala 
  //      przesylac liczby typu 123.456789
  })();
  