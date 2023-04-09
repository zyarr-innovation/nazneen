export enum EnumCommentStatus {
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
    caseId: number;
    date: Date;
    username: string;
    text: string;
  }
  export interface ICase {
    id: number
    title: string;
    date: Date;
    description: string;
    commentStatus: EnumCommentStatus;
    username: string;
    communication?: ICaseComment[];
  }