import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TrendingComponent } from './trending/trending.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    NavbarComponent,
    TrendingComponent,
    FavoritosComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

