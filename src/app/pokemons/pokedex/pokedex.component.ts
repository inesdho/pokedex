import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {


  pokemonDetail?:number;


  //pour recuperer par http
  /*
  constructor(private router: Router) {
  }
    public ngOnInit(){
      this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    }
  */
  selectPokemon(pokemon:number) {
    return this.pokemonDetail=pokemon;
  }
}
