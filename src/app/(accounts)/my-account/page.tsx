"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/typography";
import {
  UserCogIcon,
  DollarSignIcon,
  LogOutIcon,
  HomeIcon,
} from "lucide-react";
import AccountInformation from "./_components/account-information";
import { MyOrders } from "./_components/my-orders";
import { createPortal } from "react-dom";
import { UserInfoForm } from "./_components/user-info-form";
import { useUserInfoForm } from "./_components/user-info-form/useUserInfoForm";
import { Address } from "./_components/address";

const TABS_ACCOUNT = [
  {
    name: "Conta",
    icon: <UserCogIcon size={24} />,
    activeIcon: <UserCogIcon size={24} color="#CB1EE8" />,
    component: <AccountInformation />,
  },
  {
    name: "Informações de pagamento",
    icon: <DollarSignIcon size={24} />,
    activeIcon: <DollarSignIcon size={24} color="#CB1EE8" />,
    component: <MyOrders />,
  },
  {
    name: "Endereços",
    icon: <HomeIcon size={24} />,
    activeIcon: <HomeIcon size={24} color="#CB1EE8" />,
    component: <Address />,
  },
  {
    name: "Sair",
    icon: <LogOutIcon size={24} />,
    activeIcon: <LogOutIcon size={24} color="#CB1EE8" />,
    component: <UserInfoForm />,
  },
];

export default function MyAccount() {
  const [tabSelected, setTabSelected] = useState(TABS_ACCOUNT[0].name);
  const [activePage, setActivePage] = useState(TABS_ACCOUNT[0].component);

  const { isUserForm } = useUserInfoForm();

  const handleTabChange = (tabName: string) => {
    setTabSelected(tabName);
    const tab = TABS_ACCOUNT.find((tab) => tab.name === tabName);
    if (tab) setActivePage(tab?.component);
  };

  return (
    <main className="relative flex flex-col min-h-screen bg-background overflow-hidden">
      <div className="box-border mx-auto mt-40 flex items-start justify-center h-full max-w-[76rem] w-full flex-grow tab-port:mt-10">
        <div
          key="content"
          className="flex gap-8 w-full h-full tab-land:flex-col tab-land:px-6 pb-6 mobile:pb-2"
        >
          {/* sidebar */}
          <div className="flex flex-col gap-16 flex-1 max-w-[22rem] h-full tab-port:max-w-full tab-port:gap-5">
            <Typography
              variant={"h3"}
              fontWeight={"bold"}
              className=" max-w-[22rem] mobile:text-[24px] font-semibold"
            >
              Minha Conta
            </Typography>

            <div key="sidebar-options">
              {TABS_ACCOUNT.map((tab) => (
                <div onClick={() => handleTabChange(tab.name)} key={tab.name}>
                  <Typography
                    variant="h6"
                    className={cn([
                      "flex items-center gap-4 cursor-pointer rounded-sm h-14 px-4 hover:bg-purple transition duration-200",
                      ,
                    ])}
                  >
                    {tabSelected === tab.name ? tab.activeIcon : tab.icon}
                    {tab.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4 bg-background w-[12rem] h-fit rounded-xl p-4 tab-land:w-full mobile:bg-transparent mobile:p-0 mobile:gap-2">
            {activePage}
            {isUserForm && createPortal(<UserInfoForm />, document.body)}
          </div>
        </div>
      </div>
    </main>
  );
}
