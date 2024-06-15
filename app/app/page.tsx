import { Button } from "@c/ui/button";
import { Input } from "@c/ui/input";
import { Textarea } from "@c/ui/textarea";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <Image
              src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600"
              width="550"
              height="550"
              alt="Restaurant Interior"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the Flavors of Restaurant
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience our award-winning cuisine in a warm and inviting
                  atmosphere. Savor the finest ingredients and impeccable
                  service.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/product"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  View Menu
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="menu"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Signature Dishes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Savor Our Culinary Masterpieces
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Indulge in our chef&apos;s carefully crafted menu, featuring
                  the finest local ingredients and innovative flavors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
                <Image
                  src="https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=600"
                  width="550"
                  height="310"
                  alt="Dish"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-bold">Grilled Salmon</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fresh salmon fillet grilled to perfection, served with a
                    lemon-dill sauce and roasted vegetables.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
                <Image
                  src="https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg?auto=compress&cs=tinysrgb&w=600"
                  width="550"
                  height="310"
                  alt="Dish"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-bold">Beef Tenderloin</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Tender beef tenderloin served with a red wine reduction,
                    roasted potatoes, and sautéed spinach.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
                <Image
                  src="https://images.pexels.com/photos/921362/pexels-photo-921362.jpeg?auto=compress&cs=tinysrgb&w=600"
                  width="550"
                  height="310"
                  alt="Dish"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-bold">Vegetable Risotto</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Creamy risotto made with seasonal vegetables, finished with
                    parmesan and fresh herbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover the Story Behind the Restaurant
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Acme Restaurant was founded in 2010 by Chef Emily Nguyen, a
                  culinary visionary with a passion for using the finest local
                  ingredients to create innovative and delicious dishes. Our
                  mission is to provide an exceptional dining experience in a
                  warm and inviting atmosphere.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Meet the Chef
                </Link>
              </div>
            </div>
            <Image
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600"
              width="550"
              height="550"
              alt="Chef"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch with Acme Restaurant
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We&apos;d love to hear from you! Feel free to reach out with
                  any questions, comments, or reservations.
                </p>
              </div>
              <form className="space-y-4">
                <Input type="text" placeholder="Name" className="w-full" />
                <Input type="email" placeholder="Email" className="w-full" />
                <Textarea placeholder="Message" className="w-full" />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Elevate Restaurant</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  123 Main Street, Anytown USA
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Phone: (123) 456-7890
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Hours of Operation</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monday - Thursday: 11am - 9pm
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Friday - Saturday: 11am - 10pm
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Sunday: 12pm - 8pm
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <Link href="#" prefetch={false}>
              Our Story
            </Link>
            <Link href="#" prefetch={false}>
              Meet the Chef
            </Link>
            <Link href="#" prefetch={false}>
              Sustainability
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Menu</h3>
            <Link href="#" prefetch={false}>
              Appetizers
            </Link>
            <Link href="#" prefetch={false}>
              Entrees
            </Link>
            <Link href="#" prefetch={false}>
              Desserts
            </Link>
            <Link href="#" prefetch={false}>
              Beverages
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Visit Us</h3>
            <Link href="#" prefetch={false}>
              Directions
            </Link>
            <Link href="#" prefetch={false}>
              Hours
            </Link>
            <Link href="#" prefetch={false}>
              Reservations
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Connect</h3>
            <Link href="#" prefetch={false}>
              Facebook
            </Link>
            <Link href="#" prefetch={false}>
              Instagram
            </Link>
            <Link href="#" prefetch={false}>
              Twitter
            </Link>
            <Link href="#" prefetch={false}>
              Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
