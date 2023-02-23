package Stacks

import (
	"fmt"
	"strconv"
)

type Node struct {
	Details string
	Next    *Node
}

func (node *Node) Print() {
	//node.Student.PrintStudent()
	name := node.Details
	fmt.Println(name)
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

func (stack *Stack) PrintStack() {
	temp := stack.Head
	for temp != nil {
		name := temp.Details
		fmt.Println(name)
		temp = temp.Next
	}
}

func (stack *Stack) IsEmpty() bool {
	return stack.Head == nil
}

func (stack *Stack) GetValues() *Stack {
	return stack
}

func (stack *Stack) GetSizeStack() int {
	return stack.Size
}

func (stack *Stack) GraphStack() string {
	temp := stack.Head
	if temp != nil {
		nodes := ""
		conn := ""
		counter := 0
		for temp.Next != nil {
			nodes += "N" + strconv.Itoa(counter) + "[label=\"" + temp.Details + "\"];\n"
			conn += "N" + strconv.Itoa(counter) + "->"
			temp = temp.Next
			counter++
		}
		nodes += "N" + strconv.Itoa(counter) + "[label=\"" + temp.Details + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "\n"

		return "digraph G {\n" +
			"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
			"rankdir=LR;\n" +
			nodes +
			conn +
			"\n}"
	} else {
		return "digraph G {\nnode [shape=plaintext]\n\"Sin actividad reciente\"\n}"
	}
}
