

export enum Dice {
    Green,
    Grey,
    Yellow,
    Purple,
    Red,
    Blue,
}

export function getForce(diceList : Dice[]) : number {
    let force: number = 0;
    let redCount: number = 0;
    let blueCount: number = 0;
    let purpleCount: number = 0;

    for (let i = 0; i < diceList.length; i++) {
        switch (diceList[i]) {
            case Dice.Yellow:
                force -= 1;
                break;
            case Dice.Green:
                force += 1;
                break;
            case Dice.Purple:
                purpleCount++;
                break;
            case Dice.Grey:
                force += 2;
                break;
            case Dice.Red:
                redCount++;
                break;
            case Dice.Blue:
                blueCount++;
                break;
        }
    }
    force += purpleCount * 3;
    if (redCount > 0) {
        const cancelablePurples = Math.min(redCount, purpleCount);
        force -= cancelablePurples * 3;
        force += cancelablePurples;
    }
    if (blueCount > 0) {
        if (purpleCount > 0) {
            force += blueCount * purpleCount;
        } else {
            force += blueCount;
        }
    }

    return force;
}

export function getCombinations(diceList: Dice[]): Dice[][] {
    const combinations: Dice[][] = [];
    const total = 1 << diceList.length;

    for (let i = 0; i < total; i++) {
        const subset: Dice[] = [];
        for (let j = 0; j < diceList.length; j++) {
            if (i & (1 << j)) {
                subset.push(diceList[j]);
            }
        }
        combinations.push(subset);
    }

    return combinations;
}

export function getSolution(diceList: Dice[]): [Dice[], Dice[]] | null {
    const combinations = getCombinations(diceList);

    for (const subsetA of combinations) {
        const subsetB = diceList.filter(dice => !subsetA.includes(dice));
        if (getForce(subsetA) === getForce(subsetB)) {
            return [subsetA, subsetB];
        }
    }

    return null;
}