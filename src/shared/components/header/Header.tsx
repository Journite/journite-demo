import { Tab, Tabs, User } from "@nextui-org/react";
import { ReactNode } from "react";
import { BsBookmarkCheck, BsCalendarDate, BsCrosshair } from "react-icons/bs";
import Logo from "../common/Logo";

export default function Header({ ThemeToggle }: { ThemeToggle: ReactNode }) {
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
            aria-label="Options"
            color="primary"
            size="lg"
            variant="underlined"
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <BsCrosshair />
                  <span>Goals</span>
                </div>
              }
            />
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <BsCalendarDate />
                  <span>Planner</span>
                </div>
              }
            />
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <BsBookmarkCheck />
                  <span>Habits</span>
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
