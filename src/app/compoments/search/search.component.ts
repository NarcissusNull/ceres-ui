import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {}

  getRecommand(): string {
    return this.searchService.getRecommand();
  }

  onSearch(value: string) {
    this.searchService.setValue(value);
    this.router.navigateByUrl('/search/' + value)
  }
}
