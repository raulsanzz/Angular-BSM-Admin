import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/common/auth.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  url = environment.baseURL;
  base = environment.base;

  Gallery;
  constructor(private service: AuthService) {}

  ngOnInit() {
    this.galleryGet();
  }

  changeView() {
    document.getElementById('lz').classList.add('mu');
  }

  backView() {
    document.getElementById('lz').classList.remove('mu');
  }

  //repushed code

  onFileChanged(event: any) {
    const file = event.target.files[0];
    console.log(file);
    console.log('filesize', file.size / 1000000);
    const filesize = file.size / 1000000;
    const type = file.type;
    const formData = new FormData();
    formData.append('file', file, file.name);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    debugger;
    this.service
      .postCall2('/CustomFiles/uploadgallery', formData)
      .subscribe(data => {
        console.log('this is data', data);
        this.galleryGet();
      });
  }

  galleryGet() {
    this.service.getGallery().subscribe(
      data => {
        console.log('here is shery', data);
        this.Gallery = data;
      },
      error => {
        console.log('here is erroroor', error);
      },
    );
  }
}
