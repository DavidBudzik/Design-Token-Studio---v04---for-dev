import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { IndustryTheme } from '@token-generator/shared';
import clsx from 'clsx';

interface ThemeSelectorProps {
  themes: IndustryTheme[];
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSelector({ themes, selectedTheme, onThemeChange }: ThemeSelectorProps) {
  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Industry Theme</h2>
      
      <Listbox value={selectedTheme} onChange={onThemeChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300">
            <span className="block truncate font-medium">{currentTheme?.name}</span>
            <span className="block truncate text-sm text-gray-500 mt-1">{currentTheme?.description}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {themes.map((theme) => (
                <Listbox.Option
                  key={theme.id}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-3 pl-10 pr-4',
                      active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'
                    )
                  }
                  value={theme.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {theme.name}
                      </span>
                      <span className="block truncate text-sm text-gray-500 mt-1">
                        {theme.description}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <div className="mt-4 flex flex-wrap gap-2">
        {currentTheme?.keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}