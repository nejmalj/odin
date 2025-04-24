import { describe, expect, test } from "vitest";
import { Dice, getSolution } from "../modules/game";

const mocks = [
    {
        dices: [Dice.Green, Dice.Green, Dice.Green, Dice.Purple, Dice.Purple, Dice.Purple, Dice.Grey],
        result: [[Dice.Green, Dice.Purple, Dice.Purple], [Dice.Green, Dice.Green, Dice.Grey, Dice.Purple]]
    },
    {
        dices: [Dice.Grey, Dice.Grey, Dice.Grey, Dice.Purple, Dice.Purple, Dice.Grey, Dice.Red],
        result: [[Dice.Grey, Dice.Grey, Dice.Grey], [Dice.Red, Dice.Grey, Dice.Purple, Dice.Purple]]
    },
    {
        dices: [Dice.Purple, Dice.Purple, Dice.Red, Dice.Red, Dice.Red, Dice.Grey, Dice.Blue],
        result: [[Dice.Purple, Dice.Purple, Dice.Red, Dice.Red, Dice.Red], [Dice.Blue, Dice.Grey]]
    }
]

describe('test for mockups validity', () => {
    mocks.forEach((mock, index) => {
        test(`mockup ${index + 1}: correct solution for given dice configuration`, () => {
            const solution = getSolution(mock.dices);
            expect(solution).toEqual(mock.result);
        });
    });
});