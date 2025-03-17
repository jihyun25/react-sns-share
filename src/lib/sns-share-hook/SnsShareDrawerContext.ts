import { createContext } from "react";
import { SnsShareDrawerContextType } from "./types";

// context 객체 생성
export const SnsShareDrawerContext =
  createContext<SnsShareDrawerContextType | null>(null);
