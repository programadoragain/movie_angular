import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  latestMovies!: Movie;
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  topRatedMovies!: Movie;
  trendingMovies!: Movie;
  upComingMovies!: Movie;
  originals!: Movie;
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getLatestMovies();
  }

  getLatestMovies() {
    this.movieService.getLatestMovies().subscribe((response: Movie) => {
      this.latestMovies= response;
      console.log(this.latestMovies);
    }, (err: any) => { 
      console.log("error in try to getLatestMovies", err) ;
    })
  }  

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe((response: Movie) => {
      this.popularMovies= this.modifyData(response);
      console.log(this.latestMovies);
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
        element.backdrop_path= 'https://image.tmdb.org/t/p/original' + element.backdrop_path + 'api_key?' + environment.api_key;        
        if (!element.title) {
          element.title= element?.name;
        }
      });
    }
    return movies;
  }


}
