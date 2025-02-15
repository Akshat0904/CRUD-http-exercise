/**
 * User Interface
 * @interface IUser
 * @description Represents the structure of a user in the system
 *
 * @property {string} [id] - Unique identifier for the user (optional for new users)
 * @property {string} name - Full name of the user
 * @property {string} email - Email address of the user (must be unique)
 * @property {string} age - Age of the user
 * @property {string} number - Phone number of the user (must be unique)
 */
export interface IUser {
  id?: string;
  name: string;
  email: string;
  age: string;
  number: string;
}
