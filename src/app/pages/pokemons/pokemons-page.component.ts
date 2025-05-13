
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent
],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

    public isLoading = signal(true);
    public pokemons = signal<SimplePokemon[]>([]);
    public currentPage;



    constructor(private pokemonsService: PokemonsService,
                private route : ActivatedRoute,
                private router: Router,
                private title: Title
    ) {
      this.currentPage = toSignal<number>(this.route.queryParamMap.pipe(
        map(params => params.get('page') ?? '1'),
        map( page => isNaN(+page) ? 1 : +page ),
        map( page => Math.max(1,page))
      ));
    }

    ngOnInit(): void {
      console.log(this.currentPage());
      this.loadPokemons();
        /* setTimeout(() => {
          this.isLoading.set(false);
        }, 1500); */
    }

    public loadPokemons ( page = 0) {
      const pageToLoad = this.currentPage()! + page;
      this.pokemonsService.loadPage (pageToLoad )
      .pipe(
        tap(() => this.router.navigate([], {queryParams: { page: pageToLoad} }) ),
        tap(() => this.title.setTitle(`Pokemons - Page ${pageToLoad}`)),
      )
      .subscribe (pokemons => {
        this.pokemons.set(pokemons);
      })
    }
}
