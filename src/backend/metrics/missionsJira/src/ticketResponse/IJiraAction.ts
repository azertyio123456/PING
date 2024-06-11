// src/ticketResponse/IJiraAction.ts
import { JiraTicket, JiraAPI } from './../jiraAPI/JiraAPI';


interface IJiraAction
{
    execute(assignee: string): Promise<any>;
}

class RetrieveInProgressTickets implements IJiraAction
{
    async execute(assignee: string): Promise<JiraTicket[]>
    {
        return JiraAPI.GetInProgressIssues(assignee);
    }
}

class RetrieveTodoTickets implements IJiraAction
{
    async execute(assignee: string): Promise<JiraTicket[]>
    {
        return JiraAPI.GetTodoIssues(assignee);
    }
}

class RetrieveDoneTickets implements IJiraAction
{
    async execute(assignee: string): Promise<JiraTicket[]>
    {
        return JiraAPI.GetDoneIssues(assignee);
    }
}

interface TicketResponse
{
    TodoTickets: JiraTicket[];
    InProgressTickets: JiraTicket[];
    DoneTickets: JiraTicket[];
}

class RetrieveJiraTickets implements IJiraAction
{
    
    async execute(assignee: string): Promise<TicketResponse>
    {
        const TodoTickets: JiraTicket[] = await JiraAPI.GetTodoIssues(assignee);
        const InProgressTickets: JiraTicket[] = await JiraAPI.GetInProgressIssues(assignee);
        const DoneTickets: JiraTicket[] = await JiraAPI.GetDoneIssues(assignee);

        return {
            TodoTickets,
            InProgressTickets,
            DoneTickets
        };
    }
}


export {
    IJiraAction,
    RetrieveJiraTickets,
    RetrieveInProgressTickets,
    RetrieveTodoTickets,
    RetrieveDoneTickets
};
