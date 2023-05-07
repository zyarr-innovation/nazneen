import pgPromise from 'pg-promise';
import { Enumcomment_status, ICase, ICaseComment } from './data.model';

const pgData = pgPromise({});
export const dbData = pgData("postgres://postgres:postgres@localhost:5432/nazneen");

export class NazneenDB {
    readonly insertCaseQuery = 'INSERT INTO cases (title, date, description, comment_status, username) VALUES (${title}, ${date}, ${description}, ${comment_status}, ${username}) RETURNING *';
    readonly insertCommentQuery = 'INSERT INTO case_comments (case_id, date, username, text) VALUES (${case_id}, ${date}, ${username}, ${text}) RETURNING *';

    mapcomment_status(value: number): Enumcomment_status {
        switch (value) {
            case 0:
                return Enumcomment_status.new;
            case 1:
                return Enumcomment_status.request;
            case 2:
                return Enumcomment_status.response;
            case 3:
                return Enumcomment_status.close;
            default:
                throw new Error(`Unknown comment status value: ${value}`);
        }
    }

    async getCaseList() {
        let caselist = await dbData.query("select * from cases") as ICase[];
        return caselist.map(eachCase => {
            return {
                ...eachCase,
                comment_status: this.mapcomment_status(eachCase.comment_status)
            } as ICase;
        });

    }

    async getCommentList() {
        let caselist = await dbData.query("select * from case_comments");
        return caselist as ICaseComment[];
    }

    async addCase(newCase: ICase) {
        let insertedCase = await dbData.one(this.insertCaseQuery, newCase);
        return insertedCase;
    }

    async addCaseComment(newCaseComment: ICaseComment) {
        let insertedCase = await dbData.one(this.insertCommentQuery, newCaseComment);
        return insertedCase;
    }
}