export const formatTimestamp = (timestampObj) => {
    if (!timestampObj || typeof timestampObj.secs !== "number") {
      return "N/A";
    }
  
    // Convert seconds to milliseconds
    const date = new Date(timestampObj.secs * 1000);
  
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };
  
  export const isEVMTransaction = (hash) => {
    return hash.startsWith("0x") && hash.length < 80;
  };