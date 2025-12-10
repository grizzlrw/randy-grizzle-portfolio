import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("Forms [slug] Not Found Page", () => {
  it("renders not found heading", () => {
    render(<NotFound />);
    
    expect(screen.getByRole("heading", { name: /form not found/i })).toBeInTheDocument();
  });

  it("displays friendly message without revealing details", () => {
    render(<NotFound />);
    
    expect(screen.getByText(/The form you're looking for doesn't exist or may have been removed./i)).toBeInTheDocument();
  });

  it("provides navigation options", () => {
    render(<NotFound />);
    
    const formsLink = screen.getByRole("link", { name: /browse available forms/i });
    const homeLink = screen.getByRole("link", { name: /go home/i });
    
    expect(formsLink).toHaveAttribute("href", "/forms");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
