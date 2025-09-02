// Seleccionamos elementos del HTML
const tituloInput = document.getElementById("titulo");
const contenidoInput = document.getElementById("contenido");
const btnAgregar = document.getElementById("btnAgregar");
const catalogo = document.getElementById("catalogo");

// Cargar poemas desde localStorage (si existen)
let poemas = JSON.parse(localStorage.getItem("poemas")) || [];

// Función para mostrar los poemas en el catálogo
function mostrarPoemas() {
    // Limpiamos el catálogo antes de volver a dibujar
    catalogo.innerHTML = "<h2>Poemas agregados</h2>";

    // Recorremos el array de poemas
    poemas.forEach((poema, index) => {
        // Creamos un contenedor para cada poema
        const card = document.createElement("div");
        card.classList.add("poema");

        // Agregamos título y contenido
        card.innerHTML = `
            <h3>${poema.titulo}</h3>
            <p>${poema.contenido}</p>
            <button onclick="eliminarPoema(${index})">Eliminar</button>
        `;

        // Lo insertamos en el catálogo
        catalogo.appendChild(card);
    });
}

// Función para agregar un nuevo poema
function agregarPoema() {
    const titulo = tituloInput.value.trim();
    const contenido = contenidoInput.value.trim();

    // Validamos que no estén vacíos
    if (titulo === "" || contenido === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }

    // Creamos objeto poema
    const nuevoPoema = { titulo, contenido };

    // Lo agregamos al array
    poemas.push(nuevoPoema);

    // Guardamos en localStorage
    localStorage.setItem("poemas", JSON.stringify(poemas));

    // Limpiamos inputs
    tituloInput.value = "";
    contenidoInput.value = "";

    // Volvemos a mostrar los poemas
    mostrarPoemas();
}

// Función para eliminar un poema
function eliminarPoema(index) {
    poemas.splice(index, 1); // quitamos 1 elemento
    localStorage.setItem("poemas", JSON.stringify(poemas));
    mostrarPoemas();
}

// Evento cuando se presiona el botón
btnAgregar.addEventListener("click", agregarPoema);

// Mostramos los poemas al cargar la página
mostrarPoemas();
