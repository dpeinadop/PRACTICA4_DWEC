"use strict";

/* 
 Realiza la misma implementación de la tarea de la unidad 03 pero utilizando objetos. En lugar de trabajar con 
 number como en ocasiones anteriores, deberás almacenar en la listas un objeto "Person", 
 que tendrá como propiedades "name" y "surname" con el nombre y el apellido respectivamente. 
 La relación de orden será el orden alfabético del apellido, seguido del nombre en el caso de que tengan el
 mismo apellido.
Deberás realizar una gestión de errores utilizando objetos también.
En esta ocasión implementa solamente el ejercicio utilizando las facilidades de los array.
 */


//Crea una lista con el número de elementos máximos
function Lista(tamMax){
   if (!(this instanceof Lista)) //Este condicional evita que se invoque el constructor como una función normal.
        throw new NotConstructorException("Constructor can’t be called as a function");
    if(this.tamMax < 1){
        tanMax = Lista.tamanioMaximo;
	}
	this.elementos = []; // array donde se almacenarán los diferentes objetos Person
	this.tamMax = tamMax; // Nos dará el tamaño máximo que podrá tener nuestra lista
}

// funcion static para el tamanio maximo
Lista.tamanioMaximo = function (){
    return 5;
}

// Declaramos los getter de tamMax
Lista.prototype.getTamMax = function (){
  return this.tamMax;
}  


// Devuelve true o false en función de si la lista está vacía
Lista.prototype.isEmpty = function (){
	return this.size() == 0;
}

// Devuelve true o false en función de si la lista está llena o no.
Lista.prototype.isFull = function (){
	return this.size() == this.tamMax;
}
  
// Devuelve el número de elementos de la lista. 
Lista.prototype.size = function (){
	return this.elementos.length;
}

/* Añade un nuevo elemento al final de la lista. Devuelve el tamaño de la lista una vez
añadido.*/
Lista.prototype.add = function (objetoPerson){
	if (!(objetoPerson instanceof Person)) {
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
    }
	if (!this.isFull()){
		this.elementos.push(objetoPerson);
	} else {
		//lanzar excepción lista llena
		throw  new IsFullException ("La lista está llena!");
	}
	return this.size();
}

/* Añade un nuevo elemento en la posición especificada en la lista. Devuelve el tamaño
 de la lista una vez añadido.*/
 Lista.prototype.addAt = function (posicion, objetoPerson) {
	if (!(objetoPerson instanceof Person)){
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
	} else if (this.isFull()){
		//lanzar excepción lista llena
		throw  new IsFullException ("La lista está llena!");
	} else if (posicion > this.size() || posicion < 0) {
		//lanzar excepción fuera límites
		throw new OutLimitException ("El índice está fuera de los límites de la lista!");
	}  else {
		this.elementos.splice(posicion, 0, objetoPerson);
	}
	return this.size();
}


// Devuelve el elemento de la lista de la posición indicada. 
Lista.prototype.get = function (posicion) {
	var retorno = null;
	if (posicion >= this.size() || posicion < 0) {
		//lanzar excepción fuera límites
		throw "La lista está fuera de limites";
	} else {
		retorno = this.elementos[posicion];
	}
	return retorno;
}

//Devuelve la lista en formato cadena. El delimitador de elementos será “-“.
Lista.prototype.toString = function() {
    var texto = "";
    if (!this.isEmpty()) {
        var length_1 = this.elementos.length - 1;
        for (var i = 0; i < length_1; i++) {
            texto = texto +  this.elementos[i].getName()  + " " + this.elementos[i].getSurname() + " - ";
        }
        texto = texto +  this.elementos[i].getName()  + " " + this.elementos[i].getSurname();
    }
    return texto;
}

//devuelve la posición del elemento indicado. Si el elemento no está en la lista devuelve -1.
Lista.prototype.indexOf = function (objetoPerson){
	if (!(objetoPerson instanceof Person)){
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
	}
	return this.elementos.indexOf(objetoPerson);
} 

