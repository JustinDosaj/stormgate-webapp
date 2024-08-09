import AdSense from "./adsense"

interface StickyAdProps {
    adSlot: string;
}

export function StickyAd({adSlot}: StickyAdProps) {

    return(
        <div className="hidden 2xl:block mt-10">
            <div className="sticky top-20">
            {/* Right Sticky Ad */}
            <AdSense 
                adSlot={`${adSlot}`}  // Replace with your Ad Slot ID
                adFormat="rectangle"
                adStyle={{ width: '160px', height: '600px' }}
            />
            </div>
        </div>
    )
}