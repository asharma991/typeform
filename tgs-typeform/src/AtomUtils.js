import { atom } from "recoil";
export const allValueSet = atom({
  key: "answerSet",
  default: {},
});

export const errorSet = atom({
  key: "errorSet",
  default: {},
});
