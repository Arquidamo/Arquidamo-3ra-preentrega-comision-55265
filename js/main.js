/* construyo el array de producto*/
class Whisky {
    constructor(brand, malt, price,stock) {
        this.brand = brand;
        this.malt = malt;
        this.price = price;
        this.stock=stock;
    }
}

/* los almaceno en una lista*/
let Lista =[
  new Whisky("chivas","blend",5400,8),
  new Whisky("johnny walker","blend",5400,4),
  new Whisky("macallans","single",18000,2),
  new Whisky("jameson","blend",4500,8),
  new Whisky("jack daniels","straith bourbon", 6000,10),
  new Whisky("jim bean","straith bourbon", 4900,10)
];

/*mostrarlos en una tabla*/
/* presentaba un error la tabla  utilice
 chat gtp para que me lo corrigiera 
 estaba llamando mal las variables y  no me daba 
 cuenta estaba cargando un array vacio */ 
Lista.forEach(Whisky=>{
let fila=document.createElement("tr");
let brandcell=document.createElement("td");
let maltcell=document.createElement("td");
let stockcell=document.createElement("td");
let pricecell=document.createElement("td");

brandcell.textContent=Whisky.brand;
maltcell.textContent=Whisky.malt;
stockcell.textContent=Whisky.stock;
pricecell.textContent=Whisky.price;

fila.appendChild(brandcell);
      fila.appendChild(maltcell);
      fila.appendChild(stockcell);
      fila.appendChild(pricecell);

      document.querySelector("table").appendChild(fila);


})




/*localstorage y session storage*/ 


function Loca(){
  localStorage.setItem("listaLocal",JSON.stringify(Lista));
}






function SeleccionarPecado(){
    Swal.fire({
                title:"elije tu pecado",
                input:"text",
                showCancelButton:true,
                confirmButtonText: "elije",
                showLoaderOnConfirm:true, 
              
                preConfirm:(seleccion)=>{
                    seleccion=seleccion.trim().toUpperCase()
                    let resultado=Lista.filter((Lista)=>Lista.brand.toUpperCase().includes(seleccion))
                    if (resultado.length>0){
                        console.table(resultado)
                             Swal.fire({
                                title: 'Resultados de búsqueda',
                                html: '<table><tr><th>Brand</th><th>Malt</th><th>Price</th><th>Stock</th></tr>' +
                                      resultado.map(Lista => `<tr><td>${Lista.brand}</td><td>${Lista.malt}</td><td>${Lista.price}</td><td>${Lista.stock}</td></tr>`).join('') +
                                      '</table>',
                                confirmButtonText: 'OK'
                            })
                            
                        } else {
                            Swal.fire({
                                title: 'No se encontraron coincidencias',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        }
                    }
                });
            
            }
  
  
  
  function NuevoPecado() {
   
      Swal.fire({
          title: "Una nueva Piedra para pavimentar el camino al infierno",
          html:
            `<label>Nombre:</label> <input id="brand-input" class="swal2-input" type="text" autofocus>
             <label>malt:</label><input id="malt-input" class="swal2-input" type="text" step="0.01">
             <label>price:</label><input id="price-input" class="swal2-input" type="number" step="1">
             <label>stock:</label><input id="stock-input" class="swal2-input" type="number" step="1.2">`,
          showCancelButton: true,
          confirmButtonText: "un Nuevo pecado",
          cancelButtonText: "no",
        }).then((result) => {
          if (result.isConfirmed) {
             let brand= document.getElementById("brand-input").value.trim();
             let malt=document.getElementById("malt-input").value.trim();
            let price = parseFloat(document.getElementById("price-input").value);
            let stock = parseInt(document.getElementById("stock-input").value);
        
            if ( brand === ""|| malt===""||isNaN(price) || isNaN(stock)   ) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "me decepcionan grandemente tus anacreonticas acciones."
              });
              return;
            }
        
            let producto = new Whisky(brand, malt, price, stock);
        
            if (Lista.some((licor) => licor.brand === producto.brand)) {
              Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Este producto ya esta ingresado."
              });
              return;
            }
        
            Lista.push(producto);
            Loca();
        
            Swal.fire({
              icon: "success",
              title:  "un nuevo pecado",
              text: `estas mas cerca de ir al infierno "${producto.brand}" una nueva piedra para el pavimento.`,
              timer: 3000 
                        });
        
            console.table(Lista);
            
            // modal que recorre la lista
             let Pecados = document.createElement("div");
            Pecados.setAttribute("id", "pecados-div");
            Pecados.innerHTML = `<h3>Nuestros Pecados</h3><ul>${Lista.map(producto => `<li>${producto.brand} 
            - malt: ${producto.malt}  
            - Precio: ${producto.price} 
            - Stock: ${producto.stock}</li>`).join("")}</ul>`;
            
            Swal.fire({
              title: "Pecados",
              html: Pecados,
              confirmButtonText: "Cerrar"
            });
          }
        });
  }
  
  
  
   Lista.sort((a, b) => a.price - b.price);
      console.table(Lista);
  
  
  
  
  
  
      //botonera
  
      const elegirBoton = document.getElementById("elegirPecado");
        elegirBoton.addEventListener("click", () => {
            SeleccionarPecado();
        });
        
        const nuevoBoton = document.getElementById("nuevoPecado");
        nuevoBoton.addEventListener("click", () => {
          NuevoPecado();
        });
    