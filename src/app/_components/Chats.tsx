"use client";

import type { Chat } from "@/type";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import ChatBox from "./Chat";

interface ChatsProps extends React.ComponentPropsWithoutRef<"div"> {
	chats: Chat[];
}

const Chats: React.FC<ChatsProps> = ({ chats, className, style, ...props }) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		enabled: chats.length > 0,
		count: chats.length,
		debug: true,
		gap: 4,
		paddingStart: 8,
		paddingEnd: 8,
		estimateSize: () => 50,
		getScrollElement: () => scrollRef.current,
		measureElement: (el) => el.getBoundingClientRect().height,
		getItemKey: (idx) => chats[idx].id ?? idx,
	});
	const rowVirtualizerItems = rowVirtualizer.getVirtualItems();

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			e.preventDefault();
			const currentTarget = e.currentTarget as HTMLElement;

			if (currentTarget) {
				currentTarget.scrollTop -= e.deltaY;
			}
		};
		scrollRef.current?.addEventListener("wheel", handleScroll, {
			passive: false,
		});
		return () => {
			scrollRef.current?.removeEventListener("wheel", handleScroll);
		};
	}, []);

	return (
		<div
			ref={scrollRef}
			className={`relative flex-1 w-full overflow-y-auto ${className}`}
			style={{
				transform: "scaleY(-1)",
				...style,
			}}
			{...props}
		>
			<ul
				className="relative w-full"
				style={{
					height: rowVirtualizer.getTotalSize(),
				}}
			>
				{rowVirtualizerItems.map((rowVirtualizerItem) => {
					const chat = chats.find((c) => c.id === rowVirtualizerItem.key);
					if (!chat) return null;
					return (
						<li
							key={rowVirtualizerItem.key}
							data-index={rowVirtualizerItem.index}
							ref={rowVirtualizer.measureElement}
							className="absolute top-0 left-0 w-full"
							style={{
								transform: `translateY(${rowVirtualizerItem.start}px) scaleY(-1)`,
							}}
						>
							<ChatBox chat={chat} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Chats;
