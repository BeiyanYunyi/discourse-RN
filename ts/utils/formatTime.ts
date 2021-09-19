import { formatDistance } from "date-fns";

const formatTime = (timeStr: string, before?: string, after?: string) => {
  const date = new Date(timeStr);
  return `${before || ""}${formatDistance(new Date(), date)}${after || ""}`;
};

export default formatTime;
