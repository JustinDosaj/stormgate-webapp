// components/AdSense.tsx
import React, { useEffect } from 'react';
import { useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat: string;
  adStyle?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot, adFormat, className, adStyle = {} }) => {

  const isClientSide = useRef(false);

  useEffect(() => {
    const loadAds = () => {
      if (typeof window !== 'undefined' && isClientSide.current) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Adsense error', e);
        }
      }
    };
    loadAds();
  }, []);

  return (
    <div className={`hidden ${className}`} style={{ textAlign: 'center', ...adStyle }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...adStyle }}
        data-ad-client="ca-pub-5837655994202747"  // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
      />
    </div>
  );
};

export default AdSense;
