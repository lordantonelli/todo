import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { TasksService } from '../../services/tasks.service';
import { Task, TaskCreateDto, TaskUpdateDto } from '../../models/task.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly categoriesService = inject(CategoriesService);
  private readonly messagesService = inject(MessagesService);
  private readonly tasksService = inject(TasksService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form = this.fb.group({
    description: this.fb.control<string>('', Validators.required),
    categoryId: this.fb.control<number | null>(null, [Validators.required]),
    isFinished: this.fb.control<boolean>(false),
  });
  categories: Category[] = [];
  id: string | null = null;
  title = 'Cadastrar nova tarefa';
  status = 'Ativo';

  ngOnInit(): void {
    this.categoriesService.list().subscribe((result) => {
      this.categories = result;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Editar tarefa #' + this.id;
      this.tasksService
        .findById(this.id)

        .subscribe({
          next: (result) => {
            this.form.patchValue(result);
          },
          error: () => {
            this.messagesService.error(`Tarefa #${this.id} não encontrada!!!!`);
            this.router.navigateByUrl('/tasks');
          },
        });
    }

    this.form.controls.isFinished.valueChanges.subscribe(
      (v) => (this.status = v ? 'Concluída' : 'Pendente de ser feita')
    );
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.id) {
        this.tasksService
          .create({
            ...this.form.value,
            dateCreated: new Date(),
          } as TaskCreateDto)
          .subscribe(() => {
            this.messagesService.success('Tarefa cadastrada com sucesso!!!');
            this.form.reset();
            this.router.navigateByUrl('/tasks');
          });
      } else {
        this.tasksService
          .update(
            this.id as string,
            {
              ...this.form.value,
              lastUpdated: new Date(),
            } as TaskUpdateDto
          )
          .subscribe(() => {
            this.messagesService.success('Tarefa atualizada com sucesso!!!');
            this.form.reset();
            this.router.navigateByUrl('/tasks');
          });
      }
    } else {
      this.messagesService.error('Há campos inválidos no formulário!!!!');
    }
  }
}
