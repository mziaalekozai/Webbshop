import { create } from "zustand";

// set, create

const useStore = create((set) => ({
  trampolines: [],

  setTrampolines: (newTrampolines) =>
    set((state) => ({
      trampoline: newTrampolines,
    })),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),

  addTrampoline: (trampoline) =>
    set((state) => ({
      trampolines: [...state.trampolines, trampoline],
    })),
}));

export { useStore };
