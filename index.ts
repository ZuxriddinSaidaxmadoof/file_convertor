import { Telegraf, Markup, Context } from "telegraf"
import { Languages } from "./config/enums";
import { join } from "path";
import fs from "fs";
import { convertToDocx } from "./fileConvertor";
import { getButtons } from "./options";


const token: string = "6941832197:AAGHHf1I5QVHGKXsRXmMGbb_8db825jj2oM";

 const bot = new Telegraf(token)


declare module "telegraf" {
    interface  Context{
        language: Languages;
    }
}




// Commands 
/* THis command works when user tuch start command */

/* language button with actions  */

    let language_button_id: number;
    const button = Markup.inlineKeyboard([
        Markup.button.callback('uz 🇺🇿', 'uzbek'),
        Markup.button.callback('en 🇬🇧', 'english'),
        Markup.button.callback('ru 🇷🇺', 'russian')
    ]); 
 
    bot.action('uzbek', (ctx) => {
        ctx.reply('Assalomu alaykum, ozgartirmoqchi bo\'lgan faylingizni yuboring');
        ctx.language = Languages.uz;
        ctx.deleteMessage(language_button_id)
    });
    bot.action('english', (ctx) => {
        ctx.reply('Hello send file which do you want to convert');
        ctx.language = Languages.en;
        ctx.deleteMessage(language_button_id)
    });
    bot.action('russian', (ctx) => {
        ctx.reply('privet ruskiy');
        ctx.language = Languages.ru;
        ctx.deleteMessage(language_button_id)
    });

/* language button with actions  */

  
    bot.start((ctx) => {
  //sadasda
        ctx.language = Languages.en

        ctx.reply("Welcome to file editor bot, please chose language", button).then(t =>language_button_id = t.message_id)
    })


    bot.on("document", async(ctx) => {
        const document = ctx.message.document;
        let mineType: string = "txt";
        // const mine_type = document.mime_type?.split("/")[1];
        const mine_type: Array<string> | undefined = document.file_name?.split(".");
        if(mine_type){
             mineType = mine_type[mine_type?.length - 1];
            console.log("mineType", mineType);
        }
        const fileLink = await ctx.telegram.getFileLink(document.file_id);

        let message_to_send: string;



        if(ctx.language == Languages.ru){
            message_to_send = `Ваш тип файла <b>${mineType}</b>, выберите тип файла, который вы хотите конвертировать`
        }else if(ctx.language == Languages.uz){
            message_to_send = `Sizning faylingiz turi <b>${mineType}</b>, fayilingizni qaysi turga o'zgartirmoqchisiz`
        }else{
            message_to_send = `Your file mine type is <b>${mineType}</b>, choose which type do you want to convert your file`
        }
        
        const file_name: Array<any> = fileLink.pathname.split("/");
        let ready_name: string = file_name[file_name.length - 1]
        ready_name = ready_name.split(".")[0];

        const buttons = getButtons(mineType);
        await ctx.replyWithHTML(message_to_send, Markup.inlineKeyboard(buttons))

        
        async function runFileConvert(inputFilePath: string, outputFilePath: string, type: string){
            try{
                // Convert file
                console.log(join(__dirname, "upload", `${ready_name}.pdf`));
                await convertToDocx(inputFilePath,outputFilePath, type).then(() => {}).catch((err) => {
                    console.log("error while uploading");
                    ctx.reply("Your file is invalid")
                });

                // send local document
                async  function sendLocalDocument(){
                    const documentFilePath = join(__dirname, "upload", `${ready_name}.${type}`);
  
                    // Check if the file exists
                if (fs.existsSync(documentFilePath)) {
                  
                  await ctx.replyWithDocument({ source: documentFilePath})
                    .catch((error) => {
                      console.error('Error sending document:', error);
                    })
                  await fs.unlinkSync(documentFilePath)
                } else {
                  console.error('File does not exist:', documentFilePath);
                }
                }
                // send local document

               setTimeout(() => {
                sendLocalDocument()
               }, 15000)

            }catch(err){
                console.log(err);
            }
        }
       
        // Call file convertor
        
        bot.on("callback_query", (ctx: any) => {
            console.log("query", );
            const button_id = ctx.callbackQuery.message.message_id;
            const type: string = ctx.callbackQuery.data
            runFileConvert(fileLink.href, join(__dirname, "/upload"), type)
            ctx.deleteMessage(button_id)
        })
    })
    
    
    

bot.launch()

