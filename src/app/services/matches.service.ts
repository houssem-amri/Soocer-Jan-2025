import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  matchUrl='http://localhost:3000/matches'

  constructor(private httpClient: HttpClient) { }

  addMatch(data: any) {
    return this.httpClient.post<{message:any}>(this.matchUrl, data)
  }

  getAllMatches() {
    return this.httpClient.get<{data:any}>(this.matchUrl)
  }

  getMatchById(id:any) {
    return this.httpClient.get<{match:any}>(`${this.matchUrl}/${id}`)
  }

  deleteMatch(id:any) {   
    return this.httpClient.delete<{message:any}>(`${this.matchUrl}/${id}`)
  }


  updateMatch(data:any) {
    return this.httpClient.put<{message:any}>(this.matchUrl, data)
  }

  soccerApigetAllMatches(){
    let weatherApi="https://api.openweathermap.org/data/2.5/weather?lat=36.84&lon=10.19&appid=a49826bbd648b9c508e35851bce57932&units=metric"
    let url ="https://api.soccersapi.com/v2.2/teams/?user=houda.kamoun26&token=72c5b576eca44eaf49cba904c8c6ac45&t=list&country_id=117"
    return this.httpClient.get<any>(url)
  }
}
