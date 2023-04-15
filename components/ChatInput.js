"use client";

import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { async } from "@firebase/util";

// type Props = {
//   chatId: string;
//   response : object;
//   data: string;
// };

function ChatInput({ chatId }) {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState()
  const [inputText, setInputText] = useState("")
  // const { data: model } = useSWR("model", {
  //   fallbackData: "text-davinci-003",
  // });
  const options = ['Text', 'Image']
  const [selected, setSelected] = useState(options[0])
  const [size, setSize] = useState('small')
  const model = "text-davinci-003"
  const { data: session } = useSession();

  const [messages] = useCollection(
    query(
      collection(
        db,
        "users",
        session?.user?.email,
        "chats",
        chatId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );

 async function generateResponse(e) {
    e.preventDefault();

    const input = prompt.trim();
    setPrompt("");
    setInputText(input)

    if (!prompt) return;

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    if(selected === 'Text'){

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("AIble is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input, chatId, model, session }),
      
    }).then((res) => {
      console.log(res)
      toast.success("AIble has responded!", {
        id: notification,
      });
    });
  } else if(selected === 'Image') {


    await addDoc(
        collection(
          db,
          "users",
          session?.user?.email,
          "ImageChats",
          chatId,
          "messages"
        ),
        message
      );

      const notification = toast.loading("AIble is thinking...");
  try{

  const response = await fetch("/api/askImages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: input, size: size,session,chatId }),
    
  })
  // .then((res) => {
  //   console.log(res.json())
  //   // .then((img) => img.data)
  //   setImages(res.json())
  //   toast.success("AIble has responded!", {
  //     id: notification,
  //   });
  // });

  if (!response.ok) {
    removeSpinner();
    throw new Error('That image could not be generated');
  } else {
    toast.success("AIble has responded!", {
            id: notification,
          });
  }

  const data = await response.json();
  // console.log(data);

  const imageUrl = data.data;

  setImages(imageUrl)
}
  catch(err){
    console.log(err)
  }

}


 };



  // const [textmessages, loading, error] = useCollection(
  //   session &&
  //     query(
  //       collection(
  //         db,
  //         "users",
  //         session?.user?.email || "",
  //         "chats",
  //         chatId,
  //         "messages"
  //       ),
  //       orderBy("createdAt", "asc")
  //     )
  // );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className=" bg-no-repeat bg-cover flex-1 overflow-y-scroll overflow-x-hidden">
      {messages?.empty && selected === 'Text' ? (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      ):(
        <>
      {
        selected === 'Text' ?
        (
          <>
          {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} />
          ))}
          </>
        ) :
        (
          <div className="w-full flex flex-col justify-center">
          <img className="mx-auto mt-10" src={images} alt="" />
          <p className="mx-auto text-white font-bold mt-10">{inputText}</p>
          </div>
        )
      }
      </>
      )}
     
      
    </div>
    <div className="bg-gray-700/50 shadow-inner shadow-yellow-500/40 rounded-lg text-sm focus:outline-none">
      <form onSubmit={generateResponse} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent text-gray-400 focus:outline-none flex-1
            disabled:cursor-not-allowed disabled:text-gray-300
          "
          value={prompt}
          placeholder="Type your message here..."
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!session}
        />
        {
          selected === 'Image' &&
          (
            <>
            <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
            </>
          )
        }

<select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-4 py-2 bg-blue-500 rounded-lg text-white">
          <option>{options[0]}</option>
          <option>{options[1]}</option>
        </select>

        <button
          disabled={!prompt || !session}
          className="
            bg-[#11A37F] hover:opacity-50 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed
        "
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      {/* <div className="md:hidden">
        <ModelSelection />
      </div> */}
    </div>
    </div>
  );
}

export default ChatInput;
