import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Button,
  TextField,
  Modal,
  DataTable,
  WardrobeProvider,
  NotificationProvider,
  useNotifications,
} from "../src";
describe("public components", () => {
  it("blocks duplicate submission while loading", async () => {
    const press = vi.fn();
    render(
      <Button loading onPress={press}>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(press).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });
  it("associates labels and errors", () => {
    render(<TextField label="Email" errorMessage="Invalid address" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("Invalid address")).toBeVisible();
  });
  it("opens and closes a dialog with Escape", async () => {
    render(
      <WardrobeProvider>
        <Modal trigger={<Button>Open</Button>} title="Settings">
          <TextField label="Name" />
        </Modal>
      </WardrobeProvider>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("sorts rows without changing input data", async () => {
    const rows = [{ name: "Zed" }, { name: "Amy" }];
    render(
      <DataTable
        rows={rows}
        rowKey={(r) => r.name}
        caption="People"
        columns={[
          {
            id: "name",
            header: "Name",
            cell: (r) => r.name,
            sortValue: (r) => r.name,
          },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Name/ }));
    expect(screen.getAllByRole("cell").map((c) => c.textContent)).toEqual([
      "Amy",
      "Zed",
    ]);
    expect(rows[0].name).toBe("Zed");
  });
  it("deduplicates incoming events and keeps sound opt-in", async () => {
    function Consumer() {
      const { notify, notifications, soundEnabled, clear } = useNotifications();
      return (
        <>
          <Button
            onPress={() => {
              notify({ id: "same", title: "Ready" });
              notify({ id: "same", title: "Ready" });
            }}
          >
            Notify
          </Button>
          <Button onPress={clear}>Clear</Button>
          <output>
            {notifications.length}:{String(soundEnabled)}
          </output>
        </>
      );
    }
    render(
      <WardrobeProvider>
        <NotificationProvider>
          <Consumer />
        </NotificationProvider>
      </WardrobeProvider>,
    );
    await userEvent.click(screen.getByText("Notify"));
    expect(screen.getByText("1:false")).toBeVisible();
    await userEvent.click(screen.getByText("Clear"));
    expect(screen.getByText("0:false")).toBeVisible();
  });
});
