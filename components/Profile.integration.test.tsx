import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";
import { profileData } from "@/data/profileData";
import { careerProfileData } from "@/data/careerProfileData";

describe("Profile Component - Integration with Real Data", () => {
  it("renders with actual profile data (Hobby)", () => {
    render(
      <Profile
        biography={profileData.biography}
        expertise={profileData.expertise}
        pageType="hobby"
        experience={profileData.experience}
      />
    );

    // Verify sections exist
    expect(screen.getByText("経歴")).toBeInTheDocument();
    expect(screen.getByText("専門分野")).toBeInTheDocument();

    // Verify expertise item (simpler than biography text)
    if (profileData.expertise.length > 0) {
      expect(screen.getByText(profileData.expertise[0])).toBeInTheDocument();
    }
  });

  it("renders with actual career profile data (Career)", () => {
    render(
      <Profile
        biography={careerProfileData.biography}
        expertise={careerProfileData.expertise}
        pageType="career"
        experience={careerProfileData.experience}
      />
    );

    // Verify sections exist
    expect(screen.getByText("経歴")).toBeInTheDocument();
    expect(screen.getByText("専門分野")).toBeInTheDocument();
    expect(screen.getByText("職歴")).toBeInTheDocument();

    // Verify experience details
    if (
      careerProfileData.experience &&
      careerProfileData.experience.length > 0
    ) {
      const firstExp = careerProfileData.experience[0];
      expect(screen.getByText(firstExp.company)).toBeInTheDocument();
      expect(screen.getByText(firstExp.position)).toBeInTheDocument();

      if (firstExp.description.length > 0) {
          const firstDesc = firstExp.description[0];
         // Text check
          expect(screen.getByText(`• ${firstDesc.text}`)).toBeInTheDocument();
          
          // Details check
          if(firstDesc.details && firstDesc.details.length > 0) {
               expect(screen.getByText(`・${firstDesc.details[0]}`)).toBeInTheDocument();
          }
      }
    }
  });
});
