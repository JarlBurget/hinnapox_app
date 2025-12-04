import React, { useState, useEffect } from 'react';
// Remove View/ActivityIndicator imports if not used elsewhere

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // CHANGED: Return null instead of a loader. 
    // This prevents HTML mismatches between server and client.
    return null;
  }

  return <>{children}</>;
}

export default ClientOnly;