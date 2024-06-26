import type { MetaFunction } from "@remix-run/node";

import React, { lazy, Suspense, useEffect, useState } from "react";
const LeafletMap = lazy(() =>
  import("~/components/LeafletMap").then((module) => ({
    default: module.default,
  }))
);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, []);
  return (
    <div className="h-screen w-screen">
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <LeafletMap />
        </Suspense>
      )}
    </div>
  );
}
