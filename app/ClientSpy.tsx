"use client";

import { useEffect } from "react";

export function ClientSpy(props: { spanId: string }) {
  useEffect(() => {});

  if (globalThis?.__clientRenderSpyCallbacks?.[props.spanId]) {
    globalThis.__clientRenderSpyCallbacks[props.spanId]();
  }

  return <></>;
}
