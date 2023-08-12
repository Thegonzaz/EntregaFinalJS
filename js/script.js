const productosDisponibles = [
  { nombre: "Panel de Yeso", precio: 3200.00, img: "/img/placa-de-yeso.png", },
  { nombre: "Perfil de Metal", precio: 1000.00, img: "/img/perfiles_estructurales_.png", },
  { nombre: "Cinta de Papel", precio: 800.00, img: "/img/Cinta-Chica.png", },
  { nombre: "Placa OSB", precio: 2100.00, img: "/img/osb.png", },
  { nombre: "Atornilladora Bosch", precio: 51000.00, img: "/img/ator-bosch.png", },
  { nombre: "Lana de Vidrio", precio: 8500, img: "/img/lanav.png", },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para cargar los productos en la página
function productos() {
  const productList = document.getElementById("product-list");

  productosDisponibles.forEach(producto => {
    const productItem = document.createElement("div");
    productItem.classList.add("col-md-4", "mb-3");
    productItem.innerHTML = `
          <div class="card" style="width: 18rem">
          <img class="card-img-top" style="width: 18rem; height: 14rem;" src="${producto.img}" alt="${producto.nombre}"
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
          </div>
      `;
    productList.appendChild(productItem);
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", agregarAlCarrito);
  });
}

function agregarAlCarrito(event) {
  const nombre = event.target.getAttribute("data-nombre");
  const precio = parseFloat(event.target.getAttribute("data-precio"));
  const productoEnCarrito = carrito.find(producto => producto.nombre === nombre);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  Toastify({
    text: `${nombre} agregado al carrito`,
    backgroundColor: "green",
  }).showToast();
}

document.getElementById('productos').onclick = productos();  