import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-form-file-upload',
  templateUrl: './form-file-upload.component.html',
  styleUrl: './form-file-upload.component.scss'
})
export class FormFileUploadComponent {
  @ViewChild('addImageInput') addImageInput: ElementRef<HTMLInputElement>;
  @Output() imagePreview = new Subject<string>()
  @Output() uploadFile = new Subject<File>();
  onImageAdded() {
    const fileReader = new FileReader();
    const files = this.addImageInput.nativeElement.files

    fileReader.onload = (e) => {
      this.imagePreview.next((e.target!.result as string));
    }

    if (files) {
      this.uploadFile.next(files[0])
      fileReader.readAsDataURL(files[0]);
    }
  }

  checkValue() {
    console.log(this.addImageInput.nativeElement.files)
  }
}
