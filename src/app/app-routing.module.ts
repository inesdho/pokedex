import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";
import {PokemonLoginComponent} from "./pokemons/pokemon-login/pokemon-login.component";
import {EquipeComponent} from "./pokemons/equipe/equipe.component";

const routes: Routes = [
  //{ path: '', component: PokemonListComponent },
  //{ path: 'pokemon/:id', component: PokemonDetailComponent },
  //{ path: 'pokedex', component: PokedexComponent },
  { path: '', component: PokedexComponent },
  { path: 'pokemon/login', component: PokemonLoginComponent },
  { path: 'pokemon/equipe', component: EquipeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
