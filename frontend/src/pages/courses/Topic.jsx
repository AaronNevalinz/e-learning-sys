/* eslint-disable react/no-unescaped-entities */
import { AppSidebar } from "@/components/app-sidebar";
import SideNavbar from "@/components/side-nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Topic() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full ">
          <div className="">
            <SideNavbar />
          </div>

          <div className="p-8 max-w-6xl mx-auto leading-7">
            <p>
              <strong className="text-3xl">
                Class Declaration and Structure
              </strong>
            </p>

            <p>
              PHP classes are a fundamental part of object-oriented programming
              (OOP) in PHP. They allow developers to encapsulate data and
              behavior into reusable and modular components. In this blog, we
              will explore the declaration and structure of classes in PHP,
              providing a comprehensive guide for beginners and experienced
              developers alike.
              <h2 className="text-2xl font-bold mt-4">
                What is a Class in PHP?
              </h2>
              A class in PHP is a blueprint for creating objects. It defines
              properties (variables) and methods (functions) that the objects
              created from the class will have. Classes help organize code and
              make it more maintainable and reusable.
              <h2 className="text-2xl font-bold mt-4">Declaring a Class</h2>
              To declare a class in PHP, you use the <code>class</code> keyword
              followed by the name of the class. Here's an example:
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`class MyClass {
          // Properties
          public $property1;
          private $property2;

          // Constructor
          public function __construct($property1, $property2) {
            $this->property1 = $property1;
            $this->property2 = $property2;
          }

          // Methods
          public function getProperty1() {
            return $this->property1;
          }

          private function getProperty2() {
            return $this->property2;
          }
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Class Properties</h2>
              Properties are variables that belong to a class. They can have
              different visibility levels: <code>public</code>,{" "}
              <code>protected</code>, or <code>private</code>. Public properties
              can be accessed from anywhere, while private properties can only
              be accessed within the class itself.
              <h2 className="text-2xl font-bold mt-4">Class Methods</h2>
              Methods are functions that belong to a class. They define the
              behavior of the class and can also have different visibility
              levels. Here's an example of a method:
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`public function setProperty1($value) {
          $this->property1 = $value;
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">
                Constructors and Destructors
              </h2>
              Constructors are special methods that are automatically called
              when an object is created. They are typically used to initialize
              properties. Destructors, on the other hand, are called when an
              object is destroyed.
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`class MyClass {
          public $name;

          public function __construct($name) {
            $this->name = $name;
          }

          public function __destruct() {
            echo "Object destroyed";
          }
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Inheritance</h2>
              PHP supports inheritance, allowing a class to inherit properties
              and methods from another class. This is done using the{" "}
              <code>extends</code> keyword.
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`class ParentClass {
          public function greet() {
            echo "Hello from ParentClass";
          }
        }

        class ChildClass extends ParentClass {
          public function greetChild() {
            echo "Hello from ChildClass";
          }
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Interfaces</h2>
              Interfaces define a contract for classes. A class that implements
              an interface must define all the methods declared in the
              interface.
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`interface MyInterface {
          public function doSomething();
        }

        class MyClass implements MyInterface {
          public function doSomething() {
            echo "Doing something";
          }
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Abstract Classes</h2>
              Abstract classes cannot be instantiated and are meant to be
              extended by other classes. They can have both abstract methods
              (methods without a body) and concrete methods.
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`abstract class AbstractClass {
          abstract public function doSomething();

          public function concreteMethod() {
            echo "This is a concrete method";
          }
        }

        class ConcreteClass extends AbstractClass {
          public function doSomething() {
            echo "Doing something";
          }
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Traits</h2>
              Traits are a mechanism for code reuse in PHP. They allow you to
              include methods in multiple classes without using inheritance.
              <pre className="bg-gray-100 p-4 rounded">
                <code>
                  {`trait MyTrait {
          public function sayHello() {
            echo "Hello from MyTrait";
          }
        }

        class MyClass {
          use MyTrait;
        }`}
                </code>
              </pre>
              <h2 className="text-2xl font-bold mt-4">Conclusion</h2>
              Understanding class declaration and structure in PHP is essential
              for writing clean, maintainable, and reusable code. By mastering
              these concepts, you can take full advantage of PHP's
              object-oriented programming capabilities.
            </p>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
