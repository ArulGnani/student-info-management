class Student {
    constructor( id, name, grade ){
        this.id = id
        this.name = name
        this.grade = grade
    }
}

class Student_table {
    static student_list(){
        const student_info = Store_student_info.get_student_info()
        student_info.forEach( ( student ) => Student_table.add_student_to_table( student ) )
    }
    
    static add_student_to_table( student ){
        const table_data = document.getElementById("book_list")
        const table_row_data = document.createElement("tr")
        table_row_data.innerHTML = `
                                    <td>${ student.id }</td>
                                    <td>${ student.name }</td>
                                    <td>${ student.grade }</td>
                                    <td class="btn btn-danger px-4 py-1 my-1 delete"> X </td>
                                    `
        table_data.appendChild(table_row_data)
    }

    static alert_messages( msg, msg_class ){
        document.getElementById("alert").innerHTML = `<div id="alert" class="alert ${ msg_class } p-0 mt-3" role="alert">
                                                        <h3 class="text-center"> ${ msg }</h3>
                                                      </div>`
        setTimeout(() => document.getElementById("alert").remove(), 3000);
    }

    static delete_student_from_list( target ){
        if ( target.classList.contains('delete') ){
            target.parentElement.remove() 
        }
        //console.log("element removed")
    }

    static clear_all_fields(){
        document.getElementById("student_id").value = ""
        document.getElementById("student_name").value = ""
        document.getElementById("student_grade").value = ""        
    }
}

class Store_student_info {
    static get_student_info(){
        let students
        if ( localStorage.getItem('students') === null){
            students = []
        }else {
            students = JSON.parse(localStorage.getItem('students'))
        }
        return students
    }

    static add_student_info( student ){
        const student_info = Store_student_info.get_student_info()
        student_info.push( student )
        localStorage.setItem('students', JSON.stringify( student_info ))
    }

    static delete_student( student_id ){
        const student_info = Store_student_info.get_student_info()
        student_info.forEach(( stu ) => {
            if ( stu.id == student_id ){
                let indx = student_info.indexOf(stu)
                student_info.splice( indx,1 )
            }
        })
        localStorage.setItem( 'students', JSON.stringify( student_info )) 
    }
}


document.addEventListener("DOMContentLoaded",Student_table.student_list)

// get the data from users 
document.getElementById("student_form").addEventListener("submit",( event ) => {
   event.preventDefault()
   let id = document.getElementById("student_id").value
   let name = document.getElementById("student_name").value
   let grade = document.getElementById("student_grade").value

   if ( id === "" || name === "" || grade === "" ){
        Student_table.alert_messages( "all fields are needed", "alert-danger" )  
   }else {
        const student = new Student( id, name, grade )
        //console.log(student)
        Store_student_info.add_student_info( student )
        Student_table.add_student_to_table( student )
        Student_table.clear_all_fields()
        Student_table.alert_messages("student has been added","alert-success")
   }

   
})

// delete event 
document.getElementById("book_list").addEventListener("click",( event ) => {
    //console.log( event.target )
    Student_table.delete_student_from_list( event.target )
    Student_table.alert_messages("student has been deleted","alert-primary")
    let delete_student_id = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent
    //console.log(delete_student_id)
    Store_student_info.delete_student( delete_student_id ) 
})