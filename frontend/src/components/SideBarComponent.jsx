import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SidebarComponent = () => {
  return (
    <Card className="w-full md:w-64">
      <CardHeader>
        <CardTitle>Course Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-online-business" />
            <Label htmlFor="category-online-business" className="text-sm">
              Online Business (4)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-graphic-design" />
            <Label htmlFor="category-graphic-design" className="text-sm">
              Graphic Design (2)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-programming" />
            <Label htmlFor="category-programming" className="text-sm">
              Programming (3)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-freelancing" />
            <Label htmlFor="category-freelancing" className="text-sm">
              Freelancing (5)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-english" />
            <Label htmlFor="category-english" className="text-sm">
              English Courses (4)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-photography" />
            <Label htmlFor="category-photography" className="text-sm">
              Photography (7)
            </Label>
          </div>
        </div>

        

        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold mb-4">Prices</h4>
          <RadioGroup.Root defaultValue="all" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroup.Item value="all" id="price-all" />
              <Label htmlFor="price-all" className="text-sm">
                All (29)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup.Item value="free" id="price-free" />
              <Label htmlFor="price-free" className="text-sm">
                Free (9)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup.Item value="paid" id="price-paid" />
              <Label htmlFor="price-paid" className="text-sm">
                Paid (20)
              </Label>
            </div>
          </RadioGroup.Root>
        </div>

        <Button className="w-full mt-6">Filter Result</Button>
      </CardContent>
    </Card>
  );
};

export default SidebarComponent;
