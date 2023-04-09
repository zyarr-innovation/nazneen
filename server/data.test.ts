import { EnumCommentStatus, ICase, ICaseComment } from './data.model';
export class TestData {
    private static commentList: ICaseComment[] = [
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

    private static caseList: ICase[] =
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

    private static getAdminCaseList (): ICase[] | null {
        let adminCaseList: ICase[] | null = null;
        let caseList = TestData.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.request);
        if (caseList){
            if (!adminCaseList) {
                adminCaseList = caseList;
            }
        }

        caseList = TestData.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.response);
        if (caseList){
            if (!adminCaseList) {
                adminCaseList = caseList;
            } else {
                adminCaseList.push(...caseList);
            }
        }

        if (adminCaseList) {
            for(let eachCase of adminCaseList) {
                let commentList = TestData.commentList.filter (eachComment => eachComment.caseId == eachCase.id)
                if (commentList) {
                    eachCase.communication = commentList;
                }
            }
        }

        return adminCaseList;
    }

    private static getUserCaseList (username: string): ICase[] | null {
        let userCaseList: ICase[] | null = null;
        let caseList = TestData.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.response &&
            eachCase.username == username);
        if (caseList){
            if (!userCaseList) {
                userCaseList = caseList;
            }
        }

        caseList = TestData.caseList.filter(eachCase => 
            eachCase.commentStatus == EnumCommentStatus.request &&
            eachCase.username == username);
        if (caseList){
            if (!userCaseList) {
                userCaseList = caseList;
            } else {
                userCaseList.push(...caseList);
            }
        }

        if (userCaseList) {
            for(let eachCase of userCaseList) {
                let commentList = TestData.commentList.filter (eachComment => eachComment.caseId == eachCase.id)
                if (commentList) {
                    eachCase.communication = commentList;
                }
            }
        }
        
        return userCaseList;
    }

    static getCaseList (username: string): ICase[]  | null{
        if (username.toLowerCase() == 'admin') {
            return TestData.getAdminCaseList();
        } else {
            return TestData.getUserCaseList(username);
        }
    }

    static getCaseDetail (caseId: number): ICase | null {
        let caseInfo = TestData.caseList.find (eachCase => eachCase.id == caseId);
        if (caseInfo) {
            let caseComm = TestData.commentList.filter (eachComm=> eachComm.caseId == caseId);
            caseInfo.communication = caseComm;
            return caseInfo;
        }
        return null;
    }

    static addCase (username: string, caseInfo: ICase):ICase | null {
        if (username != 'admin') {
            caseInfo.id = TestData.caseList.length;
            caseInfo.username = username;
            caseInfo.communication = [];
            //Save the case in database
            TestData.caseList.push(caseInfo);
            return caseInfo;
        }else {
            return null;
        }
    }

    static addComment (username: string, 
        caseComment: ICaseComment): ICase | null {
        caseComment.id = TestData.commentList.length;
        caseComment.username = username;

        let caseInfo = TestData.caseList.find(eachCase => eachCase.id == caseComment.caseId);
        if (caseInfo) {
            if (username == 'admin') {
                caseInfo.commentStatus = EnumCommentStatus.response;
            } else {
                caseInfo.commentStatus = EnumCommentStatus.request;
            }
            //Update the case in database
            //Save the comment in database
            caseInfo.communication?.push(caseComment);
            TestData.commentList.push(caseComment);

            return caseInfo;
        } else  {
            return null;
        }
    }
}