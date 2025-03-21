import type { GetChatResponse } from "@/type";
import { isoToDate, isoToTime } from "@/utils";
import { faker } from "@faker-js/faker";
import Chats from "./_components/Chats";

export default async function Home() {
	const { chats } = await fetch("http://localhost:3000/api/chats").then(
		(res) => res.json() as unknown as GetChatResponse,
	);

	const chatsWithDate = chats
		.map((c) => ({
			...c,
			date: isoToDate(c.timestamp),
			time: isoToTime(c.timestamp),
		}))
		.sort((a, b) => {
			const [aHours, aMinutes] = a.time.split(":").map(Number);
			const [bHours, bMinutes] = b.time.split(":").map(Number);
			return bHours * 60 + bMinutes - (aHours * 60 + aMinutes); // DESC
		});
	const groupedChatObj = Object.groupBy(
		chatsWithDate,
		(chat) => chat.date,
	) as unknown as Record<string, typeof chats>;
	const groupedChats = Object.entries(groupedChatObj).flatMap(
		([date, chatEntries]) => [
			...chatEntries,
			{
				id: faker.string.uuid(),
				sender: {
					id: faker.string.uuid(),
					name: "System",
					avatar: faker.image.avatar(),
				},
				message: date,
				timestamp: faker.date.recent().toISOString(),
				isMe: false,
			},
		],
	);

	return (
		<div className="h-screen w-screen overflow-hidden container mx-auto">
			<main className="relative h-full w-full flex flex-col items-center">
				<Chats chats={groupedChats} />
			</main>
		</div>
	);
}
