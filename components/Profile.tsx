import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectInfo, WorkExperience } from "@/types/profile";

interface ProfileProps {
  biography: string[];
  expertise: string[];
  pageType: "hobby" | "career";
  projects?: ProjectInfo[];
  experience?: WorkExperience[];
}

export function Profile({
  biography,
  expertise,
  pageType,
  projects,
  experience,
}: ProfileProps) {
  return (
    <section className="w-full">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Biography Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">経歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {biography.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expertise Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">専門分野</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-3 py-1 text-white"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page-specific content */}
      {pageType === "hobby" && projects && projects.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                個人開発プロジェクト
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-b border-border last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge
                        variant={
                          project.status === "active" ? "default" : "secondary"
                        }
                        className="w-fit"
                      >
                        {project.status === "active"
                          ? "進行中"
                          : project.status === "completed"
                            ? "完了"
                            : "アーカイブ"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        プロジェクトを見る →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {pageType === "career" && experience && experience.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">職歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-b border-border last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.company}</h3>
                        <p className="text-muted-foreground">{exp.position}</p>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      {exp.description.map((desc, descIndex) => (
                        <p
                          key={descIndex}
                          className="text-muted-foreground text-sm"
                        >
                          • {desc}
                        </p>
                      ))}
                    </div>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
