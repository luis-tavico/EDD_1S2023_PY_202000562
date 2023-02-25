package main

//C:/Users/Luis T/Desktop/prueba.csv

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"module/Lists"
	"module/Model"
	"module/Queues"
	"module/Stacks"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

type Json struct {
	Students []*Model.Student `json:"alumnos"`
}

func createFilejson(list *Lists.DoubleList) {
	temp := list.Head
	if temp != nil {
		students := []*Model.Student{}
		for temp != nil {
			students = append(students, temp.Student)
			temp = temp.Next
		}
		newJson := Json{students}
		file, err := json.MarshalIndent(newJson, "", "\t")
		if err != nil {
			fmt.Println("¡Error! No se pudo completar la accion")
		}
		_ = ioutil.WriteFile("alumnos.json", file, 0644)
	}
}

func readFilecsv(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err == nil {
		csvReader := csv.NewReader(f)
		records, err := csvReader.ReadAll()
		if err != nil {
			fmt.Println("¡Error! El sistema no pudo leer el archivo")
		}
		defer f.Close()
		return records
	} else {
		fmt.Println("¡Error! El sistema no pudo encontrar el archivo")
		fmt.Println(filePath)
	}
	return nil
}

func WriteDotFile(code string, fileName string, path string) {
	var _, err = os.Stat(path + "\\" + fileName)
	if os.IsNotExist(err) {
		var file, err = os.Create(fileName)
		if err != nil {
			fmt.Println("¡Errror! ", err.Error())
		}
		defer file.Close()
	} else {
		err := os.Remove(fileName)
		if err == nil {
			var file, err = os.Create(fileName)
			if err != nil {
				fmt.Println("¡Errror! ", err.Error())
			}
			defer file.Close()
		}
	}
	var file, _ = os.OpenFile(fileName, os.O_RDWR, 0644)
	_, err = file.WriteString(code)
	if err != nil {
		fmt.Println("¡Errror! ", err.Error())
	}
	err = file.Sync()
	if err != nil {
		fmt.Println("¡Errror! ", err.Error())
	}
	//fmt.Println("¡Archivo Creado Exitosamente")
}

func GenerateImage(fileName string, path string) {
	path2, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path2, "dot", "-Tpng", fileName).Output()
	/*
		if err != nil {
			fmt.Println("¡Error! ", err)
		}*/
	mode := int(0777)
	os.WriteFile(strings.Replace(fileName, ".dot", ".png", -1), cmd, os.FileMode(mode))
}

func GenerateReports(stackActionsAdmin *Stacks.Stack, queue *Queues.Queue, list *Lists.DoubleList) {
	path, err := os.Getwd()
	if err == nil {
		//Report Administrator
		WriteDotFile(stackActionsAdmin.GraphStack(), "Reports/AccionesAdministrador.dot", path)
		GenerateImage("Reports/AccionesAdministrador.dot", path)
		//Report Outstanding Students
		WriteDotFile(queue.GraphQueue(), "Reports/estudiantesPendientes.dot", path)
		GenerateImage("Reports/estudiantesPendientes.dot", path)
		//Report Accepted Students
		WriteDotFile(list.GraphList(), "Reports/estudiantesAceptados.dot", path)
		GenerateImage("Reports/estudiantesAceptados.dot", path)
	} else {
		fmt.Println("¡Error!")
	}
}

