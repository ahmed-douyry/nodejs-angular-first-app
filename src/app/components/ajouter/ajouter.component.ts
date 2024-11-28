import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  imports: [FormsModule],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.css'
})
export class AjouterComponent {
  api = 'http://localhost:3000/api/etudiants';
  constructor(private http :HttpClient,private route :ActivatedRoute,private router :Router) {

  }
  newEtudiant: any = {
    etudiant_id: null,
    nom: '',
    prenom: '',
    date_naissance: '',
    genre: '',
    adresse: '',
    email: '',
    telephone: '',
  };
  addEtudiant() {
    this.http.post(this.api, this.newEtudiant).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  anuler() {
    this.router.navigate(['/']);
  }

}
