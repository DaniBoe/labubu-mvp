import { LabubuCheckerModal } from "@/components/labubu-checker-modal"

export default function YourExistingPage() {
  return (
    <div>
      {/* Your existing content */}
      <h1>Your Page Content</h1>

      {/* Add the checker modal anywhere */}
      <div className="my-8">
        <LabubuCheckerModal />
      </div>

      {/* More existing content */}
    </div>
  )
}
