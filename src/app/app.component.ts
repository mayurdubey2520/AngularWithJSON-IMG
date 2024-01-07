import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularDemo';

  constructor(private dialog:MatDialog, private http:HttpClient,private fb:FormBuilder ){}

  userForm = this.fb.group({
    id:null
  })

  ngOnInit(): void {
    this.getUsers()
  }
  users:any[]=[];

  openDialog(){
    this.dialog.open(RegisterComponent,{data:null,minWidth:'50vw'}).afterClosed().subscribe((res)=>{
        this.getUsers()
        this.userForm.reset()
      })
    }

    editDialog(id:any){
      this.dialog.open(RegisterComponent,{data:id,minWidth:'50vw'}).afterClosed().subscribe((res)=>{
        this.getUsers()
        this.userForm.reset()
    })
  }

  getUsers(){
    this.http.get('http://localhost:3000/profile/').subscribe({
      next:(res:any)=>{
       this.users=res
      }
    })
  }
}
