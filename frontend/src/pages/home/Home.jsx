
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiLogo from "../../assets/images/api-logo.svg"
import CourseCard from "@/components/CourseCard";


export default function Home() {
  return (
    <>
        <main>
          <div>
            <h1 className="text-5xl text-slate-800 font-bold">
              Explore By Tags
            </h1>
            <div className="max-w-xl  mt-2 text-slate-600">
              All course series are categorized into various //tags. This should
              provide you with an alternate way to decide what to learn next,
              whether it be a particular framework, language, or tool.
            </div>
          </div>

          <Tabs defaultValue="all-tag" className={"mt-10"}>
            <TabsList className={"flex gap-x-10 rounded-none bg-transparent"}>
              <TabsTrigger
                value="all-tags"
                className={"uppercase px-4 rounded-none cursor-pointer "}
              >
                All Tags
              </TabsTrigger>
              <TabsTrigger
                value="devops"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                Devops
              </TabsTrigger>
              <TabsTrigger
                value="frameworks"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                frameworks
              </TabsTrigger>
              <TabsTrigger
                value="languages"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                languages
              </TabsTrigger>
              <TabsTrigger
                value="techniques"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                techniques
              </TabsTrigger>
              <TabsTrigger
                value="testing"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                testing
              </TabsTrigger>
              <TabsTrigger
                value="tooling"
                className={"uppercase px-4 rounded-none cursor-pointer"}
              >
                tooling
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all-tags" className={"mt-4"}>
              <div className="grid grid-cols-5 gap-5">
                {[
                  1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11,
                  1, 1, 1, 1, 1, 1,
                ].map((index) => (
                  <div
                    className="flex items-center gap-x-2 py-2 px-6 bg-slate-200"
                    key={index}
                  >
                    <img src={apiLogo} alt="" />
                    <div className="">
                      <h2 className="font-medium text-slate-900">APIs</h2>
                      <p className="text-xs">8 courses</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>

          <CourseCard />
        </main>
    </>
  );
}
