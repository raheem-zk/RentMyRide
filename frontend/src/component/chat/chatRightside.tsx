import React from "react";

const ChatRightside = () => {
  return (
    // <div className="w-full  bg-white">
    //   <div className="bg-yellow-200 flex max-h-screen min-h-fit flex-start p-2 position sticky t-0 right-0">
    //     <img
    //       src="data:image/png;base64,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"
    //       className="rounded-full w-20 h-20 p-2 mx-auto"
    //       alt="User Avatar"
    //     />
    //     <h1 className="text-2xl font-semibold text-center mt-4 mx-5"> Raju</h1>
    //   </div>
    //     <div className="">
    //         message
    //     </div>
    //     <div className="bg-yellow-700 p-4 flex items-center sticky b-0">
    //       <input
    //         type="text"
    //         className="w-full mx-5 border-gray-300 p-2 rounded-lg mr-2"
    //       />
    //       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
    //         Send
    //       </button>
    //     </div>
    // </div>
    <div className="w-full h-screen bg-white">
      <div className="bg-yellow-200 flex max-h-screen min-h-fit flex-start p-2 sticky top-0 right-0">
        <img
          src="data:image/png;base64,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"
          className="rounded-full w-20 h-20 p-2 mx-auto"
          alt="User Avatar"
        />
      </div>
      <div className="h-screen">

      </div>
      <div className="bg-yellow-700 p-4 flex items-center sticky bottom-0">
        <input
          type="text"
          className="w-full mx-5 border-gray-300 p-2 rounded-lg mr-2"
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRightside;