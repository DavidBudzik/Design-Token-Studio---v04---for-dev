import { FaMagic } from 'react-icons/fa';
import clsx from 'clsx';

interface DescriptionInputProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function DescriptionInput({
  description,
  onDescriptionChange,
  onGenerate,
  isGenerating
}: DescriptionInputProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Palette</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="sr-only">
            Palette description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
            placeholder="e.g., vibrant tech theme with earthy undertones, modern healthcare palette with calming blues and greens..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={isGenerating}
          />
          <p className="mt-2 text-sm text-gray-500">
            Describe the mood, style, or specific colors you want. The AI will detect your industry and generate a matching palette.
          </p>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating || !description.trim()}
          className={clsx(
            'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
            isGenerating || !description.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
          )}
        >
          <FaMagic className={clsx('w-5 h-5', isGenerating && 'animate-pulse')} />
          {isGenerating ? 'Generating...' : 'Generate Palette'}
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Example descriptions:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            "Professional finance app with trustworthy blues and sophisticated grays"
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            "Energetic fitness brand with vibrant oranges and motivating greens"
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            "Luxurious hospitality website with warm golds and elegant neutrals"
          </li>
        </ul>
      </div>
    </div>
  );
}