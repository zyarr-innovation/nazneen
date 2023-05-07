export enum Enumcomment_status {
  new,
  request,
  response,
  close
}
export interface IUser {
  id: number;
  name: string
}
export interface ICaseComment {
  id: number;
  case_id: number;
  date: Date;
  username: string;
  text: string;
}
export interface ICase {
  id: number
  title: string;
  date: Date;
  description: string;
  comment_status: Enumcomment_status;
  username: string;
  communication?: ICaseComment[];
}