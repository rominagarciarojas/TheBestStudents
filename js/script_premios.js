
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

// Mostrar las cards
document.addEventListener('DOMContentLoaded', () => {
  const baseDeDatosPremio = [
    {
    "id" : 1,
    "nombre" : "Helados",
    "puntos" : 200,
    "imagen" : './image/icecream.jpg'
  },
  {
    "id" : 2,
    "nombre" : "Teatro",
    "puntos" : 500,
    "imagen" : './image/teatro.jpg'
  },
  {
    "id" : 3,
    "nombre" : "Juego de mesa",
    "puntos" : 300,
    "imagen" : './image/ludo.jpg'
  },
  {
    "id" : 4,
    "nombre" : "Película",
    "puntos" : 250,
    "imagen" : './image/pelicula.jpg'
  },
  {
    "id" : 5,
    "nombre" : "Picnic",
    "puntos" : 400,
    "imagen" : './image/picnic.jpg'
  },
  {
    "id" : 6,
    "nombre" : "Juegos",
    "puntos" : 320,
    "imagen" : './image/juegos.jpg'
  },
  {
    "id" : 7,
    "nombre" : "Pizza",
    "puntos" : 450,
    "imagen" : './image/pizza.jpg'
  },
  {
    "id" : 8,
    "nombre" : "Fiesta",
    "puntos" : 600,
    "imagen" : './image/fiesta.jpg'
  }

  ];

  let carritoPremio = [];
  const DOMitems = document.querySelector('#items');
  const DOMcarritoPremio = document.querySelector('#carritoPremio');
  const DOMtotalPremio = document.querySelector('#totalPremio');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');

  /**
  * Dibuja todos los productos a partir de la base de datos.
  */
  function renderizarAcciones() {
      baseDeDatosPremio.forEach((info) => {
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
      // Anyadimos el Nodo a nuestro carrito
      carritoPremio.push(evento.target.getAttribute('marcador'))
      // Actualizamos el carrito
      renderizarCarritoPremio();

  }

  /**
  * Dibuja todos los productos guardados en el carrito
  */
  function renderizarCarritoPremio() {
      DOMcarritoPremio.textContent = '';
      const carritoSinDuplicados = [...new Set(carritoPremio)];
      carritoSinDuplicados.forEach((item) => {
          const miItem = baseDeDatosPremio.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          const numeroUnidadesItem = carritoPremio.reduce((totalPremio, itemId) => {
              return itemId === item ? totalPremio += 1 : totalPremio;
          }, 0);
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item','text-center', 'small', 'mx-1');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].puntos} p. `;
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'btn-sm','mx-2');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarritoPremio);
          miNodo.appendChild(miBoton);
          DOMcarritoPremio.appendChild(miNodo);
      });

        DOMtotalPremio.textContent = calcularTotalPremio();
  }

  /**
  * Evento para borrar un elemento del carrito
  */
  function borrarItemCarritoPremio(evento) {
      const id = evento.target.dataset.item;
      carritoPremio = carritoPremio.filter((carritoPremioId) => {
          return carritoPremioId !== id;
      });

      renderizarCarritoPremio();
  }

  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotalPremio() {
      return carritoPremio.reduce((totalPremio, item) => {
          const miItem = baseDeDatosPremio.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          return totalPremio + miItem[0].puntos;
      }, 0).toFixed(0);
  }

  /**
  * Vacia el carrito y vuelve a dibujarlo
  */
  function vaciarCarritoPremio() {
      carritoPremio = [];
      renderizarCarritoPremio();
  }

  DOMbotonVaciar.addEventListener('click', vaciarCarritoPremio);

  renderizarAcciones();
  renderizarCarritoPremio();

});

// en contruccion....
function puntajeRestante()	{
  // Obtenemos el puntaje restante
  const puntajeRestante = 1000 - total();
  // Mostramos el puntaje restante
  document.getElementById('puntaje-restante').textContent = puntajeRestante;
  // Si el puntaje es negativo, muestra un mensaje de error
  if (puntajeRestante < 0) {
    document.getElementById('error-puntaje').textContent = 'No puedes seguir canjeando premios, tu puntaje se ha agotado.';
  } else {
    document.getElementById('error-puntaje').textContent = '';
  }
}
