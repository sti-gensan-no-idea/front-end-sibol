// Test component to verify images are loading
import { useEffect, useState } from "react";
import ImgHeroBackground from "../assets/images/img_hero_background.jpg";
import ImgBaldo from "../assets/images/img_baldo.jpg";
import ImgFerrer from "../assets/images/img_ferrer.jpg";
import ImgAlvarez from "../assets/images/img_alvarez.jpg";
import ImgArmada from "../assets/images/img_armada.jpg";
import agent1 from "../assets/images/agent1.png";
import IcLogo from "../assets/images/ic_logo.png";

export const ImageDiagnostic = () => {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});

  const testImages = {
    "Hero Background": ImgHeroBackground,
    "Team - Baldo": ImgBaldo,
    "Team - Ferrer": ImgFerrer,
    "Team - Alvarez": ImgAlvarez,
    "Team - Armada": ImgArmada,
    "Agent 1": agent1,
    "Logo": IcLogo,
  };

  useEffect(() => {
    Object.entries(testImages).forEach(([name, src]) => {
      const img = new Image();
      img.onload = () => {
        setImageStatus(prev => ({ ...prev, [name]: true }));
      };
      img.onerror = () => {
        setImageStatus(prev => ({ ...prev, [name]: false }));
      };
      img.src = src;
    });
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Image Loading Status</h3>
      <div className="space-y-2">
        {Object.entries(testImages).map(([name, src]) => (
          <div key={name} className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                imageStatus[name] === true
                  ? 'bg-green-500'
                  : imageStatus[name] === false
                  ? 'bg-red-500'
                  : 'bg-gray-300'
              }`}
            />
            <span className="text-sm">{name}</span>
            <span className="text-xs text-gray-500 ml-auto">
              {imageStatus[name] === true
                ? 'Loaded'
                : imageStatus[name] === false
                ? 'Failed'
                : 'Loading...'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        {Object.entries(testImages).map(([name, src]) => (
          <div key={name} className="text-center">
            <img
              src={src}
              alt={name}
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="text-xs text-gray-600">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
