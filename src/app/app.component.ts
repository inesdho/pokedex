import { Component } from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {PokemonService} from "./pokemons/service/pokemon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pokedex';
  private searchTerms = new Subject<string>()

  search(term : string){
    this.searchTerms.next(term);
  }
}
