import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router'
import { ExempleService } from '../../services/exemple.service'

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  etudiants: any[] = []
  searchForm!: FormGroup
  api = 'http://localhost:3000/api/etudiants'
  currentPage: number = 1 
  pageSize: number = 6 
  totalEtudiants: number = 0 
  totalPages: number = 0 

  constructor(private http: HttpClient, private route: ActivatedRoute, private service: ExempleService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
    this.fetchEtudiants(this.currentPage, this.pageSize)

    this.searchForm.get('search')?.valueChanges.subscribe((value) => {
      this.filterEtudiants(value)
    })
  }

  fetchEtudiants(page: number, size: number) {
    this.http.get<{ etudiants: Array<any>, total: number }>(`${this.api}?page=${page}&size=${size}`).subscribe((data) => {
      this.etudiants = data.etudiants
      this.totalEtudiants = data.total 
      this.totalPages = Math.ceil(this.totalEtudiants / this.pageSize) 
    })
  }

  Delete(id: number) {
    let a = confirm('Vous voulez supprimer cet étudiant')
    if (a) {
      this.http.delete(`${this.api}/${id}`).subscribe((data) => {
        console.log(data)
        this.fetchEtudiants(this.currentPage, this.pageSize) 
      })
    }
  }

  filterEtudiants(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
        this.fetchEtudiants(this.currentPage, this.pageSize)
        return
    }

    this.http.get<{ etudiants: Array<any>, total: number, totalPages: number, currentPage: number }>(
        `${this.api}?page=${this.currentPage}&size=${this.pageSize}&search=${searchTerm}`
    ).subscribe((data) => {
        this.etudiants = data.etudiants
        this.totalEtudiants = data.total 
        this.totalPages = data.totalPages
        this.currentPage = data.currentPage
    })
}

// moi = {
  //   nom:'douyry',
  //   email:'ahmed.douyry@gmail.com',
  //   tel :'0655710017'
  // }
  // comments:any =[]
  // comment={id:0,message:'',date:String}
  // newcomment = false
  // aa = {date:String,message:''}

  // addcomment(){
  //   if(this.comment.message!=''){
  //     this.comment.id = this.comments.length+1
  //     console.log(this.comment.message)
  //       this.comments.push({id:this.comment.id,message :this.comment.message,date:new Date().toLocaleDateString()})
  //       console.log(this.comments)
  //       this.comment.message = ''
  //   }
  // }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return
    this.currentPage = page
    this.fetchEtudiants(this.currentPage, this.pageSize)
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.fetchEtudiants(this.currentPage, this.pageSize)
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.fetchEtudiants(this.currentPage, this.pageSize)
    }
  }
}
