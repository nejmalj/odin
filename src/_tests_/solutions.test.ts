import { describe, expect, test } from "vitest";
import { Dice, getSolution } from "../modules/game";


const mocks = [
    {
        dices: [Dice.Green, Dice.Green, Dice.Green, Dice.Purple, Dice.Purple, Dice.Purple, Dice.Grey],
        result: [[Dice.Green, Dice.Purple, Dice.Purple], [Dice.Purple, Dice.Grey, Dice.Green, Dice.Green]]
    },
    {
        dices: [Dice.Grey, Dice.Grey, Dice.Grey, Dice.Purple, Dice.Purple, Dice.Grey, Dice.Red],
        result: [[Dice.Grey, Dice.Grey, Dice.Grey], [Dice.Purple, Dice.Purple, Dice.Grey, Dice.Red]]
    },
    {
        dices: [Dice.Purple, Dice.Purple, Dice.Red, Dice.Red, Dice.Red, Dice.Grey, Dice.Blue],
        result: [[Dice.Purple, Dice.Purple, Dice.Red, Dice.Red, Dice.Red], [Dice.Grey, Dice.Blue]]
    }
]

describe('test for mocks validity', () => {

    mocks.forEach((mock, index) => {
        test(`mock ${index + 1}: correct solution for given dice configuration`, () => {
            const solution = getSolution(mock.dices);
            expect(solution).toEqual(mock.result);
        });
    });

});
