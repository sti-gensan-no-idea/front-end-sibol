import { Link } from "@heroui/link";
import ImgFooterBackground from "../assets/images/img_footer_background.png";

export const Footer = () => {
  return (
    <footer className="relative min-h-screen overflow-hidden">
      {/* Background Image Layer */}
      <img
        alt="Footer Background"
        src={ImgFooterBackground}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Footer Brand Title */}
      <span
        className="absolute bottom-0 left-0 right-0 text-center text-white font-bold select-none z-10"
        style={{ fontSize: 300 }}
      >
        atuna
      </span>

      {/* Content Wrapper */}
      <div className="relative z-20 container mx-auto flex flex-col px-8">
        {/* Top Info Card */}
        <div className="mt-20 bg-white rounded-2xl shadow-large shadow-gray-300 p-14 flex flex-wrap gap-8">
          <div className="flex flex-col w-full sm:w-auto">
            <span className="text-4xl font-bold">Atuna</span>
            <p className="max-w-sm mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare rutrum sem, eget maximus mauris lobortis a.
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl">Address</span>
            <p className="mt-4 max-w-sm">
              Tiongson Street, San Pedro Barangay Lagao
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl">Contact</span>
            <p className="mt-4 max-w-sm">
              rolandoferrer@hotmail.com
              <br />
              +639123456789
            </p>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="text-white p-14">
          <span className="font-bold text-xl">Quick Menu</span>
          <ul className="flex gap-4 mt-4">
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
              <Link className="text-white" href="/about-us" underline="hover">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Spacer */}
        <div className="h-screen" />
      </div>
    </footer>
  );
};
