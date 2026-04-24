import { useCounter } from "@/hooks/useCounter";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
}

export const Counter = ({ to, prefix = "", suffix = "", pad = 0 }: CounterProps) => {
  const { ref, value } = useCounter(to);
  const formatted = pad > 0 ? String(value).padStart(pad, "0") : value.toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
