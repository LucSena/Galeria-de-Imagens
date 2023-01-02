import { Component } from '@angular/core';
import { ImageService } from '../gallery/image.service';
import { Image } from '../gallery/image.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchTerm: string;
  public searchResults: any[] = [];

  constructor(private imageService: ImageService) {
    this.searchTerm = '';
   }

  ngOnInit(): void {
    this.searchTerm = '';
  }


  search() {
    this.imageService.search(this.searchTerm).subscribe(images => {
      console.log('First search result: ', images[0]);
      this.searchResults = images;
    });
  }
  
  
}


