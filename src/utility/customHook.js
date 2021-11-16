import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom React Hook API
 * Component가 rerender될 때 페러미터로 넘겨받은 value의 이전 버전을 불러온다.
 * @param {*} value
 * @returns
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function deepCompareEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
