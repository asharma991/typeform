import { atom } from "recoil";
export const allValueSet = atom({
  key: "answerSet",
  default: {},
});

export const errorSet = atom({
  key: "errorSet",
  default: {},
});

export const focusedField = atom({
  key: "focusedField",
  default: null,
});