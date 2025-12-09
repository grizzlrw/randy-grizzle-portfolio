import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import FormsPage from "@/app/(pages)/forms/page";
import NotFoundPage from "@/app/(pages)/forms/[slug]/not-found";
import LoadingForms from "@/app/(pages)/forms/loading";
import LoadingAbout from "@/app/(pages)/about/loading";

expect.extend(toHaveNoViolations);

describe("Accessibility - Pages", () => {
  describe("FormsPage", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<FormsPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have proper heading hierarchy", () => {
      const { container } = render(<FormsPage />);
      const h1 = container.querySelector("h1");
      const h2s = container.querySelectorAll("h2");

      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });

    it("should have accessible card links", () => {
      const { container } = render(<FormsPage />);
      const links = container.querySelectorAll("a[aria-label]");
      
      links.forEach((link) => {
        expect(link).toHaveAttribute("aria-label");
        expect(link).toHaveAttribute("aria-describedby");
      });
    });
  });

  describe("NotFoundPage", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<NotFoundPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible error message", () => {
      const { container } = render(<NotFoundPage />);
      const heading = container.querySelector("h1");
      
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/not found/i);
    });
  });

  describe("Loading States", () => {
    it("should have no accessibility violations - Forms loading", async () => {
      const { container } = render(<LoadingForms />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - About loading", async () => {
      const { container } = render(<LoadingAbout />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible loading indicators", () => {
      const { container } = render(<LoadingForms />);
      const skeletons = container.querySelectorAll('[class*="Skeleton"]');
      
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});
