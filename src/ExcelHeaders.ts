import fs from 'fs/promises'

type ExcelHeadersProps = {
    outputPath: string;
    delimiter: string
}

export default function ExcelHeaders({outputPath,delimiter} : ExcelHeadersProps) {

    const bom = '\ufeff'; // Byte Order Mark for UTF-8 encoding (special marker for Excel utf-8 encoding)
    const headers = `${bom}"Noms"${delimiter}"Sociétés"\n\n`;
    fs.appendFile(outputPath, headers, 'utf8')

}