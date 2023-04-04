class Tnode {
    constructor(folderName) {
        this.folderName = folderName;
        this.files = [];
        this.children = [];
        this.id = null;
    }
}

class Tree {
    constructor() {
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1;
    }

    insert(folderName, fatherPath) {
        let newNode = new Tnode(folderName);
        let fatherNode = this.getFolder(fatherPath);
        if (fatherNode) {
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            console.log("Ruta no existe");
        }
    }

    getFolder(path) {
        if (path == this.root.folderName) {
            return this.root;
        } else {
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter(str => str !== '');
            let folder = null;
            while (folders.length > 0) {
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    graph() {
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach(item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes + '\n' + connections;
    }

    getHTML(path) {
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += `<div class="col-md-3 p-2 text-center folder" ondblclick="entrarCarpeta('${child.folderName}')">
            <div class="row">
                <div class="col-md-12">
                    <img src="images/folder.png" class="" style="width:30%" alt="img_carpeta">
                </div>
                <div class="col-md-12">
                    <label for="" class="text-center">${child.folderName}</label>
                </div>
            </div>
        </div>`

        })
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], file.type);
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            } else {
                code += ` <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }
}