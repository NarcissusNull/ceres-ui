import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  getRecommand(): string {
    return this.searchService.getRecommand();
  }
}