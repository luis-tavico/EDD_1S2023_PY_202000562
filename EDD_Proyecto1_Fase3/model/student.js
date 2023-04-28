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

}