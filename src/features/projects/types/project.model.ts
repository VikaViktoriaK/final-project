export type Project = {
  id: string;
  name: string;
  internal_name: string;
  domain: string;
  description: string;
  start_date: string;
  end_date: string | null;
  environment: string[];
};
