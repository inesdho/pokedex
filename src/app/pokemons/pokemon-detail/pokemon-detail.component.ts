import {Component, Input} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../service/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
   pokemon?: Pokemon;
  @Input() pokemonId?: number;

  constructor(private pokemonService: PokemonService, private route :ActivatedRoute, private location : Location  ) {
  }
  getPokemons() {
    if (this.pokemonId) {
      const id = this.pokemonId;
      this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
    }
  }
  ngOnChanges(): void {
    this.getPokemons();
  }

  goBack(){
    this.location.back();
  }
}
