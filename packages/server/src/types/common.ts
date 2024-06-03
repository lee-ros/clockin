import { UUID } from "crypto";

export type IDParams<IDType = UUID> = {
  id: IDType;
};
