import { create } from "zustand";

export const useStore = create((set) => ({
  diary: [],
  addDiary: (diary) => set((state) => ({ diary: [...state.diary, diary] })),
  removeDiary: (id) =>
    set((state) => ({ diary: state.diary.filter((diary) => diary.id !== id) })),
  editDiary: (id, newDiary) =>
    set((state) => ({
      diary: state.diary.map((diary) =>
        diary.id === id ? { ...newDiary } : diary
      ),
    })),
}));
