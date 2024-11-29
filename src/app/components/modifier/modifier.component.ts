import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'], 
})
export class ModifierComponent implements OnInit {
  etudiants: any = {
    etudiant_id: null,
    nom: '',
    prenom: '',
    date_naissance: '',
    genre: '',
    adresse: '',
    email: '',
    telephone: '',
  };
  
  api = 'http://localhost:3000/api/etudiants';

  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getEtudiant(id);
      }
    });
    console.log(this.etudiants);
  }
  getEtudiant(id: any): void {
    this.http.get<{ etudiants: any[] }>(`${this.api}/${id}`).subscribe((data) => {
     
        this.etudiants = data.etudiants[0]; 
      
    });
  }
  

  updateEtudiant(): void {
    this.http
      .put(`${this.api}/${this.etudiants.etudiant_id}`, this.etudiants)
      .subscribe((response) => {
        console.log('Étudiant mis à jour avec succès:', response);
      });
      this.router.navigate(['/']);
  }
  annuler(){
    if(confirm('estes vous sur de vouloir annuler')){this.router.navigate(['/'])}
  }
}
