// src/jiraAPI/JiraAPI.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { JiraStatus } from '../ticketResponse/JiraStatus';

dotenv.config();

export interface JiraTicket
{
    key: string;
    summary: string;
    assignee: string;
    reporter: string;
    status: string;
    link: string;
}

export interface JiraResponse
{
    issues: Array<{
        key: string;
        fields:
        {
            summary: string;
            assignee: { displayName: string };
            reporter: { displayName: string };
            status: { name: string };
        };
        self: string;
    }>;
}

export class JiraAPI
{
    private static jiraDomain: string = process.env.JIRA_DOMAIN || '';
    private static apiToken: string = process.env.JIRA_API_TOKEN || '';
    private static email: string = process.env.JIRA_EMAIL || '';
    private static projectKey: string = process.env.JIRA_PROJECT || '';

    private static FormatIssue(issue: JiraResponse['issues'][0]): JiraTicket
    {
        return {
            key: issue.key,
            summary: issue.fields.summary,
            assignee: issue.fields.assignee.displayName,
            reporter: issue.fields.reporter.displayName,
            status: issue.fields.status.name,
            link: issue.self,
        };
    }

    public static async RetrieveIssuesByStatus(assignee: string, statusCategory: string): Promise<JiraTicket[]>
    {
        const jql = `project = '${this.projectKey}' AND assignee = '${assignee}' AND statusCategory = '${statusCategory}'`;
        const url = `${this.jiraDomain}/rest/api/3/search`;

        const options = {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${this.email}:${this.apiToken}`).toString('base64')}`,
                'Accept': 'application/json'
            },
            params: {
                jql: jql,
                fields: 'summary,status,assignee,reporter'
            }
        };

        try
        {
            const response = await axios.get<JiraResponse>(url, options);
            return response.data.issues.map(this.FormatIssue);
        }
        catch (error)
        {
            console.error('Error fetching issues:', error);
            return [];
        }
    }

    public static async GetInProgressIssues(assignee: string): Promise<JiraTicket[]>
    {
        return this.RetrieveIssuesByStatus(assignee, JiraStatus.IN_PROGRESS);
    }

    public static async GetTodoIssues(assignee: string): Promise<JiraTicket[]>
    {
        return this.RetrieveIssuesByStatus(assignee, JiraStatus.TODO);
    }

    public static async GetDoneIssues(assignee: string): Promise<JiraTicket[]>
    {
        return this.RetrieveIssuesByStatus(assignee, JiraStatus.DONE);
    }
}
