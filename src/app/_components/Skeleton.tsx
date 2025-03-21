type SkeletonProps = React.ComponentPropsWithoutRef<"div">;

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
	return (
		<div
			className={`mx-auto w-full rounded-md border-2 border-gray-200 p-4 ${className}`}
			{...props}
		>
			<div className="flex animate-pulse space-x-4">
				<div className="size-10 rounded-full bg-gray-200" />
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 rounded bg-gray-200" />
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="col-span-2 h-2 rounded bg-gray-200" />
							<div className="col-span-1 h-2 rounded bg-gray-200" />
						</div>
						<div className="h-2 rounded bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skeleton;
