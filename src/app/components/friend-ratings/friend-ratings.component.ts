import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FriendService } from 'src/app/services/friend.service';


@Component({
  selector: 'app-friend-ratings',
  templateUrl: './friend-ratings.component.html',
  styleUrls: ['./friend-ratings.component.css']
})
export class FriendRatingsComponent implements OnInit {

  selected: string;
  id: number;
  user: User;
  currentUser: User;
  options = ["Artists", "Albums", "Movies/TV"];
  friendIds: number[];

  page: number = 1;
  ratings: Array<any>;  
  pages: Array<number>;
  totalItems: number;
  itemsPerPage: number;
  sortBy: string = '';
  loading = false;


  constructor(private userService: UserService, private friendService: FriendService,
    private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getUserFriendIds();
    this.currentUser = this.authenticationService.currentUserValue;
    this.userService.getuserById(this.id).subscribe(user => this.user = user);
    this.selected = this.options[0];
    this.switchSelection(this.selected);
    this.getRatings();
  }

  getSelected($event: any){
    this.page = 1;
    // this.sortBy = '';
    console.log($event.target.innerText);
    this.options.push(this.selected);
    this.selected = $event.target.innerText;
    this.switchSelection(this.selected);
  }

  switchSelection(option: string){
    this.selected = option;
    this.options = this.options.filter(obj => obj !== option);
    this.getRatings();
  }

  showArtists(){
    return (this.ratings && this.ratings[0]['artist'])
  }

  showAlbums(){
    return (this.ratings && this.ratings[0]['album'])
  }

  showMovies(){
    return (this.ratings && this.ratings[0]['movie'])
  }

  getRatings(){
    this.loading = true;
    let option = this.selected.toLocaleLowerCase();
    if (option === "movies/tv"){
      option = 'movies';
    }
    this.friendService.getFriendPaginatedRatings(option, this.page - 1).subscribe(data =>
      {
        if (data !== null){
          console.log(data);
          this.ratings = data['content'];
          this.pages = new Array(data['totalPages']);
          this.totalItems = data['totalElements'];
          this.itemsPerPage = data['size'];
          console.log(this.pages);
        } else {
          console.log('bleh');
          this.ratings = [];
          console.log(this.ratings);
        }
        this.loading = false;
        console.log(this.loading);
      },
      (error) => {
        console.log(error.error.message)
        this.ratings = [];
        this.loading = false;
      }
      );
  }

  loadPage($event: any){
    console.log($event);
    this.page = $event;
    this.getRatings();
  }

  sort($event: any){
    let choice = $event['target']['text'];
    console.log(choice);
    if (choice === 'Recent')
      this.sortBy = 'modifiedDate';
    else if (choice === 'Rating')
      this.sortBy = '';
    else if (choice === 'Name')
    this.sortBy = 'name';
    this.getRatings();
  }


  getUserFriendIds(){
    this.userService.getUserFriendIds().subscribe(ids =>{ 
      this.friendIds = ids;
      console.log(this.friendIds);
    });
  }




}
