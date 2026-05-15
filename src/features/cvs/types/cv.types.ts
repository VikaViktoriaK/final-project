import type { CreateCvFormValues } from "../schemas/create-cv.schema";
type CvUser = {
  id: string;
  email: string;
};
type CreateCvDialogProps = {
  open: boolean;
  onClose: () => void;
};

type Cv = {
  id: string;
  name: string;
  education: string | null;
  description: string;
  user: CvUser | null;
};

type CvsQueryData = {
  cvs: Cv[];
};

type CvsTableProps = {
  cvs: Cv[];
};

type CvDetailsPageProps = {
  cvId: string;
};

type CreateCvMutationData = {
  createCv: Cv;
};

type CreateCvMutationVariables = {
  cv: CreateCvFormValues & {
    userId?: string;
  };
};

export type {
  Cv,
  CvUser,
  CvsQueryData,
  CvDetailsPageProps,
  CvsTableProps,
  CreateCvFormValues,
  CreateCvMutationData,
  CreateCvMutationVariables,
  CreateCvDialogProps,
};
