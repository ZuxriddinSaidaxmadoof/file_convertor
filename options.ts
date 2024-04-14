import { Context, Markup } from "telegraf";

export const Options = {
    pdf: ["docx", "txt", "html", "jpeg", "png", "odt", "epub", "csv", "xlsx"],
    docx: ["pdf", "txt", "html", "jpeg", "png", "odt", "epub", "csv", "xlsx"],
    txt: ["pdf", "docx", "rtf", "html", "jpeg", "png", "odt", "epub", "csv", "xlsx"],
    png: ["pdf", "jpeg", "tiff", "bmp", "svg", "ico"],
    jpeg: ["pdf", "png", "tiff", "bmp", "svg", "ico"],
    gif: ["pdf", "png", "jpeg", "tiff", "bmp", "svg", "ico"],
    odt: ["docx", "txt", "html", "jpeg", "png", "pdf", "epub", "csv", "xlsx"],
    xlsx: ["docx", "txt", "html", "jpeg", "png", "pdf", "epub", "csv", "odt"],
    
}

enum type_enum {
    pdf = "pdf",
    docx = "docx",
    txt = "txt",
    png = "png",
    jpeg = "jpeg",
    gif = "gif",
    odt = "odt",
    xlsx = "xlsx",
}


export function getButtons(type: string) {
    let options_to_convert: Array<any> = []

    if(type == type_enum.pdf){
        Options.pdf.map((option) => options_to_convert.push(
           Markup.button.callback(option, option)
        ));
    }else if(type == type_enum.docx){
        Options.docx.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.txt){
        Options.txt.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.png){
        Options.png.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.jpeg){
        Options.jpeg.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.gif){
        Options.gif.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.odt){
        Options.odt.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    else if(type == type_enum.xlsx){
        Options.xlsx.map((option) => options_to_convert.push(
            Markup.button.callback(option, option)
         ));
    }
    
    const partSize = Math.ceil(options_to_convert.length / 3);
    
    const [part1, part2, part3] = [
       options_to_convert.slice(0, partSize),
       options_to_convert.slice(partSize, partSize * 2),
       options_to_convert.slice(partSize * 2)
    ];
    return options_to_convert = [part1, part2, part3];
}

