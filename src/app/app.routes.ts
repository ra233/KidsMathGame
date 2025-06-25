import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MathGameComponent } from './pages/math-game/math-game';

export const routes: Routes = [
  { path: '', redirectTo: 'math', pathMatch: 'full' },
  { path: 'math', component: MathGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
