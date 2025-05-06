/* eslint-disable react/prop-types */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "./ui/button";
export function AppSidebar({title, topics}) {
  console.log(title);
  
  return (
    <Sidebar className={""}>
      <SidebarContent className={"bg-gray-50"}>
        <SidebarHeader>
          <h1 className="text-lg font-black text-center">{title}</h1>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>
            {/* <h1 className="text-lg font-black my-3">Object-Oriented Principles in PHP</h1> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className={"-mt-10"}>
            <SidebarMenu>
              <Accordion collapsible type="single" className="space-y-4">
                {(topics || []).map((topic) => (
                  <AccordionItem value={`${topic.id}`} key={topic.id}>
                    <AccordionTrigger className="bg-[#d6d6d6] text-left px-4 cursor-pointer w-full py-2">
                      {topic.title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                      {(topic.subtopics || []).map((subtopic) => (
                        <p key={subtopic.id} className="hover:underline cursor-pointer hover:text-green-500 transition-all">
                          {subtopic.title}
                        </p>
                      ))}
                      <Button
                        className={
                          "rounded-none bg-orange-700 cursor-pointer hover:bg-orange-800"
                        }
                      >
                        Topic test
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
