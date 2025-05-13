import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  public pokemon = signal<Pokemon | null>(null);

  constructor( private pokemonService: PokemonsService,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
  ) {

  }

    ngOnInit(): void { 0
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        return;
      }
      this.pokemonService.loadPokemonById(id)
      .pipe(
        tap( ({name, id}) => {
          this.title.setTitle(`#{id} - ${name}`);
          this.meta.updateTag({ name: 'description', content: `Pokemon ${name} - ${id}` });
          this.meta.updateTag({ name: 'og:title', content: `Pokemon ${name} - ${id}` });
          this.meta.updateTag({ name: 'og:description', content: `Pokemon ${name} - ${id}` });
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` });
        })
      )
      .subscribe(this.pokemon.set)
  }


}
