import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";

describe("Profile Component", () => {
  const mockBiography = [
    "First paragraph of biography",
    "Second paragraph of biography",
  ];

  const mockExpertise = ["XR技術", "AI技術", "事業開発"];

  it("renders biography section with all paragraphs", () => {
    render(
      <Profile
        biography={mockBiography}
        expertise={mockExpertise}
        pageType="hobby"
      />,
    );

    // Check section title
    expect(screen.getByText("経歴")).toBeInTheDocument();

    // Check all biography paragraphs are rendered
    mockBiography.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it("renders expertise section with all skills", () => {
    render(
      <Profile
        biography={mockBiography}
        expertise={mockExpertise}
        pageType="hobby"
      />,
    );

    // Check section title
    expect(screen.getByText("専門分野")).toBeInTheDocument();

    // Check all expertise badges are rendered
    mockExpertise.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("renders empty biography gracefully", () => {
    render(
      <Profile biography={[]} expertise={mockExpertise} pageType="hobby" />,
    );

    // Section should still exist
    expect(screen.getByText("経歴")).toBeInTheDocument();
  });

  it("renders empty experience gracefully", () => {
    render(
      <Profile biography={mockBiography} expertise={[]} pageType="hobby" />,
    );

    // Section should still exist
    expect(screen.getByText("専門分野")).toBeInTheDocument();
  });

  it("renders experience with detailed descriptions", () => {
    const mockExperience = [
      {
        company: "Test Company",
        position: "Developer",
        period: "2020 - 2021",
        description: [
          {
            text: "Main responsibility",
            details: ["Detailed info about responsibility", "Second detail"],
          },
          {
            text: "Another task",
          },
        ],
        technologies: ["React"],
      },
    ];

    render(
      <Profile
        biography={mockBiography}
        expertise={mockExpertise}
        pageType="career"
        experience={mockExperience}
      />
    );

    // Check basic info
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    
    // Check description items
    expect(screen.getByText(/Main responsibility/)).toBeInTheDocument();
    expect(screen.getByText(/Another task/)).toBeInTheDocument();
    
    // Check detail info
    expect(screen.getByText(/・Detailed info about responsibility/)).toBeInTheDocument();
    expect(screen.getByText(/・Second detail/)).toBeInTheDocument();
  });
});
