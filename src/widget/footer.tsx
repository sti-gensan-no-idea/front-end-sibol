import { Link } from "@heroui/link";

import ImgFooterBackground from "../assets/images/img_footer_background.png";

export const Footer = () => {
  return (
    <footer className="min-h-screen relative overflow-y-hidden">
      {/* Background image */}
      <img
        alt="Footer Background"
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover"
        src={ImgFooterBackground}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Big 'atuna' text */}
      <span
        className="flex items-center justify-center absolute bottom-0 left-0 right-0 text-center text-white font-bold select-none"
        style={{ fontSize: "clamp(4rem, 15vw, 18rem)" }} // responsive size
      >
        atuna
      </span>

      <div className="container mx-auto flex flex-col relative z-10">
        {/* Top card */}
        <div className="mt-10 sm:mt-20 bg-white rounded-2xl shadow-large shadow-gray-300 p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row gap-8 sm:gap-12">
          <div className="flex flex-col flex-1">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Atuna
            </span>
            <p className="max-w-sm mt-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare rutrum sem, eget maximus mauris lobortis a.
            </p>
          </div>

          <div className="flex-1">
            <span className="font-bold text-lg sm:text-xl">Address</span>
            <p className="mt-4 max-w-sm text-sm sm:text-base">
              Tiongson Street, San Pedro Barangay Lagao
            </p>
          </div>

          <div className="flex-1">
            <span className="font-bold text-lg sm:text-xl">Contact</span>
            <p className="mt-4 max-w-sm text-sm sm:text-base">
              rolandoferrer@hotmail.com <br /> +1 (09) 2359345t
            </p>
          </div>
        </div>

        {/* Quick menu */}
        <div className="text-white p-6 sm:p-14">
          <span className="font-bold text-lg sm:text-xl">Quick Menu</span>
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
            <li>
              <Link className="text-white" href="/" underline="hover">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/properties" underline="hover">
                Properties
              </Link>
            </li>
            <li>
              {/* <Link className="text-white" href="/about" underline="hover">
                About Us
              </Link> */}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
