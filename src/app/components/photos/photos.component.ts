import { Component, OnInit } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-photos',
  imports: [FormsModule,CommonModule,RouterOutlet],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit{
  images: any[] = [];
  query: string = 'casablanca'; 
  page: number = 1;
  perPage: number = 10;
  totalHits: number = 0;
  searchSubject: Subject<string> = new Subject();
  Math = Math; 
  constructor(private pixabayService: PixabayService) {}

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

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadImages();
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1); 
  }
}
