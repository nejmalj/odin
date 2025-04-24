export enum Dice {
    Green,
    Grey,
    Yellow,
    Purple,
    Red,
    Blue,
}

export function getForce(diceList: Dice[]): number {
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
export function getSolution(diceList: Dice[]): [Dice[], Dice[]] | null {
    const getForce = (diceList: Dice[]): number => {
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
    };

    const n = diceList.length;

    for (let i = 1; i < (1 << n); i++) {
        const subset1: Dice[] = [];
        const subset2: Dice[] = [];

        for (let j = 0; j < n; j++) {
            if ((i >> j) & 1) {
                subset1.push(diceList[j]);
            } else {
                subset2.push(diceList[j]);
            }
        }

        if (getForce(subset1) === getForce(subset2)) {
            const sortedSubset1 = [...subset1].sort((a, b) => a - b);
            const sortedSubset2 = [...subset2].sort((a, b) => a - b);

            return [sortedSubset1, sortedSubset2];
        }
    }

    return null;
}
