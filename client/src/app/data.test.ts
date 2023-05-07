import { EnumCommentStatus, ICase, ICaseComment } from "./data.model";

export class TestData {
    private commentList: ICaseComment[] = [
        {
            id: 1,
            case_id: 1,
            date: new Date(),
            username: "test",
            text: "Inlaws are beating me"
        }, {
            id: 2,
            case_id: 1,
            date: new Date(),
            username: "test",
            text: "What else they are doing"
        }, {
            id: 3,
            case_id: 1,
            date: new Date(),
            username: "test",
            text: "They are not allowing me to sleep also."
        },
        {
            id: 4,
            case_id: 2,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also."
        }, {
            id: 5,
            case_id: 2,
            date: new Date(),
            username: "test",
            text: "How he troubles you"
        }, {
            id: 6,
            case_id: 2,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house."
        },
        {
            id: 7,
            case_id: 3,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also.3"
        }, {
            id: 8,
            case_id: 3,
            date: new Date(),
            username: "test",
            text: "How he troubles you 3"
        }, {
            id: 9,
            case_id: 3,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house. 3"
        },
        {
            id: 10,
            case_id: 4,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also.4"
        }, {
            id: 11,
            case_id: 4,
            date: new Date(),
            username: "test",
            text: "How he troubles you 4"
        }, {
            id: 12,
            case_id: 4,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house. 4"
        }
    ];

    private caseList: ICase[] =
        [{
            id: 1,
            title: "My Case 1",
            date: new Date(),
            description: "My inlaws are troubling me a lot",
            comment_status: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 2,
            title: "My Case 2",
            date: new Date(),
            description: "My husband is very bad",
            comment_status: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 3,
            title: "My Case 3",
            date: new Date(),
            description: "My husband is very bad 3",
            comment_status: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 4,
            title: "My Case 4",
            date: new Date(),
            description: "My husband is very bad 4",
            comment_status: EnumCommentStatus.request,
            username: "test",
            communication: []
        }
        ];

    private getAdminCaseList(): ICase[] {
        let adminCaseList: ICase[] = [];
        let caseList = this.caseList.filter(eachCase =>
            eachCase.comment_status == EnumCommentStatus.request);
        if (caseList) {
            adminCaseList.push(...caseList);
        }

        caseList = this.caseList.filter(eachCase =>
            eachCase.comment_status == EnumCommentStatus.response);
        if (caseList) {
            adminCaseList.push(...caseList);
        }

        for (let eachCase of adminCaseList) {
            let commentList = this.commentList.filter(eachComment => eachComment.case_id == eachCase.id)
            if (commentList) {
                eachCase.communication = commentList;
            }
        }
        return adminCaseList;

    }

    private getUserCaseList(username: string): ICase[] {
        let userCaseList: ICase[] = [];
        let caseList = this.caseList.filter(eachCase =>
            eachCase.comment_status == EnumCommentStatus.response &&
            eachCase.username == username);
        if (caseList) {
            userCaseList.push(...caseList);
        }

        caseList = this.caseList.filter(eachCase =>
            eachCase.comment_status == EnumCommentStatus.request &&
            eachCase.username == username);
        if (caseList) {
            userCaseList.push(...caseList);
        }

        for (let eachCase of userCaseList) {
            let commentList = this.commentList.filter(eachComment => eachComment.case_id == eachCase.id)
            if (commentList) {
                eachCase.communication = commentList;
            }
        }
        return userCaseList;

    }

    getCaseList(username: string): ICase[] {
        if (username.toLowerCase() == 'admin') {
            return this.getAdminCaseList();
        } else {
            return this.getUserCaseList(username);
        }
    }

    getCaseDetail(case_id: number): ICase | null {
        let caseInfo = this.caseList.find(eachCase => eachCase.id == case_id);
        if (caseInfo) {
            let caseComm = this.commentList.filter(eachComm => eachComm.case_id == case_id);
            caseInfo.communication = caseComm;
            return caseInfo;
        }
        return null;
    }

    addCase(username: string, caseInfo: ICase): ICase {
        if (username != 'admin') {
            caseInfo.id = this.caseList.length;
            caseInfo.username = username;
            caseInfo.communication = [];
            this.caseList.push(caseInfo);
        } else {
            console.log("Admin cannot log case");
        }
        return caseInfo;
    }

    addComment(username: string,
        caseInfo: ICase,
        caseComment: ICaseComment): ICase {
        caseComment.id = this.commentList.length;
        caseComment.case_id = caseInfo.id;
        if (username == 'admin') {
            caseInfo.comment_status = EnumCommentStatus.response;
        } else {
            caseInfo.comment_status = EnumCommentStatus.request;
        }
        caseComment.username = username,
            caseInfo.communication?.push(caseComment);
        this.commentList.push(caseComment);

        return caseInfo;
    }
}