import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type Kitten = {
  id: number;
  name: string;
  age: number;
  cuteness: string;
  softness: number;
};

type KittenContextType = {
  kittens: Kitten[];
  setKittens: Dispatch<SetStateAction<Kitten[]>>;
  selectedKitten: Kitten | null;
  setSelectedKitten: Dispatch<SetStateAction<Kitten | null>>;
};

const KittenContext = createContext<KittenContextType | undefined>(undefined);

export const KittenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [kittens, setKittens] = useState<Kitten[]>([]);
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);

  return (
    <KittenContext.Provider
      value={{ kittens, setKittens, selectedKitten, setSelectedKitten }}
    >
      {children}
    </KittenContext.Provider>
  );
};

export const useKittenContext = () => {
  const context = useContext(KittenContext);
  if (!context) {
    throw new Error("useKittenContext must be used within a KittenProvider");
  }
  return context;
};
