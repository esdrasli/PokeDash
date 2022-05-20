import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokeApiService } from 'src/app/pokemon.service';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private pokeApiService: PokeApiService) { }

  get pokemons(): any[] {
    return this.pokeApiService.pokemons;
  }
  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    this.loading = true;
    this.subscription = this.pokeApiService.getNext().subscribe(response => {
      this.pokeApiService.next = response.next;

      const details = response.results.map((i: any) => this.pokeApiService.get(i.name));

      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokeApiService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  getType(pokemon: any): string {
    return this.pokeApiService.getType(pokemon);
  }

}
