import { Button } from '@/components/ui/button';

export function Pagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pageCount || Math.abs(n - page) <= 1
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1">
      <p className="text-sm text-[#6B7280]">
        Showing {start}-{end} of {totalItems.toLocaleString()}
      </p>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {pageNumbers.map((n, i) => {
          const previous = pageNumbers[i - 1];
          const showEllipsis = previous !== undefined && n - previous > 1;
          return (
            <span key={n} className="flex items-center gap-1.5">
              {showEllipsis && (
                <span className="px-1 text-sm text-[#9CA3AF]">…</span>
              )}
              <Button
                variant={n === page ? 'default' : 'outline'}
                size="sm"
                className={n === page ? 'bg-[#6C3CE1] hover:bg-[#5A2EC0]' : ''}
                onClick={() => onPageChange(n)}
              >
                {n}
              </Button>
            </span>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
