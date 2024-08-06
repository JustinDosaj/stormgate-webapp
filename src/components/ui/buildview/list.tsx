export function BuildViewList({build}: any) {
    return(
        <div className="bg-gray-800 rounded-b-md">
            {build.steps.map((step: any, index: number) => (
            <div
                key={step.id}
                className="grid grid-cols-4 gap-4 items-center p-4 border-b border-gray-700"
            >
                {/* Timing */}
                <div className="flex items-center space-x-2">
                <span className="font-mono">{step.timing.value}</span>
                <span className="text-xs text-gray-400">{step.timing.type}</span>
                </div>

                {/* Action */}
                <div className="flex-grow">
                {step.action.value ? (
                    <span className="font-medium">{step.action.value}</span>
                ) : (
                    <span className="text-gray-400 italic">No action specified</span>
                )}
                </div>

                {/* Description */}
                <div className="text-sm text-gray-400">
                {step.description || "No description provided"}
                </div>

                {/* Amount */}
                <div className="text-center">
                <span className="font-bold">{step.amount == 0 ? '' : `x${step.amount}`}</span>
                </div>

            </div>
            ))}
        </div>
    )
}