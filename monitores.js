// Clase ProductoInfo para representar la información de un producto
class ProductoInfo {
    constructor(nombre, imagen, precio) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
    }
}

// Obtener elementos del DOM por su ID
const productoElement = document.getElementById('producto');
const carritoElement = document.getElementById('carrito');
const cantidadCarritoElement = document.getElementById('cantidad-carrito');

let productoInfo = null;

// Función para obtener la cantidad actual de productos en el carrito
function obtenerCantidadCarrito() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    return productosEnCarrito.length;
}


// Actualiza la etiqueta 'cantidad-carrito' al cargar la página
cantidadCarritoElement.textContent = obtenerCantidadCarrito();

// Evento de arrastre en el elemento 'productoElement'
productoElement.addEventListener('dragstart', (event) => {
    productoInfo = new ProductoInfo(
        "MONITOR ALIENWARE CURVO",
        "img/productos/monitor/dell-moonitor--alienware.jpg",
        11000
    );
});

// Creamos constantes para varios elementos del DOM correspondientes a productos
const productoElement2 = document.querySelector('.producto-laptos:nth-child(2) img.cursor');
const productoElement3 = document.querySelector('.producto-laptos:nth-child(3) img.cursor');
const productoElement4 = document.querySelector('.producto-laptos:nth-child(4) img.cursor');
const productoElement5 = document.querySelector('.producto-laptos:nth-child(5) img.cursor');
const productoElement6 = document.querySelector('.producto-laptos:nth-child(6) img.cursor');
const productoElement7 = document.querySelector('.producto-laptos:nth-child(7) img.cursor');
const productoElement8 = document.querySelector('.producto-laptos:nth-child(8) img.cursor');
const productoElement9 = document.querySelector('.producto-laptos:nth-child(9) img.cursor');
const productoElement10 = document.querySelector('.producto-laptos:nth-child(10) img.cursor');

// Definimos un arreglo 'productos' con información de varios productos
const productos = [
    {
        //producto 1
        nombre: "MONITOR ALIENWARE CURVO",
        imagen: "img/productos/monitor/dell-moonitor--alienware.jpg",
        precio: 11000
    },
    {
        //producto 2
        nombre: "MONITOR OPTIX",
        imagen: "IMG/productos/monitor/msi-monitoroptix.png",
        precio: 3550
    },
    {
        //producto 3
        nombre: "MONITOR VG32VQ1",
        imagen: "IMG/productos/monitor/asus-monitor-vg32vq1.png",
        precio: 4300
    },
    {
        //producto 4
        nombre: "Samsung LS32A700NWNXZA",
        imagen: "IMG/productos/monitor/samsung-ls32a700.jpg",
        precio: 4400
    },
    {
        //producto 5
        nombre: "MONITOR GAMING LG",
        imagen: "IMG/productos/monitor/lg-ultragear.webp",
        precio: 2500
    },
    {
        //producto 6
        nombre: "MONITOR T350 LF24T350FHNXZA",
        imagen: "IMG/productos/monitor/samsung-t350.webp",
        precio: 2000
    },
    {
        //producto 7
        nombre: "MONITOR G24F-SA",
        imagen: "IMG/productos/monitor/gigabyte-g24f.png",
        precio: 5000
    },
    {
        //producto 8
        nombre: "MONITOR TUF",
        imagen: "IMG/productos/monitor/asus-tuf.png",
        precio: 1700
    },
    {
        //producto 9
        nombre: "MONITOR 24 24B2XH",
        imagen: "IMG/productos/monitor/aoc-24b2xh.jpg",
        precio: 1400
    },
    {
        //producto 10
        nombre: "Monitor Curvo 27″, Cosmos, 75HZ",
        imagen: "IMG/productos/monitor/brocs-cosmos.jpg",
        precio: 1700
    },
    // ... otros productos
];

// Eventos de arrastre para productos individuales
productoElement2.addEventListener('dragstart', () => {
    productoInfo = productos[1];
});

productoElement3.addEventListener('dragstart', () => {
    productoInfo = productos[2];
});

productoElement4.addEventListener('dragstart', () => {
    productoInfo = productos[3];
});

productoElement5.addEventListener('dragstart', () => {
    productoInfo = productos[4];
});

productoElement6.addEventListener('dragstart', () => {
    productoInfo = productos[5];
});

productoElement7.addEventListener('dragstart', () => {
    productoInfo = productos[6];
});

productoElement8.addEventListener('dragstart', () => {
    productoInfo = productos[7];
});

productoElement9.addEventListener('dragstart', () => {
    productoInfo = productos[8];
});

productoElement10.addEventListener('dragstart', () => {
    productoInfo = productos[9];
});

// Evento de arrastre sobre el carrito
carritoElement.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Evento de soltar un producto en el carrito
carritoElement.addEventListener('drop', (event) => {
    event.preventDefault();

    if (productoInfo) {
        let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
        productosEnCarrito.push(productoInfo);
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

        // Actualiza la etiqueta 'cantidad-carrito' después de agregar un producto
        cantidadCarritoElement.textContent = obtenerCantidadCarrito();

        const imagenProducto = document.createElement('img');
        imagenProducto.src = productoInfo.imagen;
        imagenProducto.alt = productoInfo.nombre;
        imagenProducto.className = 'icono-carro-nav';
        carritoElement.appendChild(imagenProducto);

        const cantidadActual = productosEnCarrito.length;
        cantidadCarritoElement.textContent = cantidadActual;

        const contenidoMensaje = document.createElement('div');
        const imagenMensaje = document.createElement('img');
        imagenMensaje.src = productoInfo.imagen;
        imagenMensaje.alt = productoInfo.nombre;
        imagenMensaje.style.maxWidth = '100px';
        contenidoMensaje.appendChild(imagenMensaje);
        contenidoMensaje.innerHTML += `<p>Nombre: ${productoInfo.nombre}</p><p>Cantidad: 1</p><p>Costo Total: Q. ${productoInfo.precio}</p>`;
        
        Swal.fire({
            title: 'Producto agregado al carrito',
            html: contenidoMensaje.innerHTML,
            icon: 'success'
        });

        productoInfo = null;
    }
});

//API de OpenCage Geocoder
const apiKey = '75653f3e3e7a4013bf600e0669015372';

// Obtener las coordenadas de latitud y longitud (como se hizo antes)
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Llamar a la API de OpenCage Geocoder para obtener la información del país
    $.ajax({
      url: `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.results.length > 0) {
          const country = data.results[0].components.country;
          // Puedes hacer lo que desees con el nombre del país, como mostrarlo en la página
          const countryElement = document.getElementById('country');
          countryElement.textContent = `País donde realizare la Compra: ${country}`;
        } else {
          console.error("No se encontraron resultados de geolocalización inversa.");
        }
      },
      error: function() {
        console.error("Error al llamar a la API de geolocalización inversa.");
      }
    });
  }, function(error) {
    console.error("Error al obtener la geolocalización:", error);
  });
} else {
  console.error("El navegador no admite la geolocalización.");
}