import {Component, EventEmitter, Output} from '@angular/core';
import {PagedData} from "../../models/paged-data.model";
import {PokemonService} from "../service/pokemon.service";
import {Pokemon} from "../../models/pokemon.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemons?: PagedData<Pokemon> ;

  pokemonList?:Observable<Pokemon[]>;
  @Output() pokemonSelect = new EventEmitter<number>();
  private searchTerms = new Subject<string>()
  constructor( private pokemonService : PokemonService) { }

  getPokemons(){
    return this.pokemonService.getPokemons().subscribe(myRes => {this.pokemons = myRes});

  }

  ngOnInit(): void {
    this.getPokemons();
  }
  onScroll() {
    if(this.pokemons) {
      this.pokemons.offset += this.pokemons?.limit;
      this.pokemonService.getPokemonsInfini(this.pokemons.offset, this.pokemons?.limit).subscribe(myRes => {
        this.pokemons = {
          ...myRes,
          data: (this.pokemons?.data || []).concat(myRes.data),

        }});
    }
  }

  up(id:number) {
    this.pokemonSelect.emit(id);
  }

  search(term: string) {
    this.pokemonService.searchPokemon(term).subscribe(myRes => {this.pokemons = myRes});
  }
}
