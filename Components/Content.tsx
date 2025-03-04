import { Check, Copy } from "lucide-react";
import { useState } from "react";
import useUrl from "@/Hooks/useUrl";

export default function Content() {
  const {linkContent, htmlContent} = useUrl()
    const urlContent = linkContent
    const htmlTagContent = htmlContent
  return (
    <>
      <div className="space-y-2">
        <Display title="Image URL" content={urlContent}/>
        <Display title="HTML" content={htmlTagContent}/>
      </div>
    </>
  );
}

const Display = ({title, content}: {title: string, content: string}) => {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        setCopied(true)
        navigator.clipboard.writeText(content)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    return (
        <>
         <div className="p-4 bg-foreground rounded-xl border border-line space-y-2 shadow-2xl shadow-yellow-500/20">
          <h3 className="text-sm font-medium text-sub">{title}</h3>
          <div className="px-4 py-2 bg-background text-sm rounded-md border border-line">
            {content ? content : "No content"}
          </div>
          <div className="flex justify-end">
            <button onClick={handleCopy} className="px-3 py-2 bg-secondary text-main text-sm rounded-full">
              {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-yellow-500"/>}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        </>
    )
}
