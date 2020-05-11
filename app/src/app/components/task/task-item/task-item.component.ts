import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  
  @Output() toggleCompleted: EventEmitter<Task> = new EventEmitter();
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();

  constructor(
) { }

  ngOnInit(): void {

  }

    // Method to set dynamic classes
    setClasses(){
      // Classes object with the name of the class as a property and the value true or false to determine if the CSS class is active
      let classes = {
  
        // todo class always true
        task: true,
  
        // is-complete class true if completed
        'is-completed': this.task.completed
      }
      return classes;
    }
  

  onToggle(task)
  {
    this.task.completed = !this.task.completed;

    this.toggleCompleted.emit(task);
  }

  onDelete(task){
    this.deleteTask.emit(task);
  }


}
