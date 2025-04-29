import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
// import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "./ui/button";
export function AppSidebar() {
  return (
    <Sidebar className={""}>
      <SidebarContent className={"bg-gray-50"}>
        <SidebarHeader>
          <h1 className="text-lg font-black text-center">
            Object-Oriented Principles in PHP
          </h1>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>
            {/* <h1 className="text-lg font-black my-3">Object-Oriented Principles in PHP</h1> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className={"-mt-10"}>
            <SidebarMenu>
              <Accordion collapsible type="single" className="space-y-4">
                <AccordionItem value="classes">
                  <AccordionTrigger className="bg-[#d6d6d6] text-left px-4 cursor-pointer w-full py-2">
                    Classes
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Class Declaration and Structure
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Properties (Attributes) and Methods
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Constructors and destructors
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Static members
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Class constants
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Namespaces and autoloading
                    </p>
                    <Button
                      className={
                        "rounded-none bg-orange-700 cursor-pointer hover:bg-orange-800"
                      }
                    >
                      Topic test
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Objects">
                  <AccordionTrigger className="font- text-left px-4 bg-[#d6d6d6] cursor-pointer py-2 w-full">
                    Objects
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Instantiating objects
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Object identity vs equality
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Object lifecycle
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      __toString(), __invoke(), and other magic methods
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Object cloning and __clone()
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Working with instanceof
                    </p>
                    <Button
                      className={
                        "rounded-none bg-orange-700 cursor-pointer hover:bg-orange-800"
                      }
                    >
                      Topic test
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dto">
                  <AccordionTrigger className="text-left px-4 bg-[#d6d6d6] cursor-pointer py-2 w-full">
                    DTOs, Types and Static Analysis
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      What is a DTO and when to use it
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Typed properties and method signatures
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Enforcing strict types in PHP
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Using readonly in PHP 8.1+
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Running static analysis with PHPStan/Psalm
                    </p>
                    <p className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                      Value objects vs DTOs
                    </p>
                    <Button
                      className={
                        "rounded-none bg-orange-700 cursor-pointer hover:bg-orange-800"
                      }
                    >
                      Topic test
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
