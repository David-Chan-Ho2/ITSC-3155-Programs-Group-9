import CalendarList from "../features/calendar/CalendarList"
import AbridgeProjects from "../features/projects/AbridgeProjects"

function HomePage() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="grid gap-1">
        <div>
          <p className="font-bold text-xl">Projects</p>
          <AbridgeProjects />
        </div>
      </div>
      <div className="col-span-2">
        <CalendarList />
      </div>
    </div>
  )
}

export default HomePage