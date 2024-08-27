import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private apiUrl = `${environment.apiBaseUrl}/products`; 

  form: FormGroup;
  mainImageFile: File | null = null;
  galleryImagesFiles: File[] = [];

  constructor(private builder: FormBuilder, private http: HttpClient) { 
    this.form = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryQuality: ['', Validators.required],
      imageUrl: [''] 
    });
  }

  ngOnInit(): void {}

  onMainImageSelected(event: any): void {
    this.mainImageFile = event.target.files[0];
  }

  onGalleryImagesSelected(event: any): void {
    this.galleryImagesFiles = Array.from(event.target.files);
  }

  addProduct(): void {
    if (this.form.valid) {
      console.log("All fields are valid, proceeding with submission.");
      const formData = new FormData();
      formData.append('id', this.form.get('id')?.value);
      formData.append('name', this.form.get('name')?.value);
      
      formData.append('price', this.form.get('price')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('categoryQuality', this.form.get('categoryQuality')?.value);
      
      if (this.mainImageFile) {
        formData.append('mainImage', this.mainImageFile);
      }
      
      this.galleryImagesFiles.forEach((file, index) => {
        formData.append(`galleryImages[${index}]`, file);
      });

      this.http.post<any>(`${this.apiUrl}`, formData).subscribe(() => {
        console.log('Product added successfully');
      });
    } else {
      console.log("Form is invalid.");
    console.log(this.form.errors);  
    alert('Please fill in all required fields.');

      alert('Please fill in all required fields.');
    }
  }
}
