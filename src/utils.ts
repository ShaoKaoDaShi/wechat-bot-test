import {ChatCompletionMessage} from "openai/resources";

import GPT3TokenizerImport from 'gpt3-tokenizer';
import {config} from "./config.js";
import { ChatMessage } from "./interface.js";

export const regexpEncode = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const GPT3Tokenizer: typeof GPT3TokenizerImport =
  typeof GPT3TokenizerImport === 'function'
    ? GPT3TokenizerImport
    : (GPT3TokenizerImport as any).default;
// https://github.com/chathub-dev/chathub/blob/main/src/app/bots/chatgpt-api/usage.ts
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
function calTokens(chatMessage:ChatMessage[]):number {
  let count = 0
  for (const msg of chatMessage) {
  //TODO:  content 有图片类型和文字类型的数组 这些暂时没有考虑进去
    count += countTokens(msg.content as string ||"")
    count += countTokens(msg.role)
  }
  return count + 2
}

function countTokens(str: string):number {
//TODO: 图片token如何计算

  const encoded = tokenizer.encode(str)
  return encoded.bpe.length
}
export function isTokenOverLimit(chatMessage:ChatMessage[]): boolean {
  let limit = 4096;
  if (config.model==="gpt-3.5-turbo" || config.model==="gpt-3.5-turbo-0301") {
    limit = 4096;
  }
  return calTokens(chatMessage) > limit;
}