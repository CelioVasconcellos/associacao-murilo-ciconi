type DemoQrCodeProps = {
  label: string;
  compact?: boolean;
};

const size = 21;
const finders = [
  [0, 0],
  [0, 14],
  [14, 0],
];

function isFinderModule(row: number, column: number) {
  return finders.some(([startRow, startColumn]) => {
    const rowOffset = row - startRow;
    const columnOffset = column - startColumn;

    if (rowOffset < 0 || rowOffset > 6 || columnOffset < 0 || columnOffset > 6) return false;

    return (
      rowOffset === 0 || rowOffset === 6 || columnOffset === 0 || columnOffset === 6 ||
      (rowOffset >= 2 && rowOffset <= 4 && columnOffset >= 2 && columnOffset <= 4)
    );
  });
}

function isDarkModule(row: number, column: number) {
  if (isFinderModule(row, column)) return true;

  const isFinderBackground = finders.some(([startRow, startColumn]) =>
    row >= startRow - 1 && row <= startRow + 7 && column >= startColumn - 1 && column <= startColumn + 7
  );

  return !isFinderBackground && ((row * 13 + column * 7 + row * column * 3) % 11 < 5);
}

export default function DemoQrCode({ label, compact = false }: DemoQrCodeProps) {
  return (
    <div className={`demo-qr${compact ? " demo-qr-compact" : ""}`} role="img" aria-label={label}>
      {Array.from({ length: size * size }, (_, index) => {
        const row = Math.floor(index / size);
        const column = index % size;
        return <span className={isDarkModule(row, column) ? "demo-qr-dark" : undefined} key={index} />;
      })}
    </div>
  );
}