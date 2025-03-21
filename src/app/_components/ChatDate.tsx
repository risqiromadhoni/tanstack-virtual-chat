interface ChatDateProps {
	date: string;
}

const ChatDate: React.FC<ChatDateProps> = ({ date }) => {
	return (
		<div className="relative text-white rounded-full bg-zinc-700 w-fit px-3 py-1 mx-auto">
			{date}
		</div>
	);
};

export default ChatDate;
