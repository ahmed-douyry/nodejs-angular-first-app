import { Component, OnInit } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-photos',
  imports: [FormsModule,CommonModule,RouterOutlet,RouterModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit{
  images: any[] = [];
  query: string = ''; 
  page: number = 1;
  perPage: number = 10;
  totalHits: number = 0;
  searchSubject: Subject<string> = new Subject();
  Math = Math; 
  constructor(private pixabayService: PixabayService,private router: Router) {}

  ngOnInit(): void {
    this.loadImages();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.query = query;
      this.page = 1;
      this.loadImages();
    });
  }

  loadImages(): void {
    this.pixabayService.getImages(this.query, this.page, this.perPage).subscribe((data) => {
      this.images = data.hits;
      this.totalHits = data.totalHits;
    });
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query); 
  }
  viewDetails(image: any): void {
    console.log('Navigating with ID:', image.id); // Vérifiez l'ID dans la console
    this.router.navigate(['/photo', image.id]); // Passez l'ID dans la route
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadImages();
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1); 
  }
}
