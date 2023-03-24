export function getRelativeTimeString(date: Date): string {
  const timeMilliseconds = date.getTime();
  const nowMilliseconds = new Date().getTime();

  const timeDifference = nowMilliseconds - timeMilliseconds;
  const timeDifferenceInSeconds = Math.round(timeDifference / 1000);

  const cutoffs = [
    { name: "second", value: 60 },
    { name: "minute", value: 3600 },
    { name: "hour", value: 86400 },
    { name: "day", value: 86400 * 7 },
    { name: "week", value: 86400 * 30 },
    { name: "month", value: 86400 * 365 },
    { name: "year", value: Infinity },
  ];

  const unitIndex = cutoffs.findIndex((cutoff) => {
    return cutoff.value > Math.abs(timeDifferenceInSeconds);
  });

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    numeric: "auto",
  });

  const divisor = unitIndex ? cutoffs[unitIndex - 1].value : 1;

  const timeDifferenceInUnit = Math.round(timeDifferenceInSeconds / divisor);

  return rtf.format(-timeDifferenceInUnit, cutoffs[unitIndex].name as Intl.RelativeTimeFormatUnit);
}

export function capitalize(stringValue: string): string {
  const capitalizedStrings = stringValue.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedStrings.join(" ");
}
