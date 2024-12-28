import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagramSquare } from "react-icons/fa";
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center">
          {/* Logo and description */}
          <div className="text-center mb-4 flex items-center space-x-2">
            <i className="text-white text-2xl">
            <Logo w={50} h={80}/>
            </i>
            <h2 className="text-2xl font-bold">ShopSimplify</h2>
          </div>
          <p className="text-sm mt-2 mb-8">Giúp bạn mua sắm dễ dàng và thuận tiện hơn mỗi ngày.</p>

          {/* Social links */}
          <div className="text-center mb-4 flex items-center space-x-2">
            <a
              href="https://www.facebook.com/nguyen.tien.ang.445529"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 text-white flex flex-col items-center w-28"
              title="Facebook 1"
            >
              <i className="text-white text-2xl mb-1">
                <FaFacebookSquare />
              </i>
              CEO 1
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100038982339179"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 flex flex-col items-center w-28"
              title="Facebook 2"
            >
              <i className="text-white text-2xl mb-1">
                <FaFacebookSquare />
              </i>
             CE0 2
            </a>
            <a
              href="https://www.facebook.com/nguyen.trong.uc.135408"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 flex flex-col items-center w-28"
              title="Facebook 3"
            >
              <i className="text-white text-2xl mb-1">
                <FaFacebookSquare />
              </i>
              Nhà phát triển
            </a>
            <a
              href="https://www.instagram.com/namhai.169/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 flex flex-col items-center w-28"
              title="Facebook 4"
            >
              <i className="text-white text-2xl mb-1">
                <FaInstagramSquare />
              </i>
              Quản lí
            </a>
            <a
              href="https://www.facebook.com/your-facebook-link5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 flex flex-col items-center w-30"
              title="Facebook 5"
            >
              <i className="text-white text-2xl mb-1">
                <FaFacebookSquare />
              </i>
              Nhân viên hỗ trợ
            </a>
          </div>

          {/* Footer bottom text */}
          <p className="text-sm text-center mt-4">
            &copy; {new Date().getFullYear()} ShopSimplify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
