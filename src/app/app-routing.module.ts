import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { TableMatchesComponent } from './components/table-matches/table-matches.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { TableTeamsComponent } from './components/table-teams/table-teams.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { TablePlayersComponent } from './components/table-players/table-players.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  {path:'',component:HomeComponent}, //http://localhost:4200
  {path:'contact',component:ContactComponent}, //http://localhost:4200/contact
  {path:'add-match',component:AddMatchComponent ,canActivate:[AuthGuard] , data:{role:['admin']}}, //http://localhost:4200/add-match
  {path:'edit-match/:id',component:EditMatchComponent,canActivate:[AuthGuard]}, //http://localhost:4200/add-match
  {path:'table-matches',component:TableMatchesComponent,canActivate:[AuthGuard],data:{role:['admin']}}, 
  {path:'signup',component:SignupComponent}, 
  {path:'signupAdmin',component:SignupComponent}, 
  {path:'matches',component:MatchesComponent ,canActivate:[AuthGuard] , data:{role:['user', 'admin']}}, 
  {path:'teams',component:TeamsComponent ,canActivate:[AuthGuard] , data:{role:['user', 'admin']}}, 
  {path:'add-team',component:AddTeamComponent,canActivate:[AuthGuard] , data:{role:['admin']}} ,
  {path:'add-team/:teamId',component:AddTeamComponent ,canActivate:[AuthGuard]}, 
  {path:'table-teams',component:TableTeamsComponent}, 
  {path:'add-player',component:AddPlayerComponent}, 
  {path:'table-players',component:TablePlayersComponent}, 
  {path:'login',component:LoginComponent}, 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
