import { Context } from "telegraf";
import { join } from "path"
import fs from "fs"
import { convertToDocx } from "./fileConvertor";


export async function runFileConvert(ctx: Context, inputFilePath: string, outputFilePath: string, type: string, ready_name: string){
    try{
        // Convert file
        await convertToDocx(inputFilePath,outputFilePath, type).then(() => {}).catch((err) => {
            console.log("error while uploading");
            ctx.reply("Your file is invalid")
        }).then((e) => {
            console.log("eeeeeeeeee", e);
            
            setTimeout(() => {
               const documentFilePath = join(__dirname, "upload", `${ready_name}.${type}`);
               sendLocalDocument(documentFilePath, ctx)
           }, 10000)
        });
        

    }catch(err){
        console.log(err);
    }
}




async  function sendLocalDocument(documentFilePath: string, ctx: Context){

    // Check if the file exists
if (fs.existsSync(documentFilePath)) {
  
  await ctx.replyWithDocument({ source: documentFilePath})
  .catch((error) => {
      console.error('Error sending document:', error);
    })

} else {
  console.error('File does not exist:', documentFilePath);
}
}