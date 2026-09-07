import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Header from "../src/components/Header";

describe("Header Component", () => {

    it("renders the application title", () => {

        render(<Header />);

        expect(

            screen.getByText(
                "🌐 Social Media Post Composer"
            )

        ).toBeInTheDocument();

    });

    it("renders the application subtitle", () => {

        render(<Header />);

        expect(

            screen.getByText(
                "Create • Validate • Save • Manage Drafts"
            )

        ).toBeInTheDocument();

    });

});