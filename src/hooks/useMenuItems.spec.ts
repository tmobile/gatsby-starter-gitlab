import { MenuItem } from "../menu";
import {
  useMenuItemsTree,
  useChildMenuItemsOf,
  useSiblingMenuItemsOf,
} from "./useMenuItems";

describe("useMenuItems Hooks", () => {
  const miStandards = {
      hint:
        "Standards docs",
      href: "/standards-documentation/",
      text: "Standards Documentation",
      weight: 1,
    },
    miStandards_Decide = {
      hint: '"Decide" is the…',
      href: "/standards-documentation/3-decide/",
      text: "Decide",
      weight: 2,
    },
    miChallenges = {
      hint:
        "Small coding challenges to help understand how you write and test code.",
      href: "/pair-challenges/",
      text: "Pair Challenges",
      weight: 3,
    },
    miChallenges_CheckWriter = {
      hint: "Check Writer Given a…",
      href: "/pair-challenges/challenges/baseline/check-writer/",
      text: "Check Writer",
      weight: 4,
    };

  const input: MenuItem[] = [
    { ...miStandards },
    { ...miStandards_Decide },
    { ...miChallenges_CheckWriter },
    { ...miChallenges },
  ];

  describe("useMenuItemsTree hook", () => {
    it("Transforms a flat list of items into a tree structure based on href path", () => {
      const actual = useMenuItemsTree(input);
      const [actualStandards, actualChallenges] = actual;
      const [actualCheckWriter] = actualChallenges.children;
      const [actualDecide] = actualStandards.children;

      // Home / Challenges
      expect(actualChallenges.href).toEqual(miChallenges.href);
      expect(actualChallenges.parent).toBeFalsy();

      // Home / Challenges / Check Writer
      expect(actualCheckWriter.href).toEqual(miChallenges_CheckWriter.href);
      expect(actualCheckWriter.parent?.href).toEqual(miChallenges.href);

      // Home / Standards
      expect(actualStandards.href).toEqual(miStandards.href);
      expect(actualStandards.parent).toBeFalsy();

      // Home / Standards / Decide
      expect(actualDecide.href).toEqual(miStandards_Decide.href);
      expect(actualDecide.parent?.href).toEqual(miStandards.href);
    });
  });

  describe("useChildMenuItems hook", () => {
    it("Returns children of the specified href", () => {
      const actual = useChildMenuItemsOf(miChallenges.href, input) || [];
      const [actualCheckWriter] = actual;

      expect(actualCheckWriter.href).toEqual(miChallenges_CheckWriter.href);
      expect(actualCheckWriter.parent?.href).toEqual(miChallenges.href);
    });
  });

  describe("useSiblingMenuItemsOf hook", () => {
    it("Returns siblings of the specified href", () => {
      const actual = useSiblingMenuItemsOf(miStandards.href, input);
      const [actualStandards, actualChallenges] = actual;

      expect(actualStandards.href).toEqual(miStandards.href);
      expect(actualChallenges.href).toEqual(miChallenges.href);
    });
  });
});
