import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

const formatTime = (timeStr: string, before?: string, after?: string) => {
  const date = new Date(timeStr);
  return `${before || ""}${formatDistance(new Date(), date, {
    locale: zhCN,
  })}前${after || ""}`;
};

export default formatTime;
