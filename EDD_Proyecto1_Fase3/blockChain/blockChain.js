class Block{
    constructor(index, transmitter, receiver, message, previusHash, hash){
        this.index = index;
        this.timestamp = new Date();
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.previusHash = previusHash;
        this.hash = hash;
        this.next = null;
        this.prev = null;
    }

    getFormatDate(){
        let day = this.timestamp.getDate();
        let month = this.timestamp.getMonth();
        let year = this.timestamp.getFullYear();
        let hours = this.timestamp.getHours();
        let min = this.timestamp.getMinutes();
        let sec = this.timestamp.getSeconds();
        return `${day}-${month}-${year} :: ${hours}:${min}:${sec}`;
    }

    getHour(){
        return this.timestamp.toLocaleTimeString('en-US');
    }
}

class BlockChain{
    constructor(){
        this.head = null;
        this.end = null;
        this.size = 0;
    }

    async insert(transmitter, receiver, message){
        let newNode = new Block(this.size, transmitter, receiver, message, "","");
        if(this.head == null){
            newNode.previusHash = "00000";
            newNode.hash = await this.getSha256(newNode);
            this.head = newNode;
            this.end = newNode;
            this.size++;
        }else{
            newNode.previusHash = this.end.hash;
            newNode.hash = await this.getSha256(newNode);
            this.end.next = newNode;
            newNode.prev = this.end;
            this.end = newNode;
            this.size++;
        }
    }

    async getSha256(block){
        let str = JSON.stringify(block).toString();
        let bytes = new TextEncoder().encode(str);
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        return hash;
    }

    print(){        
        if(this.head !== null){
            let temp = this.head;
            while(temp !== null){
                console.log(temp);
                temp = temp.next;
            }
        }
    }

    getMessages(transmitter, receiver){
        if(this.head !== null){
            let msgs = "";
            let temp = this.head;
            while(temp !== null){
                if(String(temp.receiver) === String(transmitter)){
                    if(String(temp.transmitter) === String(receiver)){
                        msgs += `
                        <div class="chatContainer ps-2 pe-4">
                            <img src="/images/avatar.png" alt="Avatar">
                            <p class="mb-2" id="conversationLeft">${temp.message}</p>
                            <span class="time-right">${temp.getHour()}</span>
                        </div>
                        `
                    }
                }else if(String(temp.transmitter) === String(transmitter)){
                    if(String(temp.receiver) === String(receiver)){
                        msgs += `
                        <div class="chatContainer darker text-white ps-4 pe-2">
                            <img src="/images/avatar.png" alt="Avatar" class="right">
                            <p class="mb-2" id="conversationRight">${temp.message}</p>
                            <span class="time-left">${temp.getHour()}</span>
                        </div>
                        `;
                    }
                }
                temp = temp.next;
            }
            if(msgs){
                return msgs;
            }
        }
        return `
        <p class="text-center pt-2">No hay mensajes</p>
        `;
    }

    blockReport(index = 0){
        if(this.head){
            let temp = this.head;
            while(temp !== null){
                if(temp.index === index){
                    return `
                        <table class="table table-bordered" id="block-table" name="${temp.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${temp.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.getFormatDate()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${temp.message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previus Hash</th>
                                    <td>${temp.previusHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td>${temp.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    temp = temp.next;
                }

            }
        }
        return "";
    }

}