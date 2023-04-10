class Tnode {
    constructor(folderName) {
        this.folderName = folderName;
        this.files = [];
        this.children = [];
        this.sparseMatrix = new SparseMatrix(folderName);
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

    verifyFolder(folderName, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        let childrenInFolder = fatherNode.children;
        if (childrenInFolder.find(fol => fol.folderName === folderName)) {
            let i = 1;
            while (childrenInFolder.find(fol => fol.folderName === folderName + "(" + i + ")")) {
                i += 1;
            }
            folderName += "(" + i + ")";
        }
        return folderName;
    }

    verifyFile(fileName, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        let filesInFolder = fatherNode.files;
        if (filesInFolder.find(fil => fil.name === fileName)) {
            let i = 1;
            while (filesInFolder.find(fil => fil.name === fileName.split(".")[0] + "(" + i + ")." + fileName.split(".")[1])) {
                i += 1;
            }
            fileName = fileName.split(".")[0] + "(" + i + ")." + fileName.split(".")[1]
        }
        return fileName;
    }

    delete(folderName, fatherPath) {
        //Pendiente arreglar "size"
        let fatherNode = this.getFolder(fatherPath);
        let childrenInFolder = fatherNode.children;
        for (var i = 0; i < childrenInFolder.length; i++) {
            if (childrenInFolder[i].folderName == folderName) {
                childrenInFolder.splice(i, 1);
                console.log(folderName);
            }
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
        return '\nsplines=ortho;\nnode[shape="folder" fontname=\"calibri\"];\nedge[arrowsize=0.7];\n' + nodes + connections;
    }

    getHTML(path) {
        let node = this.getFolder(path);
        //console.log(node.sparseMatrix)
        let code = "";
        node.children.map(child => {
            code += `<div class="col-3 pt-3 text-center folder" ondblclick="getInFolder('${child.folderName}')">
        <div class="row">
            <div class="col-12">
                <img src="images/folder.png" class="" style="width:30%" alt="img_carpeta">
            </div>
            <div class="col-12">
                <p class="text-center titleFile">
                ${child.folderName}
                </p>
            </div>
        </div>
    </div>`

        })
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], { type: file.type });
                const url = URL.createObjectURL(archivo);
                /*code += `
                        <div class="col-2 folder">
                        <img src="./images/file.png" width="30%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `*/
                code += `<div class="col-3 pt-3 text-center folder"')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/txt.png" class="" style="width:30%" alt="img_archivo">
                    </div>
                    <div class="col-12">
                        <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${url}" download>
                        ${file.name}
                        </a>
                        </p>
                    </div>
                </div>
            </div>`
            } else if (file.type === 'application/pdf') {
                code += `<div class="col-3 pt-3 text-center folder"')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/pdf.png" class="" style="width:30%" alt="img_archivo">
                    </div>
                    <div class="col-12">
                    <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${file.content}" download>
                    ${file.name}
                    </a>
                    </p>
                    </div>
                </div>
            </div>`
            } else {
                code += `<div class="col-3 pt-3 text-center folder"')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/image.png" class="" style="width:30%" alt="img_foto">
                    </div>
                    <div class="col-12">
                    <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${file.content}" download>
                    ${file.name}
                    </a>
                    </p>
                    </div>
                </div>
            </div>`
            }
        })
        return code;
    }

    getFilesMatrix(path) {
        let node = this.getFolder(path);
        return node.sparseMatrix;
    }

    showFolders(path) {
        let node = this.getFolder(path);
        let flds = node.children;
        let code = "";
        for (let i = 0; i < flds.length; i++) {
            code += `
                <option value="${flds[i].folderName}">${flds[i].folderName}</option>
            `;
        }
        return code;
    }

    showFiles(path) {
        let node = this.getFolder(path);
        let fls = node.files;
        let code = "";
        for (let i = 0; i < fls.length; i++) {
            code += `
                <option value="${fls[i].name}">${fls[i].name}</option>
            `;
        }
        return code;
    }
}