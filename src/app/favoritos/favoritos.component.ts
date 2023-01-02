import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageService } from '../gallery/image.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  public images: Image[] = [];
  public favorites: Image[] = [];
  public zoomed = false;
  public currentImageIndex = -1;

  zoomImage(event: any) {
    this.zoomed = !this.zoomed;
    event.target.classList.toggle('zoomed-image');
  }


  exitImage() {
    this.zoomed = false;
    this.currentImageIndex = -1;
    const zoomedImage = document.querySelector('.zoomed-image');
    if (zoomedImage) {
      zoomedImage.classList.remove('zoomed-image');
    }
  }

  download() {
    if (this.currentImageIndex >= 0 && this.currentImageIndex < this.images.length) {

    const image = this.images[this.currentImageIndex];
    if (image) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'image.jpg';
        a.click();
      }
      xhr.open('GET', image.urls.small);
      xhr.send();
    }
  }
  }
  


  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }


  constructor() {
    this.favorites = this.getFavorites();
  }
  

  ngOnInit() {
    this.images = this.getFavorites();
  }

  // Recupera as imagens dos favoritos do local storage
  getFavorites(): Image[] {
    const favorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          favorites.push(JSON.parse(value));
        }
      }         
    }
    return favorites;
  }
  
  // Remove a imagem dos favoritos
  // removeFavorite() {
  //   localStorage.removeItem(image.id);
  //   this.images = this.getFavorites();
  // }
  favorite() {
    const image = this.images[this.currentImageIndex];
    if (image) {
      // Check if the image is in the favorites list
      if (localStorage.getItem(image.id)) {
        // Remove the image from the favorites list
        localStorage.removeItem(image.id);
        // Update the images array
        this.images = this.getFavorites();
        // ATUALIZAR A PAGINA
        location.reload();
      } 
    }
  }
  
  
}

export interface Image {
  id: string;
  urls: {
    small: string;
    raw: string;
  };
  alt_description: string;
  links: {
    download_location: string;
  }
}
