import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AppGuard} from './app.guard';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    runGuardsAndResolvers: 'always',
    component: ContactsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
