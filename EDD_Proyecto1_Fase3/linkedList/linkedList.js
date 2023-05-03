class NodeLL {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    insert(value) {
        let newNode = new NodeLL(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            return;
        }
        let current = this.head;
        let prev = null;
        while (current && current.value !== value) {
            prev = current;
            current = current.next;
        }
        if (current) {
            prev.next = current.next;
            this.length--;
        }
    }

    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    values() {
        let code = "";
        let current = this.head;
        while (current) {
            if (current.value.file.type === 'text/plain') {
                let archivo = new Blob([current.value.file.content], { type: current.value.file.type });
                const url = URL.createObjectURL(archivo);
                code += `
                <tr>
                    <td class="col-2">${current.value.owner}</td>
                    <td class="col-2">${current.value.receiver}</td>
                    <td class="col-3">"${current.value.location}"</td>
                    <td class="col-3"><a class="text-dark text-decoration-none" href="${url}" download>${current.value.file.name}</a></td>
                    <td class="col-2">${current.value.type}</td>
                </tr>
                `
            } else {
                code += `
                <tr>
                    <td class="col-2">${current.value.owner}</td>
                    <td class="col-2">${current.value.receiver}</td>
                    <td class="col-3">"${current.value.location}"</td>
                    <td class="col-3"><a class="text-dark text-decoration-none" href="${current.value.file.content}" download>${current.value.file.name}</a></td>
                    <td class="col-2">${current.value.type}</td>
                </tr>
                `
            }
            current = current.next;
        }
        return code;
    }
}