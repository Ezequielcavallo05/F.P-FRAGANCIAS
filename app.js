class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProductos(producto) {
        this.productos.push(producto);
    }

    quitarProducto(nombreProducto) {
        let encontrado = false;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
                this.productos.splice(i, 1);
                alert(`Producto "${nombreProducto}" eliminado del carrito.`);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            alert(`No se encontró el producto "${nombreProducto}" en el carrito.`);
        }
    }

    mostrarListado() {
        if (this.productos.length === 0) {
            alert("El carrito está vacío.");
        } else {
            let mensaje = "Productos en el carrito:\n";
            for (let i = 0; i < this.productos.length; i++) {
                mensaje += `- ${this.productos[i].nombre} - $${this.productos[i].precio}\n`;
            }
            alert(mensaje);
        }
    }

    generarTotal() {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].precio;
        }
        return total;
    }
}

function solicitarProductoYAgregarAlCarrito(carrito) {
    const nombre = prompt("Ingresá el nombre del producto:");
    if (nombre === "") {
        alert("El nombre no puede estar vacío.");
        return;
    }

    const precioIngresado = prompt("Ingresá el precio del producto:");
    const precio = precioIngresado * 1;

    if (precioIngresado === "" || precio <= 0) {
        alert("El precio ingresado no es válido. Ingresá un número mayor a 0.");
        return;
    }

    const nuevoProducto = new Producto(nombre, precio);
    carrito.agregarProductos(nuevoProducto);
    alert(`Producto "${nombre}" agregado al carrito por $${precio}.`);
}

function solicitarEliminarProducto(carrito) {
    const nombre = prompt("Ingresá el nombre del producto que querés eliminar:");
    if (nombre === "") {
        alert("Tenés que ingresar un nombre.");
        return;
    }
    carrito.quitarProducto(nombre);
}

function buscarProductoEnCarrito(carrito) {
    const nombre = prompt("Ingresá el nombre del producto a buscar:");
    let encontrado = false;

    for (let i = 0; i < carrito.productos.length; i++) {
        if (carrito.productos[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            alert(`El producto "${nombre}" está en el carrito.`);
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert(`El producto "${nombre}" no está en el carrito.`);
    }
}

function mostrarTotalConDescuento(carrito) {
    const total = carrito.generarTotal();
    if (total > 10000) {
        const descuento = total * 0.1;
        alert(`Total: $${total}\n¡Obtuviste un 10% de descuento!\nTotal final: $${total - descuento}`);
    } else {
        alert(`Total del carrito: $${total}`);
    }
}

// ==========================
// Menú principal
// ==========================

const carrito = new Carrito();
let opcion = prompt(
    "Seleccioná una opción:\n1. Agregar producto\n2. Eliminar producto\n3. Buscar producto\n4. Ver carrito\n5. Ver total\n6. Salir"
);

while (opcion !== "6") {
    if (opcion === "1") {
    solicitarProductoYAgregarAlCarrito(carrito);
    } else if (opcion === "2") {
    solicitarEliminarProducto(carrito);
    } else if (opcion === "3") {
    buscarProductoEnCarrito(carrito);
    } else if (opcion === "4") {
    carrito.mostrarListado();
    } else if (opcion === "5") {
    mostrarTotalConDescuento(carrito);
    } else {
    alert("Opción inválida. Ingresá un número del 1 al 6.");
    }

    opcion = prompt(
    "Seleccioná una opción:\n1. Agregar producto\n2. Eliminar producto\n3. Buscar producto\n4. Ver carrito\n5. Ver total\n6. Salir"
    );
}

alert("¡Gracias por usar el carrito!");
