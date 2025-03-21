import React from "react";
import Skeleton from "./_components/Skeleton";

const Loader = () => {
	return (
		<div className="container flex flex-col gap-1">
			{Array.from({ length: 10 }, (_, key) => key).map((idx) => (
				<Skeleton key={idx} className="max-w-3/4" />
			))}
		</div>
	);
};

export default Loader;
