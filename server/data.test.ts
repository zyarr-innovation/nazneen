import { NazneenDB, dbData } from './data.dto';
import { Enumcomment_status, ICase, ICaseComment } from './data.model';
export class TestData {

    private static nazneenDB: NazneenDB;

    private static isInitialize = false;
    private static commentList: ICaseComment[] = [];
    private static caseList: ICase[] = [];

    static async initialize() {
        TestData.nazneenDB = new NazneenDB();
        let caseList = await TestData.nazneenDB.getCaseList();
        TestData.caseList.push(...caseList);

        let commentList = await TestData.nazneenDB.getCommentList();
        TestData.commentList.push(...commentList);
        TestData.isInitialize = true;
    }

    private static async getAdminCaseList(): Promise<ICase[] | null> {

        if (!TestData.isInitialize) {
            await TestData.initialize();
        }

        let adminCaseList: ICase[] | null = null;
        let caseList = TestData.caseList.filter(eachCase =>
            eachCase.comment_status == Enumcomment_status.request);
        if (caseList) {
            if (!adminCaseList) {
                adminCaseList = caseList;
            }
        }

        caseList = TestData.caseList.filter(eachCase =>
            eachCase.comment_status == Enumcomment_status.response);
        if (caseList) {
            if (!adminCaseList) {
                adminCaseList = caseList;
            } else {
                adminCaseList.push(...caseList);
            }
        }

        if (adminCaseList) {
            for (let eachCase of adminCaseList) {
                let commentList = TestData.commentList.filter(eachComment => eachComment.case_id == eachCase.id)
                if (commentList) {
                    eachCase.communication = commentList;
                }
            }
        }

        return adminCaseList;
    }

    private static async getUserCaseList(username: string): Promise<ICase[] | null> {
        if (!TestData.isInitialize) {
            await TestData.initialize();
        }

        let userCaseList: ICase[] | null = null;
        let caseList = TestData.caseList.filter(eachCase =>
            eachCase.comment_status == Enumcomment_status.response &&
            eachCase.username == username);
        if (caseList) {
            if (!userCaseList) {
                userCaseList = caseList;
            }
        }

        caseList = TestData.caseList.filter(eachCase =>
            eachCase.comment_status == Enumcomment_status.request &&
            eachCase.username == username);
        if (caseList) {
            if (!userCaseList) {
                userCaseList = caseList;
            } else {
                userCaseList.push(...caseList);
            }
        }

        if (userCaseList) {
            for (let eachCase of userCaseList) {
                let commentList = TestData.commentList.filter(eachComment => eachComment.case_id == eachCase.id)
                if (commentList) {
                    eachCase.communication = commentList;
                }
            }
        }

        return userCaseList;
    }

    static async getCaseList(username: string): Promise<ICase[] | null> {
        if (username.toLowerCase() == 'admin') {
            return await TestData.getAdminCaseList();
        } else {
            return await TestData.getUserCaseList(username);
        }
    }

    static getCaseDetail(case_id: number): Promise<ICase | null> {
        return new Promise((resolve, reject) => {
            let caseInfo = TestData.caseList.find(eachCase => eachCase.id == case_id);
            if (caseInfo) {
                let caseComm = TestData.commentList.filter(eachComm => eachComm.case_id == case_id);
                caseInfo.communication = caseComm;
                resolve(caseInfo);
            }
            reject();
        });
    }

    static async addCase(username: string, caseInfo: ICase): Promise<ICase | null> {
        if (!TestData.isInitialize) {
            await TestData.initialize();
        }

        if (username != 'admin') {
            caseInfo.id = TestData.caseList.length;
            caseInfo.username = username;
            caseInfo.communication = [];
            //Save the case in database
            let insertedCaseInfo = await TestData.nazneenDB.addCase(caseInfo)
            TestData.caseList.push(insertedCaseInfo);

            return insertedCaseInfo;
        } else {
            return null;
        }
    }

    static async addComment(username: string,
        caseComment: ICaseComment): Promise<ICase | null> {

        if (!TestData.isInitialize) {
            await TestData.initialize();
        }

        caseComment.id = TestData.commentList.length;
        caseComment.username = username;

        let caseInfo = TestData.caseList.find(eachCase => eachCase.id == caseComment.case_id);
        if (caseInfo) {
            if (username == 'admin') {
                caseInfo.comment_status = Enumcomment_status.response;
            } else {
                caseInfo.comment_status = Enumcomment_status.request;
            }

            //Update the case in database
            caseComment.case_id = caseInfo.id;
            let insertedCaseCommentInfo = await TestData.nazneenDB.addCaseComment(caseComment)
            TestData.commentList.push(insertedCaseCommentInfo);

            //Save the comment in database
            caseInfo.communication?.push(insertedCaseCommentInfo);


            return caseInfo;
        } else {
            return null;
        }
    }
}