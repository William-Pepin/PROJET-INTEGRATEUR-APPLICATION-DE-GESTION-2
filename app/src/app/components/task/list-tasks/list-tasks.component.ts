import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() persons: Person[];

  person_id:string;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(task){

  }

  onDelete(task){
    
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
