import { Injectable } from '@angular/core';
// Import HttpClient and HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import Observable module from rxjs (used for asynchronous data feed)
import { Observable } from 'rxjs';
// Import task model
import { Task } from '../models/task';

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
 * Service for the tasks. Used to call the API.
 */
export class taskService {
  // Url
  private url: string = "http://localhost:3000/tasks/";

  // Import HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Method to get all tasks from API.
   * 
   * @return an Observable array of tasks from the API.
   */
  getTasks(): Observable<Task[]> {
    // HTTP GET request to API.
    return this.http.get<Task[]>(this.url);
  }

  /**
   * Method to get all tasks of a person from API.
   * Sending "undefined" will get all unassigned task.
   * @param person_idd The unique 24hex string identifier of a person.
   * 
   * @return An Observable of task from the API.
   */
  getTaskFromPerson_id(person_id: string): Observable<Task> {
    // HTTP GET request to API using the task id.
    return this.http.get<Task>(this.url + "person/" + person_id);
  }

  /**
   * Method to get one task from API using the task _id.
   * 
   * @param _id The unique 24hex string identifier of a task
   * @return An Observable of task from the API.
   */
  getTask(_id: string): Observable<Task> {
    // HTTP GET request to API using the task id.
    return this.http.get<Task>(this.url + _id);
  }

  /**
   * Method to add one task in the database using the API.
   * 
   * @param task The task to add
   * @return Any Observable from the API.
   */
  addTask(task: Task): Observable<any> {
    // HTTP POST request using the task object and the content-type header.
    return this.http.post<Task>(this.url, task, httpHeaders);
  }

  /**
   * Method to modify a task in the database using the API.
   * 
   * @param task The task to modify
   * @return any Observable from the API.
   */
  modifyTask(task: Task): Observable<any> {
    // HTTP PUT request using the task object and the content-type header.
    return this.http.put<Task>(this.url + task._id, task, httpHeaders)
  }

  /**
 * Method to delete a task from the database using the API.
 * 
 * @param _id The unique 24hex string identifier of a task
 * @return Any Observable from the API.
 */
  deleteTask(_id: string): Observable<any> {
    // HTTP DELETE request using the task unique identifier and the content-type header.
    return this.http.delete<Task>(this.url + _id, httpHeaders);
  }
}
