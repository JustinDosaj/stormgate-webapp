// components/Sidebar.tsx

import AdSense from "./adsense";

const Sidebar = () => {
  return (
    <div className="hidden lg:block w-60">
      <AdSense 
        adSlot="0987654321"  // Replace with your Ad Slot ID
        adFormat="rectangle"
        adStyle={{ width: '300px', height: '250px' }}
      />
    </div>
  );
};

export default Sidebar;
