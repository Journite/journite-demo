import { Tab, Tabs, User } from "@nextui-org/react";
import { ReactNode, useMemo } from "react";
import {
  BsBookmarkCheck,
  BsCalendarDate,
  BsCrosshair,
  BsPersonWorkspace,
} from "react-icons/bs";
import Logo from "../Logo";
import { useLocation } from "react-router-dom";

export default function Header({ ThemeToggle }: { ThemeToggle: ReactNode }) {
  const location = useLocation();
  const selectedTab = useMemo(() => {
    return location.pathname.split("/")[1];
  }, [location]);

  return (
    <>
      <div className="flex h-16 items-center border-b">
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-white bg-black text-lg text-content1-foreground">
              <Logo width={16} />
            </div>
            <span className="text-lg font-semibold text-foreground">
              Planny
            </span>
          </div>
          <Tabs
            aria-label="Navigation"
            color="primary"
            size="lg"
            variant="underlined"
            selectedKey={selectedTab}
          >
            <Tab
              key="goals"
              href="/#/goals"
              title={
                <div className="flex items-center justify-center space-x-2">
                  <BsCrosshair />
                  <span>Goals</span>
                </div>
              }
            />
            <Tab
              key="planner"
              href="/#/planner"
              title={
                <div className="flex items-center justify-center space-x-2">
                  <BsCalendarDate />
                  <span>Planner</span>
                </div>
              }
            />
            <Tab
              key="habits"
              href="/#/habits"
              title={
                <div className="flex items-center justify-center space-x-2">
                  <BsBookmarkCheck />
                  <span>Habits</span>
                </div>
              }
            />
            <Tab
              key="workspace"
              href="/#/workspace"
              title={
                <div className="flex items-center justify-center space-x-2">
                  <BsPersonWorkspace />
                  <span>Workspace</span>
                </div>
              }
            />
          </Tabs>

          <div className="flex items-center gap-6">
            {ThemeToggle}
            <User
              classNames={{ name: "font-semibold" }}
              name="My"
              avatarProps={{
                src: "https://th.bing.com/th/id/OIP.sQITeQsafh6osAKTB25AMgHaFj?w=233&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                classNames: { base: "border h-8 w-8" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
