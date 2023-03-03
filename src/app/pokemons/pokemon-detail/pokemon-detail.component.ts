import { Component } from '@angular/core';
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

  constructor(private pokemonService: PokemonService, private route :ActivatedRoute, private location : Location  ) {
  }
  getPokemons(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon =pokemon);
  }
  ngOnInit(): void {
    this.getPokemons();
  }

  goBack(){
    this.location.back();
  }
}
