import { useEffect } from "react";

export function ScrollToTopOnMount({ sheetRef }) {
  useEffect(() => {
    sheetRef.current?.scrollTo(0, 0);
  }, []);

  return null;
}

export function ScrollToTargetOnMount({ targetId, option }) {
  useEffect(() => {
    document.getElementById(targetId)?.scrollIntoView(option);
  }, []);

  return null;
}
