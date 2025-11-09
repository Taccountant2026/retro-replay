// cart.js — handles cart across all pages
window.RetroCart = (function(){
  let cart = JSON.parse(localStorage.getItem('retroCart') || '[]');

  function saveCart(){
    localStorage.setItem('retroCart', JSON.stringify(cart));
    renderCartCount();
  }

  function renderCartCount(){
    const countEl = document.getElementById('cart-count-js');
    if(countEl){
      let totalQty = cart.reduce((sum,item)=>sum+item.qty,0);
      countEl.textContent = totalQty;
    }
  }

  function addItem(id,name,price,image){
    let existing = cart.find(i=>i.id===id);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({id,name,price:parseFloat(price),image,qty:1});
    }
    saveCart();
    alert(`${name} added to cart!`);
  }

  function renderCartModal(){
    const container = document.getElementById('cart-items-js');
    if(!container) return;
    container.innerHTML = '';
    cart.forEach(item=>{
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="ci-info">
          <div style="font-weight:800;color:#eaf3ff">${item.name}</div>
          <div>£${(item.price*item.qty).toFixed(2)} (${item.qty})</div>
        </div>
        <button onclick="RetroCart.removeItem('${item.id}')">Remove</button>
      `;
      container.appendChild(div);
    });
    const subtotalEl = document.getElementById('cart-subtotal-js');
    if(subtotalEl){
      let subtotal = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
      subtotalEl.textContent = '£'+subtotal.toFixed(2);
    }
  }

  function removeItem(id){
    cart = cart.filter(i=>i.id!==id);
    saveCart();
    renderCartModal();
  }

  function gotoCheckout(){
    window.location.href = 'checkout.html';
  }

  function loadCart(){
    renderCartCount();
  }

  return {addItem,renderCartModal,removeItem,gotoCheckout,loadCart};
})();
