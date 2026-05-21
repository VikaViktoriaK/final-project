import { CV_QUERY } from "./cv.query";

function cvRefetch(cvId: string) {
  return [{ query: CV_QUERY, variables: { cvId } }];
}

export default cvRefetch;
