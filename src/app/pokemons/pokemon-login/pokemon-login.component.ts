import { Component } from '@angular/core';
import {PokemonService} from "../service/pokemon.service";
import {Pokemon} from "../../models/pokemon.model";
import {PagedData} from "../../models/paged-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-login',
  templateUrl: './pokemon-login.component.html',
  styleUrls: ['./pokemon-login.component.scss']
})
export class PokemonLoginComponent {

  email?: string;
  password?: string;

  constructor(private pokemonService: PokemonService, private router: Router) {
  }
  login() {
    if (this.email && this.password) {
      this.pokemonService.loginUser(this.email, this.password).subscribe(myRes => {
        if (this.pokemonService.acces_token != undefined)
          this.router.navigateByUrl("/pokemon/equipe")
      });
    }

  }
}
