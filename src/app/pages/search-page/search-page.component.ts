import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Goods from 'src/app/domain/goods.domin';
import { HttpService } from 'src/app/service/http.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  value!: string | null;
  goods!: Goods[];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.value = this.route.snapshot.paramMap.get('value');
      }
    });
  }

  ngOnInit(): void {
    this.value = this.route.snapshot.paramMap.get('value');
    this.searchService
      .search()
      .subscribe((data) => (this.goods = data));
  }
}
