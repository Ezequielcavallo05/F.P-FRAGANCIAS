// ==========================
// Elementos del DOM 
// ==========================
const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const carritoSection = document.getElementById("carritoSection");

// ==========================
// Array de productos
// ==========================
const productos = [
    { id: 1, nombre: "9PM REBEL AFNAN 100ML", precio: 9500, stock: 10, imagen: "./img/9 PM Rebel Afnan 100ml.png", descripcion:" Notas de manzana fresca y piña con corazón amaderado similar a Aventus, con buena duración y proyección" },
    { id: 2, nombre: "BHARARA KING EAU DE PARFUM 100ML", precio: 15000, stock: 10, imagen: "./img/BHARARA King Eau De Parfum 100 ml.png", descripcion:"Fragancia elegante con mezcla cítrica y amaderada, ideal para uso en ocasiones formales." },
    { id: 3, nombre: "LATTAFA BADE'E AL OUD SUBLIME 100ML", precio: 9000, stock: 10, imagen: "./img/LATTAFA Bade'e Al Oud Sublime 100ml.png", descripcion:"Fragancia amaderada-aromática unisex, con notas de salida de manzana, lichi y rosa; corazón de ciruela y jazmín." },
    { id: 4, nombre: "LATTAFA YARA 100ML", precio: 11000, stock: 10, imagen: "./img/LATTAFA Yara 100ml.png", descripcion: "Aroma dulce y tropical con notas de salida de orquídea, mandarina y heliotropo." },
    { id: 5, nombre: "ODYSSEY MANDARIN 100ML", precio: 10000, stock: 10, imagen: "./img/ODYSSEY Mandarin 100ml.png", descripcion: "Fragancia vibrante de mandarina con matices cítricos frescos, perfecta para el día." },
];

// ==========================
// Variables globales
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let vistaActual = "productos";

// ==========================
// Funciones
// ==========================

/* Renderiza los productos de la pagina*/
function renderProductos(productosArray) {
  listaProductos.innerHTML = "";

  productosArray.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;

    const stock = document.createElement("p");
    stock.textContent = `Stock: ${producto.stock}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.addEventListener("click", () => agregarProductoPorID(producto.id));

    // 🔁 Orden personalizado
    tarjeta.appendChild(img);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(botonAgregar);

    listaProductos.appendChild(tarjeta);
  });
}


/* Renderiza el carrito de compras */
function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) return;

    carrito.forEach(p => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
            <div class="info">
                <img src="${p.imagen}" alt="${p.nombre}">
                <p>${p.nombre} - $${p.precio} x ${p.cantidad}</p>
            </div>
            <button onclick="eliminarProductoPorID(${p.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(div);
    });
}

/* Muestra los productos de la pagina */
function verProductos() {
    vistaActual = "productos";
    const productosSinOferta = productos.filter(p => p.precio >= 10000);
    renderProductos(productosSinOferta);
}

/*Muestra las ofertas de la pagina*/
function verOfertas() {
    vistaActual = "ofertas";
    const ofertas = productos.filter(p => p.precio < 10000);
    renderProductos(ofertas.length ? ofertas : [{ nombre: "No hay productos en oferta", precio: "", stock: "" }]);
}

/* Agrega un producto al carrito*/
function agregarProductoPorID(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto || producto.stock <= 0) return;

    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        if (existente.cantidad < producto.stock) {
            existente.cantidad++;
            producto.stock--;
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        producto.stock--;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); // 🧠 Guardar en localStorage
    renderCarrito();

    if (vistaActual === "productos") verProductos();
    else if (vistaActual === "ofertas") verOfertas();

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto fue agregado al carrito correctamente.',
        timer: 1500,
        showConfirmButton: false
    });
}

/* Elimina un producto del carrito*/
function eliminarProductoPorID(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        const productoEnCarrito = carrito[index];
        const productoOriginal = productos.find(p => p.id === id);

        if (productoOriginal) {
            productoOriginal.stock += productoEnCarrito.cantidad;
        }

        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito)); // 🧠 Actualizar localStorage
        renderCarrito();

        Swal.fire({
            icon: 'warning',
            title: 'Producto eliminado',
            text: 'El producto fue eliminado del carrito.',
            timer: 1500,
            showConfirmButton: false
        });

        if (vistaActual === "productos") verProductos();
        else if (vistaActual === "ofertas") verOfertas();
    }
}

/*Muestra el total de la compra*/
function verTotal() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'El carrito está vacío.',
        });
        return;
    }

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    let mensaje = `Total: $${total}`;

    if (total > 10000) {
        const descuento = total * 0.1;
        const totalConDescuento = total - descuento;
        mensaje += `\nDescuento 10%: -$${descuento.toFixed(2)}\nTotal con descuento: $${totalConDescuento.toFixed(2)}`;
    }

    Swal.fire({
        icon: 'success',
        title: 'Total de la compra',
        html: mensaje.replace(/\n/g, '<br>')
    });
}

/*Sale del carrito*/
function salir() {
    carrito = [];
    localStorage.removeItem("carrito"); // 🧠 Limpiar localStorage
    listaCarrito.innerHTML = "<p>¡Gracias por tu visita!</p>";

    Swal.fire({
        icon: 'success',
        title: '¡Hasta pronto!',
        text: 'Tu carrito se vació. ¡Gracias por tu visita!',
        timer: 2000,
        showConfirmButton: false
    });

    setTimeout(() => {
        location.reload();
    }, 2000);
}

// ==========================
// Eventos
// ==========================
document.getElementById("btnVerProductos").addEventListener("click", verProductos);
document.getElementById("btnVerOfertas").addEventListener("click", verOfertas);
document.getElementById("btnVerCarrito").addEventListener("click", () => {
    const estaVisible = carritoSection.style.display === "block";
    carritoSection.style.display = estaVisible ? "none" : "block";
    if (!estaVisible) renderCarrito();
});
document.getElementById("btnTotal").addEventListener("click", verTotal);
document.getElementById("btnSalir").addEventListener("click", salir);

// ==========================
// Render inicial
// ==========================
renderCarrito();
verProductos(); 
