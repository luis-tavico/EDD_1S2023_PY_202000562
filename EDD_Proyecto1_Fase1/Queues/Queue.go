package Queues

import (
	"fmt"
	"module/Model"
	"strconv"
)

type Node struct {
	Student *Model.Student
	Next    *Node
}

func (node *Node) Print() {
	//node.Student.PrintStudent()
	name := node.Student.GetFullName()
	fmt.Println(name)
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

func (queue *Queue) GetFirstIn() *Model.Student {
	temp := queue.Head
	if temp == nil {
		return nil
	} else {
		return temp.Student
	}
}

func (queue *Queue) GetValues() *Queue {
	return queue
}

func (queue *Queue) GetSizeQueue() int {
	return queue.Size
}

func (queue *Queue) GraphQueue() string {
	temp := queue.Head
	if temp != nil {
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

		return "digraph G {\n" +
			"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
			"rankdir=LR;\n" +
			nodes +
			conn +
			"\n}"
	} else {
		return "digraph G {\nnode [shape=plaintext]\n\"Sin alumnos pendientes\"\n}"
	}
}
