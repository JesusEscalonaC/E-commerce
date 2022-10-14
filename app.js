const container = document.getElementById("container");
const seeCar = document.getElementById("seecar");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadcarrito");
let carrito = JSON.parse(localStorage.getItem("carrito"))?? [];
carritoCounter();

const shoes = [
    {id: 1, nombre: "Yeezy 700", precio: 150, img: "https://images.stockx.com/images/Adidas-Yeezy-500-Blush-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606320491", cantidad: 1},
    {id: 2, nombre: "Yeezy Combat", precio: 200, img: "https://images.stockx.com/images/Yeezy-Combat-Boot-Season-4-Sand-1.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1607668529&q=75", cantidad: 1},
    {id: 3, nombre: "Yeezy Slide", precio: 100, img: "https://images.stockx.com/images/adidas-Yeezy-Slide-Resin-2022-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1664347538&q=75", cantidad: 1},
    {id: 4, nombre: "Yeezy 350", precio: 150, img: "https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Core-Black-Red-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606319240", cantidad: 1},
    {id: 5, nombre: "Yeezy Foam", precio: 90, img: "https://images.stockx.com/images/adidas-Yeezy-Foam-RNNR-Sand-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1617991585&q=75", cantidad: 1},
    {id: 6, nombre: "Yeezy 450", precio: 100, img: "https://2app.kicksonfire.com/kofapp/upload/events_master_images/ipad_adidas-yeezy-450-resin.jpeg"}
]


shoes.forEach((shoe)=>{
    
  
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${shoe.img}">
    <h3>${shoe.nombre}</h3>
    <p>${shoe.precio}$</p>
    `;
    container.append(content);
    
    let buy = document.createElement("button");
    buy.innerText = "buy";
    buy.className = "buy"
    content.append(buy);
    
    
        buy.addEventListener("click",()=> {
        
        const repeat = carrito.some((repeatProduct)=> repeatProduct.id === shoe.id);
        if (repeat){
            carrito.map((prod)=>{
                if(prod.id === shoe.id){
                    prod.cantidad++;
                }
            })
        }else{
      carrito.push({
        id: shoe.id,
        img: shoe.img,
        nombre: shoe.nombre,
        precio: shoe.precio,
        cantidad: shoe.cantidad
      });
        }
      console.log(carrito);
      carritoCounter();
      
    });

});

 const pintarCarrito = () =>{
    modalContainer.innerHTML= "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Car</h1>`;

    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText="x";
    modalButton.className = "modal-header-button";
    
    modalButton.addEventListener("click",()=>{
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalButton);

    carrito.forEach((shoe)=>{
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${shoe.img}">
    <h3>${shoe.nombre}</h3>
    <p>${shoe.precio}$</p>
    <p>Cantidad: ${shoe.cantidad}</p>
    `;
    modalContainer.append(carritoContent);

    console.log(carrito.length);

    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
    });



    const total = carrito.reduce((acc,el)=> acc + el.precio * el.cantidad, 0);
    
    const totalPrice = document.createElement("div");
    totalPrice.className = "total-price";
    totalPrice.innerHTML = `total a pagar: ${total}$`
    modalContainer.append(totalPrice);
    localStorage.setItem("carrito", JSON.stringify(carrito));
 }

 seeCar.addEventListener("click",pintarCarrito);

 const eliminarProducto = () =>{
    const foundId = carrito.find((element)=>element.id);
    carrito = carrito.filter((carritoId) =>{
        return carritoId !==  foundId;
    });
    carritoCounter();
    pintarCarrito();
 }

 function carritoCounter(){
    cantidadCarrito.style.display = "block"
    cantidadCarrito.innerText = carrito.length;
 };

