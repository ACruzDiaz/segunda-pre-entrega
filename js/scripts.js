var idGenerator = 0;
const itemDic = {};
const itemList = [];
const $section_botones = document.querySelector(".botones")
const $listaItems = document.querySelector(".lista_items");
const $create = document.querySelector("#create_btn");
const $delete = document.querySelector("#delete_btn");
const $update = document.querySelector("#update_btn");
const $editNombre = document.getElementById("nombre");
const $editPrecio = document.getElementById("precio");
let  $item = null;
let estado = 0;
let $beforeItem = "";


$section_botones.addEventListener('click', (e) => {
    if(e.target === $create){
        crearItem();
    }
    if(e.target === $delete){
        borrarItem();
    }
    if(e.target === $update){
        editarItem();
    }

})  

$listaItems.addEventListener('click', (e) => {

    if(e.target.className === 'item' || e.target.className === 'item_selected' ) {
        $item = e.target;
        if(estado == 0){
            $beforeItem = $item; 
        }else{
            $beforeItem.className = "item";
            $beforeItem = $item; 
            estado = 0;
        }

        for (let items in itemList) {
            if(itemList[items].item.id == $item.getAttribute("id")){
                $editNombre.value = itemList[items].item.nombre;
                $editPrecio.value = itemList[items].item.precio;
                    $item.className = "item_selected";
                    estado = 1;
            }
        }
            
    }else{
        $item = null;
    }
})
let actualItem = null;
let actualElement = null;
class Item{
    constructor(id, nombre = "none", precio = 0){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    edit(id, nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    itemHTML(){
        const $nuevoItem = document.createElement("article");
        $nuevoItem.classList.add("item");
        $nuevoItem.setAttribute("id", this.id);
        $nuevoItem.innerHTML = `
        <h2></h2>
        <p></p>`
        const $itemTitle = $nuevoItem.querySelector("h2"),
        $itemPrice = ($nuevoItem.querySelector("p"));
        $itemTitle.textContent = this.nombre;
        $itemPrice.textContent = "$" + this.precio.toString();
        return $nuevoItem;
    }
}


function crearItem(){
    idGenerator ++;
    let nombre = $editNombre.value
    let precio = parseInt($editPrecio.value);
    if(nombre == ""){
        nombre = "(VACIO)"
    }
    if(Number.isNaN(precio)){
        precio = 0;
    }
    const nuevoItem = new Item(idGenerator, nombre , precio);
    itemDic.id = nuevoItem.id;
    itemDic.item = nuevoItem;
    let temp = {...itemDic};
    itemList.push(temp);
    const $item = itemList[itemList.length - 1].item.itemHTML();
    $listaItems.insertAdjacentElement("afterbegin", $item);
}


function borrarItem(){
    if(itemList.length === 0){
        alert("Agrega articulos al carrito");
    }else if(itemList.length > 0 && $item === null){
        alert("Selecciona un articulo");
    }else{
        for (let items in itemList) {
            if(itemList[items].item.id == $item.getAttribute("id")){
                $item.remove();
                itemList.splice(items, 1);
                $item = null;
                break;
            }
        }
    }
}

function editarItem(){
    if(itemList.length === 0){
        alert("Agrega articulos al carrito");
    }else if(itemList.length > 0 && $item === null){
        alert("Selecciona un articulo");
    }else{
        for (let items in itemList) {
            if(itemList[items].item.id == $item.getAttribute("id")){
                itemList[items].item.nombre = $editNombre.value;
                itemList[items].item.precio = $editPrecio.value;
                const $h2 = $item.querySelector("h2");
                const $p = $item.querySelector("p");
                $h2.textContent = itemList[items].item.nombre;
                $p.textContent = "$" + (itemList[items].item.precio).toString();
            }
        }
    }
}


