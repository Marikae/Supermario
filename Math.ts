class MyMath {
    static compare01(numToCompare: number, maxValue: number): number {
        let value = 0;
        value = maxValue * numToCompare;
        return value;
    }

    static to01(numToCompare: number, maxValue: number): number {
        return numToCompare / maxValue;
    }
}