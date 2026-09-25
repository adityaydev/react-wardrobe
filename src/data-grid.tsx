import {
  Fragment,
  useId,
  useMemo,
  useState,
  type Key,
  type ReactNode,
} from "react";
import { Button, Checkbox } from "./controls";
import { SearchField } from "./inputs";
import { Pagination } from "./navigation";
import { Popover } from "./dialogs";
import { EmptyState, Inline } from "./layout";
import type { Column } from "./table";
import { ChevronDown, ChevronRight, ArrowUpDown } from "lucide-react";
export interface DataGridProps<T> {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => Key;
  rowLabel: (row: T) => string;
  caption: string;
  searchText?: (row: T) => string;
  pageSize?: number;
  selection?: Set<Key>;
  onSelectionChange?: (keys: Set<Key>) => void;
  renderExpanded?: (row: T) => ReactNode;
  loading?: boolean;
  emptyTitle?: string;
}
export function DataGrid<T>({
  rows,
  columns,
  rowKey,
  rowLabel,
  caption,
  searchText,
  pageSize = 10,
  selection,
  onSelectionChange,
  renderExpanded,
  loading = false,
  emptyTitle = "No matching records",
}: DataGridProps<T>) {
  const [query, setQuery] = useState(""),
    [page, setPage] = useState(1),
    [hidden, setHidden] = useState(new Set<string>()),
    [expanded, setExpanded] = useState(new Set<Key>()),
    [localSelection, setLocalSelection] = useState(new Set<Key>()),
    [sort, setSort] = useState<{ id: string; direction: 1 | -1 } | null>(null);
  const id = useId();
  const selected = selection ?? localSelection;
  const size = Math.max(1, Math.floor(pageSize) || 10);
  const filtered = useMemo(() => {
    const found = searchText
      ? rows.filter((r) =>
          searchText(r).toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        )
      : rows;
    const column = columns.find((c) => c.id === sort?.id);
    return sort && column?.sortValue
      ? [...found].sort((a, b) => {
          const av = column.sortValue!(a),
            bv = column.sortValue!(b);
          return (
            (typeof av === "number" && typeof bv === "number"
              ? av - bv
              : String(av).localeCompare(String(bv))) * sort.direction
          );
        })
      : found;
  }, [rows, columns, query, searchText, sort]);
  const count = Math.max(1, Math.ceil(filtered.length / size)),
    current = Math.min(page, count),
    visible = filtered.slice((current - 1) * size, current * size),
    shown = columns.filter((c) => !hidden.has(c.id));
  const all =
      visible.length > 0 && visible.every((r) => selected.has(rowKey(r))),
    some = visible.some((r) => selected.has(rowKey(r)));
  function update(next: Set<Key>) {
    setLocalSelection(next);
    onSelectionChange?.(next);
  }
  function toggle(key: Key) {
    const next = new Set(selected);
    next.has(key) ? next.delete(key) : next.add(key);
    update(next);
  }
  return (
    <div className="rw-data-grid">
      <div className="rw-grid-toolbar">
        {searchText && (
          <SearchField
            label={`Search ${caption}`}
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Filter records…"
          />
        )}
        <Popover
          title="Visible columns"
          trigger={<Button variant="secondary">Columns</Button>}
        >
          <div className="rw-stack">
            {columns.map((c) => (
              <Checkbox
                key={c.id}
                isSelected={!hidden.has(c.id)}
                isDisabled={!hidden.has(c.id) && shown.length === 1}
                onChange={(v) => {
                  const next = new Set(hidden);
                  v ? next.delete(c.id) : next.add(c.id);
                  setHidden(next);
                }}
              >
                {c.header}
              </Checkbox>
            ))}
          </div>
        </Popover>
      </div>
      <p className="rw-description" role="status">
        {filtered.length} records ·{" "}
        {rows.filter((r) => selected.has(rowKey(r))).length} selected
      </p>
      <div
        className="rw-table-wrap"
        role="region"
        aria-label={caption}
        tabIndex={0}
      >
        <table className="rw-table" aria-busy={loading}>
          <caption className="rw-sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">
                <Checkbox
                  aria-label="Select current page"
                  isSelected={all}
                  isIndeterminate={some && !all}
                  isDisabled={loading || visible.length === 0}
                  onChange={(value) => {
                    const next = new Set(selected);
                    visible.forEach((r) =>
                      value ? next.add(rowKey(r)) : next.delete(rowKey(r)),
                    );
                    update(next);
                  }}
                >
                  <span className="rw-sr-only">Select current page</span>
                </Checkbox>
              </th>
              {renderExpanded && (
                <th scope="col">
                  <span className="rw-sr-only">Details</span>
                </th>
              )}
              {shown.map((c) => (
                <th
                  key={c.id}
                  scope="col"
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
                      onPress={() => {
                        setSort({
                          id: c.id,
                          direction:
                            sort?.id === c.id && sort.direction === 1 ? -1 : 1,
                        });
                        setPage(1);
                      }}
                    >
                      {c.header}
                      <ArrowUpDown size={13} />
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
                <td colSpan={shown.length + 1 + Number(!!renderExpanded)}>
                  <div className="rw-empty" role="status">
                    Loading records…
                  </div>
                </td>
              </tr>
            ) : visible.length ? (
              visible.map((r, index) => {
                const key = rowKey(r),
                  open = expanded.has(key),
                  detailId = `${id}-${index}`;
                return (
                  <Fragment key={key}>
                    <tr data-selected={selected.has(key)}>
                      <td>
                        <Checkbox
                          aria-label={`Select ${rowLabel(r)}`}
                          isSelected={selected.has(key)}
                          onChange={() => toggle(key)}
                        >
                          <span className="rw-sr-only">
                            Select {rowLabel(r)}
                          </span>
                        </Checkbox>
                      </td>
                      {renderExpanded && (
                        <td>
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label={`Details for ${rowLabel(r)}`}
                            aria-expanded={open}
                            aria-controls={open ? detailId : undefined}
                            onPress={() => {
                              const next = new Set(expanded);
                              open ? next.delete(key) : next.add(key);
                              setExpanded(next);
                            }}
                          >
                            {open ? (
                              <ChevronDown size={15} />
                            ) : (
                              <ChevronRight size={15} />
                            )}
                          </Button>
                        </td>
                      )}
                      {shown.map((c) => (
                        <td
                          key={c.id}
                          style={{
                            textAlign: c.align === "end" ? "end" : "start",
                          }}
                        >
                          {c.cell(r)}
                        </td>
                      ))}
                    </tr>
                    {renderExpanded && open && (
                      <tr>
                        <td
                          id={detailId}
                          colSpan={shown.length + 2}
                          className="rw-grid-detail"
                        >
                          {renderExpanded(r)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={shown.length + 1 + Number(!!renderExpanded)}>
                  <EmptyState title={emptyTitle} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Inline>
        <span className="rw-description">
          Page {current} of {count}
        </span>
        <Pagination
          page={current}
          pageCount={count}
          onPageChange={setPage}
          isDisabled={loading}
        />
      </Inline>
    </div>
  );
}
