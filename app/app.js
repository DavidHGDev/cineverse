let pagina = 1;
const API_KEY = 'f6dcf66490e9e7dc5813688a18f24f01';
const IMAGE = 'https://image.tmdb.org/t/p/w500/';

const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const inputBuscar = document.querySelector("#inputBuscar");
const formBuscar = document.querySelector("#formBuscar");
const contador = document.querySelector("#contador");

btnSiguiente.addEventListener('click', () => {
    pagina += 1;
    cargarPeliculas();
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

formBuscar.addEventListener('submit', (event) => {
    event.preventDefault();
    pagina = 1;
    cargarPeliculas()
})

const cargarPeliculas = async () => {
    try {
        window.scrollTo(0,0)
        let urlFinal = '';
        if(inputBuscar.value === '') {
            urlFinal = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${pagina}`
        } else {
            urlFinal = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputBuscar.value}&language=es-MX&page=${pagina}`
        }

        const respuesta = await fetch(urlFinal);
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            console.log(datos)
            let peliculas = '';

            datos.results.forEach(element => {
                const rutaImg = IMAGE+element.poster_path;
                const img = element.poster_path !== null ? rutaImg : './images.png'
                peliculas += `
                <div class="pelicula"> 
                    <img class="poster" src="${img}">
                    <h3 class="titulo"> ${element.title}</h3>
                </div>
                `;
            });

            /*ahora inyectamos todo el HTML generado en el div contenedor*/
            document.querySelector("#contenedor").innerHTML = peliculas;
            contador.textContent = `Página ${pagina}`

        } else if(respuesta.status === 401) {
            console.log('Error: la Api Key esta mal escrita o inactiva');
        } else if (respuesta.status === 404) {
            console.log('Error: la película o recurso no existe');
        } else {
            console.log('Se presentó un error que no conocemos')
        }
    } catch (error) {
        console.error("error de red o código ", error)
    }
}

cargarPeliculas();