import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import React, { ReactNode, useMemo } from "react";
import {
  BsBookmarkCheck,
  BsCalendarDate,
  BsCrosshair,
  BsPersonWorkspace,
} from "react-icons/bs";
import Logo from "../Logo";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logout } from "../../../store/modules/authSlice";

export default function Header({ ThemeToggle }: { ThemeToggle?: ReactNode }) {
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.auth.account);

  const location = useLocation();
  const [selectedTab, hidden] = useMemo(() => {
    return [location.pathname.split("/")[1], location.pathname === "/auth"];
  }, [location]);

  return (
    <>
      {!hidden && (
        <div className="flex h-16 items-center border-b">
          <div className="flex w-full items-center justify-between px-4">
            <Logo width={170} className="mt-1 fill-foreground"></Logo>
            <Tabs
              aria-label="Navigation"
              color="primary"
              size="lg"
              variant="underlined"
              selectedKey={selectedTab}
              disableAnimation
            >
              <Tab
                key="goals"
                href="#/goals"
                title={
                  <div className="flex items-center justify-center space-x-2">
                    <BsCrosshair />
                    <span>Goals</span>
                  </div>
                }
              />
              <Tab
                key="planner"
                href="#/planner"
                title={
                  <div className="flex items-center justify-center space-x-2">
                    <BsCalendarDate />
                    <span>Planner</span>
                  </div>
                }
              />
              <Tab
                key="habits"
                href="#/habits"
                title={
                  <div className="flex items-center justify-center space-x-2">
                    <BsBookmarkCheck />
                    <span>Habits</span>
                  </div>
                }
              />
              <Tab
                key="workspace"
                href="#/workspace"
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
              <Dropdown classNames={{ content: "rounded-small" }}>
                <DropdownTrigger>
                  <div className="flex items-center justify-center lg:w-[170px]">
                    <Avatar
                      src="https://th.bing.com/th/id/OIP.sQITeQsafh6osAKTB25AMgHaFj?w=233&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      classNames={{
                        base: "cursor-pointer",
                      }}
                      isBordered
                      color="primary"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown Variants">
                  <DropdownSection
                    showDivider
                    classNames={{ base: "mb-0", divider: "h-[0.5px] my-1" }}
                  >
                    <DropdownItem
                      key="profile"
                      className="cursor-default data-[hover=true]:bg-transparent"
                    >
                      <User
                        name={account?.displayName}
                        description={account?.email}
                        avatarProps={{
                          className: "hidden",
                        }}
                      />
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem
                      key="profile"
                      startContent={<i className="bi bi-person"></i>}
                    >
                      Your profile
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      startContent={<i className="bi bi-box-arrow-right"></i>}
                      onClick={() => dispatch(logout())}
                    >
                      Log out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
