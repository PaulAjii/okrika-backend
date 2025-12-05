export function formatSysMessage(
  message: string,
  ...args: (string | number)[]
): string {
  return message.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== 'undefined' ? String(args[number]) : match,
  );
}
