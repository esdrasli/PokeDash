import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

//Observable
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()

export class PokeApiService {
  private url: string = environment.url;
  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) {
  }

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=20` : this.next;
    return this.http.get<any>(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.urlName}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.urlName}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }

  getPokemons(): Observable<any> {
    const url = `${environment.url}`;
    return this.http.get<any>(url);
  }

  getPokemonByNameOrID(nameOrID: string | number): Observable<any> {
    return this.http
      .get<any>( `${environment.urlName}pokemon-species/${nameOrID}`)
      .pipe(untilDestroyed(this));
  }
}
