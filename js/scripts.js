import Anuncio_Mascota from "./anuncios_mascotas.js"; 

// const anuncios = JSON.parse(localStorage.getItem("lista")) || [];
// const anuncios = JSON.parse(localStorage.getItem("lista")) || [];
// let id = null;
let data =  [];

window.addEventListener("DOMContentLoaded", () => {
    
    handlerLoad();
    reduceFilter();
    // if(anuncios){
    // }
    
    let botonCancelar = document.getElementById('btnCancelarCambios');
    let botonEliminar = document.getElementById('btnEliminarElemento');
    let botonGuardarCambios = document.getElementById('btnModificar');
    
    let botonAgregar = document.getElementById('btnGuardar');
    let botonLeer = document.getElementById('btnleer');
    
    // console.log("hola");
    // document.forms[0].addEventListener("load", handlerLoad);
    document.forms[0].addEventListener("submit", handlerSubmit);
    document.forms[0].addEventListener("click", handlerClick);
    botonCancelar.addEventListener("click",handlerCancelar);
    botonEliminar.addEventListener("click",handlerEliminar);
    botonGuardarCambios.addEventListener("click", handlerModificar);
    
    let sel = document.getElementById('filtro');
    sel.addEventListener("change", ()=>{
      handlerLoad();
    });

    // GET OPCIONES
    // botonLeer.addEventListener("click", getAnuncios);
    // botonLeer.addEventListener("click", getAnunciosFetch);
    // botonLeer.addEventListener("click", getAnunciosAsync);
    // botonLeer.addEventListener("click", getAnunciosAxios);
    // botonLeer.addEventListener("click", getAnunciosAxiosAsync);
    


    // POST OPCIONES
    // botonAgregar.addEventListener("click", crearAnuncioAjax);
    // botonAgregar.addEventListener("click", crearAnuncioFetch);
    // botonAgregar.addEventListener("click", crearAnuncioAsync);
    // botonAgregar.addEventListener("click", crearAnuncioAxios);
    
    
    
    
    
});


function handlerSubmit(e){
    e.preventDefault(); 
    // console.log("hola");

    const frm = e.target;


    crearAnuncioAjax();
    // crearAnuncioFetch();
    // crearAnuncioAsync();
    // crearAnuncioAxios();

    // console.log(nuevoAnuncio.precio);
    // console.log(nuevoAnuncio.id);
    
    // altaAnuncio(nuevoAnuncio);
    // console.log(anuncios);

    // anuncios.forEach(element => {
    //     console.log(element);
    // });

    limpiarForm(frm);
}   




function altaAnuncio(a){

    anuncios.push(a);
    almacenarDatos(anuncios);

    handlerLoad();

}

function almacenarDatos(data){
    localStorage.setItem("lista", JSON.stringify(data));
}



function crearTabla(items){
  const tabla = document.createElement('table');

  items = reduceFilter(items);
  // items = map(items);
  // tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTheadFilter(items[0]));
  tabla.appendChild(crearTbodyFilter(items));
  // reduce(items);
  promedio(items);



  
  return tabla;
}

function reduce(items){
  console.log(items[0][precio]);
  let suma = items.reduce((prev,actual)=>{
    console.log(prev);
    
    return parseInt(prev[precio]) + parseInt(actual.precio); 
    
  },0);
}


function promedio(items){

  let suma =0;
  items.forEach((element) => {

    suma+= parseInt(element.precio);

  });

  // console.log(suma);
  // console.log(items.lenght);
  let promedio = suma / Object.keys(items).length;

  document.getElementById("txtPromedio").value = promedio;

}

// function crearThead(item){
//     const thead = document.createElement('thead');
//     const tr = document.createElement('tr');

//     for (const key in item){
//         if(key !== "id")
//         {
//             const th = document.createElement('th');
//             const texto = document.createTextNode(key);
//             th.appendChild(texto);
//             tr.appendChild(th);
//         }
//     }

//     thead.appendChild(tr);
//     return thead;
// }


function crearTheadFilter(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item){
        if(key !== "id")
        {
            // console.log(key);
            // console.log(document.getElementById('titulo'));
            if(document.getElementById(key).checked)
            {
              const th = document.createElement('th');
              const texto = document.createTextNode(key);
              th.appendChild(texto);
              tr.appendChild(th);
            }
            
        }
    }

    thead.appendChild(tr);
    return thead;
}

// function crearTbody(items){
//     const tbody = document.createElement('tbody');

