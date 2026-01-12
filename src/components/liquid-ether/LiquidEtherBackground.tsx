"use client";

import { useEffect, useMemo, useState } from "react";
import LiquidEther from "./LiquidEther";

const LIGHT_COLORS = ["#0B2B5B", "#0F4C9A", "#4ADFFF"];
const DARK_COLORS = ["#081326", "#153B74", "#4ADFFF"];

function getIsDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function LiquidEtherBackground() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(getIsDark());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => (isDark ? DARK_COLORS : LIGHT_COLORS), [isDark]);

  return <LiquidEther colors={colors} className="h-full w-full" />;
}
