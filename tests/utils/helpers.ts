

export function removeDollarSign(priceWithDollar: string): string {
    return priceWithDollar.replace('$', '').trim();
}