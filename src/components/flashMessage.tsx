export default function FlashMessage({
  flashMessage,
}: {
  flashMessage: string;
}) {
  return (
    <>
      <style jsx>
        {`
          @keyframes Progress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }

          div.progress-bar {
            animation: Progress 2s linear forwards;
          }
        `}
      </style>
      <div className="flash-message-layout fixed left-0 right-0 top-0 flex w-full  justify-end  opacity-90">
        <div className="flash-message-container w-1/3  bg-orange-400  p-2">
          <p className="text-center text-white">{flashMessage}</p>
          <div className="progress-bar mt-2 h-2 origin-left bg-gray-100"></div>
        </div>
      </div>
    </>
  );
}
