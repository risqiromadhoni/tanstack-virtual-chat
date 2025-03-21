import type { Chat, GetChatResponse } from "@/type";
import { faker } from "@faker-js/faker";

const generateChats = (count = 100) => {
	return Array.from({ length: count }, () => {
		const isMe = faker.datatype.boolean();
		return {
			id: faker.string.uuid(),
			sender: {
				id: faker.string.uuid(),
				name: isMe ? "Risqi R." : faker.person.fullName(),
				avatar: isMe
					? "https://avatars.githubusercontent.com/u/38126197"
					: faker.image.avatar(),
			},
			message: faker.lorem.paragraph(),
			timestamp: faker.date.recent().toISOString(),
			isMe,
		} satisfies Chat;
	});
};

export async function GET() {
	const chats = generateChats(2000);
	return new Response(JSON.stringify({ chats } satisfies GetChatResponse), {
		headers: { "Content-Type": "application/json" },
	});
}
