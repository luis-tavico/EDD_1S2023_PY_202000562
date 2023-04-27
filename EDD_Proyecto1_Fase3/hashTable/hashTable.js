class HashNode {
    constructor(value) {
        this.value = value;
    }
}

class HashTable {
    constructor() {
        this.table = new Array(7);
        this.capacidad = 7;
        this.espaciosUsados = 0;
    }

    insert(value) {
        let indice = this.calcularIndice(value.carnet);
        let nodoNuevo = new HashNode(value);
        if (indice < this.capacidad) {
            if (this.table[indice] == null) {
                this.table[indice] = nodoNuevo;
                this.espaciosUsados++;
            } else {
                let contador = 1;
                indice = this.recalcularIndice(value.carnet, contador);
                while (this.table[indice] != null) {
                    contador++;
                    indice = this.recalcularIndice(value.carnet, contador);
                }
                this.table[indice] = nodoNuevo;
                this.espaciosUsados++;
            }
            this.checkCapacidad();
        }
    }

    calcularIndice(carnet) {
        let strCarnet = carnet.toString();
        let sum = 0;
        for (let i = 0; i < strCarnet.length; i++) {
            sum += strCarnet.charCodeAt(i);
        }
        let posicion = sum % this.capacidad;
        return posicion;
    }

    recalcularIndice(carnet, contador) {
        let indice = this.calcularIndice(carnet) + (contador * contador);
        let nuevo = this.nuevoIndice(indice);
        return nuevo;
    }

    nuevoIndice(indice) {
        let pos = 0;
        if (indice < this.capacidad) {
            pos = indice;
        } else {
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    checkCapacidad() {
        const utilizacion = this.capacidad * 0.75;
        if (this.espaciosUsados > utilizacion) {
            this.capacidad = this.generarNuevaCapacidad();
            this.espaciosUsados = 0;
            const temp = this.table;
            this.table = new Array(this.capacidad);
            temp.forEach(std => {
                this.insert(std.value);
            });
        }
    }

    generarNuevaCapacidad() {
        let num = this.capacidad + 1;
        while (!this.#esPrimo(num)) {
            num++;
        }
        return num;
    }

    #esPrimo(num) {
        if (num <= 1) { return false }
        if (num === 2) { return true }
        if (num % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) { return false };
        }
        return true;
    }

    search(carnet) {
        let indice = this.calcularIndice(carnet);
        if (indice < this.capacidad) {
            try {
                if (this.table[indice] != null && this.table[indice].value.carnet === carnet) {
                    return this.table[indice];
                } else {
                    let contador = 1;
                    indice = this.recalcularIndice(carnet, contador);
                    while (this.table[indice] != null) {
                        contador++;
                        indice = this.recalcularIndice(carnet, contador);
                        if (this.table[indice].value.carnet === carnet) {
                            return this.table[indice].value.carnet;
                        }
                    }
                }
            } catch (err) {
                console.log("Error ", err);
            }
        }
        return null;
    }

    print() {
        let row = "";
        this.table.forEach(student =>
            row += `            
            <tr>
                <td class="col-3">${student.value.carnet}</td>
                <td class="col-5">${student.value.nombre}</td>
                <td class="col-4">${student.value.password}</td>
            </tr>
            `);
        return row;
    }

}