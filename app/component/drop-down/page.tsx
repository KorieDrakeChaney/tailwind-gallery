import type { Metadata } from "next";
import { DropDown } from "@/components";
import { ComponentFrame } from "@/components";
export const metadata: Metadata = {
  title: "Drop Down",
  description: "A simple drop down component",
};

const DropDownPage = () => {
  return (
    <ComponentFrame
      code={`
        /*
        extend: {
          colors: {
            primary: 'hsl(180deg 85% 45%)',
            secondary: 'hsl(180deg 5% 100%)',
            tertiary: 'hsl(180deg 5% 60%)',
            bkg: 'hsl(180deg 20% 95%)',
            txt: 'hsl(211deg 45% 10%)',
          },
        },
        */

        <div class="relative inline-block text-left top-1/2 left-1/2">
            <button class="flex items-center">
              <span class="mx-2 text-txt">Options</span>
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
            </button>
        <div class="absolute right-0 z-10 mt-2 flex w-56 origin-top-right flex-col justify-between rounded-md bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Edit
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Duplicate
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Archive
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Move
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Share
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Add to favorites
              </a>
              <a class="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
                Delete
              </a>
            </div>
          </div>
        </div>
        </div>
    `}
    >
      <DropDown />
    </ComponentFrame>
  );
};

export default DropDownPage;
