import GridLayout from "react-grid-layout"
import CalendarList from "../features/calendar/CalendarList"
import AbridgeProjects from "../features/projects/AbridgeProjects"

function HomePage() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 2, h: 1, static: true },
    { i: "b", x: 4, y: 0, w: 7, h: 2, static: true },
  ]

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <div key="a">
        <AbridgeProjects />
      </div>
      <div key="b">
        <CalendarList />
      </div>
    </GridLayout>
  )
}

export default HomePage