//     items.forEach((element) => {
//         const tr = document.createElement('tr');
//         for (const key in element) {
//             if(key=== "id")
//             {
//                 tr.setAttribute("data-id",element[key]);
//             }else{
//                 const td = document.createElement('td');
//                 // const texto = document.createTextNode(item[key]);
//                 // td.appendChild(texto);
//                 td.textContent = element[key];
//                 tr.appendChild(td);
//             }
//         }
//         tbody.appendChild(tr);
//     });

//     return tbody;
// }

function crearTbodyFilter(items){
    const tbody = document.createElement('tbody');

    items.forEach((element) => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key=== "id")
            {
                tr.setAttribute("data-id",element[key]);
            }else{
                if(document.getElementById(key).checked)
                {
                    const td = document.createElement('td');
                    // const texto = document.createTextNode(item[key]);
                    // td.appendChild(texto);
                    td.textContent = element[key];
                    tr.appendChild(td);
                }
            }
        }
        tbody.appendChild(tr);
    });

    return tbody;
}

// OK
// function handlerLoad(e){
//     renderizarLista(crearTabla(anuncios), document.getElementById("divTabla"));
// }

function handlerLoad(e){
    getAnuncios();
}

function reduceFilter(data){

  let filtro = document.getElementById('filtro').value;
  // console.log(filtro);

  if(filtro!='todos'){
    data = data.filter(a=> a.animal===filtro);

    console.log(data);
  }


  // .then((data)=>)
  // console.log(data);
  // {results?.map(())=>()}

  return data;

  // data.filter(a=> a.id===parseInt(id))[0];

  // });
}

// function map (data){

//   data.forEach((anuncio) =>{
    
    
//     for (const key in anuncio) {

//       // console.log(key);
//       if (key != "id" && document.getElementById(key).checked) {
//         const element = anuncio[key];
        
//       }
//     }});


  
//   });

// }

function renderizarLista(lista, contenedor){
    // borro lista actual
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    //lista no null
    if(lista){
        contenedor.appendChild(lista);
    }
}



function limpiarForm(frm)
{
    frm.reset();    
}


function handlerClick(e){
    // if(!e.target.matches('td')) return;


    if(e.target.matches('td')){
        let id = e.target.parentNode.dataset.id;
        console.log(id);
        cargarForm(id);
        document.forms[0].id.value = id;
        
        document.getElementById("divAccionesTabla").setAttribute("style","display: flex");
    }else if($(e.target).is(':checkbox')){
      handlerLoad();
    }
    // console.log($(e.target).is(':checkbox'));
    // console.log(e.target);
    // }else if(e.target.matches('#btnEliminarElemento'))
    // {
    //     eliminarElemento();
    // }

}

function handlerCancelar(e){

    limpiarForm(document.forms[0]);
    document.getElementById("divAccionesTabla").setAttribute("style","display: none");

}

// function handlerEliminar(e){

//     eliminarElemento();
//     document.getElementById("divAccionesTabla").setAttribute("style","display: none");
// }

function handlerEliminar(e){

    deleteAnuncio();
    // deleteAnuncioFetch();
    // deleteAnuncioAsync();
    // deleteAnuncioAxios();

    document.getElementById("divAccionesTabla").setAttribute("style","display: none");
}


//OKKKK
// function handlerModificar(e){

//     const frm = document.forms[0];
//     const anuncioEditado = new Anuncio_Mascota(parseInt(frm.id.value),frm.titulo.value, "venta", frm.descripcion.value, frm.precio.value, frm.raza.value, frm.fecha.value, frm.vacunas.value, frm.animal.value);


//     if(confirm("Confirma modificación?")){
//         agregarSpinner();
//         let index = anuncios.findIndex((item)=> item.id == frm.id.value);
//         console.log(index);
//         anuncios[index] = anuncioEditado;
//         setTimeout(()=>{
//             almacenarDatos(anuncios);
//             handlerLoad();
//             eliminarSpinner();
//         }, 3000);
//     }else{
//         alert("Modificación cancelada");
//     }
    
//     limpiarForm(document.forms[0]);
//     document.getElementById("divAccionesTabla").setAttribute("style","display: none");

// }

function handlerModificar(e){

    updateAnuncio();
    // updateAnuncioFetch();
    // updateAnuncioAxios();
    
    limpiarForm(document.forms[0]);
    document.getElementById("divAccionesTabla").setAttribute("style","display: none");

}


