import { ChatCompletionMessageParam} from "openai/resources";

export interface IConfig {
  api?: string;
  openai_api_key: string;
  model: string;
  chatTriggerRule: string;
  disableGroupMessage: boolean;
  temperature: number;
  blockWords: string[];
  chatgptBlockWords: string[];
  chatPrivateTriggerKeyword: string;
}
export interface User {
  username: string,
  chatMessage: ChatCompletionMessageParam[],
}

export type ChatMessage = ChatCompletionMessageParam;