const Page = () => {
  return (
    <div className="flex w-screen justify-center items-center flex-col">
      <div className="flex items-center justify-center bg-[url('https://lh4.googleusercontent.com/28_8Fz9fmiBUA4ZxfTopc565G8WifVLBPr9nLMaXUnyg1HCMYPjgLkb3vGekouN7rrH_J4QqtUDLAbyQMlwtp7E=w16383')] bg-cover bg-center h-[310px] text-white">
        <div className="flex items-start justify-between w-screen h-[310px]">
          <div className="text-2xl">11 Dental clinic</div>
          <div className="flex flex-col justify-center items-center w-[650px]">
            <div className="mt-26 text-7xl font-bold">Цаг захиалга</div>
            <hr className="mt-3 bg-[#eb4034]   h-[10px] w-[650px]" />
          </div>
          <div className="flex justify-between w-[250px]">
            <div className="text-2xl">Нүүр</div>
            <div className="text-2xl">Цаг захиалга</div>
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-[350px] mt-5"
          src="https://lh5.googleusercontent.com/tdNq7Uaw0PnuBfSNhYpOxD34lfnVGZfD7nGYjOtiETm6XkxOZrhhoG8NmGd0aEv-iSEKEoOsO-HAGjg-IXN6UBFHflb4AK2DJzN35fSY5b1jQ4rvXdxJ2_n2nXl-PpfODA=w1280"
        />
      </div>
      <div className="text-3xl text-[#1ebeb6] font-bold  border-b-[#1ebeb6]  border-b-[5px] mt-20">
        ЦАГ ЗАХИАЛАХ
      </div>
      <hr className="bg-[#eb4034] w-[1100px] h-[3px] mt-60" />
      <div className="text-2xl mt-12">TEAM3 шүдний эмнэлэг</div>
      <div className="text-gray-500">© 2025</div>
    </div>
  );
};

export default Page;
