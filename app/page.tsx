import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Links } from "@/components/Links";
import { Footer } from "@/components/Footer";
import { profileData } from "@/data/profileData";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${profileData.name}. All rights reserved.`;

  return (
    <>
      <Header
        name={profileData.name}
        title={profileData.title}
        company={profileData.company}
        profileImage={profileData.profileImage}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Profile
          biography={profileData.biography}
          expertise={profileData.expertise}
        />
        <Links links={profileData.relatedLinks} />
      </main>
      <Footer copyright={copyright} />
    </>
  );
}
