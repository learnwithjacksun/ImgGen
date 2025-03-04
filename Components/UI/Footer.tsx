import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-line py-6 md:py-0">
      <div className="main flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-sub">
          Powered by{" "}
          <Link
            href="https://imgbb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            ImgBB
          </Link>
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Crafted with ❤️ by{" "}
          <Link
            href="https://github.com/learnwithjacksun"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sora font-medium underline underline-offset-4"
          >
            Gift Jacksun
          </Link>
        </p>
      </div>
    </footer>
  )
}

