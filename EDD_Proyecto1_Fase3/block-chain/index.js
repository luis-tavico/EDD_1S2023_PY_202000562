const users = [
    { nombre: "Hugo Rosal", carnet: 8318054, password: "Hugo30", Carpeta_Raiz: "/" },
    { nombre: "Luis Pirir", carnet: 9616453, password: "Luis32", Carpeta_Raiz: "/" },
    { nombre: "Williams Constanza", carnet: 199919737, password: "Williams42", Carpeta_Raiz: "/" },
    { nombre: "Jim Melendez", carnet: 200715321, password: "Jim67", Carpeta_Raiz: "/" },
]

$(document).ready(() => {
    let optionsForSelect1 = "";
    let optionsForSelect2 = "";
    users.forEach( (user, i) => {
        if(i > 1){
            optionsForSelect1 += `
                <option value="${user.carnet}">${user.nombre}</option>
            `;    
        }else{
            optionsForSelect2 += `
                <option value="${user.carnet}">${user.nombre}</option>
            `;
        }
    });

    $('#transmitter').append(optionsForSelect1);
    $('#receiver').append(optionsForSelect2);

});

let blockChain = new BlockChain();
 
function updateChats(){
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
    $('#receiver-chat').html(blockChain.getMessages(receiver, transmitter));
}


async function sendMessage(whoSend){
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                let msgt = $('#msg-transmitter').val();
                await blockChain.insert(transmitter, receiver, msgt);
                $('#msg-transmitter').val("");
            break;
            case 'receiver':
                let msgr = $('#msg-receiver').val();
                await blockChain.insert(receiver, transmitter, msgr);
                $('#msg-receiver').val("");
            break;
        }
        alert("Mensaje enviado");
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
}


function getBlock(index){
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
}