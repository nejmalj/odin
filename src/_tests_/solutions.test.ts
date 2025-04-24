import { describe, expect, test } from "vitest";
import { Dice, getSolution } from "../modules/game";

describe('test solution results', () => {
    test('correct result', () => {
        expect(getSolution([Dice.Purple, Dice.Purple, Dice.Green, Dice.Green, Dice.Grey, Dice.Grey]))
            .toEqual([[Dice.Purple, Dice.Purple], [Dice.Green, Dice.Green, Dice.Grey, Dice.Grey]]);
    });
    test('impossible result', () => {
        expect(getSolution([Dice.Purple, Dice.Green, Dice.Green])).toBe(null);
    });
});