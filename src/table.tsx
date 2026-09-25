import { useMemo, useState, type ReactNode, type Key } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "./controls";
import { EmptyState } from "./layout";
export interface Column<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "start" | "end";
}
export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => Key;
  caption: string;
  emptyTitle?: string;
  loading?: boolean;
}
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  emptyTitle = "Nothing here yet",
  loading = false,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ id: string; direction: 1 | -1 } | null>(
    null,
  );
  const sorted = useMemo(() => {
    const column = columns.find((c) => c.id === sort?.id);
    return column?.sortValue && sort
      ? [...rows].sort((a, b) => {
          const av = column.sortValue!(a),
            bv = column.sortValue!(b);
          return (
            (typeof av === "number" && typeof bv === "number"
              ? av - bv
              : String(av).localeCompare(String(bv))) * sort.direction
          );
        })
      : rows;
  }, [rows, columns, sort]);
  return (
    <div
      className="rw-table-wrap"
      tabIndex={0}
      role="region"
      aria-label={caption}
    >
      <table className="rw-table" aria-busy={loading}>
        <caption className="rw-sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.id}
                scope="col"
                style={{ textAlign: c.align === "end" ? "right" : "left" }}
                aria-sort={
                  c.sortValue
                    ? sort?.id === c.id
                      ? sort.direction === 1
                        ? "ascending"
                        : "descending"
                      : "none"
                    : undefined
                }
              >
                {c.sortValue ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() =>
                      setSort({
                        id: c.id,
                        direction:
                          sort?.id === c.id && sort.direction === 1 ? -1 : 1,
                      })
                    }
                  >
                    {c.header}
                    {sort?.id === c.id ? (
                      sort.direction === 1 ? (
                        <ArrowUp size={13} />
                      ) : (
                        <ArrowDown size={13} />
                      )
                    ) : (
                      <ArrowUpDown size={13} />
                    )}
                  </Button>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="rw-empty" role="status">
                  Loading records…
                </div>
              </td>
            </tr>
          ) : sorted.length ? (
            sorted.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((c) => (
                  <td
                    key={c.id}
                    style={{ textAlign: c.align === "end" ? "right" : "left" }}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState title={emptyTitle} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
