let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para cargar productos desde el LocalStorage
function cargarProductos() {
  return new Promise((resolve, reject) => {
    const productos = JSON.parse(localStorage.getItem("carrito")) || [];
    if (productos.length > 0) {
      resolve(productos);
    } else {
      console.error("No se encontraron productos.");
      reject([]);
    }
  });
}

// Función para cargar productos al DOM
function cargarCarrito() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  let total = 0;

  carrito.forEach(async producto => {
    const productos = await cargarProductos();
    const productoEncontrado = productos.find(p => p.nombre === producto.nombre);

    if (productoEncontrado) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("col-md-4", "mb-3");
      cartItem.innerHTML = `
        <div class="card">
          <div class="card" width="18rem">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">Cantidad: ${producto.cantidad}</p>
              <p class="card-text">Subtotal: $${(productoEncontrado.precio * producto.cantidad).toFixed(2)}</p>
            </div>
          </div>
        </div>
      `;
      cartList.appendChild(cartItem);
      total += productoEncontrado.precio * producto.cantidad;
    }
    const cartTotalValue = document.getElementById("cart-total-value");
    cartTotalValue.textContent = total.toFixed(2);
  });
}

// Función para finalizar la compra
function finalizarCompra() {
  Toastify({
    text: "¡Compra finalizada! Gracias por su compra.",
    backgroundColor: "green",
  }).showToast();

  localStorage.removeItem("carrito"); // Eliminar el carrito del Storage

  document.getElementById("cart-total-value").textContent = "0"; // Reiniciar el valor total

  document.getElementById("cart-list").textContent = "";
}

document.getElementById('Compra').onclick = cargarCarrito;
document.getElementById('Finalizar').onclick = finalizarCompra;