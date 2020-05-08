import { Task } from "./Task";

export class Person {
    _id:string;
    firstName:string;
    lastName:string;
    birthDate:Date;
    email:string;
    phoneNumber:string;
    tasks?:Task[];
}