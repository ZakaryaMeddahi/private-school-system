'use client';

import Logo from '../Logo/Logo';
import FooterList from '../footer-list/footerList';
import Item from '../Item/Item';

const Footer = () => {
  return (
    <div className="h-125 w-full max-w-full py-5 px-12.5" style={{ backgroundColor: '#F1F2ED', color: '#898C81' }}>
      <div className="grid h-4/5 max-w-full grid-cols-12 content-center items-center justify-items-center gap-10 p-3.75">
        <div className="col-span-6">
          <Logo boxSize='120px' fontSize='32px' />
          <p className="mt-5 mb-5 ml-7.5 w-112.5 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
            velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
            commodo lectus, ac blandit elit tincidunt id.
          </p>
        </div>
        <div className="col-span-2">
          <FooterList title='Links'>
            <Item key={1} item='Home' color='gray' />
            <Item key={2} item='About' color='gray' />
            <Item key={3} item='courses' color='gray' />
            <Item key={4} item='Contact' color='gray' />
          </FooterList>
        </div>
        <div className="col-span-2">
          <FooterList title='Courses'>
            <Item key={1} item='Web Development' color='gray' />
            <Item key={2} item='Mobile Development' color='gray' />
            <Item key={3} item='Data Science' color='gray' />
            <Item key={4} item='Artificial Intelligence' color='gray' />
          </FooterList>
        </div>
        <div className="col-span-2">
          <FooterList title='Contact'>
            <Item
              key={1}
              item='Address: 1234 Street Name, City Name, United States'
              color='gray'
            />
            <Item key={2} item='Phone: +123 456 789' color='gray' />
            <Item key={3} item='Email: ex@gmail.com' color='gray' />
          </FooterList>
        </div>
      </div>
      <hr className="my-5 border-t" />
      <div className="flex max-w-full h-[10%] px-15">
        <div className="flex h-full w-2/5 items-center justify-center">
          <p className="my-2.5 text-base text-gray-500">
            © 2024 Education. All rights reserved
          </p>
        </div>
        <div className="flex-1" />
        <div className="h-full w-2/5"></div>
      </div>
    </div>
  );
};

export default Footer;
