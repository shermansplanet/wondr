import { sizeBonuses } from "./consts";
import React from "react";

export function toPlusMinus(n, ignoreZeros = true, parens = true) {
  if ((ignoreZeros && n === 0) || n === undefined) {
    return "";
  }
  return parens ? " (" + (n >= 0 ? "+" + n : n) + ")" : n >= 0 ? "+" + n : n;
}

export function getSizeBonus(size) {
  const sizeBonus = sizeBonuses[i];
  for (var i in sizeBonuses) {
    if (i > size) {
      break;
    }
  }
  return sizeBonus;
}

export function addLineBreaks(s) {
  return s.split("BREAK").map((x, i) => (
    <div style={{ margin: "4px" }} key={i}>
      {" "}
      {x}{" "}
    </div>
  ));
}

export function irrelevantQuirk(v, data) {
  return (
    "prereq" in v &&
    "flavor" in v.prereq &&
    !v.prereq.flavor.includes(data.flavor)
  );
}
