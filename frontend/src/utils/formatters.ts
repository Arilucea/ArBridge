
/**
 * Formats a Unix timestamp (seconds or milliseconds) into a localized date/time string.
 * @param timestamp - The Unix timestamp (number).
 * @returns A formatted date/time string, or "Invalid Date" if timestamp is invalid.
 */
export const formatTimestamp = (timestamp: number | string | null | undefined): string => {
  if (timestamp === null || timestamp === undefined) {
      return "N/A";
  }

  let numericTimestamp: number;
  if (typeof timestamp === 'string') {
      numericTimestamp = parseInt(timestamp, 10);
      if (isNaN(numericTimestamp)) {
          return "Invalid Date";
      }
  } else {
      numericTimestamp = timestamp;
  }

  // Assume timestamp is in seconds if it's less than a large number (e.g., 1 Jan 2000 in ms)
  // Adjust this threshold based on expected timestamp format (seconds vs ms)
  const timestampInMs = numericTimestamp < 10000000000 ? numericTimestamp * 1000 : numericTimestamp;

  const date = new Date(timestampInMs);

  if (isNaN(date.getTime())) {
      return "Invalid Date";
  }

  // Use Intl.DateTimeFormat for better localization and options
  try {
      return new Intl.DateTimeFormat(navigator.language, { // Use browser's locale
          dateStyle: 'medium', // e.g., Sep 14, 2023
          timeStyle: 'short',  // e.g., 1:30 PM
      }).format(date);
  } catch (e) {
      console.error("Error formatting date:", e);
      // Fallback to basic formatting if Intl fails
      return date.toLocaleString();
  }
};

/**
* Checks if a transaction hash likely belongs to an EVM chain.
* Basic check: EVM hashes are typically 0x prefixed and 66 characters long (0x + 64 hex chars).
* Solana hashes are Base58 encoded and variable length (usually 87-88 chars for signatures).
* @param hash - The transaction hash string.
* @returns True if the hash looks like an EVM hash, false otherwise.
*/
export const isEVMTransaction = (hash: string | null | undefined): boolean => {
  if (!hash) {
      return false;
  }
  // Check for '0x' prefix and length of 66 characters (0x + 64 hex)
  return typeof hash === 'string' && hash.startsWith('0x') && hash.length === 66;
};