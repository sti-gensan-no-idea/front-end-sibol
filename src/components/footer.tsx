import { Link } from "@heroui/link";

import ImgFooterBackground from "../assets/images/img_footer_background.png";

export const Footer = () => {
  return (
    <footer className="min-h-screen relative overflow-y-hidden">
      <img
        alt="Footer Background"
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover"
        src={ImgFooterBackground}
      />
      <div className="absolute inset-0 bg-black/70" />
      <span
        className="flex items-center justify-center absolute bottom-0 left-0 right-0 text-center text-white font-bold select-none"
        style={{ fontSize: 300 }}
      >
        sibolhomes
      </span>

      <div className="container mx-auto flex flex-col">
        {/* I want this div to be at the top. */}
        <div className="mt-20 bg-white rounded-2xl z-10 shadow-large shadow-gray-300 p-14 flex">
          <div className="flex flex-col w-full">
            <span className="text-4xl font-bold">SibolHomes</span>
            <p className="max-w-sm mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare rutrum sem, eget maximus mauris lobortis a.
            </p>
          </div>
          <div>
            <span className="font-bold text-xl">Address</span>
            <p className="mt-4 max-w-sm">
              Tiongson Street, San Pedro Barangay Lagao
            </p>
          </div>
          <div className="ml-8">
            <span className="font-bold text-xl">Contact</span>
            <p className="mt-4 max-w-sm">
              rolandoferrer@hotmail.com +1 (09) 2359345t
            </p>
          </div>
        </div>
        <div className="text-white p-14">
          <span className="font-bold text-xl">Quick Menu</span>
          <ul className="flex gap-4 mt-4">
            <li>
              <Link className="text-white" href="#" underline="hover">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white" href="#" underline="hover">
                Properties
              </Link>
            </li>
            <li>
              <Link className="text-white" href="#" underline="hover">
                Contacts
              </Link>
            </li>
            <li>
              <Link className="text-white" href="#" underline="hover">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="h-screen" />
      </div>
    </footer>
  );
};
