import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { TestData } from './data.test';

const app: Express = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../../client/dist/women')))
app.use('/login', express.static(path.join(__dirname, '../../client/dist/women')))

app.get('/caselist/:username', (req: Request, res: Response) => {
  let username = req.params.username;
  let caseList = TestData.getCaseList(username);

  if (caseList){
    res.json(caseList);
  } else {
    console.log (`Failed: Case List Not Found for user: ${username}`)
    res.status(404).send(new Error(`Failed: Case List Not Found for user: ${username}`));
  }
});

app.get('/casedetail/:caseId', (req: Request, res: Response) => {
  let caseId = req.params.caseId;
  let caseInfo = TestData.getCaseDetail(+caseId);

  if (caseInfo){
    res.json(caseInfo);
  } else {
    console.log (`Failed: Case Detail Not Found for case id: ${caseId}`);
    res.status(404).send(new Error(`Failed: Case Detail Not Found for case id: ${caseId}`));
  }
});

app.post('/addcase', (req: Request, res: Response) => {
  const caseInfo = req.body;

  let returnCaseInfo = TestData.addCase(caseInfo.username, caseInfo);
  if (returnCaseInfo){
    res.json(returnCaseInfo);
  } else {
    console.log (`Failed: Add the case: ${caseInfo}`);
    res.status(404).send(new Error(`Failed: Add the case: ${caseInfo}`));
  }
});

app.post('/addcomment', (req: Request, res: Response) => {
  const commentInfo = req.body;

  let returnCaseInfo = TestData.addComment(commentInfo.username, commentInfo);
  if (returnCaseInfo){
    res.json(returnCaseInfo);
  } else {
    console.log (`Failed: Add the comment: ${commentInfo}`);
    res.status(404).send(new Error(`Failed: Add the comment: ${commentInfo}`));
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});