import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CounrtyService } from '../counrty.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  countries :any[] = []
  currentPage = 1; 
  itemsPerPage = 5; 

  searchKeyword:string = '' ;

  sortDirection: string = '';
  sortedCountries: any[] = [];
  sortKey: string = '';

  constructor(private http:HttpClient , private countryService:CounrtyService) { }


  ngOnInit(): void {
    this.CountryData()
  }

  CountryData(){
    this.http.get<any>('assets/countries.json').subscribe(
      data=>{this.countries = data.countries}
    )
  }
  onPageChange(event: any) {
    this.currentPage = event;
  }
  onSearch() {
    // Perform search based on the entered keyword
    if (this.searchKeyword.trim() !== '') {
      const keyword = this.searchKeyword.toLowerCase();
      this.countries = this.countries.filter(country =>
        country.name.toLowerCase().includes(keyword) ||
        country.sortname.toLowerCase().includes(keyword)
      );
    } else {
      this.CountryData()
    }
  }

  Clear(){
    this.CountryData()
  }

  // sorting logic:

  sortTable(key: string) {
    
    if (key === this.sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    
    this.sortKey = key;

    this.sortedCountries = this.countries.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }


  

}
