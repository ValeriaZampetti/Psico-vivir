
export function useTimestampToString(secs: number):string {
    const date: Date = new Date(secs*1000);
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];
    const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dateString = day + " de " + month + " de " + year;
    return dateString
}