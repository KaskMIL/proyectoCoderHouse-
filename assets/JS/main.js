//toma elementos del DOM
const cardContainer = document.getElementById("card-container");
const cardTemplate = document.getElementById("card-template").content;
const fragment = document.createDocumentFragment();
//carrito de compras
let carrito = {};

//espera a cargar completamente el html
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})
//listener en card-container
cardContainer.addEventListener("click", e => {
    addCarrito(e);
})

const fetchData = async () => {
    try{
        const resultado = await fetch("assets/api.json");
        const data = await resultado.json();
        pintarCards(data);
    }
    catch(error){
        console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        cardTemplate.getElementById("band").innerHTML = producto.banda;
        cardTemplate.getElementById("titulo").innerHTML = producto.disco;
        cardTemplate.getElementById("img").setAttribute("src", producto.img)
        cardTemplate.getElementById("btn").dataset.id = producto.id;
        cardTemplate.getElementById("precio").innerHTML = `$${producto.precio}`;

        const clone = cardTemplate.cloneNode(true);
        fragment.appendChild(clone);
    })
    cardContainer.appendChild(fragment);
}

const addCarrito = e => {
    if(e.target.classList.contains("btn-outline-primary")){
        setCarrito(e.target.parentElement);
    }
}

const setCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector("button").dataset.id,
        banda: objeto.querySelector("h4").textContent,
        disco: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }
    //aumentar cantidad de mismo producto
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    //sumar al carrito como copia del objeto solo se;alando el ID

    carrito[producto.id] = {...producto};

    console.log(carrito);
}

