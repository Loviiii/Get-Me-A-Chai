import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center h-[40vh]">
        <div className="text-3xl font-medium flex items-center  ">
          Buy Me A Chai
          <span>
            <Image
              src="/gifs/chai.gif"
              alt="Network error"
              width={35}
              height={35}
              unoptimized
            />
          </span>
        </div>
        <h1 className="flex text-center items-center justify-center">
          Support Bold Ideas and Budding Founders — Just One Chai Away
        </h1>
        <div>
        <Link href="/Login">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#152a69] via-[#0b1d53] to-[#051238] hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
          >
            Start Here
          </button>
          </Link>
          <Link href="/about">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#152a69] via-[#0b1d53] to-[#051238] hover:bg-gradient-to-br focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 h-[0.1]"> </div>

      <div className="flex justify-center text-center items-center text-white p-8 text-2xl font-medium">
        Turn chai into change — fund the next big idea.
      </div>
      <div className="flex flex-col md:flex-row gap-16 justify-center items-end">
        <div className="text-white flex flex-col justify-center items-center">
          <Image
            src="/gifs/helpUs.gif"
            alt="Network error"
            width={160}
            height={120}
            unoptimized
          />
          <p className="font-medium text-base md:text:xs">
            Join hands to help startups rise
          </p>
          <p className="text-center text-base md:text-xs">
            Your support can turn raw ideas into real innovations that shape the
            future.
          </p>
        </div>
        <div className="text-white flex flex-col justify-center items-center">
          <Image
            src="/gifs/FundsCollection.gif"
            alt="Network error"
            width={120}
            height={120}
            unoptimized
          />
          <p className="font-medium text-base md:text:xs">Give Funds. Grow Futures</p>
          <p className="text-center text-base md:text-xs">
            Every contribution brings a startup one step closer to making an
            impact
          </p>
        </div>
        <div className="text-white flex flex-col justify-center items-center">
          <Image
            src="/gifs/Collaboration.gif"
            alt="Network error"
            width={120}
            height={120}
            unoptimized
          />
          <p className="font-medium text-base md:text:xs">Every Contribution Counts</p>
          <p className="text-center text-base md:text-xs">
            Be a part of the startup journey — your support fuels their progress
          </p>
        </div>
      </div>

      <div className="bg-gray-800 h-[0.1] my-12"> </div>

      <div className="text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Learn more about Startups</h1>
        <div className="py-5  ">
          <iframe
            src="https://www.youtube.com/embed/8zHWKaiLo8U?si=s166-zEyp1wcuFHQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
