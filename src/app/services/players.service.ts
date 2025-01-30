import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playerUrl='http://localhost:3000/players'

  constructor(private httpClient: HttpClient) { }

  addPlayer(data: any) {
    return this.httpClient.post<{message:any}>(this.playerUrl, data)
  }

  getAllPlayers() {
    return this.httpClient.get<{players:any}>(this.playerUrl)
  }

  getPlayerById(id:any) {
    return this.httpClient.get<{player:any}>(`${this.playerUrl}/${id}`)
  }

  deletePlayer(id:any) {
    return this.httpClient.delete<{message:any}>(`${this.playerUrl}/${id}`)
  }


  updatePlayer(data:any) {
    return this.httpClient.put<{message:any}>(this.playerUrl, data)
  }

}
