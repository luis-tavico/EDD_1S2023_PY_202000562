class Tnode {
    constructor(folderName, weight) {
        this.folderName = folderName;
        this.files = [];
        this.children = [];
        this.id = null;
        this.weight = weight;
    }
}

class Tree {
    constructor() {
        this.root = new Tnode('/', 1);
        this.root.id = 0;
        this.size = 1;
    }

    insert(folderName, fatherPath) {
        let { node: fatherNode, weight } = this.getFolder(fatherPath);
        let newNode = new Tnode(folderName, weight);
        if (fatherNode) {
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            console.log("Ruta no existe");
        }
    }

    verifyFolder(folderName, fatherPath) {
        let { node } = this.getFolder(fatherPath);
        let childrenInFolder = node.children;
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
        let { node } = this.getFolder(fatherPath);
        let filesInFolder = node.files;
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
        let { node } = this.getFolder(fatherPath);
        let childrenInFolder = node.children;
        for (var i = 0; i < childrenInFolder.length; i++) {
            if (childrenInFolder[i].folderName == folderName) {
                childrenInFolder.splice(i, 1);
            }
        }
    }

    getFolder(path) {
        let weight = 2;
        if (path == this.root.folderName) {
            return { node: this.root, weight: weight };
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
                weight++;
            }
            return { node: temp, weight: weight };
        }
    }

    showFolders(path) {
        let { node } = this.getFolder(path);
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
        let { node } = this.getFolder(path);
        let fls = node.files;
        let code = "";
        for (let i = 0; i < fls.length; i++) {
            code += `
                <option value="${fls[i].name}">${fls[i].name}</option>
            `;
        }
        return code;
    }

    files(path) {
        let { node } = this.getFolder(path);
        return node.files.length;
    }

    getHTML(path) {
        let { node } = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += `
            <div class="col-3 pt-2 text-center folder" ondblclick="getInFolder('${child.folderName}')">
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
    </div>
    `
        })
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], { type: file.type });
                const url = URL.createObjectURL(archivo);
                code += `
                <div class="col-3 pt-2 text-center folder"')">
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
            </div>
            `
            } else if (file.type === 'application/pdf') {
                code += `
                <div class="col-3 pt-2 text-center folder"')">
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
            </div>
            `
            } else {
                code += `
                <div class="col-3 pt-2 text-center folder"')">
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
            </div>
            `
            }
        })
        return code;
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
                    connections += `S_${node.id} -> S_${item.id} [label="${node.weight}"];\n`
                    queue.push(item);
                });
            }
        }
        return '\nlayout=neato;\nedge[dir=none];\nnode[fontname="calibri"];\n' + nodes + '\n' + connections;
    }
}