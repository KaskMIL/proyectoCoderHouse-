//toma elementos del DOM
//card section
const cardContainer = document.getElementById("card-container");
//carrito section
const carritoContainer = document.getElementById("carrito-container");
//carrito footer
const carritoFooter = document.getElementById("carrito-footer");
//card template
const cardTemplate = document.getElementById("card-template").content;
//carrito template
const carritoTemplate = document.getElementById("carritoTemplate").content;
//carrito footer template
const carritoFooterTemplate = document.getElementById("carritoFooterTemplate").content;
//document fragment
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
    try {
        const resultado = await fetch("assets/api.json");
        const data = await resultado.json();
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        cardTemplate.getElementById("band").innerHTML = producto.banda;
        cardTemplate.getElementById("titulo").innerHTML = producto.disco;
        cardTemplate.getElementById("img").setAttribute("src", producto.img);
        cardTemplate.getElementById("btn-add").dataset.id = producto.id;
        cardTemplate.querySelector("span").innerHTML = producto.precio;

        const clone = cardTemplate.cloneNode(true);
        fragment.appendChild(clone);
    })
    cardContainer.appendChild(fragment);
}

const addCarrito = e => {
    if (e.target.classList.contains("btn-add-carrito")) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector("button").dataset.id,
        banda: objeto.querySelector("h4").textContent,
        disco: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("span").textContent,
        img: objeto.querySelector("img").getAttribute("src"),
        cantidad: 1
    }
    //aumentar cantidad de mismo producto
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    //sumar al carrito como copia del objeto solo senalando el ID

    carrito[producto.id] = {
        ...producto
    };
    pintarCarrito();
    pintarFooter();

}

const pintarCarrito = () => {
    carritoContainer.innerHTML = "";
    Object.values(carrito).forEach(producto => {
        carritoTemplate.getElementById("bandaCarrito").innerHTML = producto.banda;
        carritoTemplate.getElementById("tituloCarrito").innerHTML = producto.disco;
        carritoTemplate.getElementById("precioCarrito").innerHTML = `$${parseInt(producto.precio) * parseInt(producto.cantidad)}`;
        carritoTemplate.getElementById("imgCarrito").setAttribute("src", producto.img);

        const clone = carritoTemplate.cloneNode(true);
        fragment.appendChild(clone);
    })
    carritoContainer.appendChild(fragment);
}

const pintarFooter = () => {
    carritoFooter.innerHTML = "";
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + parseInt(cantidad) * parseInt(precio), 0);

    carritoFooterTemplate.getElementById("carT").textContent = `$${nPrecio}`;

    const clone = carritoFooterTemplate.cloneNode(true);
    fragment.appendChild(clone);

    carritoFooter.appendChild(fragment);

    const vaciarCarrito = document.getElementById("vaciarCarrito");
    vaciarCarrito.addEventListener('click', () => {
        modal.style.display = "none";
        carrito = {};
        carritoFooter.innerHTML = "No hay productos que mostrar";
        pintarCarrito();
    })
}

//Modal

const modal = document.querySelector(".carro");
const modalBtn = document.getElementById("btnModal");
const closeBtn = document.getElementsByClassName("close")[0];

modalBtn.addEventListener('click', () =>{
    modal.style.display = "block";
})
closeBtn.addEventListener('click', () =>{
    modal.style.display = "none";
})
window.addEventListener('click', (e) =>{
    if(e.target == modal){
        modal.style.display = "none";
    }
})


