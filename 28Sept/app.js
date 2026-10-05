/* vamos a crear un arreglo primero */

let peliculas=[
    /* va a obtener la siguiente lase osiosi */
    {/* ese id es u dao estatico */
        id:1,
        titulo:'El padrino',
        genero:'Drama',
        año:1972,
        calificacion:8.5,
        vita:true
    },
    {/* ese id es u dao estatico */
        id:2,
        titulo:'Titanic',
        genero:'Romance',
        año:1997,
        calificacion:8.1,
        vita:false
    },
    {/* ese id es u dao estatico */
        id:3,
        titulo:'Inception',
        genero:'Ciencia Ficcion',
        año:2010,
        calificacion:9.0,
        vita:true
    }

];

let nextId=4;
let filtroGenero= '';
let filtroEstado='';
let busqueda ='';
const form=document.getElementById('movie-form');
const inputTitulo=document.getElementById('titulo');
const inputGenero=document.getElementById('genero');
const inputAño=document.getElementById('año');
const inputCalificaion=document.getElementById('calificacion');


/* estoss yo */
const inputSearch=document.getElementById('search');
const selectFilterGenero = document.getElementById('filter-genero');
const selectFilterEstado = document.getElementById('filter-estado');
const btnClearFilters = document.getElementById('clear-filters');
const statsTotal = document.getElementById('stats-total');
const statsVistas = document.getElementById('stats-vistas');
const statsPendientes = document.getElementById('stats-pendientes');
const statsPromedio = document.getElementById('stats-promedio');
const moviesGrid = document.getElementById('movies-grid');
const moviesEmpty = document.getElementById('movies-empty');
const themeToggle = document.getElementById('theme-toggle');
const notification = document.getElementById('notification');

/* esta variable es un tipo arreglo */



const obtenerPeliculasFiltradas = () =>{
    let resultado =[...peliculas];
    if(busqueda.trim() !== ''){
        resultado=resultado.filter(peliculas=>
            peliculas.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase())
        );
    }


    if(filtroGenero!== ''){
        resultado=resultado.filter(peliculas=>
            peliculas.genero==filtroGenero
        );
    }


    if(filtroEstado==='vistas'){
        resultado=resultado.filter(peliculas=>
            peliculas.vita===false
        );
    }


    if(filtroEstado==='pendientes'){
        resultado=resultado.filter(peliculas=>
            peliculas.vita===false
        );
    }

    return resultado;
}



const crearTajetaPelicula = (pelicula)=>{
    const article =document.createElement('article');
    article.className='movie-card';
    const{id,titulo,genero,año,calificacion,vita}=pelicula;
    if(vita){
        article.classList.add('movie-card--viewed');
    }
    article.innerHTML=<><h3>${titulo}</h3><p>${genero} ${año}</p><p>${calificacion}/10</p>
    <div>
        <button>${vita ? 'Marca pendiente' : '👽 Marca vista'}</button>
    </div></>
    return article;
}



const renderizarPeliculas =()=>{
    const peliculasFiltradas=obtenerPeliculasFiltradas();
    moviesGrid.innerHTML='';
    if(peliculasFiltradas.length===0){
        moviesEmpty.style.display='block';
        return;
    }
    moviesEmpty.style.display='none';
    peliculasFiltradas.forEach(peliculas=>{
        const tarjeta =crearTajetaPelicula(peliculas);
        moviesGrid.appendChild(tarjeta);
    });


    const mostrrNotficacion =(mensaje, tio='success')=>{
        notificacion.textContent=mensaje;
        notificacion.className='notificacion';
        if(tipo==='sucess'){
            notification.classList.add('notificacion--success');

        }else{
            notification.classList.add('notificacion--error');
        }
        notificacion.classList.add('notificacion--show');
        setTimeout(() => {
            notificacion.classList.remove('notificacion--show');
        }, 3000);
    }
};

const agregarPelicula=(evento)=>{
    evento.preventDealt();
    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();
    const año = parseInt(inputAño.value);
    const calificacion = parseFloat(inputCalificaion.value);
    if(!titulo || !genero || año || !calificacion){
        mostrrNotficacion('complete tdos los campos error');
        return;
    }
    if (calificacion<1|| calificacion>10){
        mostrrNotficacion('a calificacion debeser entre 1 o 10');
        return;
    }

    const nuevaPelicula={
        id:nextId,
        titulo:titulo,
        genero:genero,
        año: año,
        calificacion:calificacion,
        vita:false
    }
    peliculas=[...peliculas,nuevaPelicula];
    nextId++;
    form.reset();
        renderizarPeliculas();
        mostrrNotficacion('"${titulo}" agregado');
        console.log('pelicula agregada');
};

form.addEventListener('submit',agregarPelicula);

console.log('evento configurado');