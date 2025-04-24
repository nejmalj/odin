import { describe, expect, test } from "vitest";
import { Dice, getForce } from "../modules/game";

describe('test force values', () => {
    test('basic values in hand', () => {
        expect(getForce([Dice.Green, Dice.Grey, Dice.Green])).toEqual(4);
    });
    test('yellow in hand', () => {
        expect(getForce([Dice.Green, Dice.Green, Dice.Yellow])).toEqual(1);
    });
    test('purple + red in hand', () => {
        expect(getForce([Dice.Green, Dice.Purple, Dice.Red])).toEqual(2);
    });
    test('purple + blue in hand', () => {
        expect(getForce([Dice.Green, Dice.Purple, Dice.Blue])).toEqual(5);
    });
});