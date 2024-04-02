import axios from "axios"
import OpenAI from 'openai';


const client = new OpenAI(
{
  baseURL:"http://127.0.0.1:8080/v1",
  apiKey : "sk-no-key-required"
}
)
const main = async () => {

  const completion = await client.chat.completions.create(
    {
      model:"LLaMA_CPP",
      messages:[
          {"role": "system", "content": "您是一个人工智能助手。您的首要任务是帮助用户实现他们的请求，以实现用户的满足感。"},
          {"role": "user", "content": "写一首龙为主题的诗"},
          {"role": "user", "content": "写一首蛇为主题的诗"},
          {"role": "user", "content": "我刚刚提问了哪些问题？"},
      ]
    }
  )
  console.log(completion.choices[0].message)

}

main()
const instance = axios.create({
  baseURL: 'http://localhost:1337/v1/',
  timeout: 10000,
});
export const createQwenApi = ()=>{

  instance.get("/models/qwen-7b").then((res)=>{
    console.log(res.data)
  }).catch((e)=>{
    console.log(e)
  })
}

export const chatWithQwen = async (text: string)=>{
  instance.post("/chat/completions",{
    message:[
      // {
      //   "content": "你是一个温柔体贴粘人的异地男友，你称呼我为宝贝.",
      //   "role": "system"
      // },
      {
        "content": "你是一个温柔体贴粘人的异地男友，你称呼我为宝贝",
        "role": "user"
      },
      {
        "content": "我饿了你怎么帮助我",
        "role": "user"
      }
    ],
    model: "qwen-7b",
    temperature: 0.7,
    top_p: 0.95,
    // stream: true,
    max_tokens: 4096,
    stop: [],
    frequency_penalty: 0,
    presence_penalty: 0
  }).then((res)=>{
    console.log(res.data.choices[0].message)
  })
}

export const threadsList = ()=>{
  instance.get("/threads").then((res)=>{
    console.log(res.data)
  })
}
export const createTread = ()=>{
  instance.post("/threads/create",{
    "object": "thread",
  "title": "funny physics joke",
  "assistants": [
    {
      "assistant_id": "Jan",
      "assistant_name": "Jan",
      "instructions": "string",
      "model": {
        id: 'qwen-7b',
        object: 'model',
        name: 'Qwen Chat 7B Q4',
        version: '1.0',
        description: 'Qwen is optimized at Chinese, ideal for everyday tasks.',
        format: 'gguf',
        settings: {
          ctx_len: 4096,
          prompt_template: '<|im_start|>system\n' +
            '{system_message}<|im_end|>\n' +
            '<|im_start|>user\n' +
            '{prompt}<|im_end|>\n' +
            '<|im_start|>assistant',
          llama_model_path: 'qwen1_5-7b-chat-q4_k_m.gguf'
        },
        parameters: {
          temperature: 0.7,
          top_p: 0.95,
          stream: true,
          max_tokens: 4096,
          stop: [],
          frequency_penalty: 0,
          presence_penalty: 0
        },
        metadata: { author: 'Alibaba', tags: [ '7B', 'Finetuned' ], size: 4770000000 },
        engine: 'nitro'
      }
    }
  ],
  metadata: { author: 'Alibaba', tags: [ '7B', 'Finetuned' ], size: 4770000000 },
  }).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
// createTread();
// threadsList()
// chatWithQwen("123");
// createQwenApi();