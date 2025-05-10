
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiLogo from "../../assets/images/api-logo.svg"
import Hero from "@/components/Hero";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { API_URL } from "@/config";
import Footer from "@/components/Footer";


export default function Home() {
  const {token} = useContext(AppContext)
  const [categories, setCategories] = useState([])
  
  const fetchAllCategories = async ()=>{
    const options = {
      method: "GET",
      url: `${API_URL}/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data
        setCategories(data.result)
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  useEffect(()=>{
    fetchAllCategories()
  }, [])
  return (
    <>
      <main className="">
        <Hero />
        <div>
          <h1 className="text-3xl text-slate-800 font-extrabold font-montserrat">
            Explore By Tags
          </h1>
          <div className="max-w-2xl  mt-2 text-slate-600">
            All course series are categorized into various //tags. This should
            provide you with an alternate way to decide what to learn next,
            whether it be a particular framework, language, or tool.
          </div>
        </div>
        {categories?.map((category) => (
          <Tabs key={category.id} className="mt-10 w-full">
            {" "}
            {/* Added className="w-full" */}
            <TabsList className="flex gap-x-4 md:gap-x-10 rounded-none bg-transparent">
              <div>
                <TabsTrigger
                  value={`category-${category.id}`} // Unique value for each category
                  className="uppercase px-4 rounded-none cursor-pointer text-sm font-medium" // Added font-medium
                >
                  {category.name}
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent
              value={`category-${category.id}`}
              className="mt-4 w-full"
            >
              {" "}
              {/* Added className="w-full" */}
              <div className="flex flex-wrap gap-4 md:gap-5">
                {category.tags?.map(
                  (
                    tag // Changed to map through category.tags
                  ) => (
                    <div
                      key={tag.id} // Added key for each tag
                      className="flex items-center gap-x-2 py-3 px-4 bg-slate-100 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]" // Added hover effect
                    >
                      <img
                        src={apiLogo}
                        alt={tag.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />{" "}
                      {/* Added alt text and made image round */}
                      <div className="">
                        <h2 className="font-semibold text-slate-900 text-sm">
                          {tag.name}
                        </h2>{" "}
                        {/* Made tag name bold */}
                        <p className="text-xs text-gray-500">
                          {tag.courseCount} courses
                        </p>{" "}
                        {/* Display course count */}
                      </div>
                    </div>
                  )
                )}
                {/*If there are no tags, show this message*/}
                {category.tags?.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No tags available in this category.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ))}

        {/* <CourseCard /> */}
      </main>
      <Footer />
    </>
  );
}
