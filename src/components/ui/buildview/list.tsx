import { Paragraph } from "@/components/shared/paragraph"

export function BuildViewList({build}: any) {
    return(
        <>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Build Order Steps</h2>
            <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 bg-gray-700 p-4 font-semibold text-gray-200 border-b border-gray-400 rounded-t-md text-sm lg:text-base">
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
                        <Paragraph size="medium" className="font-mono text-sm lg:text-base text-white">{step.timing.value}</Paragraph>
                        <Paragraph size="xsmall" className="text-gray-400">{step.timing.type}</Paragraph>
                    </div>

                    {/* Action */}
                    <div className="lg:col-span-3 flex-grow text-xs lg:text-sm">
                    {step.action.value ? (
                        <Paragraph size="small" className="space-x-1.5 text-white">
                            <span>{step.action.value}</span>
                            <span className="">{step.amount == 0 ? '' : `x${step.amount}`}</span>
                        </Paragraph>
                    ) : (
                        <Paragraph size="medium" className="text-gray-400">- - -</Paragraph>
                    )}
                    </div>

                        
                    {/* Description */}
                    <div className="lg:col-span-7">
                        {step.description ? (
                        <Paragraph size="small">{step.description}</Paragraph>
                        ) : (
                        <Paragraph size="medium" className="text-gray-400">- - -</Paragraph>
                        )}
                    </div>


                </div>
                ))}
            </div>
        </>
    )
}