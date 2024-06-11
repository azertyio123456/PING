// src/index.ts
import { JiraActionFactory } from './../src/ticketResponse/ticketFactory';
import { JiraStatus } from './../src/ticketResponse/JiraStatus';

(async () => {
    const action = JiraActionFactory.createAction(JiraStatus.ALL);
    const issues = await action.execute('maximepoyet.yourpieces@outlook.fr');
    console.log('All Issues:', issues);

    const inProgressAction = JiraActionFactory.createAction(JiraStatus.IN_PROGRESS);
    const inProgressIssues = await inProgressAction.execute('maximepoyet.yourpieces@outlook.fr');
    console.log('In Progress Issues:', inProgressIssues);

    const todoAction = JiraActionFactory.createAction(JiraStatus.TODO);
    const todoIssues = await todoAction.execute('maximepoyet.yourpieces@outlook.fr');
    console.log('TODO Issues:', todoIssues);

    const doneAction = JiraActionFactory.createAction(JiraStatus.DONE);
    const doneIssues = await doneAction.execute('maximepoyet.yourpieces@outlook.fr');
    console.log('Done Issues:', doneIssues);
})();
