import { describe, expect, test } from "vitest";
import { Dice, getForce } from "../modules/game";

describe('basic combinations', () => {
    test('easy sum of values', () => {
        expect(getForce([Dice.Green, Dice.Grey, Dice.Green])).toEqual(4);
    });

    test('yellow in hand', () => {
        expect(getForce([Dice.Green, Dice.Green, Dice.Yellow])).toEqual(1);
    });

    test('no dice in hand', () => {
        expect(getForce([])).toEqual(0);
    });

    test('large number of dices', () => {
        const diceList = Array(10).fill(Dice.Green).concat(Array(5).fill(Dice.Yellow));
        expect(getForce(diceList)).toEqual(5);
    });
});

describe('interacting dices', () => {
    test('purple + red in hand', () => {
        expect(getForce([Dice.Green, Dice.Purple, Dice.Red])).toEqual(2);
    });

    test('purple + blue in hand', () => {
        expect(getForce([Dice.Green, Dice.Purple, Dice.Blue])).toEqual(5);
    });

    test('one of each dice type', () => {
        expect(getForce([Dice.Green, Dice.Grey, Dice.Yellow, Dice.Purple, Dice.Red, Dice.Blue])).toEqual(4);
    });

    test('red dices cancel purple dices', () => {
        expect(getForce([Dice.Purple, Dice.Purple, Dice.Red, Dice.Red])).toEqual(2);
    });

    test('two purple dices and one red dice', () => {
        expect(getForce([Dice.Purple, Dice.Purple, Dice.Red])).toEqual(4);
    });

    test('blue dice with two purple dices', () => {
        expect(getForce([Dice.Purple, Dice.Purple, Dice.Blue])).toEqual(8);
    });
})