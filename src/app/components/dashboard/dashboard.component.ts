import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Movie, Results } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  latestMovie!: Results;
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  topRatedMovies!: Movie;
  trendingMovies!: Movie;
  upComingMovies!: Movie;
  originals!: Movie;
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getLatestMovies();
    this.getTrendingMovies();
    this.getPopularMovies();
    this.getUpComingMovies();
    this.getTopRatedMovies();
    this.getNowPlayingMovies();
  }

  getLatestMovies() {
    this.movieService.getLatestMovie().subscribe((response: any) => {
      this.latestMovie= this.modifyBackdropPath(response);
      console.log(this.latestMovie.backdrop_path);
    }, (err: any) => { 
      console.log("error in try to getLatestMovie", err) ;
    })
  }  

  modifyBackdropPath(response: any): any {
    if (response.backdrop_path) {
      response.backdrop_path= 'https://image.tmdb.org/t/p/original' + response.backdrop_path + '?api_key=' + environment.api_key;
    }
    else
      response.backdrop_path= "";

    return response;
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe((response: Movie) => {
      this.popularMovies= this.modifyData(response);
      console.log(this.popularMovies);
    }, (err: any) => { 
      console.log("error in try to getPopularMovies", err) ;
    })
  }  

  getNowPlayingMovies() {
    this.movieService.getNowPlayingMovies().subscribe((response: Movie) => {
      this.nowPlayingMovies= this.modifyData(response);
    }, (err: any) => { 
      console.log("error in try to getNowPlayingMovies", err) ;
    })
  }  

  getTopRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe((response: Movie) => {
      this.topRatedMovies= this.modifyData(response);
    }, (err: any) => { 
      console.log("error in try to getTopRatedMovies", err) ;
    })
  }  
  
  getTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe((response: Movie) => {
      this.trendingMovies= this.modifyData(response);
    }, (err: any) => { 
      console.log("error in try to getTrendingMovies", err) ;
    })
  }  

  getUpComingMovies() {
    this.movieService.getUpComingMovies().subscribe((response: Movie) => {
      this.upComingMovies= this.modifyData(response);
    }, (err: any) => { 
      console.log("error in try to getUpComingMovies", err) ;
    })
  }  

  modifyData(movies: Movie) : Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path= 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;        
      });
    }
    return movies;
  }


}
