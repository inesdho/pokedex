import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../service/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {forkJoin} from "rxjs";
import {PagedData} from "../../models/paged-data.model";

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent {

  @Output() pokemonSelect = new EventEmitter<number>();
  teamPokemons?:Pokemon[];
  pokemonsData?:PagedData<Pokemon>;
  listPokemonId?:number[];

  constructor(private pokemonService:PokemonService, private route:ActivatedRoute, private location: Location){
  }
  getEquipe(){
    this.pokemonService.getPokemonEquipe().subscribe(team => {this.listPokemonId = team;this.getPokemonsById()});
  }

  getPokemonsById() {
    if(this.listPokemonId) {
      const pokemonObservable = this.listPokemonId.map(id => this.pokemonService.getPokemon(id))
      forkJoin(pokemonObservable).subscribe(pokemon => this.teamPokemons = pokemon)
    }
  }
  getPokemons(){
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemonsData = pokemons);
  }
  delete(id:number){
    if(this.listPokemonId){
      for(let i=0; i<this.listPokemonId.length; i++){
        if (id == this.listPokemonId[i]){
          this.listPokemonId.splice(i,1);
          //console.log(this.listPokemonId);
          this.pokemonService.updatePokemonEquipe(this.listPokemonId).subscribe(pokemons => {this.listPokemonId = pokemons;this.getPokemonsById();this.getEquipe()});
        }
      }
    }
  }
  add(id:number) {
    if (this.listPokemonId) {
      if (this.listPokemonId.length < 6){
        //console.log(this.listPokemonId);
        this.listPokemonId.push(id);
        this.pokemonService.updatePokemonEquipe(this.listPokemonId).subscribe(pokemons => {this.listPokemonId = pokemons;this.getPokemonsById();this.getEquipe()});
      }
    }
  }

  up(id:number) {
    this.pokemonSelect.emit(id);
  }

  onScroll() {
    if (this.pokemonsData) {
      this.pokemonsData.offset += this.pokemonsData?.limit;
      this.pokemonService.getPokemonsInfini(this.pokemonsData.offset, this.pokemonsData?.limit).subscribe(myRes => {
        this.pokemonsData = {
          ...myRes,
          data: (this.pokemonsData?.data || []).concat(myRes.data),

        }});
    }
  }

  ngOnInit():void{
    this.getPokemons();
    this.getEquipe();
  }
}
