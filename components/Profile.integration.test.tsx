import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";
import { profileData } from "@/data/profileData";

describe("Profile Component - Integration with Real Data", () => {
  it("renders with actual profile data", () => {
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
});
