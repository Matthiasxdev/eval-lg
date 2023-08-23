export default function CheckDelimiter(): string{
    let delimiter = ','; // Default delimiter (English)

    // Check the system's locale/language setting
    const systemLocale = process.env.LANG || process.env.LC_ALL || process.env.LC_MESSAGES;
    if (systemLocale && systemLocale.toLowerCase().includes('fr')) {
        delimiter = ';'; // Use semicolon for French locale
    }

    return delimiter
}