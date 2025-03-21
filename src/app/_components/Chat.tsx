import type { Chat as ChatType } from "@/type";
import { isoToTime } from "@/utils";
import ChatDate from "./ChatDate";

interface ChatProps {
	chat: ChatType;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
	if (chat.sender.name.toLowerCase().includes("system")) {
		return <ChatDate date={chat.message} />;
	}
	return (
		<div
			className="relative w-full flex flex-row data-[isme=true]:justify-end"
			data-isme={chat.isMe}
		>
			<div
				className="w-3/4 bg-green-50 data-[isme=true]:bg-green-500 p-4 rounded-2xl text-zinc-950 flex flex-col gap-2"
				data-isme={chat.isMe}
			>
				<div className="flex flex-row items-center gap-2">
					<div className="w-8 h-8 rounded-full">
						<img
							src={
								chat.isMe
									? "https://avatars.githubusercontent.com/u/38126197"
									: chat.sender.avatar
							}
							alt={chat.isMe ? "Risqi Romadhoni" : chat.sender.name}
							className="object-cover object-center rounded-full"
						/>
					</div>
					<h2 className="font-semibold text-sm flex-1">{chat.sender.name}</h2>
					<em className="font-semibold text-sm">{isoToTime(chat.timestamp)}</em>
				</div>
				<p className="font-normal text-pretty">{chat.message}</p>
			</div>
		</div>
	);
};

export default Chat;
