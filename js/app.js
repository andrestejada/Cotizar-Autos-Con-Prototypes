// Constructores 

function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// realizar la cotizacion de los datos

Seguro.prototype.cotizarSeguro = function(){

    let cantidad;
    const base = 2000
    switch(this.marca){
        case "1":
            cantidad = base*1.15
            break
        case "2":
            cantidad = base*1.05
            break
        case "3":
            cantidad = base*1.35
            break
        default:
        break;
   
    }
         //evaluar el año
         const diferencia = new Date().getFullYear()- this.year

         //cada año infererior tendra un disminucion de 3% a la cantidad

         cantida =- ((diferencia*3)*cantidad)/100

         //si el seguro es basico tendra un incremento de 30 %
         // si el seguro es completo tendra un incremento de 50%

         if(this.tipo ==='basico'){
             cantidad *= 1.30;
         }else{
             cantidad *= 1.50;
         }
    return cantidad
}

function UI(){}

//Llenar los años

UI.prototype.llenarOpciones= ()=>{
    const max = new Date().getFullYear()
    const min = max-20 ;
    
    const select = document.querySelector('#year');

    for(let i= max;i > min;i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

//Muestra alertas en pantalla

UI.prototype.mostrarMensaje =(mensaje,tipo)=>{
    const div = document.createElement('div');
    if(tipo === "error"){
        div.classList.add('error')
    }else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje',"mt-10");
    div.innerText = mensaje

    //insertar el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'))
    
    setTimeout(()=>{
        div.remove()
    },3000)
}
//mostrar resultado de la cotizacion
UI.prototype.mostrarResultado= (total,seguro)=>{
    const {marca,year,tipo}= seguro;
    let textoMarca;
    switch(marca){
        
        case '1':
            textoMarca= 'Americano'
            break
        case '2':
            textoMarca= 'Asiatico'
             break
        case '3':
            textoMarca= 'Europeo'
              break     
        default:
            break;
    }
    //crear el resultado
    const div = document.createElement('div');
    div.innerHTML = `
    <p class='header'>Tu resumen</p>
    <p class='font-bold'>Marca: <span class='font-normal'>${textoMarca}</span><p/>
    <p class='font-bold'>Año: <span class='font-normal'>${year}</span><p/>
    <p class='font-bold'>Tipo: <span class='font-normal capitalize'>${tipo}</span><p/>
    <p class='font-bold'>Total: <span class='font-normal'>$${total}</span><p/>
    `;
    const resultadoDiv = document.querySelector('#resultado');


    //mostrar spinner

    const spinner = document.querySelector('#cargando');
    spinner.style.display='block';

    setTimeout(()=>{
        spinner.style.display='none'
        resultadoDiv.appendChild(div);
    },3000)

}
//instacion UI

const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{
 ui.llenarOpciones()//llebar las fechas cuando carga el documento
})


EventListener()

function EventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro)
}


function cotizarSeguro (e){
   e.preventDefault()
   // Leer marca seleccionada
   const marca = document.querySelector('#marca').value;
   // Leer año seleccionado

   const year = document.querySelector('#year').value;
   //Leer check seleccionado
   const tipo = document.querySelector('input[name="tipo"]:checked').value
   if(marca===""||year===""||tipo===""){
    ui.mostrarMensaje('Todo los campos son obligatorio','error')
    return
   }

   ui.mostrarMensaje('Cotizando...','exito')

   // ocultar la cotizacione sprevias

    const resultados = document.querySelector('#resultado div');
    if(resultados!=null){
        resultados.remove()
    }
   //instaciar el seguro
   const seguro = new Seguro(marca,year,tipo)
   const total = seguro.cotizarSeguro()
   //utilizar el prototipe que se va a utilizar
   ui.mostrarResultado(total,seguro)

}