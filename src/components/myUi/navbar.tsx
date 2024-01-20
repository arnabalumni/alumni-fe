import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DepartmentsData } from "@/assets/school-depts";

type DepartmentsData = {
  [key: string]: {
    Departments: string[];
  };
};

const renderMenuItems = (data: DepartmentsData) => {
  return Object.entries(data).map(([schoolName, details]) => (
    <DropdownMenuItem key={schoolName}>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{schoolName}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent className="bg-white">
            {details.Departments.map((department) => (
              <DropdownMenuItem key={department}>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{department}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>1st Year</DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuItem>
  ));
};

export function Navbar() {
  return (
    <>
      <div className="flex  h-[8vh] px-10 py-14 justify-between items-center">
        <img
          className="w-48"
          src="/aus-text-logo.png"
          alt="Assam University's logo with text"
        />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-[7rem] px-5 py-3 bg-white">
                  <a href="">About Us</a>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">
                Committee
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="h-[40rem] w-[40rem] bg-white">Sample</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavigationMenuTrigger className="text-2xl">
                    Alumni Details
                  </NavigationMenuTrigger>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {renderMenuItems(DepartmentsData)}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">
                Alumni Activities
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="h-[40rem] w-[40rem] bg-white">Sample</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">
                Contact Us
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="h-[40rem] w-[40rem] bg-white">Sample</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
