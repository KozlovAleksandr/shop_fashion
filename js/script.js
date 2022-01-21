'use strict';

const btns = document.querySelectorAll('.products__item_button'),
  productCards = document.querySelectorAll('.products__item'),
  itemCounter = document.querySelector('.item__amount'),
  cartSubtotal = document.querySelector('.cart_subtotal'),
  buttonLinks = document.querySelectorAll('.button_link');

let cartSubtotalIsOpen = false;
let productsData = [];

/**
 * Функция убирает стандартное поведение кнопки добавления в корзину ,
 * так как у меня там была зашита ссылка 
 * и при клике постоянно перекидывала вверх страницы.
 */
function removeDefaultButtonDehavior() {
  buttonLinks.forEach((link) => {
    link.addEventListener('click', (event) =>
      event.preventDefault());
  });
}

/**
 * Функция добавляет слушатель события на кнопки добавления в корзину
 */
function addListenerToButtons() {
  btns.forEach((button) => {
    button.addEventListener('click', createProductList);
  });
}

/**
 * Функция добавляет слушатель события на ярлык с ярлык корзины с количеством товара
 */
function addListenerToLabel() {
  itemCounter.addEventListener('click', showCartSubTotal);
}

/**
 * Функция создаёт массив с товарами , 
 * которые были добавлены в корзину
 * @param {MouseEvent} event
 */
function createProductList(event) {
  productCards.forEach((productCard) => {
    if (productCard == event.currentTarget.parentNode.parentNode) {
      let productName = productCard.querySelector('.item__name').innerText;
      let productDescription = productCard.querySelector('.item__description').innerText;
      let productPrice = +productCard.querySelector('.item__price').innerText;
      let productQuantity = 1;

      productsData.push({
        productName,
        productDescription,
        productPrice,
        productQuantity
      });
    }
  });
  fillCartSubtotal(productsData);
  countItems(productsData);
}

/**
 * Функция отрисовывает товар в корзине без ИТОГО
 * @param {Object} массив с товарами , которые были добавлены в корзину
 */
function fillCartSubtotal(productsData) {
  let newMarkup = `             
  <tr>
    <th>Название товара</th>
    <th>Количество</th>
    <th>Цена за шт.</th>
    <th>Итого</th>
  </tr>`;
  productsData.forEach((item) => {
    newMarkup += getProductMarkup(item);
  });
  cartSubtotal.innerHTML = "";
  cartSubtotal.insertAdjacentHTML('beforeend', newMarkup);
  let total = getTotalMarkup(productsData);
  cartSubtotal.insertAdjacentHTML('beforeend', total);
}

/**
 * @param {Object} product объект с товаром
 * @param {string} productName название товара
 * @param {number} productPrice цена товара
 * @param {number} productQuantity количество товара
 * @returns {string} разметка для отрисовки
 */
function getProductMarkup(item) {
  return `
  <tr>
    <td>${item.productName}</td>
    <td>${item.productQuantity} шт.</td>
    <td>$ ${item.productPrice.toFixed(2)}</td>
    <td>$ ${item.productPrice.toFixed(2)}</td>
<tr>`;
}

/**
 * Функция отрисовывает в корзине раздел ИТОГО
 * @param {Object} productsData массив с товарами , которые были добавлены в корзину
 */
function getTotalMarkup(productsData) {
  let total = calculateTotal(productsData);
  return `
  <tr>
  <td>ИТОГО</td>
  <td>${total[0]} шт.</td>
  <td></td>
  <td>$ ${total[1].toFixed(2)}</td>
</tr>`;
}

/**
 * 
 * @param {Object} productsData массив с товарами , которые были добавлены в корзину
 * @returns {Object} массив с итоговымы значениями количество товаров в корзине
 * и суммой товаров в корзине
 */
function calculateTotal(productsData) {
  var totalQuantity = +0;
  var totalSum = +0;
  productsData.forEach((item) => {
    totalQuantity += item.productQuantity;
    totalSum += item.productPrice;
  });
  return [totalQuantity, totalSum];
}

/**
 * Функция открывает/закрывает корзину при клике
 * на ярлык с количеством товарок в корзине
 */
function showCartSubTotal() {
  if (cartSubtotalIsOpen) {
    cartSubtotal.style.display = 'none';
    cartSubtotalIsOpen = false;
  } else {
    cartSubtotal.style.display = 'block';
    cartSubtotalIsOpen = true;
  }
}

/**
 * Функция открывает ярлык с количеством товаров в корзине
 * @param {Object} productsData массив с товарами , которые были добавлены в корзину
 */
function countItems(productsData) {
  if (productsData.length > 0) {
    itemCounter.style.display = "flex";
    itemCounter.innerText = productsData.length;
  } else {
    itemCounter.style.display = "none";
  }
}

addListenerToButtons();
addListenerToLabel();
removeDefaultButtonDehavior();