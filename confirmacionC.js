document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM para mostrar productos confirmados y el total
    const productosConfirmados = document.getElementById('productos-confirmados');
    const totalConfirmado = document.getElementById('total-confirmado');

    // Obtener productos del Local Storage o inicializar un arreglo vacío si no hay productos
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

    // Función para calcular y mostrar el total de los productos en el carrito
    function actualizarTotal() {
        const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio, 0);
        totalConfirmado.textContent = `Total: Q. ${total.toFixed(2)}`;
    }

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(producto) {
        productosEnCarrito.push(producto);
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    }

    // Función para quitar un producto del carrito
    function quitarProductoDelCarrito(producto) {
        const indice = productosEnCarrito.findIndex(item => item.nombre === producto.nombre);
        if (indice !== -1) {
            productosEnCarrito.splice(indice, 1);
            localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
        }
    }

    // Mostrar productos confirmados en la página
    productosEnCarrito.forEach(producto => {
        // Crear un div para mostrar cada producto en el carrito
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-confirmado');

        // Crear una imagen del producto
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        imagenProducto.className = 'imagen-producto-confirmado';

        // Crear un elemento <p> para mostrar el nombre del producto
        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = producto.nombre;
        nombreProducto.classList.add('nombre-producto');

        // Crear elementos para mostrar el precio del producto
        const textoPrecio = document.createElement('span');
        textoPrecio.textContent = 'Precio: ';
        textoPrecio.classList.add('precio-texto');

        const precioProducto = document.createElement('span');
        precioProducto.textContent = `Q. ${producto.precio.toFixed(2)}`;
        precioProducto.classList.add('precio-producto');

        // Crear botones para agregar y quitar productos del carrito
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = '+';
        botonAgregar.className = 'boton-agregar';
        botonAgregar.addEventListener('click', () => {
            agregarProductoAlCarrito(producto);
            actualizarTotal();
        });

        const botonQuitar = document.createElement('button');
        botonQuitar.textContent = '-';
        botonQuitar.className = 'boton-quitar';
        botonQuitar.addEventListener('click', () => {
            quitarProductoDelCarrito(producto);
            actualizarTotal();
        });

        // Agregar elementos al div del producto
        productoDiv.appendChild(imagenProducto);
        productoDiv.appendChild(nombreProducto);
        productoDiv.appendChild(textoPrecio);
        productoDiv.appendChild(precioProducto);
        productoDiv.appendChild(botonQuitar);
        productoDiv.appendChild(botonAgregar);

        // Agregar el div del producto al contenedor de productos confirmados
        productosConfirmados.appendChild(productoDiv);
    });

    // Calcular y mostrar el total al cargar la página
    actualizarTotal();
});
