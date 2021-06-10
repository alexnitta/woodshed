/**
 * A naive example of a utility function.
 *
 * Given a string version of a number, adds commas between every three digits.
 * @param str - a string like '1000'
 * @returns a string like '1,000'
 */
export const addThousandsSeparator = (str: string): string =>
    str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
