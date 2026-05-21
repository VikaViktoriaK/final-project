import type { ReactElement } from "react";
import { renderHook } from "@testing-library/react";
import { createMockCvContextValue } from "../../test-utils/mock-cv-context";
import { useCvContext } from "../../shared/context/cv-context";
import useSkillManager from "../../../skills/hooks/useSkillManager";
import {
  useCvSkillCatalog,
  useCvSkillMutations,
} from "./use-cv-skill-mutations";
import useCvSkillsPage from "./use-cv-skills-page";

jest.mock("../../shared/context/cv-context", () => ({
  useCvContext: jest.fn(),
}));

jest.mock("./use-cv-skill-mutations", () => ({
  useCvSkillCatalog: jest.fn(),
  useCvSkillMutations: jest.fn(),
}));

jest.mock("../../../skills/hooks/useSkillManager", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useCvContextMock = jest.mocked(useCvContext);
const useCvSkillCatalogMock = jest.mocked(useCvSkillCatalog);
const useCvSkillMutationsMock = jest.mocked(useCvSkillMutations);
const useSkillManagerMock = jest.mocked(useSkillManager);

type SkillManagerConfig = Parameters<typeof useSkillManager>[0];

const catalogSkill = {
  id: "1",
  name: "React",
  category: null,
};

function createSkillManagerMockReturn(): ReturnType<typeof useSkillManager> {
  return {
    grouped: [],
    isEmpty: false,
    canEdit: true,
    removeMode: false,
    selected: [],
    mutating: false,
    toggleSkill: jest.fn(),
    openAddDialog: jest.fn(),
    openEditDialog: jest.fn(),
    enableRemoveMode: jest.fn(),
    cancelRemoveMode: jest.fn(),
    handleRemove: jest.fn(),
    addDialog: {
      open: false,
      skills: [],
      loading: false,
      canSubmit: false,
      skillId: "",
      mastery: "Competent",
      onSkillChange: jest.fn(),
      onMasteryChange: jest.fn(),
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    },
    editDialog: {
      open: false,
      skillName: "",
      loading: false,
      canSubmit: false,
      mastery: "Competent",
      onMasteryChange: jest.fn(),
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    },
    FeedbackSnackbar: null as unknown as ReactElement,
  };
}

describe("useCvSkillsPage", () => {
  let lastConfig: SkillManagerConfig | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    lastConfig = undefined;

    useCvContextMock.mockReturnValue(createMockCvContextValue());

    useCvSkillCatalogMock.mockReturnValue({
      categories: [],
      allSkills: [catalogSkill],
    });

    useCvSkillMutationsMock.mockReturnValue({
      addCvSkill: jest.fn(),
      updateCvSkill: jest.fn(),
      removeCvSkills: jest.fn(),
      loading: false,
    });

    useSkillManagerMock.mockImplementation((config) => {
      lastConfig = config;
      return createSkillManagerMockReturn();
    });
  });

  it("wires CV skills into skill manager", () => {
    renderHook(() => useCvSkillsPage());

    expect(useSkillManagerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        currentSkills: createMockCvContextValue().cv?.skills,
        catalogSkills: [catalogSkill],
        canEdit: true,
        defaultMastery: "Competent",
      }),
    );
  });

  it("maps addSkill mutation with category id", async () => {
    const addCvSkill = jest.fn().mockResolvedValue({ ok: true });

    useCvSkillMutationsMock.mockReturnValue({
      addCvSkill,
      updateCvSkill: jest.fn(),
      removeCvSkills: jest.fn(),
      loading: false,
    });

    renderHook(() => useCvSkillsPage());

    await lastConfig?.mutations.addSkill({
      name: "Node",
      categoryId: null,
      mastery: "Competent",
    });

    expect(addCvSkill).toHaveBeenCalledWith({
      name: "Node",
      categoryId: undefined,
      mastery: "Competent",
    });
  });
});
