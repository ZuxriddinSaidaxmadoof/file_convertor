import { exec } from "child_process";
// import { join } from "path"


export async function convertToDocx(inputFilePath: string, outputFilePath: string, type: string) {
    // libreoffice --headless --convert-to docx input.pdf --outdir output/
// "soffice --headless --convert-to pdf "+ (inputFilePath)
    await exec(`soffice --headless --convert-to ${type} "${inputFilePath}" --outdir "${outputFilePath}"`, (error, stdout, stderr) => {
        
        if (error) {
            console.error(`Error converting file: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Conversion stderr: ${stderr}`);
            return;
        }
        console.log("converted:", stdout);

        
    })
}



// soffice --headless --convert-to pdf "C:\Users\PC\Documents\text.docx" --outdir "C:\Users\PC\OneDrive\Desktop\file_bot\upload"