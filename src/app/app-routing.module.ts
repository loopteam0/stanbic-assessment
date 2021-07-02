import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: 'students',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
