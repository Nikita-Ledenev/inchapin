"use client";

import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
