import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Pokemon} from "../../models/pokemon.model";
import {PagedData} from "../../models/paged-data.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  acces_token?:string;

  private pokemonsUrl= "http://pokedex-api.cleverapps.io/pokemons";
  constructor( private messageService: MessageService,private http: HttpClient ) { }
  getPokemons(): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl).pipe(
      tap(() => this.log(`HeroService: fetched hero`)),
      catchError(this.handleError<PagedData<Pokemon>>('getHeroes', )));

  }

  getPokemonsInfini(offset: number, limit: number): Observable<PagedData<Pokemon>>{
    const url=this.pokemonsUrl+"?offset="+offset+"&limit="+ limit;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log(`HeroService: fetched hero`)),
      catchError(this.handleError<PagedData<Pokemon>>('getHeroes', )));

  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string): void {
    this.messageService.addMessage(`HeroService: ${message}`);
  }
  getPokemon(id: number): Observable<Pokemon>{
    const url=this.pokemonsUrl+"/"+id;
    // TODO: send the message _after_ fetching the hero
    return this.http.get<Pokemon>(url).pipe(
      tap(() => this.log(`HeroService: fetched hero id=${id}`)),
      catchError(this.handleError<Pokemon>('getHeroes')));
  }


  searchPokemon(search: string): Observable<PagedData<Pokemon>> {
    const url=this.pokemonsUrl;
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<PagedData<Pokemon>>(`${url}`, {params}).pipe(
      tap(_ => this.log(`found heroes matching "${search}"`)),
      catchError(this.handleError<PagedData<Pokemon>>('searchHeroes', ))
    );
  }

  loginUser(email: string, password:string): Observable<any> {
    const url="http://pokedex-api.cleverapps.io/auth/login";
    return this.http.post<any>(`${url}`, {email,password}).pipe(
      tap(() => this.log(`found heroes matching `)),
      tap(myRes => this.acces_token=myRes.access_token),
      catchError(this.handleError<any>('searchHeroes', ))
    );
  }

  getPokemonEquipe(): Observable<number[]> {
    const url="http://pokedex-api.cleverapps.io/trainers/me/team";

    const header= {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.acces_token}`)};

        // TODO: send the message _after_ fetching the hero
        return this.http.get<number[]>(url,header).pipe(
          tap(() => this.log(`HeroService: fetched hero`)),
          catchError(this.handleError<number[]>('getHeroes')));
      }


  updatePokemonEquipe(id: number[]): Observable<number[]> {
    const url="http://pokedex-api.cleverapps.io/trainers/me/team";

    const header= {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.acces_token}`)};
    return this.http.put<number[]>(`${url}`,id,header).pipe(
      tap(() => this.log(`found heroes matching `)),
      catchError(this.handleError<number[]>('deletePekemon', ))
    );
  }
}
