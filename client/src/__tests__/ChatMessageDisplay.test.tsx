import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChatMessageDisplay from "../components/ChatMessage/ChatMessageDisplay";
import { ChatMessage } from "../../../shared";
import "@testing-library/jest-dom/vitest";

describe("ChatMessageDisplay", () => {
  const mockMessage: ChatMessage = {
    id: "1",
    content: "Test message",
    author: {
      userId: "user1",
      name: "Test User",
    },
    timestamp: Date.now(),
  };

  const mockHandlers = {
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  it("renders message content correctly", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows edit/delete buttons for own messages", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("does not show edit/delete buttons for other users messages", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user2"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  it("enters edit mode when edit button is clicked", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onEdit when saving edited message", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Edited message" } });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(mockHandlers.onEdit).toHaveBeenCalledWith("1", "Edited message");
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith("1");
  });

  it("has correct accessibility attributes", () => {
    render(
      <ChatMessageDisplay
        message={mockMessage}
        userId="user1"
        onDelete={mockHandlers.onDelete}
        onEdit={mockHandlers.onEdit}
      />,
    );

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      expect.stringContaining("Message from Test User"),
    );
  });
});
