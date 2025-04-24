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

export function getCombinations(diceList: Dice[]): Dice[][] {
    const combinations: Dice[][] = [];
    const total = 1 << diceList.length;

    for (let i = 1; i < total - 1; i++) { // éviter les cas vides et tous les dés
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
    if (diceList.length !== 7) return null; // Vérifie que la liste contient exactement 7 dés.

    const combinations = getCombinations(diceList);

    // Filtrer les combinaisons pour ne garder que celles de taille 3 ou 4
    const validCombinations = combinations.filter(subset => subset.length === 3 || subset.length === 4);

    // Vérifier toutes les combinaisons possibles
    for (const subsetA of validCombinations) {
        const remainingDice = [...diceList]; // Copie de la liste originale de dés
        const subsetB: Dice[] = [];

        // Construire subsetB en enlevant les dés de subsetA de la liste restante
        for (const die of subsetA) {
            const index = remainingDice.indexOf(die);
            if (index !== -1) {
                remainingDice.splice(index, 1);
                subsetB.push(die);
            }
        }

        // Vérifier que les deux sous-ensembles ont la même taille
        if (subsetA.length + subsetB.length !== 7) continue;

        // Comparer les forces des deux sous-ensembles
        if (getForce(subsetA) === getForce(subsetB)) {
            return [subsetA, subsetB];
        }
    }

    return null; // Aucun sous-ensemble avec une force égale n'a été trouvé
}
