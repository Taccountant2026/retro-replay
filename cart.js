// Modern Cart System for Retro Replay
window.RetroCart = (function(){
  let cart = JSON.parse(localStorage.getItem('retroCart') || '[]');

  function saveCart(){
    localStorage.setItem('retroCart', JSON.stringify(cart));
    renderCartCount();
    updateCartModal();
  }

  function renderCartCount(){
    const countEl = document.getElementById('cart-count-js');
    if(countEl){
      let totalQty = cart.reduce((sum,item)=>sum+item.qty,0);
      countEl.textContent = totalQty;
      countEl.style.display = totalQty > 0 ? 'inline-block' : 'none';
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
    showNotification(`✓ ${name} added to cart!`, 'success');
  }

  function updateCartModal(){
    const container = document.getElementById('cart-items-js');
    if(!container) return;
    
    if(cart.length === 0){
      container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray);">Your cart is empty</div>';
    } else {
      container.innerHTML = '';
      cart.forEach(item=>{
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
          <div class="ci-info" style="flex:1;">
            <div style="font-weight:600;color:var(--dark);margin-bottom:4px">${item.name}</div>
            <div style="color:var(--gray);font-size:0.875rem">Qty: ${item.qty}</div>
            <div style="color:var(--primary);font-weight:700;margin-top:4px">£${(item.price*item.qty).toFixed(2)}</div>
          </div>
          <button onclick="RetroCart.removeItem('${item.id}')" style="background:var(--error);color:white;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;font-size:0.875rem;">Remove</button>
        `;
        div.style.cssText = 'display:flex;gap:1rem;padding:1rem;border-bottom:1px solid var(--gray-lighter);align-items:center;';
        container.appendChild(div);
      });
    }
    
    const subtotalEl = document.getElementById('cart-subtotal-js');
    if(subtotalEl){
      let subtotal = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
      subtotalEl.textContent = '£'+subtotal.toFixed(2);
    }
  }

  function removeItem(id){
    cart = cart.filter(i=>i.id!==id);
    saveCart();
    showNotification('Item removed from cart', 'info');
  }

  function updateQuantity(id, newQty){
    const item = cart.find(i=>i.id===id);
    if(item){
      item.qty = Math.max(1, parseInt(newQty));
      saveCart();
    }
  }

  function clearCart(){
    if(confirm('Are you sure you want to clear your cart?')){
      cart = [];
      saveCart();
      showNotification('Cart cleared', 'info');
    }
  }

  function getCart(){
    return cart;
  }

  function getTotal(){
    return cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  }

  function gotoCheckout(){
    if(cart.length === 0){
      showNotification('Your cart is empty', 'warning');
      return;
    }
    window.location.href = '/checkout.html';
  }

  function loadCart(){
    renderCartCount();
    updateCartModal();
  }

  // Notification system
  function showNotification(message, type = 'info'){
    const existing = document.querySelector('.cart-notification');
    if(existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#2563eb'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  return {
    addItem,
    updateCartModal,
    removeItem,
    updateQuantity,
    clearCart,
    getCart,
    getTotal,
    gotoCheckout,
    loadCart
  };
})();
