import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PixabayService } from '../../services/pixabay.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-detaille',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './photo-detaille.component.html',
  styleUrl: './photo-detaille.component.css'
})
export class PhotoDetailleComponent  implements OnInit{
  image: any;
  error!:String ;
  constructor(private pixabayService:PixabayService,private router :Router,private route :ActivatedRoute){
  }
  


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    console.log('Received ID:', id); 
    if (id) {
      this.pixabayService.getImageById(+id).subscribe({
        next: (data) => {
          if (data.hits && data.hits.length > 0) {
            this.image = data.hits[0];
            console.log('Found image:', this.image); 
          } else {
            this.error = 'Image not found';
          }
        },
        error: (err) => {
          console.error('API error:', err);
          this.error = 'Failed to fetch image details';
        },
      });
    } else {
      this.error = 'Invalid image ID';
    }
  }

  goBack(): void {
    this.router.navigate(['/pictures']); 
  }
}

    

