import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatIconModule} from "@angular/material/icon";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        RouterModule,
        FormsModule,
        MatChipsModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        InfiniteScrollModule,
        MatSidenavModule,
        MatInputModule
    ]
})
export class PokemonsModule {}
