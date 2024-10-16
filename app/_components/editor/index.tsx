import { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import CopyBtn from "../copyBtn";
import Editor, { OnChange } from "@monaco-editor/react";
import clsx from "clsx";

interface EditorProps {
  value: string;
  onValueChange: (code: string) => void;
  layout: "-" | "|";
}

export default memo(function EditorComponent({
  layout,
  value,
  onValueChange,
}: EditorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState("600px");

  const handleEditorChange: OnChange = (value) => {
    onValueChange(value || "");
  };

  // 监听父容器高度并动态调整编辑器高度
  useEffect(() => {
    const updateEditorHeight = () => {
      if (contentRef.current && headerRef.current) {
        console.log(
          contentRef.current.clientHeight,
          headerRef.current.offsetHeight
        );
        const contentHeight = contentRef.current.clientHeight;
        const headerHeight = headerRef.current.offsetHeight;
        const availableHeight = contentHeight - headerHeight;
        setEditorHeight(`${availableHeight}px`);
      }
    };

    // 初始化时调整一次
    updateEditorHeight();

    // 监听窗口变化
    window.addEventListener("resize", updateEditorHeight);

    // 清理事件监听器
    return () => window.removeEventListener("resize", updateEditorHeight);
  }, []);

  return (
    <div
      ref={contentRef}
      className={clsx(
        layout === "-" && "h-full",
        "z-30 overflow-y-auto rounded-sm bg-[#141414] ring-4 ring-[#545454]"
      )}
    >
      <div
        ref={headerRef}
        className="sticky top-0 z-10 flex items-center gap-2 bg-white/10 px-2 py-1.5 text-white backdrop-blur-xl"
      >
        <Image
          src="/icons/edit.svg"
          className="m-0 ml-2 invert"
          alt="code"
          width={20}
          height={20}
          priority
        />
        HTML
        <div className="ml-auto">
          <CopyBtn className="!bg-[#686666]" content={value} />
        </div>
      </div>
      <Editor
        height={editorHeight} // 动态高度
        defaultLanguage="html"
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
        }}
      />
    </div>
  );
});
