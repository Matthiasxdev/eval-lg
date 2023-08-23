import fs from 'fs/promises';
import CheckDelimiter from './ChekDelimiter';
import ExcelHeaders from './ExcelHeaders';


type AppProps = {
    inputPath :string, 
    outputPath :string
}

export default function App ({inputPath, outputPath} : AppProps) {
    
    const delimiter = CheckDelimiter(); // Get CSV delimiter as string (English/French version)
    ExcelHeaders({outputPath, delimiter}) //Adding headers

    fs.readFile(inputPath, 'utf8')
        .then((dataFile) => {
            try {
            const dataJSON = JSON.parse(dataFile); //On parse le JSON
            const toAppend = [];
            
            // On parcourt chaque ligne du JSON
            for (const line of dataJSON) {
                if (line.isActive === undefined || line.isActive === false) continue; //on vérifie que le user est actif
                const entry = `${line.name}${delimiter}${line.company}`;
                toAppend.push(entry); // Puis on l'ajoute au tableau toAppend avec le nom de la société
            }
            
            const contentToAppend = toAppend.join('\n') + '\n'; //On transforme le tableau en string avec saut de ligne
            
            return fs.appendFile(outputPath, contentToAppend, 'utf8'); //On écrit dans le fichier CSV une seule fois
            } catch (error) {
            console.error('Error parsing JSON:', error);
            }
        })
        .then(() => {
            console.log('File appended successfully.');
        })
        .catch((err) => {
            console.error('Error reading or appending file:', err);
        });
}

