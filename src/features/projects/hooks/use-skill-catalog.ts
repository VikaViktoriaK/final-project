"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { SKILLS_QUERY } from "@/features/cvs/skills/graphql/skills.query";
import type { Skill } from "@/features/cvs/types";

function useSkillCatalog() {
  const { data, loading } = useQuery<{ skills: Skill[] }>(SKILLS_QUERY);

  const skills = useMemo(
    () =>
      (data?.skills ?? []).map((skill) => ({
        ...skill,
        id: String(skill.id),
      })),
    [data?.skills],
  );

  return { skills, loading };
}

export default useSkillCatalog;