//Devuelve la posición del elemento indicado comenzando por el final. Si el elemento no está en la lista devuelve -1.
Lista.prototype.lastIndexOf = function(objetoPerson) {
    if (!(objetoPerson instanceof Person)){
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
    }
	return this.elementos.lastIndexOf(objetoPerson);

}

//devuelve el máximo número de elementos que podemos tener en la lista.
Lista.prototype.capacity = function (){
	return this.tamMax;
} 

//Vacía la lista
Lista.prototype.clear = function() {
	this.elementos.splice(0, (this.tamMax));
}

//Devuelve el primer elemento de la lista
Lista.prototype.firstElement = function() {
    if (this.isEmpty()){
		//lanzar excepción lista vacia
		throw  new IsEmptyException ("La lista está vacia!");
	}
    return this.elementos[0].getName()  + " " + this.elementos[0].getSurname();
}

//Devuelve el último elemento de la lista
Lista.prototype.lastElement = function() {
    if (this.isEmpty()){
		//lanzar excepción lista vacia
		throw  new IsEmptyException ("La lista está vacia!");
	}
    return this.elementos[this.elementos.length - 1].getName() + " " + this.elementos[this.elementos.length - 1].getSurname();
}

	
// Elimina el elemento de la posición indicada. Devuelve el elemento borrado.
Lista.prototype.remove = function (posicion) {
	var elemento;
	if (posicion >= this.size() || posicion < 0) {
		//lanzar excepción fuera límites
		throw new OutLimitException ("El índice está fuera de los límites de la lista!");
	} else {
        elemento = (this.elementos.splice(posicion, 1));
    } 
    return elemento[posicion].getName() + elemento[posicion].getSurname();
}
	
// Elimina el elemento indicado de la lista. Devuelve true si se ha podido borrar el elemento, false en caso contrario.
Lista.prototype.removeElement = function (objetoPerson) {
    var borrado = false;
	var posicion;
    if (!(objetoPerson instanceof Person)){
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
	posicion = this.elementos.indexOf(objetoPerson);
    if (posicion > -1) {
        this.elementos.splice(posicion, 1);
        borrado = true;
    }
    return borrado;
}
}

/* Reemplaza el elemento de la lista indicado por el índice. Devuelve
el elemento que estaba anteriormente en la lista*/
Lista.prototype.set= function(objetoPerson, posicion) {
   var elemento;
	if (!(objetoPerson instanceof Person)){
		//lanzar excepción no es un objet Person
		throw new NotObjectPersonException ("El elemento no es un objeto Person");
	}
	if (posicion >= this.size() || posicion < 0) {
		//lanzar excepción fuera límites
		throw new OutLimitException ("El índice está fuera de los límites de la lista!");
	} 
	
	 return  elemento = this.elementos.splice(posicion, 1, elemento);
}

function testlista() {
	//try {
        var lis1 = new Lista(5);
        var p1 = new Person("David", "Peinado");
        var p2 = new Person("Luis", "Peinado"); 
		var p3 = new Person("Angela", "Arteta");
		var p4 = new Person("Alex", "Trotramundos");
		var p5 = new Person("Felipe", "Diaz");
		
		var p6 = new Person("Gemma", "Gacía");
        console.log("lis1.add(p1): " + lis1.add(p1));
        console.log("lis1.add(p2): " + lis1.add(p2));
		console.log("lis1.addAt(2, p3): " + lis1.addAt(2,p3));
		
		console.log("lis1.toString: " + lis1.toString());
		//console.log("lis1.set(): " +lis1.set(p3,1));
		  

        console.log("lis1.capacity(): " + lis1.capacity());
        console.log("lis1.lastElement(): " + lis1.lastElement());
        console.log("lis1.firstElement(): " + lis1.firstElement());
        console.log("lis1.lastIndexOf(p1): " +lis1.lastIndexOf(p1));
        console.log("lis1.indexOf(p2): " +lis1.indexOf(p2));
        console.log("lis1.remove(0): " +lis1.remove(0));
        console.log("lis1.toString(): " +lis1.toString());
		
        console.log("lis1.clear(): " + lis1.clear());
        
        

  
  

} 
window.onload = testlista;