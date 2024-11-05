import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    title: 'Página inicial',
    data: { showMenu: true },
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    title: 'Minhas tarefas',
    data: { showMenu: true },
  },
  {
    path: 'tasks/create',
    component: TaskFormComponent,
    title: 'Cadastrar tarefa',
    data: { showMenu: false },
  },
  {
    path: 'tasks/:id/edit',
    component: TaskFormComponent,
    title: 'Editar tarefa',
    data: { showMenu: false },
  },
];