function eliminarElemento(){
    let id = parseInt(document.forms[0].id.value);

    console.log(id);

    if(confirm("Confirma eliminación?")){
        agregarSpinner();
        let index = anuncios.findIndex((item)=> item.id == id);
        anuncios.splice(index,1);
        setTimeout(()=>{
            almacenarDatos(anuncios);
            handlerLoad();
            eliminarSpinner();
        }, 3000);
    }else{
        alert("Eliminacion cancelada");
    }

    limpiarForm(document.forms[0]);
}


function cargarForm(id){
    let Anuncio_Mascota = null;

    // anuncios.forEach((anuncio) =>{
    //     if(anuncio.id === parseInt(id))
    //     {
    //         Anuncio = anuncio;
    //     }
    // });

    Anuncio_Mascota = data.filter(a=> a.id===parseInt(id))[0];

    const {titulo, descripcion, precio, raza, fecha_nacimiento,vacunado, animal} = Anuncio_Mascota;

    const frm = document.forms[0];

    frm.txttitulo.value = titulo;
    frm.txtdescripcion.value = descripcion;
    frm.txtprecio.value = precio;
    frm.txtraza.value = raza;
    frm.fecha.value = fecha_nacimiento;
    frm.vacunas.value = vacunado;
    frm.txtanimal.value = animal;

}


function agregarSpinner()
{
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "../assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");

    return spinner;
    // document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner()
{
    document.getElementById("spinner-container").innerHTML="";
}

//#region GET
const getAnuncios = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    //1- creo una instancia del objeto xmlhttprequest
    const xhr = new XMLHttpRequest();

    //2-le agrego un manejador de eventos (asignar handler) para la peticion
    //podemos hacerlo como propiedad o como metodo:
    xhr.onreadystatechange = () => {
      //esta funcion se va a ejecutar cada vez que se cambie el readystate de la peticion.
      //de todos los cambios de estado (5) nos interesa el ultimo, que es el DONE (numero 4).
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 299) {
          data = JSON.parse(xhr.responseText);
          console.log(data);

          renderizarLista(crearTabla(data), document.getElementById("divTabla"));

        } else {
          const statusText = xhr.statusText || "Ocurrio un error";

          console.error(`Error: ${xhr.status} : ${statusText}`);
        }

        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      }
    };


    //3-abrir la peticion (realizar el metodo open)
    xhr.open("GET", "http://localhost:3500/anuncios"); //el primer parametro es el metodo, el segundo la url, el tercero es si es sincrono o no (true = bloqueante, false/vacio = asincrono)

    //4-enviar la peticion
    xhr.send();
  };

const getAnunciosFetch = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    fetch("http://localhost:3500/anuncios")
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

const getAnunciosAsync = async () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    try {
      const res = await fetch("http://localhost:3500/anuncios");

      if (!res.ok) {
        throw { error: res.status, statusText: res.statusText };
      }
      data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      document
        .querySelector(".spinner")
        .removeChild(document.querySelector(".spinner").firstElementChild);
    }
  };

  const getAnunciosAxios = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    axios
      .get("http://localhost:3500/anuncios")
      .then((res) => {
        data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

  const getAnunciosAxiosAsync = async () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    try {
      //una opcion, es desestructurar lo que me devuelve y quedarme con lo que quiero (en este caso, data)
      const { data } = await axios.get("http://localhost:3500/anuncios");
      console.log(data);
    } catch (err) {
      console.error(err.response);
    } finally {
      document
        .querySelector(".spinner")
        .removeChild(document.querySelector(".spinner").firstElementChild);
    }
  };

//#endregion

//#region POST
const crearAnuncioAjax = ()=> 
{
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];

    const nuevoAnuncio = new Anuncio_Mascota(frm.txttitulo.value, "venta", frm.txtdescripcion.value, frm.txtprecio.value, frm.txtraza.value, frm.fecha.value, frm.vacunas.value, frm.txtanimal.value);


    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 299) {
          data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          const statusText = xhr.statusText || "Ocurrio un error";

          console.error(`Error: ${xhr.status} : ${statusText}`);
        }

        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      }
    };

    xhr.open("POST", "http://localhost:3500/anuncios");

    //seteamos las cabeceras
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

    xhr.send(JSON.stringify(nuevoAnuncio));
};

const crearAnuncioFetch = ()=> {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];

    const nuevoAnuncio = new Anuncio_Mascota(frm.titulo.value, "venta", frm.descripcion.value, frm.precio.value, frm.raza.value, frm.fecha.value, frm.vacunas.value, frm.animal.value);


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(nuevoAnuncio),
    };

    fetch("http://localhost:3500/anuncios", options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
};

