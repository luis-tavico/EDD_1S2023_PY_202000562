package Lists

import (
	"module/Model"
	"strconv"
)

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

// Insert at the end and order it
func (list *DoubleList) InsertEnd(student *Model.Student) {
	newNode := &Node{Student: student, Previous: nil, Next: nil}
	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
		list.Size += 1
	} else {
		temp := list.Tail
		for temp.Previous != nil && temp.Student.GetLicense() > student.GetLicense() {
			temp = temp.Previous
		}
		if temp.Previous == nil {
			if temp.Student.GetLicense() > student.GetLicense() {
				list.Head.Previous = newNode
				newNode.Next = list.Head
				list.Head = newNode
				list.Size += 1
				//temp = temp.Previous
			} else {
				//Here I get what I had in the next node
				aux := temp.Next
				//If node is null
				if aux == nil {
					list.Tail.Next = newNode
					newNode.Previous = list.Tail
					list.Tail = newNode
				} else {
					//if node isn't null, I concatenate it
					temp.Next = newNode
					newNode.Previous = temp
					temp = newNode
					//-------------
					temp.Next = aux
					aux.Previous = temp
					temp = aux
				}
				list.Size += 1
			}
		} else {
			//Here I get what I had in the next node
			aux := temp.Next
			//If node is null
			if aux == nil {
				list.Tail.Next = newNode
				newNode.Previous = list.Tail
				list.Tail = newNode
			} else {
				//if node isn't null, I concatenate it
				temp.Next = newNode
				newNode.Previous = temp
				temp = newNode
				//-------------
				temp.Next = aux
				aux.Previous = temp
				temp = aux
			}
			list.Size += 1
		}
	}
}

// Insert at the start
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

// Print
/*
func (list *DoubleList) PrintDoubleList() {
	temp := list.Head
	if temp != nil {
		for temp != nil {
			temp.Student.PrintStudent()
			temp = temp.Next
		}
	} else {
		fmt.Println("¡Sistema Vacio!")
	}
}
*/

func (list *DoubleList) SearchInList(license int) *Model.Student {
	temp := list.Head
	if temp != nil {
		for temp != nil {
			if temp.Student.GetLicense() == license {
				return temp.Student
			} else {
				temp = temp.Next
			}
		}
	}
	return nil
}

func (list *DoubleList) GetValues() *DoubleList {
	return list
}

/*
// Print upside down
func (list *DoubleList) Print2() {
	temp := list.tail
	for temp.Previous != nil {
		fmt.Printf("Nombre: %s, \n", temp.GetName())
		temp = temp.Previous
	}
	fmt.Printf("Nombre: %s, \n", temp.GetName())
}
*/

func (list *DoubleList) GetSizeList() int {
	return list.Size
}

func (list *DoubleList) GraphList() string {
	temp := list.Head
	if temp != nil {
		content := "digraph G {\nnode[shape=rectangle, style=filled, color=lightsalmon];\nrankdir=LR;\n"
		nodes := ""
		conn := ""
		counter := 0
		for temp.Next != nil {
			nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Student.GetLicense()) + "\nNombre: " + temp.Student.GetFullName() + "\"];\n"
			conn += "N" + strconv.Itoa(counter) + "->"
			temp = temp.Next
			counter++
		}
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Student.GetLicense()) + "\nNombre: " + temp.Student.GetFullName() + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "\n"
		temp = list.Tail
		for temp.Previous != nil {
			conn += "N" + strconv.Itoa(counter) + "->"
			temp = temp.Previous
			counter--
		}
		conn += "N" + strconv.Itoa(counter)
		content += nodes + conn + "\n"
		//--------------------------------------
		temp = list.Head
		cntr := 0
		nodes = ""
		conn = ""
		//***********
		for temp.Next != nil {
			stckActions := temp.Student.GetActionsStudent()
			tmp := stckActions.Head
			counter = 0
			//**********
			if tmp != nil {
				conn += "rank=same {N" + strconv.Itoa(cntr) + "->"
				for tmp.Next != nil {
					nodes += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
					conn += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "->"
					tmp = tmp.Next
					counter++
				}
				nodes += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
				conn += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "}\n"
			}
			temp = temp.Next
			cntr++
		}
		stckActions := temp.Student.GetActionsStudent()
		tmp := stckActions.Head
		counter = 0
		//************
		if tmp != nil {
			conn += "rank=same {N" + strconv.Itoa(cntr) + "->"
			for tmp.Next != nil {
				nodes += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
				conn += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "->"
				tmp = tmp.Next
				counter++
			}
			nodes += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
			conn += "NN" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "}\n"
		}
		//******

		content += nodes + conn
		return content + "\n}"
	} else {
		return "digraph G {\nnode [shape=plaintext]\n\"Sin alumnos aceptados\"\n}"
	}
}

/*
func (list *DoubleList) GraphList() string {
	temp := list.Head
	content := "digraph G {\nnode[shape=rectangle, style=filled, color=lightsalmon];\nrankdir=LR;\n"
	nodes := ""
	conn := ""
	counter := 0
	for temp.Next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Student.GetLicense()) + "\nNombre: " + temp.Student.GetFullName() + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Student.GetLicense()) + "\nNombre: " + temp.Student.GetFullName() + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n"
	temp = list.Tail
	for temp.Previous != nil {
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Previous
		counter--
	}
	conn += "N" + strconv.Itoa(counter)
	content += nodes + conn + "\n"
	//--------------------------------------
	temp = list.Head
	cntr := 0
	nodes = ""
	conn = ""
	for temp.Next != nil {
		stckActions := temp.Student.GetActionsStudent()
		tmp := stckActions.Head
		counter = 0
		conn += "rank=same {N" + strconv.Itoa(cntr) + "->"
		for tmp.Next != nil {
			nodes += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
			conn += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "->"
			tmp = tmp.Next
			counter++
		}
		nodes += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
		conn += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "}\n"

		temp = temp.Next
		cntr++
	}
	stckActions := temp.Student.GetActionsStudent()
	tmp := stckActions.Head
	counter = 0
	conn += "rank=same {N" + strconv.Itoa(cntr) + "->"
	for tmp.Next != nil {
		nodes += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
		conn += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "->"
		tmp = tmp.Next
		counter++
	}
	nodes += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "[label=\"" + tmp.Details + "\"];\n"
	conn += "N" + strconv.Itoa(cntr) + strconv.Itoa(counter) + "}\n"

	content += nodes + conn
	return content + "\n}"
}
*/
