import { type ReactNode } from "react";
import * as A from "react-aria-components";
import { ChevronRight, Check } from "lucide-react";
export interface CollectionItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
export interface ListBoxProps extends Omit<
  A.ListBoxProps<CollectionItem>,
  "children" | "className" | "items"
> {
  label: string;
  items: CollectionItem[];
}
export function ListBox({ label, items, ...props }: ListBoxProps) {
  return (
    <A.ListBox
      {...props}
      aria-label={label}
      items={items}
      disabledKeys={items.filter((i) => i.disabled).map((i) => i.id)}
      className="rw-listbox rw-collection"
      renderEmptyState={() => <p className="rw-empty">No items available</p>}
    >
      {(item) => (
        <A.ListBoxItem
          id={item.id}
          textValue={item.label}
          className="rw-option"
        >
          <div>
            <A.Text slot="label">{item.label}</A.Text>
            {item.description && (
              <A.Text slot="description" className="rw-description">
                {item.description}
              </A.Text>
            )}
          </div>
          <Check className="rw-option-check" size={16} />
        </A.ListBoxItem>
      )}
    </A.ListBox>
  );
}
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}
export interface TreeProps extends Omit<
  A.TreeProps<TreeNode>,
  "children" | "className" | "items"
> {
  label: string;
  items: TreeNode[];
}
export function Tree({ label, items, ...props }: TreeProps) {
  function node(item: TreeNode): ReactNode {
    return (
      <A.TreeItem
        key={item.id}
        id={item.id}
        textValue={item.label}
        className="rw-tree-item"
      >
        <A.TreeItemContent>
          {({ hasChildItems, isExpanded }) => (
            <>
              <A.Button
                slot="chevron"
                className="rw-tree-chevron"
                style={{ visibility: hasChildItems ? "visible" : "hidden" }}
              >
                <ChevronRight
                  size={15}
                  style={{
                    transform: isExpanded ? "rotate(90deg)" : undefined,
                  }}
                />
              </A.Button>
              <span>{item.label}</span>
            </>
          )}
        </A.TreeItemContent>
        {item.children?.map(node)}
      </A.TreeItem>
    );
  }
  return (
    <A.Tree {...props} aria-label={label} className="rw-tree">
      {items.map(node)}
    </A.Tree>
  );
}
