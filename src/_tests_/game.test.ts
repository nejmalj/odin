import { describe, expect, test } from "vitest";
import { Dice, getCombinations, getForce, getSolution } from "../modules/game";

describe('test combinations results', () => {
    test('equal values', () => {
        expect(() => getCombinations([Dice.Purple, Dice.Purple], [Dice.Green, Dice.Green, Dice.Grey, Dice.Grey])).not.toThrow(Error);
    });
    test('different values', () => {
        expect(() => getCombinations([Dice.Purple, Dice.Green], [Dice.Green, Dice.Green, Dice.Grey, Dice.Grey])).toThrow(Error);
    })
})


//function getSolution (diceList: Dice[]) : [Dice[], Dice[]]
// getCombinations
// getForce (diceList: Dice[]) : number
// 7 dés en tout