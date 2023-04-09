import { EnumCommentStatus, ICase, ICaseComment } from "./data.service";

export class TestData {
    commentList: ICaseComment[] = [
        {
            id: 1,
            caseId: 1,
            date: new Date(),
            username: "test",
            text: "Inlaws are beating me"
        }, {
            id: 2,
            caseId: 1,
            date: new Date(),
            username: "test",
            text: "What else they are doing"
        }, {
            id: 3,
            caseId: 1,
            date: new Date(),
            username: "test",
            text: "They are not allowing me to sleep also."
        },
        {
            id: 4,
            caseId: 2,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also."
        }, {
            id: 5,
            caseId: 2,
            date: new Date(),
            username: "test",
            text: "How he troubles you"
        }, {
            id: 6,
            caseId: 2,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house."
        },
        {
            id: 7,
            caseId: 3,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also.3"
        }, {
            id: 8,
            caseId: 3,
            date: new Date(),
            username: "test",
            text: "How he troubles you 3"
        }, {
            id: 9,
            caseId: 3,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house. 3"
        },
        {
            id: 10,
            caseId: 4,
            date: new Date(),
            username: "test",
            text: "My husband beats me alot, abuses me also.4"
        }, {
            id: 11,
            caseId: 4,
            date: new Date(),
            username: "test",
            text: "How he troubles you 4"
        }, {
            id: 12,
            caseId: 4,
            date: new Date(),
            username: "test",
            text: "He kicks me, hit me sometimes throws me out of the house. 4"
        }
    ];

    caseList: ICase[] =
        [{
            id: 1,
            title: "My Case 1",
            date: new Date(),
            description: "My inlaws are troubling me a lot",
            commentStatus: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 2,
            title: "My Case 2",
            date: new Date(),
            description: "My husband is very bad",
            commentStatus: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 3,
            title: "My Case 3",
            date: new Date(),
            description: "My husband is very bad 3",
            commentStatus: EnumCommentStatus.request,
            username: "test",
            communication: []
        },
        {
            id: 4,
            title: "My Case 4",
            date: new Date(),
            description: "My husband is very bad 4",
            commentStatus: EnumCommentStatus.request,
            username: "test",
            communication: []
        }
        ];


    private getAdminCaseList (): ICase[] {
        let adminCaseList: ICase[]= [];
        let caseList = this.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.request);
        if (caseList){
            adminCaseList.push(...caseList);
        }

        caseList = this.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.response);
        if (caseList){
            adminCaseList.push(...caseList);
        }

        for(let eachCase of adminCaseList) {
            let commentList = this.commentList.filter (eachComment => eachComment.caseId == eachCase.id)
            if (commentList) {
                eachCase.communication = commentList;
            }
        }
        return adminCaseList;

    }

    private getUserCaseList (username: string): ICase[] {
        let userCaseList: ICase[]= [];
        let caseList = this.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.response &&
            eachCase.username == username);
        if (caseList){
            userCaseList.push(...caseList);
        }

        caseList = this.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.request &&
            eachCase.username == username);
        if (caseList){
            userCaseList.push(...caseList);
        }

        for(let eachCase of userCaseList) {
            let commentList = this.commentList.filter (eachComment => eachComment.caseId == eachCase.id)
            if (commentList) {
                eachCase.communication = commentList;
            }
        }
        return userCaseList;

    }

    getCaseList (username: string): ICase[]  {
        if (username.toLowerCase() == 'admin') {
            return this.getAdminCaseList();
        } else {
            return this.getUserCaseList(username);
        }
    }

    getCaseDetail (caseId: number): ICase | null {
        let caseInfo = this.caseList.find (eachCase => eachCase.id == caseId);
        if (caseInfo) {
            let caseComm = this.commentList.filter (eachComm=> eachComm.caseId == caseId);
            caseInfo.communication = caseComm;
            return caseInfo;
        }
        return null;
    }

    addCase (username: string, caseInfo: ICase):ICase  {
        if (username != 'admin') {
            caseInfo.id = this.caseList.length;
            caseInfo.username = username;
            caseInfo.communication = [];
            this.caseList.push(caseInfo);
        }else {
            console.log ("Admin cannot log case");
        }
        return caseInfo;
    }

    addComment (username: string, 
        caseInfo: ICase,
        caseComment: ICaseComment): ICase  {
        caseComment.id = this.commentList.length;
        caseComment.caseId = caseInfo.id;
        if (username == 'admin') {
            caseInfo.commentStatus = EnumCommentStatus.response;
        } else {
            caseInfo.commentStatus = EnumCommentStatus.request;
        }
        caseComment.username = username,
        caseInfo.communication?.push(caseComment);
        this.commentList.push(caseComment);
      
        return caseInfo;
    }
}