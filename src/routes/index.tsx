
import { Chat } from "@/components/Chat"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="container py-8">
      <Chat />
      <Toaster />
    </div>
  )
}
