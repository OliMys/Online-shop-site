function openNav() {
    document.getElementById("catalogElem").style.width = "200px";
    document.getElementById("catalog").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("catalogElem").style.width = "0";
    document.getElementById("catalog").style.marginLeft= "0";
}
if(document.getElementById('sidebar')) {
  sidebar.onclick = function(event) {
    let thumbnail = event.target.closest('a');
    if (!thumbnail) return;
    largeImg.src = thumbnail.href;
    event.preventDefault();
  };
}

if(document.getElementById('largeImg')) {
  largeImg.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
};
}
if(document.getElementById('closeModal')) {
  closeModal.onclick = function() {
    modal.style.display = "none";
  };
}

if(document.getElementById('amountItems')){
  amountItems.onchange = function() {
    this.innerHTML = amountItems.value;
  }
}
if(document.getElementById('minus')) {
  minus.onclick = function() {
    amount.amountItems.value--;
    if (amount.amountItems.value < 0) amount.amountItems.value = 0;
  }
}
if(document.getElementById('plus')) {
  plus.onclick = function() {
    amount.amountItems.value++;
  }
}

function createMessage(){
  let message = document.createElement('div');
  message.className = 'message';
  message.insertAdjacentHTML('afterbegin', '<div><p>товар добавлен в корзину</p></div>');
  var rect = document.getElementById('addItem');
  let coords = rect.getBoundingClientRect();
  let left = coords.left + (message.offsetWidth / 2);
  let top = coords.top - (message.offsetHeight * 5);
  message.style.left = left + 'px';
  message.style.top = top + 'px';
  document.body.append(message);
 
  setTimeout(() => message.remove(), 900);
}
let cartCont = document.getElementById('cart_content'); // блок вывода данных корзины
// Записываем данные в LocalStorage
function setCartData(obj){
  localStorage.setItem('cart', JSON.stringify(obj));
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
//localStorage.clear();
function addToCart() {
  this.disabled = true;
  let cartData = getCartData() || [];
  let itemId = itemTitle.getAttribute('itemId');
  let itemTitle1 = document.getElementById('itemTitle').textContent;
  //var size;
  if(document.getElementById('selectedSize')) {
    var size = selectedSize.value;
  } else {
    size = '';
  }
  let itemPrice = document.querySelector('.item-price').textContent;
  let amt = +amountItems.value;
  var storageItem = cartData.find(item => item.id == itemId);
  if(typeof storageItem === 'undefined') {
    var item = {id: itemId, title: itemTitle1, size: size, price: itemPrice, amount: amt};
    cartData.push(item);
  } else {
    storageItem.amount += +amountItems.value;
    
  }
  setCartData(cartData); //щбновить корзину 
  return false;
}
if(document.getElementById('addItem')) {
  addItem.addEventListener( "click", addToCart);
  addItem.addEventListener("click", createMessage);
}


function openCart() {
  let cartData = getCartData();
  let tableItems = '';
  if(cartData == null) {
    cartCont.innerHTML = '<div class="nullCart">В корзине пусто!</div>';
  } else {
   tableItems = '<table id="table" class="shopping_list"><tr><th>Наименование</th><th>Размер</th><th>Цена</th><th>Количество</th><th></th></tr>';
    
    for(var item of cartData){
      tableItems += '<tr>';
      tableItems += '<td>' + item.title + '</td><td>' + item.size + '</td><td>' + item.price + '</td><td>' + item.amount + '</td><td id="bin"><img class="bin"src="https://i.ibb.co/YhNdyDH/4105949-bin-delete-dustbin-remove-trash-trash-can-113940.png" alt="trash" border="0"></td>';
      tableItems += '</tr>';
    }
    tableItems += '</table>';
    tableItems += '<div id="total" class="total"></div>';
    cartCont.innerHTML = tableItems;
    
    total.innerHTML = 'ИТОГО ' + `${totalSum()}` + ' руб.';
  }
  return false;
}
function totalSum(){
  let cartData = getCartData();
  let totalSumItems = [];
  if (cartData !== null) {
    for(let item of cartData) {
    var sum = parseInt(item.price) * parseInt(item.amount);
    totalSumItems.push(sum);
  }
  return totalSumItems.reduce((a, b) => a + b, 0);
  }
  
}
//console.log(totalSum());
function openCartElem() {
    document.getElementById("openCartElem").style.width = "520px";
    document.getElementById("cartOverlay").style.display = "block";
}
checkout.addEventListener( "click", openCartElem);
checkout.addEventListener( "click", openCart);
closeCart.onclick = function() {
  document.getElementById("openCartElem").style.width = "0";
  document.getElementById("cartOverlay").style.display = "none";
}
console.log(getCartData());  
