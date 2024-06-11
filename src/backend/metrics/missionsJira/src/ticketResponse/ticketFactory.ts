// src/ticketResponse/ticketFactory.ts
import {
    IJiraAction,
    RetrieveJiraTickets,
    RetrieveInProgressTickets,
    RetrieveTodoTickets,
    RetrieveDoneTickets
} from './IJiraAction';

import { JiraStatus } from './JiraStatus';

export class JiraActionFactory
{
    public static createAction(actionType: JiraStatus): IJiraAction
    {
        switch (actionType)
        {
            case JiraStatus.ALL:
                return new RetrieveJiraTickets();
            case JiraStatus.IN_PROGRESS:
                return new RetrieveInProgressTickets();
            case JiraStatus.TODO:
                return new RetrieveTodoTickets();
            case JiraStatus.DONE:
                return new RetrieveDoneTickets();
            default:
                throw new Error('Invalid action type');
        }
    }
}
