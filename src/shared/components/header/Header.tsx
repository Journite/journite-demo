import { Tab, Tabs, User } from "@nextui-org/react";
import { ReactNode } from "react";
import { BsBookmarkCheck, BsCalendarDate, BsCrosshair } from "react-icons/bs";
import Logo from "../common/Logo";

export default function Header({ ThemeToggle }: { ThemeToggle: ReactNode }) {
  return (
    <>
      <div className="border-b flex items-center h-16">
        <div className="px-4 w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-black h-10 w-10 rounded-lg flex justify-center items-center text-lg border-[1.5px] border-white text-content1-foreground">
              <Logo width={16} />
            </div>
            <span className="text-foreground font-semibold text-lg">
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

          <div className="flex gap-6 items-center">
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
