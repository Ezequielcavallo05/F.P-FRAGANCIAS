// ==========================
// Array de productos
// ==========================
const productos = [
    { id: 1, nombre: "Perfume A", precio: 9500, stock: 10 },
    { id: 2, nombre: "Perfume B", precio: 15000, stock: 8 },
    { id: 3, nombre: "Perfume C", precio: 9000, stock: 12 },
    { id: 4, nombre: "Perfume D", precio: 11000, stock: 6 },
    { id: 5, nombre: "Perfume E", precio: 10000, stock: 15 }
];

// ==========================
// Array del carrito
// ==========================
let carrito = [];

// ==========================
// Funciones
// ==========================

// 1. Ver todos los productos
function verProductos() {
    let mensaje = "📦 Productos disponibles:\n";
    productos.forEach((producto) => {
        mensaje += `- ${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})\n`;
    });
    alert(mensaje);
}

// 2. Ver productos en oferta (menores a $10.000)
function verOfertas() {
    const productosEnOferta = productos.filter(p => p.precio < 10000);
    if (productosEnOferta.length === 0) {
        alert("No hay productos en oferta en este momento.");
        return;
    }
    let mensaje = "🔥 Productos en oferta:\n";
    productosEnOferta.forEach((producto) => {
        mensaje += `- ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(mensaje);
}

// 3. Agregar productos al carrito
function agregarAlCarrito() {
    const nombre = prompt("Ingresá el nombre del producto que querés agregar:");
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!producto) {
        alert("❌ Producto no encontrado.");
        return;
    }

    const cantidad = parseInt(prompt(`¿Cuántas unidades de "${producto.nombre}" querés agregar?`));

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("❌ Cantidad inválida.");
        return;
    }

    if (cantidad > producto.stock) {
        alert(`❌ No hay suficiente stock. Stock disponible: ${producto.stock}`);
        return;
    }

    carrito.push({ ...producto, cantidad });
    alert(`✅ Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito.`);
}

// 4. Ver productos en el carrito
function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        const listado = carrito
            .map(producto => `- ${producto.nombre} ($${producto.precio}) - Cantidad: ${producto.cantidad}`)
            .join("\n");
        alert("Productos en tu carrito:\n" + listado);
    }
}


// 5. Eliminar producto del carrito
function eliminarProductoPorID() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay productos para eliminar.");
        return;
    }

    const idIngresado = parseInt(prompt("Ingresá el ID del producto que querés eliminar:"));

    if (isNaN(idIngresado)) {
        alert("El ID ingresado no es válido.");
        return;
    }

    const index = carrito.findIndex(producto => producto.id === idIngresado);

    if (index !== -1) {
        const eliminado = carrito.splice(index, 1)[0];
        alert(`Producto "${eliminado.nombre}" eliminado del carrito.`);
    } else {
        alert("No se encontró ningún producto con ese ID en el carrito.");
    }
}

// 6. Ver total con posible descuento
function verTotal() {
    if (carrito.length === 0) {
        alert("🛒 El carrito está vacío.");
        return;
    }

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    if (total > 10000) {
        const descuento = total * 0.1;
        const totalConDescuento = total - descuento;
        alert(`💰 Total: $${total}\n🎉 Descuento aplicado (10%): -$${descuento}\n💳 Total final: $${totalConDescuento}`);
    } else {
        alert(`💳 Total del carrito: $${total}`);
    }
}

// ==========================
// Menú principal
// ==========================
let opcion;

do {
    opcion = prompt(
        "Seleccioná una opción:\n" +
        "1. Ver productos\n" +
        "2. Ver productos en oferta\n" +
        "3. Agregar producto al carrito\n" +
        "4. Ver carrito\n" +
        "5. Eliminar producto del carrito\n" +
        "6. Ver total\n" +
        "7. Salir"
    );

    switch (opcion) {
        case "1":
            verProductos();
            break;
        case "2":
            verOfertas();
            break;
        case "3":
            agregarAlCarrito();
            break;
        case "4":
            verCarrito();
            break;
        case "5":
            eliminarProductoPorID();
            break;
        case "6":
            verTotal();
            break;
        case "7":
            alert("👋 ¡Gracias por tu compra!");
            break;
        default:
            alert("❌ Opción inválida.");
    }

} while (opcion !== "7");
