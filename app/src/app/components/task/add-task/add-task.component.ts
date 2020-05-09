import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Person } from 'src/app/models/Person';

/**
 * Main add Task Component
 */
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() persons:Person[];

  @Output() addTask: EventEmitter<any> = new EventEmitter();

  title: string;
  person_id: string;
  description: string;
  completed: boolean;

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * Method used when to button is clicked.
   * It creates a task and emit it to the component above him
   */
  onSubmit() {


    const task = {
      title: this.title,
      description: this.description,
      completed: this.completed,
      person_id: this.person_id
    }

    this.addTask.emit(task);
  }
}

