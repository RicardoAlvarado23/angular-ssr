import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, pipe, tap } from 'rxjs';
import { Pokemon, PokemonAPIResponse, SimplePokemon } from '../interfaces';
import {  Result } from '../interfaces/pokemon-api.response';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

    constructor(private http: HttpClient) { }

    public loadPage(page : number): Observable<SimplePokemon[]> {
      if (page !== 0) {
        --page;
      }

      page = Math.max(0 , page);


      return this.http.get<PokemonAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${  page * 20  }&limit=20`
      )
      .pipe(
        map ( (resp: PokemonAPIResponse) => {
          const simplePokemons : SimplePokemon[] = resp.results.map(
            (pokemon: Result) => ({
              id : pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name
            })
          );
          return simplePokemons;
        }), tap (console.log)
      )

    }

    public loadPokemonById(id: string): Observable<Pokemon> {
      return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
    }

}
