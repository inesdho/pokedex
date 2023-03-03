import { Component } from '@angular/core';
import {PagedData} from "../../models/paged-data.model";
import {PokemonService} from "../service/pokemon.service";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemons?: PagedData<Pokemon>;

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
}
