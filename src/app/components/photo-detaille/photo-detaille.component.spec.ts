import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailleComponent } from './photo-detaille.component';

describe('PhotoDetailleComponent', () => {
  let component: PhotoDetailleComponent;
  let fixture: ComponentFixture<PhotoDetailleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
