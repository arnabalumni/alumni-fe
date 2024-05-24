import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DepartmentsData } from "@/lib/types";

// import { DepartmentsData } from "@/assets/school-depts";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [DepartmentsData, setDepartmentsData] = useState<DepartmentsData>({});
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [_, setSelectedYear] = useState(0);
  const [queryString, setQueryString] = useState("/");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_LOCAL_SERVER_URL
          }/api/v1/getallinstitution`
        );
        const data = await response.json();
        setDepartmentsData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  let hoverTimeout: NodeJS.Timeout;

  const delayedHoverSchool = (schoolName: string) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setSelectedSchool(schoolName);
    }, 40); // Delay in milliseconds
  };

  const delayedHoverDepartment = (department: string) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setSelectedDepartment(department);
    }, 40); // Delay in milliseconds
  };

  const delayedHoverProgram = (program: string) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      console.log(program);
      setSelectedProgram(program);
    }, 80); // Delay in milliseconds
  };
  const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves the element before the delay
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };
  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    const queryString = `?school=${encodeURIComponent(
      selectedSchool
    )}&department=${encodeURIComponent(
      selectedDepartment
    )}&program=${encodeURIComponent(selectedProgram)}&year=${encodeURIComponent(
      year
    )}`;
    setQueryString(queryString);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, []);

  return (
    <>
      <div className="flex h-[6vh] px-10 justify-end items-center bg-primary text-primary-foreground">
        {/* <Link to="/">
          <img
            className="w-48"
            src="/aus-text-logo.png"
            alt="Assam University's logo with text"
          />
        </Link> */}
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Link to="/">Home</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to="/about">
                <DropdownMenuItem>About Us</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Message from Vice-Chancellor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>Committee</DropdownMenuTrigger>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>Alumni Details</DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(DepartmentsData).map(
                ([schoolName, schoolData]) => (
                  <DropdownMenuSub key={schoolName}>
                    <DropdownMenuSubTrigger
                      onMouseEnter={() => delayedHoverSchool(schoolName)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {schoolName}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {Object.entries(schoolData.Departments).map(
                        ([deptName, deptData]) => (
                          <DropdownMenuSub key={deptName}>
                            <DropdownMenuSubTrigger
                              onMouseEnter={() =>
                                delayedHoverDepartment(deptName)
                              }
                              onMouseLeave={handleMouseLeave}
                            >
                              {deptName}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {Object.entries(deptData.Programs).map(
                                ([programName, years]) => (
                                  <DropdownMenuSub key={programName}>
                                    <DropdownMenuSubTrigger
                                      onMouseEnter={() =>
                                        delayedHoverProgram(programName)
                                      }
                                      onMouseLeave={handleMouseLeave}
                                    >
                                      {programName}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                      {years.map((year) => (
                                        <Link
                                          to={"/alumnidetails" + queryString}
                                          key={year}
                                        >
                                          <DropdownMenuItem
                                            onMouseEnter={() =>
                                              handleYearClick(year)
                                            }
                                          >
                                            {year}
                                          </DropdownMenuItem>
                                        </Link>
                                      ))}
                                    </DropdownMenuSubContent>
                                  </DropdownMenuSub>
                                )
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        )
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>Alumni Activities</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Notable Alumni</DropdownMenuItem>
              <DropdownMenuItem>Events</DropdownMenuItem>
              <DropdownMenuItem>Achievements</DropdownMenuItem>
              <DropdownMenuItem>Reunion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <Link to={"/"}>
              <DropdownMenuTrigger>Gallery</DropdownMenuTrigger>
            </Link>
          </DropdownMenu>
          <DropdownMenu>
            <Link to={"/contact"}>
              <DropdownMenuTrigger>Contact Us</DropdownMenuTrigger>
            </Link>
            {/* <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