func main() {
	optionMainMenu := 1

	stack := &Stacks.Stack{}
	admin := Model.Administrator{User: "admin", Pass: "admin", Stack: stack}
	stackActionsAdmin := admin.GetActionsAdmin()
	list := &Lists.DoubleList{}
	queue := &Queues.Queue{}

	for optionMainMenu != 2 {
		fmt.Println("-----------MENU-PRINCIPAL-----------")
		fmt.Println("| 1. Iniciar Sesion                |")
		fmt.Println("| 2. Salir                         |")
		fmt.Println("------------------------------------")
		fmt.Println("Ingrese una opcion: ")
		fmt.Scanln(&optionMainMenu)

		switch optionMainMenu {
		case 1:
			var (
				user     string
				password string
			)
			fmt.Println("Ingrese su Usuario: ")
			fmt.Scanln(&user)
			fmt.Println("Ingrese su Contraseña: ")
			fmt.Scanln(&password)

			if user == admin.GetUser() && password == admin.GetPass() {

				fmt.Printf("¡Bienvenido %s!\n", user)
				GenerateReports(stackActionsAdmin, queue, list)

				optionAdministrator := 1

				for optionAdministrator != 5 {
					fmt.Println("---------MENU-ADMINISTRADOR---------")
					fmt.Println("| 1. Ver Estudiantes Pendientes    |")
					fmt.Println("| 2. Ver Estudiantes del Sistema   |")
					fmt.Println("| 3. Registrar Nuevo Estudiante    |")
					fmt.Println("| 4. Carga Masiva de Estudiantes   |")
					fmt.Println("| 5. Cerrar Sesion                 |")
					fmt.Println("------------------------------------")
					fmt.Println("Ingrese una opcion: ")
					fmt.Scanln(&optionAdministrator)

					switch optionAdministrator {
					case 1:
						sizeQueue := queue.GetSizeQueue()
						if sizeQueue > 0 {
							optionMenuOptions := 1

							for optionMenuOptions != 3 && sizeQueue > 0 {
								student := queue.GetFirstIn()
								fullname := student.GetFullName()
								fmt.Printf("*Pendiente(s): %d\n", sizeQueue)
								fmt.Println("Estudiante Actual: " + fullname)
								fmt.Println("--------------OPCIONES--------------")
								fmt.Println("| 1. Aceptar Estudiante            |")
								fmt.Println("| 2. Rechazar Estudiante           |")
								fmt.Println("| 3. Volver al Menu Principal      |")
								fmt.Println("------------------------------------")
								fmt.Println("Ingrese una opcion: ")
								fmt.Scanln(&optionMenuOptions)

								switch optionMenuOptions {
								case 1:
									studentAccepted := queue.Dequeue()
									list.InsertEnd(studentAccepted)
									sizeQueue = queue.GetSizeQueue()
									currentTime := time.Now()
									message := fmt.Sprintf("Se acepto al estudiante %s el %s a la(s) %d:%d:%d", student.GetFullName(), currentTime.Format("02-01-2006"), currentTime.Hour(), currentTime.Minute(), currentTime.Second())
									stackActionsAdmin.Push(message)
									fmt.Println("¡Estudiante Aceptado Exitosamente!")
								case 2:
									studentRefused := queue.Dequeue()
									sizeQueue = queue.GetSizeQueue()
									currentTime := time.Now()
									message := fmt.Sprintf("Se rechazo al estudiante %s el %s a la(s) %d:%d:%d", studentRefused.GetFullName(), currentTime.Format("02-01-2006"), currentTime.Hour(), currentTime.Minute(), currentTime.Second())
									stackActionsAdmin.Push(message)
									fmt.Println("¡Estudiante Rechazado Exitosamente!")
								case 3:
									GenerateReports(stackActionsAdmin, queue, list)
								default:
									fmt.Println("¡Ingrese una opcion valida!")
								}
							}
						} else {
							fmt.Println("¡Sistema Vacio!")
						}

					case 2:

						DoubleListValues := list.GetValues()
						temp := DoubleListValues.Head
						if temp != nil {
							for temp != nil {
								fmt.Printf("Nombre: %s, Carnet: %d\n", temp.Student.GetFullName(), temp.Student.GetLicense())
								temp = temp.Next
							}
						} else {
							fmt.Println("¡Sistema Vacio!")
						}

					case 3:
						var (
							name     string
							lastname string
							license  int
							password string
						)
						fmt.Println("-----Registrar Nuevo Estudiante----")
						fmt.Println("Ingresar Nombre: ")
						fmt.Scanln(&name)
						fmt.Println("Ingresar Apellido: ")
						fmt.Scanln(&lastname)
						fmt.Println("Ingresar Carnet: ")
						fmt.Scanln(&license)
						fmt.Println("Ingresar una Contraseña: ")
						fmt.Scanln(&password)

						responseList := list.SearchInList(license)
						reponseQueue := queue.SearchInQueue(license)
						if responseList == nil && reponseQueue == nil {
							stack := &Stacks.Stack{}
							newStudent := &Model.Student{FullName: name + " " + lastname, License: license, Password: password, RootFolder: "/", Stack: stack}
							queue.Enqueue(newStudent)
							GenerateReports(stackActionsAdmin, queue, list)
						} else {
							message := fmt.Sprintf("¡Estudiante %d ya ha sido registrado anteriormente!", license)
							fmt.Println(message)
						}

					case 4:
						fmt.Println("Ingrese la ruta del archivo: ")
						scanner := bufio.NewScanner(os.Stdin)
						scanner.Scan()
						path := scanner.Text()

						records := readFilecsv(path)

						for index, row := range records {
							if index != 0 {
								license, err := strconv.Atoi(row[0])
								if err == nil {
									fullName := row[1]
									password := row[2]
									//fullName := strings.Split(row[1], " ")
									//name := fullName[0]
									//lastname := fullName[1]
									responseList := list.SearchInList(license)
									reponseQueue := queue.SearchInQueue(license)
									if responseList == nil && reponseQueue == nil {
										stack := &Stacks.Stack{}
										newStudent := &Model.Student{FullName: fullName, License: license, Password: password, RootFolder: "/", Stack: stack}
										queue.Enqueue(newStudent)
									} else {
										message := fmt.Sprintf("¡Estudiante %d ya ha sido registrado anteriormente!", license)
										fmt.Println(message)
									}
								} else {
									fmt.Println("¡Error! No se pudo convertir la variable")
								}
							}
						}
						GenerateReports(stackActionsAdmin, queue, list)
						fmt.Println("¡Archivo leido exitosamente!")
					case 5:
					default:
						fmt.Println("¡Ingrese una opcion valida!")
					}
				}
			} else {
				usr, err := strconv.Atoi(user)
				if err == nil {
					std := list.SearchInList(usr)
					if std != nil {
						if std.GetLicense() == usr && std.GetPassword() == password {
							fmt.Printf("¡Bienvenido %s!\n", user)
							stackActionsStudent := std.GetActionsStudent()
							currentTime := time.Now()
							message := fmt.Sprintf("%s inicio sesion el %s a la(s) %d:%d:%d", std.GetFullName(), currentTime.Format("02-01-2006"), currentTime.Hour(), currentTime.Minute(), currentTime.Second())
							stackActionsStudent.Push(message)
							GenerateReports(stackActionsAdmin, queue, list)

							stckActions := stackActionsStudent.GetValues()
							temp := stckActions.Head
							for temp != nil {
								fmt.Println(temp.Details)
								temp = temp.Next
							}
						} else {
							fmt.Println("¡La contraseña y/o el usuario no es valido!")
						}
					} else {
						fmt.Println("¡La contraseña y/o el usuario no es valido!")
					}
				} else {
					fmt.Println("¡La contraseña y/o el usuario no es valido!")
				}
			}
		case 2:
			fmt.Println("¡Ejecucion Finalizada!")
		case 3:
			createFilejson(list)
		default:
			fmt.Println("¡Ingrese una opcion valida!")
		}
	}
}
