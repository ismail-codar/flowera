import { IWorkflowActionNode } from "./base";

// #region Integration Nodes
export interface IWorkflowSlackNode <N extends string> extends IWorkflowActionNode<N, "slack"> {
    actionType: "slack";
    properties: {
        operation: "sendMessage" | "updateMessage" | "deleteMessage" | "createChannel" | "inviteUser" | "uploadFile";
        botToken: string;
        channel?: string;
        text?: string;
        blocks?: any[];
        attachments?: any[];
        threadTs?: string;
        messageId?: string;
        filePath?: string;
        fileName?: string;
        fileContent?: string;
        userId?: string;
        channelName?: string;
        channelType?: "public" | "private";
    };
}

export interface IWorkflowTeamsNode <N extends string> extends IWorkflowActionNode<N, "teams"> {
    actionType: "teams";
    properties: {
        operation: "sendMessage" | "sendCard" | "createMeeting" | "sendNotification";
        webhookUrl?: string;
        text?: string;
        title?: string;
        card?: any;
        meeting?: {
            subject: string;
            startTime: string;
            endTime: string;
            attendees: string[];
            location?: string;
        };
        mentions?: {
            userId: string;
            displayName: string;
        }[];
    };
}

export interface IWorkflowDiscordNode <N extends string> extends IWorkflowActionNode<N, "discord"> {
    actionType: "discord";
    properties: {
        operation: "sendMessage" | "sendEmbed" | "createInvite" | "manageRole";
        botToken?: string;
        webhookUrl?: string;
        channelId?: string;
        guildId?: string;
        content?: string;
        embed?: {
            title?: string;
            description?: string;
            color?: number;
            fields?: { name: string; value: string; inline?: boolean; }[];
            footer?: { text: string; iconUrl?: string; };
            thumbnail?: { url: string; };
            image?: { url: string; };
        };
        userId?: string;
        roleId?: string;
        roleName?: string;
    };
}

export interface IWorkflowJiraNode <N extends string> extends IWorkflowActionNode<N, "jira"> {
    actionType: "jira";
    properties: {
        operation: "createIssue" | "updateIssue" | "getIssue" | "searchIssues" | "addComment" | "transition";
        baseUrl: string;
        email: string;
        apiToken: string;
        projectKey?: string;
        issueKey?: string;
        issueType?: string;
        summary?: string;
        description?: string;
        assignee?: string;
        labels?: string[];
        priority?: string;
        customFields?: Record<string, any>;
        jql?: string;
        comment?: string;
        transitionId?: string;
    };
}

export interface IWorkflowGitHubNode <N extends string> extends IWorkflowActionNode<N, "github"> {
    actionType: "github";
    properties: {
        operation: "createIssue" | "createPR" | "updateIssue" | "addComment" | "mergePR" | "createRelease";
        token: string;
        owner: string;
        repo: string;
        title?: string;
        body?: string;
        labels?: string[];
        assignees?: string[];
        issueNumber?: number;
        prNumber?: number;
        head?: string;
        base?: string;
        tagName?: string;
        releaseName?: string;
        draft?: boolean;
        prerelease?: boolean;
    };
}

export interface IWorkflowTrelloNode <N extends string> extends IWorkflowActionNode<N, "trello"> {
    actionType: "trello";
    properties: {
        operation: "createCard" | "updateCard" | "moveCard" | "addComment" | "createList" | "createBoard";
        apiKey: string;
        token: string;
        boardId?: string;
        listId?: string;
        cardId?: string;
        name?: string;
        description?: string;
        position?: "top" | "bottom" | number;
        labels?: string[];
        members?: string[];
        dueDate?: string;
        comment?: string;
        boardName?: string;
        listName?: string;
    };
}

export type IWorkflowIntegrationNodes<N extends string> = 
    | IWorkflowSlackNode <N>
    | IWorkflowTeamsNode <N>
    | IWorkflowDiscordNode<N>
    | IWorkflowJiraNode<N>
    | IWorkflowGitHubNode<N>
    | IWorkflowTrelloNode<N>;
// #endregion
