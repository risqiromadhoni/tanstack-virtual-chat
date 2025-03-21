interface SenderChat {
	id: string;
	name: string;
	avatar: string;
}

export interface Chat {
	id: string;
	sender: SenderChat;
	message: string;
	timestamp: string;
	isMe: boolean;
}

export interface GetChatResponse {
	chats: Chat[];
}
