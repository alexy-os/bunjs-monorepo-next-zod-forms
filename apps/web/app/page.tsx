import { LayoutTemplate } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <Link href="/formmy">
      <Button>
        <LayoutTemplate /> Hello World
      </Button>
    </Link>
  )
}
