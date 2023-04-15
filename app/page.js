// "use client"
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import useModel from '../hooks/customhooks'

async function HomePage () {
  // const [model,setModel] = useModel();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-2">
      <h1 className="text-5xl font-bold mb-20">AIble</h1>
      {/* {model === null ? ( */}
       <div className="md:flex sm:inline space-x-12">
      <div className="w-[250px] h-[250px] border border-white rounded-md">
        <div className="flex flex-col justify-center items-center h-full">
      <svg className="w-[60px] flex justify-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

          <h1 className="text-xl font-bold">Text Generating Bot</h1>
          </div>
      </div>
      <div className="w-[250px] h-[250px] border border-white rounded-md">
      <div className="flex flex-col justify-center items-center h-full">
      <svg className="w-[60px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

          <h1  className="text-xl font-bold">Image Generating Bot</h1>
          </div>
      </div>
      </div> 
      {/* )

: (  */}
  {/* <div className="flex space-x-2 text-center">
  <div className="">
    <div className="flex flex-col items-center justify-center mb-5">
      <SunIcon className="h-8 w-8" />
      <h2>Examples</h2>
    </div>

    <div className="space-y-2">
      <p className="infoText">"Explain Something to me"</p>
      <p className="infoText">
        "What is the difference between a dog and a cat?"
      </p>
      <p className="infoText">"What is the color of the sun?"</p>
    </div>
  </div>
  <div className="">
    <div className="flex flex-col items-center justify-center mb-5">
      <BoltIcon className="h-8 w-8" />
      <h2>Capabilities</h2>
    </div>

    <div className="space-y-2">
      <p className="infoText">Change the ChatGPT Model to use</p>
      <p className="infoText">
        Messages are stored in Firebase's Firestore
      </p>
      <p className="infoText">
        Hot Toast notifications when ChatGPT is thinking!
      </p>
    </div>
  </div>
  <div className="">
    <div className="flex flex-col items-center justify-center mb-5">
      <ExclamationTriangleIcon className="h-8 w-8" />
      <h2>Limitations</h2>
    </div>

    <div className="space-y-2">
      <p className="infoText">
        May occasionally generate incorrect information
      </p>
      <p className="infoText">
        May occasionally produce harmful instructions or biased content
      </p>
      <p className="infoText">
        Limited knowledge of world and events after 2021
      </p>
    </div>
  </div>
</div> */}
 {/* )}  */}
    </div>
  );
}

export default HomePage;
