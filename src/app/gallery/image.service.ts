import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // Substitua YOUR_ACCESS_KEY pelo sua chave de acesso do Unsplash
  private apiUrl = 'https://api.unsplash.com/photos?client_id=eaVrDl_xP3mY83yxw0SaftXsO_mah5ReJj8wx0PVWNU&per_page=50';
  private apiUrlTrending = 'https://api.unsplash.com/photos?client_id=eaVrDl_xP3mY83yxw0SaftXsO_mah5ReJj8wx0PVWNU&per_page=50&order_by=popular';
  private unsplashUrl = 'https://api.unsplash.com/photos/';
  private apiKey = 'eaVrDl_xP3mY83yxw0SaftXsO_mah5ReJj8wx0PVWNU';


  constructor(private http: HttpClient) {}

  // Método que faz a requisição HTTP para a API do Unsplash e retorna uma lista de imagens
  getImages(numImages: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}&per_page=${numImages}`);
  }
  getTrendingImages(numImages: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlTrending}&per_page=${numImages}`);
  }
  search(term: string): Observable<any[]> {
    console.log('Search term: ', term);
    // Faça uma solicitação GET à API Unsplash com o termo de pesquisa
    return this.http.get<any[]>(`${this.unsplashUrl}?query=${term}&client_id=${this.apiKey}`);
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
