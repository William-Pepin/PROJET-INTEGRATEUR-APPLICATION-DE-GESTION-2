import { Injectable } from '@angular/core';
// Import HttpClient and HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import Observable module from rxjs (used for asynchronous data feed)
import { Observable } from 'rxjs';
// Import Person model
import { Person } from '../models/Person';
import { Task } from '../models/Task';

// Content Type
const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})



/**
 * Service for the persons. Used to call the API.
 */
export class PersonService {
  // Url
  private url: string = "http://localhost:3000/persons/";

  // Import HttpClient
  constructor(private http: HttpClient) { }



  /**
   * Method to get all persons from API.
   * 
   * @return an Observable array of persons from the API.
   */
  getPersons(): Observable<Person[]> {
    // HTTP GET request to API.
    return this.http.get<Person[]>(this.url);
  }



  /**
   * Method to get one person from API using the person _id.
   * 
   * @param _id The unique 24hex string identifier of a person
   * @return An Observable of person from the API.
   */
  getPerson(_id: string): Observable<Person> {
    // HTTP GET request to API using the person id.
    return this.http.get<Person>(this.url + _id);
  }



  /**
   * Method to add one person in the database using the API.
   * 
   * @param person The person to add
   * @return Any Observable from the API.
   */
  addPerson(person: Person): Observable<any> {
    // HTTP POST request using the person object and the content-type header.
    return this.http.post<Person>(this.url, person, httpHeaders);
  }



  /**
   * Method to modify a person in the database using the API.
   * 
   * @param person The person to modify
   * @return any Observable from the API.
   */
  modifyPerson(person: Person): Observable<any> {
    // HTTP PUT request using the person object and the content-type header.
    return this.http.put<Person>(this.url + person._id, person, httpHeaders);
  }


  /**
   * 
   * @param task the task to add
   * @param person_id the id the add the task to the specified person
   * @return any Observable from the api (the response)
   */
  addPersonTask(task:Task, person_id): Observable<any> {
    // HTTP PUt request using the task object and the content-type header.
    return this.http.put<Task>(this.url + 'task/' + person_id, task, httpHeaders);
  }
  /**
   * 
   * @param tasks  tasks to add
   * @param person_id the id the add the task to the specified person
   * @return any Observable from the api (the response)
   */
  addPersonTasks(tasks:Task[], person_id): Observable<any> {
    // HTTP PUt request using the task object and the content-type header.
    return this.http.put<Task>(this.url + 'tasks/' + person_id, tasks, httpHeaders);
  }



  /**
   * Method to delete a person from the database using the API.
   * 
   * @param _id The unique 24hex string identifier of a person
   * @return Any Observable from the API.
   */
  deletePerson(_id: string): Observable<any> {
    // HTTP DELETE request using the person unique identifier and the content-type header.
    return this.http.delete<Person>(this.url + _id, httpHeaders);
  }
}