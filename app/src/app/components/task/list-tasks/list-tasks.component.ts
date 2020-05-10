import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

// Models
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

// Services
import { TaskService } from 'src/app/services/task.service';


// Decorator
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})

/**
 * List Tasks class
 * Used to list unassigned tasks
 */
export class ListTasksComponent implements OnInit {
  // Input
  @Input() tasks: Task[];
  @Input() persons: Person[];

  // Output
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() assignTask: EventEmitter<Task> = new EventEmitter();

  // Fields
  person_id:string;

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  onToggle(task){

  }

  /**
   * Method that emits to the main-tasks component to assign a person to the specified task
   * @param task Task to assign
   */
  onAssign(task:Task){
    this.assignTask.emit(task);
  }

  /**
   * Method that emits to the main-tasks component to delete the specified task
   * @param task Task to delete
   */
  onDelete(task:Task){
    this.deleteTask.emit(task);
  }

  // Method to set dynamic classes
  setClasses(task) {
    // Classes object with the name of the class as a property and the value true or false to determine if the CSS class is active
    let classes = {

      // todo class always true
      task: true,

      // is-complete class true if completed
      'is-completed': task.completed
    }
    return classes;
  }

}
