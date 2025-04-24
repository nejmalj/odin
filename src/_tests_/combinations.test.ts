import { describe, expect, test } from "vitest";
import { Dice, getCombinations } from "../modules/game";

describe("combination tests", () => {
    test("two dices", () => {
        const diceList = [Dice.Green, Dice.Yellow];
        const combinations = getCombinations(diceList);
        expect(combinations).toEqual([
            [],
            [Dice.Green],
            [Dice.Yellow],
            [Dice.Green, Dice.Yellow]
        ]);
        expect(combinations.length).toBe(4);
    });

    test("three dices", () => {
        const diceList = [Dice.Green, Dice.Yellow, Dice.Purple];
        const combinations = getCombinations(diceList);
        expect(combinations).toEqual([
            [],
            [Dice.Green],
            [Dice.Yellow],
            [Dice.Green, Dice.Yellow],
            [Dice.Purple],
            [Dice.Green, Dice.Purple],
            [Dice.Yellow, Dice.Purple],
            [Dice.Green, Dice.Yellow, Dice.Purple]
        ]);
        expect(combinations.length).toBe(8);
    });

    test("one dice", () => {
        const diceList = [Dice.Green];
        const combinations = getCombinations(diceList);
        expect(combinations).toEqual([[], [Dice.Green]]);
        expect(combinations.length).toBe(2);
    });

    test("no dice", () => {
        const diceList: Dice[] = [];
        const combinations = getCombinations(diceList);
        expect(combinations).toEqual([[]]);
        expect(combinations.length).toBe(1);
    });
});