const crearAnuncioAsync = async () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];

    const nuevoAnuncio = new Anuncio_Mascota(frm.titulo.value, "venta", frm.descripcion.value, frm.precio.value, frm.raza.value, frm.fecha.value, frm.vacunas.value, frm.animal.value);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(nuevoAnuncio),
    };

    try {
      const res = await fetch("http://localhost:3500/anuncios", options);

      if (!res.ok) {
        throw { error: res.status, statusText: res.statusText };
      }
      data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      document
        .querySelector(".spinner")
        .removeChild(document.querySelector(".spinner").firstElementChild);
    }
  };


const crearAnuncioAxios = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];

    const nuevoAnuncio = new Anuncio_Mascota(frm.txttitulo.value, "venta", frm.txtdescripcion.value, frm.txtprecio.value, frm.txtraza.value, frm.fecha.value, frm.vacunas.value, frm.txtanimal.value);

    const options = {
      method: "POST",
      data: nuevoAnuncio,
    };

    axios
      .post("http://localhost:3500/anuncios", nuevoAnuncio)
      .then((res) => {
        data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

//#endregion
  
//#region DELETE

const deleteAnuncio = () => {
    let id = parseInt(document.forms[0].id.value);

    console.log(id);

    const xhr = new XMLHttpRequest();

    document.querySelector(".spinner").appendChild(agregarSpinner());

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 299) {
          data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          const statusText = xhr.statusText || "Ocurrio un error";

          console.error(`Error: ${xhr.status} : ${statusText}`);
        }

        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      }
    };

    xhr.open("DELETE", `http://localhost:3500/anuncios/${id}`);

    xhr.send();
  };

  const deleteAnuncioFetch = () => {
    let id = parseInt(document.forms[0].id.value);

    console.log(id);
    document.querySelector(".spinner").appendChild(agregarSpinner());

    fetch("http://localhost:3500/anuncios/" + id, { method: "DELETE" })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

  const deleteAnuncioAsync = async () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    let id = parseInt(document.forms[0].id.value);

    console.log(id);
    try {
      const res = await fetch("http://localhost:3500/anuncios/" + id, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw { error: res.status, statusText: res.statusText };
      }
      data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      document
        .querySelector(".spinner")
        .removeChild(document.querySelector(".spinner").firstElementChild);
    }
  };

  const deleteAnuncioAxios = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());
    let id = parseInt(document.forms[0].id.value);

    console.log(id);

    axios
      .delete("http://localhost:3500/anuncios/" + id)
      .then((res) => {
        data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

//#endregion

//#region PUT
const updateAnuncio = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];
    const anuncioEditado = new Anuncio_Mascota(frm.txttitulo.value, "venta", frm.txtdescripcion.value, frm.txtprecio.value, frm.txtraza.value, frm.fecha.value, frm.vacunas.value, frm.txtanimal.value);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 299) {
          data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          const statusText = xhr.statusText || "Ocurrio un error";

          console.error(`Error: ${xhr.status} : ${statusText}`);
        }

        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      }
    };

    xhr.open("PUT", `http://localhost:3500/anuncios/${frm.id.value}`);

    //seteamos las cabeceras
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

    xhr.send(JSON.stringify(anuncioEditado));
  };


const updateAnuncioFetch = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());

    const frm = document.forms[0];
    const anuncioEditado = new Anuncio_Mascota(frm.titulo.value, "venta", frm.descripcion.value, frm.precio.value, frm.raza.value, frm.fecha.value, frm.vacunas.value, frm.animal.value);


    //SI TENGO EL OBJETO COMPLETO PUEDO HACER UN PUT, PERO SI SOLO QUIERO ACTUALIZAR UNA COSA DEL OBJETO (Y NO TENGO EL OBJETO COMPLETO) PUEDO HACERLO CON PATCH (SI NO ME BORRA TODO LO QUE NO LE PASE).
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(anuncioEditado),
    };

    fetch("http://localhost:3500/anuncios/" + frm.id.value, options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };

  const updateAnuncioAxios = () => {
    document.querySelector(".spinner").appendChild(agregarSpinner());


    const frm = document.forms[0];
    const anuncioEditado = new Anuncio_Mascota(frm.titulo.value, "venta", frm.descripcion.value, frm.precio.value, frm.raza.value, frm.fecha.value, frm.vacunas.value, frm.animal.value);

    axios
      .put("http://localhost:3500/anuncios/" + frm.id.value, anuncioEditado)
      .then((res) => {
        data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err.response);
      })
      .finally(() => {
        document
          .querySelector(".spinner")
          .removeChild(
            document.querySelector(".spinner").firstElementChild
          );
      });
  };
//#endregion

