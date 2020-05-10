import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';


// Models
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

// Services
import { PersonService } from 'src/app/services/person.service';


// Decorator
@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})

/**
 * List persons class
 * Used to list persons and their tasks
 */
export class ListPersonsComponent implements OnInit {
  // Input
  @Input() persons:Person[];

  // Output
  
  // Fields
  now:Date;

  /**
   * Constructor
   * @param personService the person service to get data from the api
   */
  constructor(private personService:PersonService) { }



  ngOnInit(): void {
    this.now = new Date();
  }


}
