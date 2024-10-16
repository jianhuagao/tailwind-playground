"use client";
import { memo, useState } from "react";
import Image from "next/image";
import Editor from "../editor";
import TailwindView from "../tailwindView";
import clsx from "clsx";

const Play = () => {
  const [playContent, setPlayContent] = useState("");
  const [layout, setLayout] = useState<"-" | "|">("-");

  const switchLayout = () => {
    setLayout(layout === "-" ? "|" : "-");
  };

  return (
    <div className="flex flex-col gap-7 grow">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/play.svg"
          className="m-0"
          alt="play"
          width={22}
          height={22}
          priority
        />
        <span className="text-lg select-none">
          <span className="font-semibold">Tailwind</span> Playground
        </span>
        <div className="ml-auto">
          <button
            onClick={switchLayout}
            className="p-2 rounded cursor-pointer hover:bg-black/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={clsx(
                "size-6 dark:invert transition-all",
                layout === "|" && "rotate-90"
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 grow">
        <div className={clsx(layout === "|" ? "col-span-2" : "col-span-1")}>
          <Editor
            layout={layout}
            value={playContent}
            onValueChange={setPlayContent}
          />
        </div>
        <div className={clsx(layout === "|" ? "col-span-2" : "col-span-1")}>
          <TailwindView
            layout={layout}
            value={playContent}
            onValueChange={setPlayContent}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Play);
