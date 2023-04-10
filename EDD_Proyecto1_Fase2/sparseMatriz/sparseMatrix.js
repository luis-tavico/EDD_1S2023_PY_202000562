class Mnode {
    constructor(x = "", y = "", value, content, type) {
        this.x = x.toString();
        this.y = y.toString();
        this.value = value;
        this.content = content;
        this.type = type;
        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;
    }
}

class SparseMatrix {
    constructor(folderName) {
        this.folderName = folderName;
        this.head = new Mnode(-1, -1, folderName);
    }

    insertHeaderOnly(y, content, type) {
        this.#yHeaders(y, content, type);
    }

    insert(x, y, value) {
        this.#xHeaders(x);
        this.#yHeaders(y);
        const node = new Mnode(x, y, value);
        this.#addX(node, x);
        this.#addY(node, y);
    }

    #xHeaders(x) {
        const curr = new Mnode(-1, -1, x);
        if (this.head.down == null) {
            this.head.down = curr;
            curr.up = this.head;
        } else {
            let temp = this.head;

            while (temp.down != null && temp.down.value.localeCompare(x) < 0) {
                temp = temp.down;
            }
            if (temp.down == null) {
                temp.down = curr;
                curr.up = temp;
            } else if (temp.down != null && temp.down.value.localeCompare(x) != 0) {
                let r = temp.down;
                temp.down = curr;
                curr.up = temp;
                curr.down = r;
                r.up = curr;
            }
        }
    }

    #yHeaders(y, content = null, type = null) {
        let curr = new Mnode(-1, y, y);
        if (content) {
            curr.content = content;
            curr.type = type;
        }
        if (this.head.right == null) {
            this.head.right = curr;
            curr.left = this.head;
        } else {
            let temp = this.head;

            while (temp.right != null && temp.right.value.localeCompare(y) < 0) {
                temp = temp.right;
            }
            if (temp.right == null) {
                temp.right = curr;
                curr.left = temp;
            } else if (temp.right != null && temp.right.value.localeCompare(y) != 0) {
                let r = temp.right;
                temp.right = curr;
                curr.left = temp;
                curr.right = r;
                r.left = curr;
            }
        }
    }


    #addX(newNode, x) {
        let temp = this.head;
        while (temp.value != x) {
            temp = temp.down;
        }
        if (temp.right == null) {
            temp.right = newNode;
            newNode.left = temp;
        } else {
            let curr = temp.right;
            if (curr.y >= newNode.y) {
                newNode.right = curr;
                newNode.right.left = newNode;
                newNode.left = temp
                temp.right = newNode
                curr = newNode;
            } else {
                while (curr.right != null && curr.right.y < newNode.y) {
                    curr = curr.right;
                }
                newNode.right = curr.right;
                if (curr.right != null) {
                    newNode.right.left = newNode;
                }
                curr.right = newNode;
                newNode.left = curr;
            }

        }

    }

    #addY(newNode, y) {
        let temp = this.head;
        while (temp.value != y) {
            temp = temp.right;
        }
        if (temp.down == null) {
            temp.down = newNode;
            newNode.up = temp;
        } else {
            let curr = temp.down;
            if (curr.x >= newNode.x) {
                newNode.down = curr;
                newNode.down.up = newNode;
                newNode.up = temp
                temp.down = newNode
                curr = newNode;
            } else {
                while (curr.down != null && curr.down.y < newNode.y) {
                    curr = curr.down;
                }
                newNode.down = curr.down;
                if (curr.down != null) {
                    newNode.down.up = newNode;
                }
                curr.down = newNode;
                newNode.up = curr;
            }

        }
    }

    printX() {
        let tx = null;
        try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while (tx != null) {
            try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
            let str = ""
            while (ty != null) {
                str += ty.value + ",";
                ty = ty.right;
            }
            console.log(tx.value, ": ", str)
            tx = tx.down;
        }
    }

    printY() {
        let ty = null;
        try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
        let tx = null;
        while (ty != null) {
            // console.log(ty.value)
            try { tx = ty.down } catch (error) { tx = null; console.log("errorY2"); }
            let str = ""
            while (tx != null) {
                str += tx.value + ",";
                tx = tx.down;
            }
            console.log(ty.value, ": ", str)
            ty = ty.right;
        }
    }

    graph() {
        let code = "\nsplines=ortho;\nnode[shape=box fontname=\"calibri\"];\nedge[arrowsize=0.7];\nnodesep=0.6;\nranksep=0.6;\n"
        code += "M0[ label = \"" + this.folderName + "\" group=\"0\"];\n";
        code += this.#headersGraph()
        code += this.#nodesGraph()
        return (code)
    }
    #headersGraph() {
        let conn = "";
        let nodes = "";
        let rank = "";
        let temp = null;
        try { temp = this.head.right } catch (error) { temp = null; console.log("GRAPH"); }
        if (temp != null) {
            conn += "M0 ->";
            nodes += "";
            rank += "{rank = same; M0; "
            while (temp != null) {
                nodes += "Y" + temp.value + `[label="${temp.value}" group = ${temp.value}];\n`
                rank += "Y" + temp.value + ";";
                if (temp.right != null) {
                    conn += "Y" + temp.value + "->";
                } else {
                    conn += "Y" + temp.value + `[dir="both"];\n`;
                }
                temp = temp.right;
            }
        }

        try { temp = this.head.down } catch (error) { temp = null; console.log("GRAPH"); }
        if (temp != null) {
            conn += 'M0 ->';
            while (temp != null) {
                let val = temp.value.replace(".", "");
                val = val.replace(" ", "");
                nodes += "X" + val + `[label="${temp.value}" group="0"];\n`
                if (temp.down != null) {
                    conn += "X" + val + "->";
                } else {
                    conn += "X" + val + `[dir="both"];\n`;
                }
                temp = temp.down;
            }
            rank += "}";
        }
        return nodes + "\n" + conn + "\n" + rank + "\n";
    }

    #nodesGraph() {
        let conn = "";
        let nodes = "";
        let rank = ""
        let tx = null;
        try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while (tx != null) {
            try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
            let valX = ty.x.replace(".", "");
            valX = valX.replace(" ", "");
            conn += `X${valX} -> `
            while (ty != null) {
                nodes += `S${valX}_${ty.y}[label="${ty.value}" group="${ty.y}"];\n`
                rank += `{rank=same; X${valX}; S${valX}_${ty.y};}\n`;
                if (ty.right != null) {
                    conn += `S${valX}_${ty.y} ->`;
                } else {
                    conn += `S${valX}_${ty.y} [dir="both"]; \n`;
                }
                ty = ty.right;
            }
            tx = tx.down;
        }

        try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
        tx = null;
        while (ty != null) {
            try { tx = ty.down } catch (error) { tx = null; console.log("errorX2"); }
            conn += `Y${tx.y} -> `
            while (tx != null) {
                if (tx.down != null) {
                    let val_x = tx.x.replace(".", "");
                    val_x = val_x.replace(" ", "");
                    conn += `S${val_x}_${tx.y} ->`;
                } else {
                    let val_x = tx.x.replace(".", "");
                    val_x = val_x.replace(".", "");
                    conn += `S${val_x}_${tx.y} [dir="both"]; \n`;
                }
                tx = tx.down;
            }
            ty = ty.right;
        }
        return nodes + "\n" + rank + "\n" + conn;
    }
}

/*
sparseMatrix = new SparseMatrix("/");
sparseMatrix.insert("Curriculum", "201780044", "r-w");
sparseMatrix.insert("Tesis", "201700918", "w");
console.log(sparseMatrix.graph());
*/