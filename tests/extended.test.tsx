import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import * as W from "../src";
function wrap(ui: React.ReactNode) {
  return render(
    <W.WardrobeProvider>
      <W.NotificationProvider>{ui}</W.NotificationProvider>
    </W.WardrobeProvider>,
  );
}
describe("extended components", () => {
  it("tabs change the visible panel using the keyboard", async () => {
    wrap(
      <W.Tabs
        label="Sections"
        items={[
          { id: "one", label: "One", content: "First panel" },
          { id: "two", label: "Two", content: "Second panel" },
        ]}
      />,
    );
    screen.getByRole("tab", { name: "One" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Second panel");
  });
  it("accordion exposes and collapses its content", async () => {
    wrap(
      <W.Accordion
        items={[{ id: "one", title: "Details", content: "Extra information" }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByText("Extra information")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByRole("button", { name: "Details" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
  it("confirmation stays open on an asynchronous failure", async () => {
    const confirm = vi.fn().mockRejectedValue(new Error("failed"));
    wrap(
      <W.ConfirmDialog
        trigger={<W.Button>Delete</W.Button>}
        title="Confirm removal"
        description="Remove this item?"
        onConfirm={confirm}
      />,
    );
    await userEvent.click(screen.getByText("Delete"));
    await userEvent.click(screen.getByRole("button", { name: /^Confirm$/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "could not be completed",
    );
    expect(screen.getByRole("dialog")).toBeVisible();
  });
  it("table sorting applies before pagination and selections survive filtering", async () => {
    const rows = [
      { id: "z", name: "Zoe" },
      { id: "a", name: "Amy" },
      { id: "b", name: "Ben" },
    ];
    wrap(
      <W.DataGrid
        rows={rows}
        columns={[
          {
            id: "name",
            header: "Name",
            cell: (r) => r.name,
            sortValue: (r) => r.name,
          },
        ]}
        rowKey={(r) => r.id}
        rowLabel={(r) => r.name}
        searchText={(r) => r.name}
        caption="People"
        pageSize={2}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Name" }));
    const cells = screen.getAllByRole("cell");
    expect(cells.map((c) => c.textContent).join(" ")).toContain("Amy");
    expect(screen.queryByText("Zoe", { exact: true })).not.toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Select Amy"));
    await userEvent.type(screen.getByRole("searchbox"), "Zoe");
    expect(screen.getByText("1 records · 1 selected")).toBeVisible();
    expect(screen.getByText("Zoe", { exact: true })).toBeVisible();
    expect(screen.queryByText("Amy", { exact: true })).not.toBeInTheDocument();
  });
  it("invalid files are rejected without firing the consumer callback", async () => {
    const change = vi.fn();
    wrap(<W.FileUpload label="Files" accept=".pdf" onFilesChange={change} />);
    const input = document.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;
    await userEvent
      .setup({ applyAccept: false })
      .upload(input, new File(["hello"], "image.txt", { type: "text/plain" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "not an accepted file",
    );
    expect(change).not.toHaveBeenCalled();
  });
  it("pagination clamps visible controls at either boundary", async () => {
    const change = vi.fn();
    wrap(<W.Pagination page={1} pageCount={10} onPageChange={change} />);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(change).toHaveBeenCalledWith(2);
  });
});
