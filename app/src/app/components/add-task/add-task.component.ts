import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
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
      person_id: this.person_id,
      description: this.description,
      completed: this.completed
    }

    this.addTask.emit(task);
  }

}
