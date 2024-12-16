// Apagar la música

let audio = document.getElementById("myAudio");
let playPauseBtn = document.getElementById("playPause");
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; 
  } else {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; 
  }
  isPlaying = !isPlaying;
});


document.addEventListener('DOMContentLoaded', () => {
  const baseDeDatos = [
    {
    "id" : 1,
    "nombre" : "Usamos el uniforme",
    "puntos" : 20,
    "imagen" : './image/uniforme.png'
  },
  {
    "id" : 2,
    "nombre" : "Prestamos atención",
    "puntos" : 20,
    "imagen" : './image/atencion.png'
  },
  {
    "id" : 3,
    "nombre" : "Reciclamos la basura",
    "puntos" : 30,
    "imagen" : './image/reciclamos.png'
  },
  {
    "id" : 4,
    "nombre" : "Cuidamos el jardín",
    "puntos" : 10,
    "imagen" : './image/regar.png'
  },
  {
    "id" : 5,
    "nombre" : "Mantenemos la limpieza",
    "puntos" : 20,
    "imagen" : './image/limpieza.png'
  },
  {
    "id" : 6,
    "nombre" : "Llegamos a horario",
    "puntos" : 30,
    "imagen" : './image/horario.png'
  },
  {
    "id" : 7,
    "nombre" : "Trabajamos en equipo",
    "puntos" : 20,
    "imagen" : './image/compañeros.png'
  },
  {
    "id" : 8,
    "nombre" : "Traemos todos los útiles",
    "puntos" : 20,
    "imagen" : './image/utiles_escolares.jpg'
  }

  ];

  let carrito = [];
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');


  /**
  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  */
  function renderizarAcciones() {
      baseDeDatos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col');

          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('card-img-top');
          miNodoImagen.setAttribute('src', info.imagen);
          // Precio
          const miNodoPuntos = document.createElement('p');
          miNodoPuntos.classList.add('card-text');
          miNodoPuntos.textContent = `${info.puntos} puntos`;
          // Boton
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = 'Agregar';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirAccionesAlCarrito);
          // Insertamos

          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoPuntos);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
          
      });
  }

  /**
  * Evento para añadir un producto al carrito de la compra
  */
  function anyadirAccionesAlCarrito(evento) {
      carrito.push(evento.target.getAttribute('marcador'))
      renderizarCarrito();

  }

  /**
  * Dibuja todos los productos guardados en el carrito
  */
  function renderizarCarrito() {
      DOMcarrito.textContent = '';
      const carritoSinDuplicados = [...new Set(carrito)];
      carritoSinDuplicados.forEach((item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });

          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              return itemId === item ? total += 1 : total;
          }, 0);

          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item','text-center', 'small', 'mx-1');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].puntos} p. `;

          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-auto');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '0.5rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);

          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
     // Renderizamos el precio total en el HTML
     DOMtotal.textContent = calcularTotal();
  }

  /**
  * Evento para borrar un elemento del carrito
  */
  function borrarItemCarrito(evento) {
      const id = evento.target.dataset.item;

      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });

      renderizarCarrito();
  }

  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotal() {

      return carrito.reduce((total, item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          return total + miItem[0].puntos;
      }, 0).toFixed(0);
  }

  /**
  * Vacia el carrito y vuelve a dibujarlo
  */
  function vaciarCarrito() {
      carrito = [];
      renderizarCarrito();
  }

  DOMbotonVaciar.addEventListener('click', vaciarCarrito);

  renderizarAcciones();
  renderizarCarrito();
});






