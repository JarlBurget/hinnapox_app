// This file acts as a proxy.
// Metro Bundler will automatically pick:
// 1. components/MapScreen.web.tsx (for Web)
// 2. components/MapScreen.tsx (for iOS/Android)

import React from 'react';
import MapScreen from 'components/MapScreen';
import ClientOnly from 'components/ClientOnlyComponent';


export default function MapPage() {
  return (
    // 3. Wrap the MapScreen so it only renders on the client (browser)
    <ClientOnly>
      <MapScreen />
    </ClientOnly>
  );
}