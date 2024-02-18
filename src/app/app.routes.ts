import { Routes } from '@angular/router';
import { IndexGenderComponent } from './components/index-gender/index-gender.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { IndexGameComponent } from './components/index-game/index-game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterGenderComponent } from './components/register-gender/register-gender.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Welcome',
  },
  {
    path: 'gender',
    component: IndexGenderComponent,
    title: 'Genders',
  },
  {
    path: 'gender/register',
    component: RegisterGenderComponent,
    title: 'Genders - Register'
  },
  {
    path: 'game',
    component: IndexGameComponent,
    title: 'Games',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
