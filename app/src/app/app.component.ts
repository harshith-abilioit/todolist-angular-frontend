import { Component,OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
      this.getData()
  }

  responseData:any;
  todoList:any;
  taskTitle:any;
  taskDescription:any;
  editmode:boolean=false;
  currentId:any;
  @ViewChild('todos') formTodo:any;

  postOrUpdateTodo(data:any){
    if(this.editmode){
      this.updateData(this.currentId,data)
    }else{
      this.postData(data)
    }
  }

  updateData(id:string,data:any){
    return this.http.patch(`http://localhost:5000/edit/${id}`,data).subscribe(
      result=> console.log(result)
    )
  }


  postData(data:any){
    return this.http.post('http://localhost:5000/addTask',data).subscribe(
      result=> console.log(result)
    )
  }

  onEditClicked(data:any){
    this.currentId=data._id;
    let updateItem:any = this.todoList.find( (td:any)=> td._id===data._id);
    console.log(updateItem)

    this.formTodo.setValue({
      title:updateItem.title,
      description:updateItem.description,
      status:updateItem.taskstatus
    })
    
    this.editmode = true
    console.log(this.formTodo,"todo form")

  }


  deleteData(id:any){
    return this.http.delete(`http://localhost:5000/delete/${id}`).subscribe(
      result=> console.log(result)
    )
  }



  getData(){
    this.http.get('http://localhost:5000/tasks').subscribe(
      data => {
        console.log(data,"data")
        this.responseData=data;
        this.todoList = this.responseData.Tasks;
        console.log(this.todoList,"td l")
      }
    )
  }

}


  

 

