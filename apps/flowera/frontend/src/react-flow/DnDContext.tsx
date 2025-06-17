import { createContext, useContext, useState } from "react";

type DnDType = string | null;
type SetDnDType = React.Dispatch<React.SetStateAction<DnDType>>;

const DnDContext = createContext<[DnDType, SetDnDType]>([null, () => {}]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<DnDType>(null);

  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
