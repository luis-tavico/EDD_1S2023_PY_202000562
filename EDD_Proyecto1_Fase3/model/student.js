class Student {
    constructor(nombre, carnet, password, carpeta_raiz, carpetas, acciones) {
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
        this.carpetas = carpetas;
        this.compartidoConmigo = [];
        this.acciones = acciones;
    }

    //GETTERS
    get name() {
        return this.nombre;
    }

    get license() {
        return this.carnet;
    }

    get pass() {
        return this.password;
    }

    get rootFolder() {
        return this.carpeta_raiz;
    }

    get folders() {
        return this.carpetas;
    }

    get sharedWithMe() {
        return this.compartidoConmigo;
    }

    get actions() {
        return this.acciones;
    }

    //SETTERS
    set name(new_name) {
        this.nombre = new_name;
    }

    set license(new_license) {
        this.carnet = new_license;
    }

    set pass(new_password) {
        this.password = new_password;
    }

    set rootFolder(new_rootFolder) {
        this.carpeta_raiz = new_rootFolder;
    }

    set folders(new_folders) {
        this.carpetas = new_folders;
    }

    set sharedWithMe(new_sharedeWithMe) {
        this.compartidoConmigo = new_sharedeWithMe;
    }

    set actions(new_actions) {
        this.acciones = new_actions;
    }

    getSharedWithMe() {
        let code = "";
        this.compartidoConmigo.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], { type: file.type });
                const url = URL.createObjectURL(archivo);
                code += `<div class="col-3 pt-2 text-center folder"')">
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
                code += `<div class="col-3 pt-2 text-center folder"')">
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
                code += `<div class="col-3 pt-2 text-center folder"')">
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
}