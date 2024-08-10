export function BuildViewList({build}: any) {
    return(
        <>
            <h2 className="text-2xl font-semibold mb-4">Build Order Steps</h2>
            <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 bg-gray-700 p-4 font-semibold text-gray-300 border-b border-gray-400 rounded-t-md text-sm lg:text-base">
                <div className="lg:col-span-2 flex">Timing</div>
                <div className="lg:col-span-3 hidden lg:block">Unit/Structure/Action</div>
                <div className="lg:col-span-3 block lg:hidden">Unit</div>
                <div className="lg:col-span-7">Description</div>
            </div>
            <div className="bg-gray-800 rounded-b-md">
                {build.steps.map((step: any, index: number) => (
                <div key={step.id} className="grid grid-cols-3 lg:grid-cols-12 gap-4 items-center p-4 border-b border-gray-700">
                    {/* Timing */}
                    <div className="lg:col-span-2 flex items-center space-x-2">
                        <span className="font-mono text-sm lg:text-base">{step.timing.value}</span>
                        <span className="text-xs lg:text-sm text-gray-400">{step.timing.type}</span>
                    </div>

                    {/* Action */}
                    <div className="lg:col-span-3 flex-grow text-xs lg:text-sm">
                    {step.action.value ? (
                        <div className="space-x-1.5">
                            <span>{step.action.value}</span>
                            <span className="">{step.amount == 0 ? '' : `x${step.amount}`}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400 text-sm">No action specified</span>
                    )}
                    </div>


                    {/* Description */}
                    <div className="lg:col-span-7 text-xs lg:text-sm text-gray-300">
                        {step.description || "No description provided"}
                    </div>


                </div>
                ))}
            </div>
        </>
    )
}