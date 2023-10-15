import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  url: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getLatestMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/movie/latest');
  }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/movie/popular?api_key=' + environment.api_key);  
  }

  getNowPlayingMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/movie/now_playing?api_key=' + environment.api_key);  
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/movie/top_rated?api_key=' + environment.api_key);  
  }

  getUpComingMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/movie/upcoming?api_key=' + environment.api_key);  
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/trending/all/week?api_key=' + environment.api_key);  
  }

  getOriginalMovies(): Observable<any> {
    return this.http.get<any>(this.url + '/discover/tv?api_key=' + environment.api_key);  
  }

}
