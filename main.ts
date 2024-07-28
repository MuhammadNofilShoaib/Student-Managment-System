import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 500;
    }

    //Method to enroll a student
    enrollCourse(courses: string) {
        this.courses.push(courses);
    }

    //Method to view balance
    viewBalance() {
        console.log(chalk.greenBright.bold(`Balance of ${this.name}: ${this.balance}$`));
    }

    //Method to pay tution fee
    payFees(amount: number) {
        this.balance -= amount;
        console.log(chalk.greenBright.bold(`${amount}$ Fees paid successfully for ${this.name}`))
        console.log(chalk.greenBright.bold(`Remaining balance: ${this.balance}&`))
    }

    //Method to show student status
    studentStatus() {
        console.log(chalk.magentaBright.bold(`ID: ${this.id}`));
        console.log(chalk.magentaBright.bold(`Name: ${this.name}`));
        console.log(chalk.magentaBright.bold(`Courses: ${this.courses}`));
        console.log(chalk.magentaBright.bold(`Balance: ${this.balance}$`));
    }
}

// Deifining a student manager class to manage students
class studentManager {
    students: Student[]

    constructor() {
        this.students = [];
    }

    //Methid to add a new student
    addStudent(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.greenBright.bold(`Student: ${name} added successfully!`));
        console.log(chalk.magentaBright.bold(`Student ID: ${student.id}`));
    }

    //Method to add student in a course
    enrollStudent(studentId: number, course: string) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.greenBright.bold(`${student.name} enrolled in ${course} successfully!`));
        }
    }

    //Method to view a student balance
    viewStudentBalance(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log(chalk.redBright.bold(`Student not found! Enter correct Student ID.`))
        }
    }

    //Method to pay student fee
    payStudentFee(studentId: number, amount: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        } else {
            console.log(chalk.redBright.bold(`Student not found! Enter correct Student ID.`))
        }
    }

    //Method to display student status
    showStudentStatus(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.studentStatus();
        }
    }

    //Method to find a student by student id
    findStudent(studentId: number) {
        return this.students.find(std => std.id === studentId);
    }
}

// Main function to run thr program 
async function main() {
    console.log(chalk.cyanBright.bold(`Welcome to Student Management System`))
    console.log(chalk.yellowBright.bold(`-`.repeat(50)))

    let studentManage = new studentManager();

    //While loop to keep running program
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellowBright.bold("Choose an option: "),
                choices: [`Add Student`, `Enroll Student`, `View student balance`, `Pay Fees`, `Show student status`, `Exit`]
            }   
        ]);

        //Using switch statement for user choice
        switch (choice.choice) {
            case `Add Student`:
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.yellowBright.bold("Enter Student name: ")
                    }
                ]);
                studentManage.addStudent(nameInput.name);
                break;

            case `Enroll Student`:
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.yellowBright.bold("Enter a student ID: ")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.yellowBright.bold("Enter a course: ")
                    }
                ]);
                studentManage.enrollStudent(courseInput.studentId, courseInput.course);
                break;

            case `View student balance`:
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.yellowBright.bold("Enter a student ID: ")
                    }
                ]);
                studentManage.viewStudentBalance(balanceInput.studentId);
                break;

            case `Pay Fees`:
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.yellowBright.bold("Enter a student ID: ")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright.bold("Enter amount to pay: ")
                    }
                ]);
                studentManage.payStudentFee(feesInput.studentId, feesInput.amount);
                break;

            case `Show student status`:
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.yellowBright.bold("Enter student ID: ")
                    }
                ]);
                studentManage.showStudentStatus(statusInput.studentId);
                break;

            case `Exit`:
                console.log(chalk.redBright.bold(`Exiting......`));
                process.exit();
        }
    }
}

// Calling a main function
main();