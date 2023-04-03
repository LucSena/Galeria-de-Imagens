import { Component, HostListener } from '@angular/core';
import { ImageService } from './image.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  public images: Image[] = [];
  public favoritedImages: Image[] = [];
  public zoomed = false;
  public currentImageIndex = -1;


  zoomImage(event: any) {
    if (this.currentImageIndex !== 0) {
      // Remove a classe zoomed-image de todas as imagens
      const zoomedImages = document.querySelectorAll('.gallery img');
      zoomedImages.forEach((image, index) => {
        image.classList.remove('zoomed-image');
        if (image === event.target) {
          this.currentImageIndex = index;
        }
      });
  
      if (!this.zoomed) {
        this.zoomed = true;
        event.target.classList.add('zoomed-image');
      } else {
        this.zoomed = false;
      }
    }
  }


  exitImage() {
    this.zoomed = false;
    this.currentImageIndex = -1;
    const zoomedImage = document.querySelector('.zoomed-image');
    if (zoomedImage) {
      zoomedImage.classList.remove('zoomed-image');
    }
  }

  favorite() {
    // Verifica se o índice da imagem atual é válido
    if (this.currentImageIndex >= 0 && this.currentImageIndex < this.images.length) {
      // Recupera a imagem atual
      const image = this.images[this.currentImageIndex];
      if (image) {
        // Verifica se a imagem já está nos favoritos
        if (localStorage.getItem(image.id)) {
          // Remove a imagem dos favoritos
          localStorage.removeItem(image.id);
        } else {
          // Adiciona a imagem aos favoritos
          localStorage.setItem(image.id, JSON.stringify(image));
        }
      }
    }
  }

//se a imagem estiver nos favoritos adiciona class hidden no botão de favoritar


isFavorite(): boolean {
  const image = this.images[this.currentImageIndex];
  return image && localStorage.getItem(image.id) !== null;
}



download() {
    if (this.currentImageIndex >= 0 && this.currentImageIndex < this.images.length) {

      const image = this.images[this.currentImageIndex];
      if (image) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
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
      const images = document.querySelectorAll('.gallery img');
      images.forEach(image => image.classList.remove('zoomed-image'));
      images[this.currentImageIndex].classList.add('zoomed-image');
    }
  }
  
  nextImage() {
    const images = document.querySelectorAll('.gallery img');
    if (this.currentImageIndex < images.length - 1) {
      this.currentImageIndex++;
      images.forEach(image => image.classList.remove('zoomed-image'));
      images[this.currentImageIndex].classList.add('zoomed-image');
    }
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImages(50).subscribe(images => {
      this.images = images;
    });
  }
}

export interface Image {
  id: string;
  urls: {
    small: string;
    raw: string;
  };
  alt_description: string;
  favorited: boolean;
  links: {
    download_location: string;
  }
}


