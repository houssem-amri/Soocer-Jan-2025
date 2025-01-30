import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findTeam'
})
export class FindTeamPipe implements PipeTransform {

  transform(teams: any, teamId: any) {

    return teams.find((t: any) => t.id === Number(teamId))?.name || 'No team'

  }

}



