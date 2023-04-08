# EDD GoDRIVE (Fase 2)
# MANUAL TECNICO

_El manual técnico hace referencia a la información necesaria con el fin de orientar al personal en la concepción, planteamiento análisis programación e instalación del sistema. Es de notar que la redacción propia del manual técnico está orientada a personal con conocimientos en sistemas y tecnologías de información, conocimientos de programación avanzada sobre JavaScript, responsables del mantenimiento e instalación del programa computacional en el computador._

## Introduccion 📄
El presente documento describe la seria de pasos que realizan algunos de los métodos o funciones que conforman el programa computacional (EDD GoDrive) por medio de fragmentos de código, como también se detalla los conocimientos previos que debe tener el lector de este manual para comprender de una mejor manera el funcionamiento de cada una de las partes del código que conforman el programa.

## Objetivos ✔️
* Instruir el uso adecuado del programa computacional, describiendo el diseño y la lógica del programa por medio de fragmentos de códigos.
* Describir al usuario el funcionamiento del programa para el mejor uso de él y demostrar el proceso necesario para su ejecución.
* Orientar al usuario a entender la estructura del programa, como lo son sus clases y cada uno de los métodos que componen dicha clase.

## Conocimientos Previos 💡

Los conocimientos mínimos que deben tener las personas que operarán las páginas y deberán utilizar este manual son:

* Conocimientos en lenguaje de programacion JavaScript.
* Cocimientos y entendimientos en logaritmos
* Conocimientos en Tipos de Datos Abstractos (TDA)
* Conocimiento básico de Windows 

## Requerimientos 📋

El sistema puede ser instalado en cualquier sistema operativo que cumpla con los siguientes requerimientos:

* Sistema Operativo: Windows 7 o superior
* Procesador mínimo Intel Pentium (800MHz Intel Pentium)
* Mínimo 1GB en RAM
* IDE Visual Studio Code, o compatible con Python
* Exploradores: Internet Explorer 9 y superior

## Instalación y Configuración 🔧

Para el proceso de instalación de esta aplicación únicamente es necesario tener instalado un IDE que sea compatible con el lenguaje de programacion JavaScript para ejecutar la aplicación desde la terminal de este.

No es necesario tener alguna configuración ya que la configuración que trae por determinado el IDE es la necesaria para que el funcionamiento del programa sea posible.

## Despliegue 🚀

Para ejecutar el proyecto es necesario abrir el archivo login.html ya que este es el principal.

## Estructura del Proyecto 🔩

En este apartado se muestran las carpetas implementadas para el optimo funcionamiento y ordenamiento del programa.

<div>
<p style = 'text-align:center;'>
<img src="images/img.png" alt="imagen de estructura del proyecto">
</p>
</div>

## Fragmentos de Código 💻

En este apartado se explican detalladamente los método y funciones más importantes que conforman el código del programa. Esto con el objetivo de que la persona a usar el programa necesite dar soporte a la aplicación se le realice una manera más sencilla comprender la lógica del programa.

### Codigo de la Clase **Student**

```
type Student struct {
	FullName   string        `json:"nombre"`
	License    int           `json:"carnet"`
	Password   string        `json:"password"`
	RootFolder string        `json:"Carpeta_Raiz"`
	Stack      *Stacks.Stack `json:"-"`
}
```

En este apartado se declaran todos los atributos que conforman la clase *Student* como lo son nombre (FullName), carnet (Password) entre otros.

### Codigo de la Clase **Administrator**

```
type Administrator struct {
	User  string
	Pass  string
	Stack *Stacks.Stack
}
```

En este apartado se declaran todos los atributos que conforman la clase *Administrator* como lo son usuario (User), contraseña (Pass) y una pila (Stack) que hace referencia a una pila de acciones realizadas por el administrador.

### Codigo de la Clase **DoubleList**

```
type Node struct {
	Student  *Model.Student
	Next     *Node
	Previous *Node
}

type DoubleList struct {
	Head *Node
	Tail *Node
	Size int
}

func (list *DoubleList) InsertStart(student *Model.Student) {
	newNode := &Node{Student: student, Previous: nil, Next: nil}
	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
	} else {
		list.Head.Previous = newNode
		newNode.Next = list.Head
		list.Head = newNode
	}
}
```
En la clase *DoubleList* como se puede observar primero se crea un nodo para poder enlazar los datos. En esta clase se encuentra la funcion *InsertStart*, esta funcion se encarga de agregar el dato introducido por el usuario a la lista, y su funcionamiento es el siguiente: Primero verifica si la lista esta vacia, de ser asi, el dato es introducido a la cabezera del nodo, en caso contrario la lista es recorrida hasta encontrar la cabecera del nodo vacio e insertar el dato.

### Codigo de la Clase **Queue**

```
type Node struct {
	Student *Model.Student
	Next    *Node
}

type Queue struct {
	Head *Node
	Size int
}

func (queue *Queue) Enqueue(student *Model.Student) {
	newNode := &Node{Student: student, Next: nil}
	if queue.Head == nil {
		queue.Head = newNode
	} else {
		temp := queue.Head
		for temp.Next != nil {
			temp = temp.Next
		}
		temp.Next = newNode
	}
	queue.Size += 1
}

func (queue *Queue) Dequeue() *Model.Student {
	if queue.Head == nil {
		return nil
	} else {
		temp := queue.Head
		queue.Head = queue.Head.Next
		queue.Size -= 1
		return temp.Student
	}
}
```
La clase *Queue* hace refencia a una cola. Para la creacion de esta clase fue necesario implementar un nodo ya que el nodo permite enlazar un dato con otro. Esta clase contiene la funcion *Enqueue* la cual se encarga de agregar mas datos a la cola, y la funcion *Dequeue* la cual se encarga de extraer los datos ingresados a la cola.

### Codigo de la Clase **Stack**

```
type Node struct {
	Details string
	Next    *Node
}

type Stack struct {
	Head *Node
	Size int
}

func (stack *Stack) Push(details string) {
	newNode := &Node{Details: details, Next: nil}
	if stack.Head == nil {
		stack.Head = newNode
	} else {
		temp := stack.Head
		stack.Head = newNode
		newNode.Next = temp
	}
	stack.Size += 1
}

func (stack *Stack) Pop() string {
	if stack.Head == nil {
		return ""
	} else {
		temp := stack.Head
		stack.Head = stack.Head.Next
		stack.Size -= 1
		return temp.Details
	}
}
```
Esta clase hace referencia a una pila, para la creacion de esta clase fue necesario implementar un nodo, ya que el nodo es el que permite enlazar un dato con otro. Como se puede obervar se encuentra las funciones *Push* y *Pop* en la cual la primera funcion se encarga de agregar un dato ingresado por el usuario a la cola y la segunda funcion se encarga de eliminar en dato existente en la cola.

## Construido con 🛠️

_Para la creacion del proyecto se utilizaron los siguientes lenguajes:_

* [Golang](https://go.dev/) - Usado para la creacion total del proyecto.

## Autor ✒️

* [Pedro Luis Tavico](https://github.com/luis-tavico)

---

# MANUAL DE USUARIO