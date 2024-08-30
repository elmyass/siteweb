import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  form: FormGroup;
  selectedFile: File | null = null;

  private apiUrl = `${environment.apiBaseUrl}/products/upload`;

  constructor(private builder: FormBuilder, private http: HttpClient) { 
    this.form = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryQuality: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addProduct(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('id', this.form.get('id')?.value);
      formData.append('name', this.form.get('name')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('categoryQuality', this.form.get('categoryQuality')?.value);
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>(this.apiUrl, formData).subscribe(response => {
        console.log('Product added successfully', response);
        // Handle success, maybe reset the form or show a success message
      }, error => {
        console.error('Error adding product', error);
        // Handle error, show an error message
      });
    } else {
      console.log('Form is invalid or no file selected');
      alert('Please fill in all required fields and select an image.');
    }
  }
}
