import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {


  teamUrl='http://localhost:3000/teams'

  constructor(private httpClient: HttpClient) { }

  addTeam(team: any , file:File) {

    const formData = new FormData

    formData.append('image',file)
    formData.append('name',team.name)
    formData.append('date',team.date)
    formData.append('description',team.description)

    return this.httpClient.post<{message:any}>(this.teamUrl, formData)
  }

  getAllTeams() {
    return this.httpClient.get<{teams:any}>(this.teamUrl)
  }
  getAllTeamsWithPlayers() {
    return this.httpClient.get<{teams:any}>(`${this.teamUrl}_with_populate`)
  }

  getTeamById(id:any) {
    return this.httpClient.get<{team:any}>(`${this.teamUrl}/${id}`)
  }

  deleteTeam(id:any) {
    return this.httpClient.delete<{message:any}>(`${this.teamUrl}/${id}`)
  }


  updateTeam(data:any) {
    return this.httpClient.put<{message:any}>(this.teamUrl, data)
  }
}
