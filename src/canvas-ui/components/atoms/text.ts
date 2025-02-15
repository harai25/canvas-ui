import { type ICanvasManager } from "~/canvas";
import type { IServicesManager } from "~/services";
import type { IRenderManager } from "~/services/render";

interface IText {
  x: number;
  y: number;
  width?: number;
  height?: number;
  content: string;
  fontSize: number;
  color?: string;
}
// export const text = (ctx: CanvasRenderingContext2D, params: IText) => {
//   ctx.font = `${params.fontSize}px serif`
//   ctx.fillStyle = params.color ?? 'black'
//   let {x, y} = params

//   let textWidth = ctx.measureText(params.content).width
//   if (!params.width || textWidth < params.width) {
//     ctx.fillText(params.content, x, y)
//     return
//   }

//   let text = params.content
//   while (text) {
//     let breakCount = Math.floor(textWidth / params.width)
//     if (breakCount < 1) {
//       ctx.fillText(text, x, y)
//       return
//     }

//     let pointer = Math.floor(text.length / breakCount)

//     do {
//       while (text.charAt(pointer) !== ' ' && pointer > 0) {
//         pointer--
//       }
//       if (pointer === 0) {
//         ctx.fillText(text, x, y)
//         return
//       }
//       let currWidth = ctx.measureText(text.slice(0, pointer)).width
//       if (currWidth<params.width) {
//         break
//       }
//       pointer--
//     } while (pointer)

//     ctx.fillText(text.slice(0, pointer), x, y)
//     y+=params.fontSize
//     text = text.slice(pointer+1, text.length)
//     textWidth = ctx.measureText(text).width
//   }
// }


// export function createRenderText(canvasManager: ICanvasManager) {
 export function createMethodText(canvasManager: ICanvasManager, servicesManager: IServicesManager) {
  return (params: IText) => {

    // Устанавливаем шрифт и цвет
    // ctx.font = `${params.fontSize}px serif`;
    // ctx.fillStyle = params.color ?? 'black';
    canvasManager.textMethods.styleText({
      fontSize: params.fontSize,
      color: params.color,
    });
  
    // Получаем параметры текста
    const { x, y, width, content, fontSize } = params;
  
    // Проверка, если ширина не указана или текст помещается в одну строку
    if (!width || canvasManager.textMethods.measureText(content).width <= width) {
      canvasManager.textMethods.fillText({ text: content, x, y });
      return;
    }
  
    // Начальные координаты для первой строки
    let currentX = x;
    let currentY = y;
  
    // Переменные для сборки строки и её текущей ширины
    let currentLine = "";
    let currentLineWidth = 0;
    const words = content.split(" ");
    // Переносим текст построчно
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // Добавляем пробел перед новым словом (если строка не пустая)
      const nextWord = currentLine ? ` ${word}` : word;
  
      // Измеряем длину следующей строки
      const nextLineWidth = canvasManager.textMethods.measureText(nextWord).width;
  
      // Если следующая строка превышает допустимую ширину, начинаем новую строку
      if (currentLineWidth + nextLineWidth >= width) {
        // Выводим собранную строку
        canvasManager.textMethods.fillText({
          text: currentLine.trim(),
          x: currentX,
          y: currentY,
        });
  
        // Переходим на следующую строку
        currentX = x;
        currentY += fontSize;
  
        // Начинаем собирать новую строку
        currentLine = word;
        currentLineWidth = canvasManager.textMethods.measureText(word).width;
      } else {
        // Продолжаем добавлять слово в текущую строку
        currentLine += nextWord;
        currentLineWidth += nextLineWidth;
      }
    }
  
    // Выводим последнюю строку, если она осталась
    if (currentLine) {
      canvasManager.textMethods.fillText({
        text: currentLine.trim(),
        x: currentX,
        y: currentY,
      });
    }
  }
};
