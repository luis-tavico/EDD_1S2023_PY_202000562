class HashNode{
    constructor(carnet, nombre, password){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
    }
}

class HashTable{
    constructor(){
        this.table = new Array(7);
        this.capacidad = 7;
        this.espaciosUsados = 0;
    }

    insert(carnet, nombre, password){
        let indice = this.calcularIndice(carnet);
        let nodoNuevo = new HashNode(carnet, nombre, password);
        if(indice < this.capacidad){
            if(this.table[indice] == null){
                this.table[indice] = nodoNuevo;
                this.espaciosUsados++;
            }else{
                let contador = 1;
                indice = this.recalcularIndice(carnet, contador);
                while(this.table[indice] != null){
                    contador++;
                    indice = this.recalcularIndice(carnet, contador);
                }
                this.table[indice] =  nodoNuevo;
                this.espaciosUsados++;
            }
            this.checkCapacidad();
        }

    }

    calcularIndice(carnet){
        let strCarnet = carnet.toString();
        let sum = 0;
        for(let i = 0; i< strCarnet.length; i++){
            sum += strCarnet.charCodeAt(i);
        }
        let posicion = sum % this.capacidad;
        return posicion;
    }
    
    recalcularIndice(carnet, contador){
        let indice = this.calcularIndice(carnet) + (contador*contador);
        let nuevo =  this.nuevoIndice(indice);
        return nuevo;
    }

    nuevoIndice(indice){
        let pos = 0;
        if(indice < this.capacidad){
            pos = indice;
        }else{
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    checkCapacidad(){
        const utilizacion = this.capacidad * 0.75;
        if(this.espaciosUsados > utilizacion){
            this.capacidad = this.generarNuevaCapacidad();
            this.espaciosUsados = 0;
            const temp = this.table;
            this.table = new Array(this.capacidad);
            temp.forEach(std => {
                this.insert(std.carnet, std.nombre, std.password);
            });
        }
    }


    generarNuevaCapacidad(){
        let num = this.capacidad + 1;
        while(!this.#esPrimo(num)){
            num++;
        }
        return num;
    }

    #esPrimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) {return false};
        }
        return true;
    }

    search(carnet){
        let indice = this.calcularIndice(carnet);
        if(indice < this.capacidad){
            try{
                if(this.table[indice] != null && this.table[indice].carnet === carnet){
                    return this.table[indice];
                }else{
                    let contador = 1;
                    indice = this.recalcularIndice(carent, contador);
                    while(this.table[indice] != null){
                        contador ++;
                        indice = this.recalcularIndice(carent, contador);
                        if(this.table[indice].carnet === carnet){
                            return this.table[indice].carnet;
                        }
                    }
                }
            }catch(err){
                console.log("Error ", err);
            }
        }
        return null;
    }
}
const tablaHash = new HashTable();

tablaHash.insert(8318054,"Hugo Rosal","12341");
tablaHash.insert(9616453,"Luis Pirir","12342");
tablaHash.insert(199919737,"Williams Constanza","12343");
tablaHash.insert(200715321,"Jim Melendez","12344");
tablaHash.insert(201403669,"William Ambrocio","12345");
tablaHash.insert(201403877,"Ebany Larios","12346");
tablaHash.insert(201404028,"Helber Urias","12347");
tablaHash.insert(201503933,"Manolo Ramirez","12348");
tablaHash.insert(201503933,"Jose Boguerin","12349");
tablaHash.insert(201602404,"Kevin Secaida","123410");
console.log(tablaHash.search(201602404));