import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-type-page',
  templateUrl: './type-page.component.html',
  styleUrls: ['./type-page.component.css']
})
export class TypePageComponent implements OnInit {

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
      .type()
      .subscribe((data) => (this.goods = data));
  }
}
