import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChangeUserComponent } from './components/change-user/change-user.component';

export const routes: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UsersListComponent},
    {path: 'users/:id', component: UserInfoComponent},
    {path: 'change/:id', component: ChangeUserComponent},
    {path: 'create', component: ChangeUserComponent}
];
