function Catalogo (id, banda, disco, precio, img, descripcion){
    this.id = id;
    this.banda = banda;
    this.disco = disco;
    this.precio = precio;
    this.img = img;
    this.descripcion = descripcion;
}

const fragment = document.createDocumentFragment();

const disco = new Catalogo(1,"AC-DC", "Burnst or Die", 350, "images/discos/ac-dc-rock-or-burst.png","consectetur, aliquid maxime in fugit eaque earum ex natus laudantium dignissimos veniam nemo. Moddignissimostempora ducimus!" );

/*
//tomo el elemento
const card = document.getElementById("card-body");
//creo el elemento
const banda = document.createElement("h5");
//asigno valor al elemento
banda.innerHTML = disco.banda;
//incorporo al DOM
fragment.appendChild(banda);
const titulo = document.createElement("p");
titulo.innerHTML = disco.disco;
fragment.appendChild(titulo);
const precio = document.createElement("p");
precio.innerHTML += `$${disco.precio}`;     //template
fragment.appendChild(precio);

card.appendChild(fragment);
*/


const cardContainer = document.getElementById("card-container");
const cardTemplate = document.getElementById("card-template").content;

for(let i = 0; i < 5; i++){
cardTemplate.getElementById("img").innerHTML = disco.img;
cardTemplate.getElementById("band").innerHTML = disco.banda;
cardTemplate.getElementById("titulo").innerHTML = disco.disco;
cardTemplate.getElementById("desc").innerHTML = disco.descripcion;


const clone = cardTemplate.cloneNode(true);
fragment.appendChild(clone);
}


cardContainer.appendChild(fragment);






