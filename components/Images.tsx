import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Image({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#383838]/50"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} className="h-8 w-8 rounded-lg" />
        {/* <p className="pt-1 text-sm">{message.text}</p> */}
        <img src={message.text} alt="" />
      </div>
    </div>
  );
}

export default Image;